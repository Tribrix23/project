import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const {
      email,
      subject,
      message,
      htmlContent,
    } = await req.json()

    
    if (!process.env.BREVO_API_KEY) {
      throw new Error(
        'BREVO_API_KEY is missing in .env.local'
      )
    }


    const response = await fetch(
      'https://api.brevo.com/v3/smtp/email',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY,
        },

        body: JSON.stringify({
          sender: {
            name: 'Construco',
            email: 'tribrix23@gmail.com',
          },

          to: [
            {
              email: email,
            },
          ],

          subject: subject,

          htmlContent:
            htmlContent ||
            `
              <div style="font-family:sans-serif;">
                <h2>${subject}</h2>
                <p>${message}</p>
              </div>
            `,
        }),
      }
    )

    const data = await response.json()


    if (!response.ok) {
      console.error('Brevo API Error:', data)

      return NextResponse.json(
        {
          success: false,
          error: 'Brevo API Error',
          details: data,
        },
        { status: 500 }
      )
    }


    return NextResponse.json({
      success: true,
      data,
    })
  } catch (err: any) {
    console.error('Server Error:', err)

    return NextResponse.json(
      {
        success: false,
        error: 'Email failed',
        details: err.message || String(err),
      },
      { status: 500 }
    )
  }
}