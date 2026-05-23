import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { amount, currency, name } = body

    const salt = process.env.HITPAY_SALT!

    const payload = {
      name: name || 'Customer',
      amount: amount ? Number(amount).toFixed(2) : '0.00',
      currency: currency || 'PHP',
      reference: `ORD-${Date.now()}`,
      callback_url: `${BASE_URL}/api/hitpay-webhook`,
      redirect_url: `${BASE_URL}/payment?q=sd`,
      cancel_url: `${BASE_URL}/payment?q=fd`,

      payment_methods: ['gcash']
    }

    const sortedKeys = Object.keys(payload).sort()
    const sortedPayload = sortedKeys.reduce((acc, key) => {
      acc[key] = payload[key as keyof typeof payload]
      return acc
    }, {} as Record<string, string>)

    const signature = crypto
      .createHmac('sha256', salt)
      .update(new URLSearchParams(sortedPayload).toString())
      .digest('hex')

    const res = await fetch('https://api.sandbox.hit-pay.com/v1/payment-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-BUSINESS-API-KEY': process.env.HITPAY_KEY!,
        'X-Hmac-Signature': signature,
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data.message || 'Payment initiation failed' }, { status: 400 })
    }

    return NextResponse.json({ id: data.id, url: data.url })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
