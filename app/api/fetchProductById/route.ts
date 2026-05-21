import { NextRequest, NextResponse } from 'next/server'
import { supabaseServerAdmin as Server } from "@/lib/supabase/serverAdmin"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    // Fetch product from storeProducts with store name
    const { data: product, error } = await Server
      .from('storeProducts')
      .select(`
        *,
        sellerStore:store_id (
          id,
          name
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Supabase query error:', error)
      throw error
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ data: product }, { status: 200 })
  } catch (err: any) {
    console.error('Database query error:', err)
    return NextResponse.json({ error: 'Database query failed: ' + err.message }, { status: 500 })
  }
}