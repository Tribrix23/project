import { createBrowserClient } from '@supabase/ssr'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 100 // 100 days

export const createClient = () => {
  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          if (typeof document === 'undefined') return []
          return document.cookie.split(';').map(c => {
            const [name, ...v] = c.trim().split('=')
            return { name, value: v.join('=') }
          })
        },
        setAll(cookiesToSet) {
          if (typeof document === 'undefined') return
          cookiesToSet.forEach(({ name, value, options }) => {
            const maxAge = options?.maxAge || COOKIE_MAX_AGE
            const expires = new Date(Date.now() + maxAge * 1000).toUTCString()
            document.cookie = `${name}=${encodeURIComponent(value)}; path=${options?.path || '/'}; max-age=${maxAge}; expires=${expires}; sameSite=${options?.sameSite || 'lax'}${options?.secure ? '; secure' : ''}`
          })
        },
      },
    }
  )
  
  return client
}