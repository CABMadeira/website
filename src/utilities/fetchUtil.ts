// utils/fetchUtil.ts
type FetchUtilOptions = RequestInit & {
  next?: {
    revalidate?: number
  }
  debug?: boolean
}

export async function fetchUtil(url: string, options: FetchUtilOptions = {}) {
  const { debug = false, next, ...fetchOptions } = options

  const start = Date.now()
  const res = await fetch(url, { ...fetchOptions, next })
  const duration = Date.now() - start

  const cacheControl = res.headers.get('cache-control') || 'none'
  const status = res.status

  if (debug) {
    const stack = new Error().stack?.split('\n').slice(2, 3)[0]?.trim() || 'unknown'
    console.log(
      `[fetchUtil] ${new Date().toISOString()} | ${status} | ${duration}ms | cache: ${cacheControl} | url: ${url} | called at: ${stack}`,
    )
  }

  return res
}
