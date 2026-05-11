import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { supabaseServerAdmin as Server } from "@/lib/supabase/serverAdmin"
import { supabaseServer } from "@/lib/supabase/server"

// --------------------
// R2 CLIENT
// --------------------
const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const description = formData.get('description') as string
    const details = formData.get('details') as string | null
    const guarantees = (JSON.parse((formData.get('guarantees') as string) || '[]')) as string[]
    const file = formData.get('image') as File | null

    // Validate required fields
    if (!name || !category || !description || !file) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // --------------------
    // 1. GET USER AUTH
    // --------------------
    const {
      data: { user },
    } = await Server.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // --------------------
    // 2. GET STORE ID
    // --------------------
    const { data: sellerStore } = await Server.from('sellerStore').select('id').eq('owner_id', user.id).single()

    if (!sellerStore) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 })
    }

    const storeId = sellerStore.id

    // --------------------
    // 3. UPLOAD IMAGE TO R2
    // --------------------
    const buffer = Buffer.from(await file.arrayBuffer())
    const uuid = crypto.randomUUID()
    // Remove spaces and special chars from filename, keep extension
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_')
    const fileKey = `storeProducts/${storeId}/${uuid}-${cleanName}`

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: fileKey,
        Body: buffer,
        ContentType: file.type,
      })
    )

    const imageUrl = `${process.env.R2_PUBLIC_URL}${fileKey}`

    // --------------------
    // 4. INSERT PRODUCT
    // --------------------
    const { data, error } = await (await supabaseServer())
      .from('storeProducts')
      .insert([
        {
          store_id: storeId,
          name,
          category,
          description,
          details,
          image: imageUrl,
          guarantees,
        },
      ])
      .select()

    if (error) {
      throw error
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error: any) {
    console.error('Error adding product:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to add product' },
      { status: 500 }
    )
  }
}