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
    let userId: string
    try {
      const supabase = await supabaseServer()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        return NextResponse.json({ error: 'Unauthorized - No user found' }, { status: 401 })
      }
      userId = user.id
      console.log('Authenticated user:', user.id)
    } catch (err: any) {
      console.error('Auth error:', err)
      return NextResponse.json({ error: 'Auth failed: ' + err.message }, { status: 500 })
    }

    // --------------------
    // 2. GET STORE ID
    // --------------------
    let storeId: string
    try {
      const { data: sellerStore } = await Server.from('sellerStore').select('id').eq('owner_id', userId).single()

      if (!sellerStore) {
        return NextResponse.json({ error: 'Store not found for this user' }, { status: 404 })
      }

      storeId = sellerStore.id
      console.log('Found store:', storeId)
    } catch (err: any) {
      console.error('Store lookup error:', err)
      return NextResponse.json({ error: 'Store lookup failed: ' + err.message }, { status: 500 })
    }

    // --------------------
    // 3. UPLOAD IMAGE TO R2
    // --------------------
    let imageUrl: string
    try {
      const buffer = Buffer.from(await file.arrayBuffer())
      const uuid = crypto.randomUUID()
      // Remove spaces and special chars from filename, keep extension
      const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_')
      const fileKey = `storeProducts/${storeId}/${uuid}-${cleanName}`

      await r2.send(
        new PutObjectCommand({
          Bucket: process.env.R2_PUBLIC_BUCKET_NAME!,
          Key: fileKey,
          Body: buffer,
          ContentType: file.type,
        })
      )

      imageUrl = `${process.env.R2_PUBLIC_URL}${fileKey}`
      console.log('Uploaded image to R2:', imageUrl)
    } catch (err: any) {
      console.error('R2 upload error:', err)
      return NextResponse.json({ error: 'Image upload failed: ' + err.message }, { status: 500 })
    }

    // --------------------
    // 4. INSERT PRODUCT
    // --------------------
    console.log('Inserting product with guarantees:', guarantees, 'type:', Array.isArray(guarantees))
    try {
      const productInsert: Record<string, any> = {
        store_id: storeId,
        productName: name,
        category,
        description,
        image_url: imageUrl,
        sellerGuarantees: JSON.stringify(guarantees),
      }
      if (details && details.trim().length > 0) {
        productInsert.productDetails = details
      }

      const { data, error } = await (await supabaseServer())
        .from('storeProducts')
        .insert([productInsert])
        .select()

      if (error) {
        console.error('Supabase insert error:', error)
        throw error
      }

      console.log('Product inserted successfully:', data)
      return NextResponse.json({ data }, { status: 201 })
    } catch (err: any) {
      console.error('Database insert error:', err)
      return NextResponse.json({ 
        error: 'Database insert failed: ' + err.message,
        ...(process.env.NODE_ENV === 'development' && { 
          details: err.details,
          code: err.code,
          hint: err.hint
        })
      }, { status: 500 })
    }
  } catch (error: any) {
    console.error('Unexpected error in addProducts:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    })
    return NextResponse.json(
      { error: error.message || 'Failed to add product' },
      { status: 500 }
    )
  }
}