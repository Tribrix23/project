import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function proxy(req: NextRequest) {
  const res = NextResponse.next()

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'anonymous'

  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return new NextResponse('Too many requests', { status: 429 })
  }


  const COOKIE_MAX_AGE = 60 * 60 * 24 * 100

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, {
              ...options,
              maxAge: options?.maxAge || COOKIE_MAX_AGE,
              path: options?.path || '/',
            })
          })
        },
      },
    }
  )


  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isDashboard = req.nextUrl.pathname.startsWith('/dashboard')


  if (isDashboard && !user) {
    return NextResponse.redirect(new URL('/', req.url))
  }


  if (isDashboard && user) {
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(user.id)

    if (error || !data.user) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    const role = data.user.app_metadata?.role

    const isSuperAdmin = role === 'superuser'

    if (!isSuperAdmin) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
}


export const config = {
  matcher: ['/dashboard/:path*'],
}