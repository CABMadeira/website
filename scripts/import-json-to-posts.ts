import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface JsonPost {
  file: string
  image: string
  date: string
  title: string
  body: string
}

interface ImageIssue {
  postTitle: string
  postSlug: string
  imagePath: string
  reason: 'not_found' | 'corrupted' | 'error'
  error?: string
}

const imageIssues: ImageIssue[] = []
let noticiasFolderId: number | null = null

// Get or create the "Noticias" folder
async function getOrCreateNoticiasFolder(payload: any): Promise<number | null> {
  if (noticiasFolderId) {
    return noticiasFolderId
  }

  // Check if "Noticias" folder already exists
  const existingFolders = await payload.find({
    collection: 'payload-folders',
    where: {
      name: {
        equals: 'Noticias',
      },
    },
    limit: 1,
  })

  if (existingFolders.docs.length > 0) {
    noticiasFolderId = existingFolders.docs[0].id
    console.log('📁 Using existing "Noticias" folder')
    return noticiasFolderId
  }

  // Create the "Noticias" folder
  const newFolder = await payload.create({
    collection: 'payload-folders',
    data: {
      name: 'Noticias',
      folderType: ['media'],
    },
  })

  noticiasFolderId = newFolder.id
  console.log('📁 Created new "Noticias" folder')
  return noticiasFolderId
}

// Convert plain text to Lexical editor format
function textToLexical(text: string, heroImageId?: string | null) {
  const paragraphs = text.split('\n\n').filter(line => line.trim() !== '')
  
  const children: any[] = []
  
  // Add hero image at the beginning if provided
  if (heroImageId) {
    children.push({
      type: 'block',
      fields: {
        blockName: 'Hero Image',
        blockType: 'mediaBlock',
        media: heroImageId,
      },
      format: '',
      version: 2,
    })
  }
  
  // Add text paragraphs
  paragraphs.forEach(paragraph => {
    const trimmedParagraph = paragraph.trim()
    
    children.push({
      children: [
        {
          text: trimmedParagraph,
          type: 'text',
        },
      ],
      direction: 'ltr' as const,
      format: '',
      indent: 0,
      type: 'paragraph',
      version: 1,
    })
  })

  return {
    root: {
      children,
      direction: 'ltr' as const,
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

// Parse date from DD/MM/YYYY format
function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/').map(Number)
  return new Date(year, month - 1, day)
}

// Generate slug from title and date to ensure uniqueness
function generateSlug(title: string, date: Date): string {
  const baseSlug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
  
  // Append date to make it unique (YYYY-MM-DD format)
  const dateStr = date.toISOString().split('T')[0]
  return `${baseSlug}-${dateStr}`
}

async function findOrCreateMedia(payload: any, imagePath: string, postTitle: string, postSlug: string) {
  // Extract filename from path
  const filename = path.basename(imagePath)
  
  // Determine MIME type from file extension
  const ext = path.extname(filename).toLowerCase()
  let mimetype = 'image/jpeg' // default
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      mimetype = 'image/jpeg'
      break
    case '.png':
      mimetype = 'image/png'
      break
    case '.gif':
      mimetype = 'image/gif'
      break
    case '.webp':
      mimetype = 'image/webp'
      break
    case '.svg':
      mimetype = 'image/svg+xml'
      break
    default:
      mimetype = 'image/jpeg' // fallback
  }
  
  // Check if media already exists
  const existingMedia = await payload.find({
    collection: 'media',
    where: {
      filename: {
        equals: filename,
      },
    },
    limit: 1,
  })

  if (existingMedia.docs.length > 0) {
    console.log(`  ℹ Media already exists: ${filename}`)
    return existingMedia.docs[0].id
  }

  // Get the "Noticias" folder
  const noticiasFolder = await getOrCreateNoticiasFolder(payload)
  if (!noticiasFolder) {
    console.log(`  ⚠ Could not create or find "Noticias" folder`)
    return null
  }

  // Try to find the image in data/images folder
  const dataImagePath = path.resolve(__dirname, '../data', imagePath)
  
  try {
    // Check if image exists in data/images
    await fs.access(dataImagePath)
    
    // Read the file
    const fileBuffer = await fs.readFile(dataImagePath)
    
    // Process image with Sharp to handle corrupted files
    const processedBuffer = await sharp(fileBuffer, { failOnError: false })
      .toBuffer()
    
    console.log(`  📤 Uploading image: ${filename} (${mimetype}, ${(processedBuffer.length / 1024).toFixed(1)} KB)`)
    
    // Create media entry using Payload's upload API
    try {
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: filename.replace(/\.[^/.]+$/, ''), // Remove extension for alt text
          folder: noticiasFolder, // Assign to "Noticias" folder
        },
        file: {
          data: processedBuffer,
          name: filename,
          mimetype: mimetype,
          size: processedBuffer.length,
        },
      })
      
      console.log(`  ✅ Uploaded and created media entry: ${filename} (${(processedBuffer.length / 1024).toFixed(1)} KB, in "Noticias" folder)`)
      return media.id
    } catch (uploadError: any) {
      // Handle image processing errors (corrupted images, etc.)
      if (uploadError.message?.includes('Vips') || uploadError.message?.includes('JPEG') || uploadError.message?.includes('image')) {
        console.log(`  ⚠ Image is corrupted or invalid: ${filename}`)
        console.log(`  📝 Skipping image upload, post will be created without hero image`)
        imageIssues.push({
          postTitle,
          postSlug,
          imagePath,
          reason: 'corrupted',
          error: uploadError.message,
        })
      } else {
        throw uploadError // Re-throw if it's not an image processing error
      }
    }
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log(`  ⚠ Image file not found: ${imagePath}`)
      console.log(`  📝 Searched at: ${dataImagePath}`)
      imageIssues.push({
        postTitle,
        postSlug,
        imagePath,
        reason: 'not_found',
      })
    } else if (!error.message?.includes('Vips') && !error.message?.includes('JPEG')) {
      console.log(`  ⚠ Error processing image: ${error.message}`)
      imageIssues.push({
        postTitle,
        postSlug,
        imagePath,
        reason: 'error',
        error: error.message,
      })
    }
  }

  return null
}

async function importPosts() {
  // Check for command line arguments
  const args = process.argv.slice(2)
  const shouldDelete = args.includes('--delete') || args.includes('--clean')
  
  console.log('🚀 Starting post import...\n')

  // Initialize Payload
  const payload = await getPayload({ config })
  console.log('✅ Payload initialized\n')

  if (shouldDelete) {
    console.log('🗑️  DELETE MODE: Deleting all posts and media in "Noticias" folder...\n')
    
    // Initialize the "Noticias" folder to get its ID
    const noticiasFolderId = await getOrCreateNoticiasFolder(payload)
    
    // Get all posts
    const allPosts = await payload.find({
      collection: 'posts',
      limit: 1000, // Adjust if you have more than 1000 posts
    })
    
    console.log(`📂 Found ${allPosts.docs.length} posts to delete\n`)
    
    let deletedPosts = 0
    let postErrors = 0
    
    for (const post of allPosts.docs) {
      try {
        console.log(`🗑️  Deleting post: "${post.title}" (${post.slug})`)
        await payload.delete({
          collection: 'posts',
          id: post.id,
          context: {
            disableRevalidate: true,
          },
        })
        deletedPosts++
      } catch (error) {
        console.error(`❌ Error deleting post "${post.title}":`, error)
        postErrors++
      }
    }
    
    // Get all media in "Noticias" folder only
    const allMedia = await payload.find({
      collection: 'media',
      where: {
        folder: {
          equals: noticiasFolderId,
        },
      },
      limit: 1000, // Adjust if you have more than 1000 media files
    })
    
    console.log(`\n🖼️  Found ${allMedia.docs.length} media files in "Noticias" folder to delete\n`)
    
    let deletedMedia = 0
    let mediaErrors = 0
    
    for (const media of allMedia.docs) {
      try {
        console.log(`🗑️  Deleting media: "${media.filename}" (${media.id})`)
        await payload.delete({
          collection: 'media',
          id: media.id,
        })
        deletedMedia++
      } catch (error) {
        console.error(`❌ Error deleting media "${media.filename}":`, error)
        mediaErrors++
      }
    }
    
    console.log('\n═══════════════════════════════════════')
    console.log('📊 Delete Summary:')
    console.log(`   🗑️  Posts Deleted: ${deletedPosts}`)
    console.log(`   ❌ Post Errors: ${postErrors}`)
    console.log(`   🖼️  Media Deleted (Noticias folder): ${deletedMedia}`)
    console.log(`   ❌ Media Errors: ${mediaErrors}`)
    console.log(`   📝 Total Posts: ${allPosts.docs.length}`)
    console.log(`   📝 Total Media (Noticias): ${allMedia.docs.length}`)
    console.log('═══════════════════════════════════════\n')
    
    process.exit(0)
  }

  // Initialize the "Noticias" folder for media uploads
  await getOrCreateNoticiasFolder(payload)

  // Continue with normal import logic...

  // Read all JSON files from data/posts directory
  const dataDir = path.resolve(__dirname, '../data/posts')
  const files = await fs.readdir(dataDir)
  const jsonFiles = files.filter(file => file.endsWith('.json'))

  console.log(`📂 Found ${jsonFiles.length} JSON files to import\n`)

  let imported = 0
  let skipped = 0
  let errors = 0

  for (const file of jsonFiles) {
    try {
      console.log(`📄 Processing: ${file}`)
      
      // Read and parse JSON file
      const filePath = path.join(dataDir, file)
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const jsonData: JsonPost = JSON.parse(fileContent)

      // Parse date
      const publishedAt = parseDate(jsonData.date)

      // Generate unique slug with date
      const slug = generateSlug(jsonData.title, publishedAt)

      // Check if post already exists
      const existingPost = await payload.find({
        collection: 'posts',
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
      })

      if (existingPost.docs.length > 0) {
        console.log(`  ⏭️  Post already exists: "${jsonData.title}" (${slug})\n`)
        skipped++
        continue
      }

      // Try to find or create media
      let heroImageId = null
      if (jsonData.image) {
        heroImageId = await findOrCreateMedia(payload, jsonData.image, jsonData.title, slug)
      }

      // Convert body text to Lexical format with image at the beginning
      const content = textToLexical(jsonData.body, heroImageId)

      // Extract first 100 characters for meta description
      const plainText = jsonData.body.replace(/\n\n/g, ' ').replace(/\n/g, ' ')
      const metaDescription = plainText.length > 97
        ? plainText.substring(0, 97) + '...'
        : plainText

      // Create post data with unique slug
      const postData: any = {
        title: jsonData.title,
        slug,
        content,
        publishedAt,
        _status: 'published',
        authors: [], // Empty array since we don't have author data in JSON
        relatedPosts: [], // Empty array for related posts
        categories: [], // Empty array for categories
        meta: {
          title: jsonData.title,
          description: metaDescription,
          image: heroImageId, // Keep image for SEO metadata
        },
      }

      // Remove meta image if no hero image (don't include null values)
      if (!heroImageId) {
        delete postData.meta.image
      }

      // Create the post (disable revalidation during import)
      const result = await payload.create({
        collection: 'posts',
        depth: 0,
        context: {
          disableRevalidate: true,
        },
        data: postData,
      })

      console.log(`  ✅ Created post: "${jsonData.title}"`)
      console.log(`     Slug: ${result.slug}`)
      console.log(`     Published: ${publishedAt.toISOString()}`)
      console.log(`     Content Image: ${heroImageId ? 'Yes (at top)' : 'No'}\n`)
      
      imported++
    } catch (error) {
      console.error(`  ❌ Error processing ${file}:`, error)
      console.error('')
      errors++
    }
  }

  console.log('═══════════════════════════════════════')
  console.log('📊 Import Summary:')
  console.log(`   ✅ Imported: ${imported}`)
  console.log(`   ⏭️  Skipped: ${skipped}`)
  console.log(`   ❌ Errors: ${errors}`)
  console.log(`   📝 Total: ${jsonFiles.length}`)
  console.log('═══════════════════════════════════════\n')

  // Write image issues log if any
  if (imageIssues.length > 0) {
    const logFilePath = path.resolve(__dirname, '../logs/image-issues.log')
    const logDir = path.dirname(logFilePath)
    
    // Create logs directory if it doesn't exist
    await fs.mkdir(logDir, { recursive: true })
    
    // Create log content
    const logContent = [
      '# Image Issues Log',
      `# Generated: ${new Date().toISOString()}`,
      `# Total issues: ${imageIssues.length}`,
      '',
      '═══════════════════════════════════════════════════════════════',
      '',
    ]
    
    // Group by reason
    const notFound = imageIssues.filter(i => i.reason === 'not_found')
    const corrupted = imageIssues.filter(i => i.reason === 'corrupted')
    const other = imageIssues.filter(i => i.reason === 'error')
    
    if (notFound.length > 0) {
      logContent.push('## IMAGES NOT FOUND')
      logContent.push('')
      notFound.forEach(issue => {
        logContent.push(`Post: ${issue.postTitle}`)
        logContent.push(`Slug: ${issue.postSlug}`)
        logContent.push(`Image: ${issue.imagePath}`)
        logContent.push(`Admin URL: /admin/collections/posts/${issue.postSlug}`)
        logContent.push('---')
        logContent.push('')
      })
    }
    
    if (corrupted.length > 0) {
      logContent.push('## CORRUPTED/INVALID IMAGES')
      logContent.push('')
      corrupted.forEach(issue => {
        logContent.push(`Post: ${issue.postTitle}`)
        logContent.push(`Slug: ${issue.postSlug}`)
        logContent.push(`Image: ${issue.imagePath}`)
        logContent.push(`Error: ${issue.error}`)
        logContent.push(`Admin URL: /admin/collections/posts/${issue.postSlug}`)
        logContent.push('---')
        logContent.push('')
      })
    }
    
    if (other.length > 0) {
      logContent.push('## OTHER ERRORS')
      logContent.push('')
      other.forEach(issue => {
        logContent.push(`Post: ${issue.postTitle}`)
        logContent.push(`Slug: ${issue.postSlug}`)
        logContent.push(`Image: ${issue.imagePath}`)
        logContent.push(`Error: ${issue.error}`)
        logContent.push(`Admin URL: /admin/collections/posts/${issue.postSlug}`)
        logContent.push('---')
        logContent.push('')
      })
    }
    
    // Write to file
    await fs.writeFile(logFilePath, logContent.join('\n'), 'utf-8')
    
    console.log('⚠️  Image Issues Detected:')
    console.log(`   📄 Not Found: ${notFound.length}`)
    console.log(`   🔴 Corrupted: ${corrupted.length}`)
    console.log(`   ❌ Other Errors: ${other.length}`)
    console.log(`   📝 Log file: ${logFilePath}\n`)
  }

  process.exit(0)
}

// Run the import
importPosts().catch((error) => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})
