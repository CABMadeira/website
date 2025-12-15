# Import Scripts

## Import JSON Posts

This script imports JSON files from `data/posts/` directory into Payload CMS posts.

### JSON Format

Each JSON file should have the following structure:

```json
{
  "file": "noticia_detalhe0a1c.html",
  "image": "images/noticias/juca(19).jpg",
  "date": "07/04/2015",
  "title": "GAME DAY",
  "body": "Post content here..."
}
```

### Usage

1. **Import posts**:
   ```bash
   pnpm import:posts
   ```

2. **Delete all posts** (for development/testing):
   ```bash
   pnpm import:posts:delete
   # or
   pnpm import:posts --delete
   # or
   pnpm import:posts --clean
   ```
   
   ⚠️ **WARNING**: This will permanently delete ALL posts from your database!

### Features

- ✅ Converts plain text to Lexical editor format
- ✅ Parses dates from DD/MM/YYYY format
- ✅ Generates URL-friendly slugs from titles
- ✅ Handles Portuguese characters and diacritics
- ✅ Checks for existing posts (avoids duplicates)
- ✅ Links hero images if they exist in the media collection
- ✅ Sets posts as published with the original publish date
- ✅ Provides detailed progress and summary
- 🗑️ **Delete mode**: `--delete` flag to remove all posts (development only)

### Image Handling

The script will:
1. Look for existing media with the same filename
2. Link the media if found
3. Warn if the image doesn't exist (you'll need to upload it manually)

To ensure images are imported:
1. Upload images to `public/media/` directory
2. Add them to the media collection in Payload admin
3. Run the import script

### Output

The script provides real-time feedback:

```
🚀 Starting post import...
✅ Payload initialized

📂 Found 5 JSON files to import

📄 Processing: noticia_detalhe0a1c.json
  ✅ Created post: "GAME DAY"
     Slug: game-day
     Published: 2015-04-07T00:00:00.000Z
     Hero Image: Yes

📄 Processing: noticia_detalhe0a40.json
  ⏭️  Post already exists: "Another Post"
...

═══════════════════════════════════════
📊 Import Summary:
   ✅ Imported: 4
   ⏭️  Skipped: 1
   ❌ Errors: 0
   📝 Total: 5
═══════════════════════════════════════
```

### Troubleshooting

**Error: Database connection failed**
- Make sure your database is running
- Check your `.env` file has the correct `DATABASE_URI`

**Error: Cannot find module**
- Run `pnpm install` to ensure all dependencies are installed

**Images not showing**
- Upload images manually through Payload admin
- Or place them in `public/media/` and create media entries
- Re-run the script to link images to posts

### Script Details

- **Location**: `scripts/import-json-to-posts.ts`
- **Command**: `pnpm import:posts`
- **Safe**: Won't create duplicate posts (checks by slug)
- **Idempotent**: Can be run multiple times safely
