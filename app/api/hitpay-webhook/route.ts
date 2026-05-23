import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const sig = req.headers.get('X-Hmac-Signature') || ''
    const salt = process.env.HITPAY_SALT!

    const expectedSig = crypto.createHmac('sha256', salt).update(body).digest('hex')

    if (sig !== expectedSig) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const { status } = JSON.parse(body) as { status: string }

    if (status === 'approved' || status === 'success') {
      return NextResponse.json({ redirect: `${BASE_URL}/payment?q=sd` }, { status: 200 })
    }

    return NextResponse.json({ redirect: `${BASE_URL}/payment?q=fd` }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  if (status === 'success') {
    return NextResponse.redirect(`${BASE_URL}/payment?q=sd`)
  }

  return NextResponse.redirect(`${BASE_URL}/payment?q=fd`)
}
