import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'



const MODEL = 'gemini-2.5-flash'

const GEMINI_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

// Basic in-memory cooldown protection
let lastRequestTime = 0

export async function POST(request: NextRequest) {
  try {
    // Simple anti-spam cooldown
    const now = Date.now()

    if (now - lastRequestTime < 1200) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please slow down.',
        },
        { status: 429 }
      )
    }

    lastRequestTime = now

    const body = await request.json()

    const message = body?.message

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        {
          error: 'Message is required',
        },
        { status: 400 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'Gemini API key is not configured',
        },
        { status: 500 }
      )
    }

    // Timeout protection
    const controller = new AbortController()

    const timeout = setTimeout(() => {
      controller.abort()
    }, 20000)

    console.log(
      '[Gemini Request]',
      new Date().toISOString()
    )

    const response = await fetch(
      `${GEMINI_URL}?key=${apiKey}`,
      {
        method: 'POST',
        signal: controller.signal,

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: message,
                },
              ],
            },
          ],

          systemInstruction: {
            parts: [
              {
                text:
                  'You are a helpful and friendly AI assistant.',
              },
            ],
          },

          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 512,
          },

          safetySettings: [
            {
              category:
                'HARM_CATEGORY_HARASSMENT',
              threshold:
                'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category:
                'HARM_CATEGORY_HATE_SPEECH',
              threshold:
                'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category:
                'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold:
                'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category:
                'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold:
                'BLOCK_MEDIUM_AND_ABOVE',
            },
          ],
        }),
      }
    )

    clearTimeout(timeout)

    const data = await response.json()

    console.log(
      '[Gemini Response]',
      response.status
    )

    // Handle API errors
    if (!response.ok) {
      console.error(
        '[Gemini Error]',
        JSON.stringify(data, null, 2)
      )

      const errorMessage =
        data?.error?.message ||
        'Failed to generate response.'

      const isQuotaExceeded =
        response.status === 429 ||
        /quota/i.test(errorMessage) ||
        /rate.?limit/i.test(errorMessage)

      return NextResponse.json(
        {
          error: isQuotaExceeded
            ? 'quota_exceeded'
            : errorMessage,

          isQuotaExceeded,
        },
        {
          status: response.status,
        }
      )
    }

    // Extract reply safely
    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map(
          (part: any) =>
            part?.text || ''
        )
        .join('') ||
      'Sorry, I could not generate a response.'

    return NextResponse.json({
      reply,
    })
  } catch (error: any) {
    console.error(
      '[Server Error]',
      error
    )

    if (error?.name === 'AbortError') {
      return NextResponse.json(
        {
          error:
            'Request timed out. Please try again.',
        },
        { status: 408 }
      )
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
      },
      { status: 500 }
    )
  }
}