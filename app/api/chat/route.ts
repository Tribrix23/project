import { NextRequest, NextResponse } from 'next/server'
import { supabaseServerAdmin as Server } from "@/lib/supabase/serverAdmin"

export const runtime = 'edge'

const MODELS = [
  'gemini-3.1-flash-lite-preview',
  'gemini-3.1-flash-lite',
  'gemini-3.1-flash-preview',
  'gemini-3.1-flash',
]

const GEMINI_BASE_URL =
  'https://generativelanguage.googleapis.com/v1beta/models'

// Basic in-memory cooldown protection
let lastRequestTime = 0

function isScopeViolation(m: string): boolean {
  const banned = [
    /president/i,
    /presidential/i,
    /politics/i,
    /trump/i,
    /election/i,
    /country\s+of\s+usa/i,
    /usa\s+country/i,
    /movie\s+review/i,
    /recipe\s+for.*dinner/i,
    /weather\s+forecast/i,
    /\bUSA\b/,
    /united\s+states/i,
    /joke\s+about/i,
    /tell\s+me\s+a\s+joke/i,
    /what\s+is\s+usa/i,
    /history\s+of\s+the\s+world/i,
    /space\s+travel/i,
    /how\s+to\s+make\s+a\b/i,
    /my\s+favorite\s+color/i,
    /\bchitchat\b/,
  ]
  return banned.some(p => p.test(m))
}

async function buildProductContext(): Promise<string> {
  try {
    const { data: products } = await Server
      .from('storeProducts')
      .select(`
        name,
        description,
        category,
        price,
        unit,
        sellerStore:store_id (
          name
        )
      `)
      .limit(50)

    if (!products || products.length === 0) return ''

    const lines: string[] = []
    products.forEach((p: any) => {
      lines.push(
        `- ${p.name} | Category: ${p.category ?? 'Unknown'} | Price: ₱${Number(p.price).toFixed(2)} | Unit: ${p.unit ?? 'pc'} | Seller: ${p.sellerStore?.name ?? 'Unknown'}`
      )
    })
    return `\n--- Available Products ---\n${lines.join('\n')}`
  } catch {
    return ''
  }
}

// Build product context eagerly at module load (Edge runtime supports top-level await)
let productContextEdges: string = ''
try {
  productContextEdges = await buildProductContext()
} catch {
  productContextEdges = ''
}

const SYSTEM_INSTRUCTION = `
You are Quant — the official AI Customer Support chatbot for Constructo, a Philippines-based e-commerce platform for construction materials and industrial supplies.

## Identity
- Name: Quant
- Role: AI-powered construction support
- Platform: Constructo (construco.devctr.com)
- Tone: Warm, helpful, professional, concise. Use clear formatting (bold, bullet points) to make answers easy to scan.


## Core Responsibilities (STRICTLY within these topics only)
0. **Greetings** — Can answer greetings and question like the user asking who he is or who are the group that created this which is John David L. Perez who is the Software Engineer (Developer) , Angelou Madamba which is the System Analyst, Trisha Mae Feliciano Which is the Documentation, Justine Factolerin whic is the UX/UI Designer , Raphael Salcedo which is the QA tester .
1. **Products & inventory** — help buyers find construction materials by name, category, or use-case; compare items; suggest alternatives.
2. **Orders & checkout** — explain how to place an order, manage cart, and complete checkout.
3. **Payments** — describe all accepted payment methods, how payments work, and what to do if payment fails.
4. **Delivery & shipping** — explain delivery timelines, logistics, PSGC-based address system, and how to track orders.
5. **Returns & refunds** — explain the return and refund policy and the process for requesting a return.
6. **Seller onboarding** — guide potential sellers through applying to become a seller, approval process, and dashboard basics.
7. **Account & settings** — guide users through login, registration, address setup, and profile settings.
8. **Platform navigation** — help users navigate the shop, browse categories, and find what they need.

## Strict Constraints
- ONLY answer questions directly related to the above responsibilities.
- If a user asks about ANY topic outside the scope (politics, news, general world facts, entertainment, personal advice, weather, Wikipedia-style trivia, coding, USA or other countries, etc.), respond ONLY with:
  "I'm Quant, your AI construction support for Constructo. I can only help you with questions about our products, orders, payments, deliveries, returns, and seller inquiries. Please ask me something within those topics!"
- Do NOT make up or hallucinate information about politics, countries, entertainment, or any topic unrelated to construction materials e-commerce.
- Never disclose API keys, internal system details, or any sensitive data or try attack something.

## Product Catalog
Use the product list below to answer product-specific questions. Cite the exact product name when available.
${productContextEdges ? productContextEdges : 'Product list not currently available — inform the user politely if they ask about specific products.'}
`.trim()

export async function POST(request: NextRequest) {
  try {
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
    const rawName = body?.userName
    // Sanitize name — strip HTML, limit length
    const userName = typeof rawName === 'string'
      ? rawName.replace(/[<>]/g, '').slice(0, 100)
      : null

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

    // Scope gate: block out-of-scope queries before hitting the LLM
    if (isScopeViolation(message)) {
      return NextResponse.json({
        reply: `I'm Quant, your AI construction support for Constructo. I can only help you with questions about our products, orders, payments, deliveries, returns, and seller inquiries.${userName ? ` Hey ${userName},` : ''} please ask me something within those topics!`,
      })
    }

    const personaBlock = userName
      ? `\n- The user you are talking to is named **${userName}**. Always address them by their first name naturally and warmly, like a real messenger conversation.`
      : ''

    const dynamicSystemInstruction = `${SYSTEM_INSTRUCTION}\n## Personalization\n${userName ? `- You may address the user by their first name **${userName}** occasionally, in a warm and casual way, as if messaging a friend or customer service rep on a chat app. Do not overdo it — use their name naturally in your replies.` : '- Address the user casually and warmly as if messaging on a messenger app.'}\n- Keep the tone like a real chat — short, friendly sentences, briefly and directly answering the user's question.`

    const controller = new AbortController()
    const timeout = setTimeout(() => {
      controller.abort()
    }, 20000)

    console.log(
      '[Gemini Request]',
      new Date().toISOString()
    )

    async function callGemini(model: string) {
      return fetch(
        `${GEMINI_BASE_URL}/${model}:generateContent?key=${apiKey}`,
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
                  text: dynamicSystemInstruction,
                },
              ],
            },

            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
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
    }

    // Try each model in order until one succeeds
    let response: Response | null = null
    let data: any = null
    let lastError: string | null = null
    let triedModels: string[] = []

    for (const model of MODELS) {
      triedModels.push(model)
      console.log(
        `[Gemini Attempt] model=${model}`
      )

      response = await callGemini(model)
      data = await response.json()

      console.log(
        '[Gemini Response]',
        `model=${model}`,
        `status=${response.status}`
      )

      if (response.ok) {
        break
      }

      lastError =
        data?.error?.message ||
        `Model ${model} returned status ${response.status}`

      console.error(
        `[Gemini Error] model=${model} status=${response.status}`,
        JSON.stringify(data, null, 2)
      )
    }

    clearTimeout(timeout)

    if (!response || !response.ok) {
      const errorMessage =
        data?.error?.message ||
        lastError ||
        'Failed to generate response.'

      const isQuotaExceeded =
        (response?.status === 429) ||
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
          status: response?.status || 500,
        }
      )
    }

    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map(
          (part: any) =>
            part?.text || ''
        )
        .join('') ||
      'Sorry, I could not generate a response. Please try again.'

    // Convert markdown bold "**text**" into <b>text</b> so the UI renders it
    const cleaned = reply.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')

    return NextResponse.json({
      reply: cleaned,
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