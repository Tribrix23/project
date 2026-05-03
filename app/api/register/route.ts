import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await supabaseServer()
    const body = await request.json()

    const {
      email,
      password,
      firstName,
      middleName,
      lastName,
      phone,
    } = body

    // Validate input
    if (!email || !password || !firstName || !lastName || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: exists, error: checkError } = await supabase.rpc('email_exists', {
      check_email: email,
    })

    if (checkError) {
      return NextResponse.json(
        { error: checkError.message },
        { status: 500 }
      )
    }

    if (exists) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Sign up user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          phone,
          role: 'user',
        },
      },
    })

    if (signUpError) {
      return NextResponse.json(
        { error: signUpError.message },
        { status: 500 }
      )
    }

    if (!data.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    // Set user role
    try {
      await fetch(`${request.nextUrl.origin}/api/set-role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: data.user.id }),
      })
    } catch (apiError) {
      console.error('set-role API error:', apiError)
    }

    return NextResponse.json({
      user: data.user,
      message: 'Check your email to confirm your account',
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}