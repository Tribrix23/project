import { NextRequest, NextResponse } from 'next/server'
import { supabaseServerAdmin as Server } from "@/lib/supabase/serverAdmin"
import { supabaseServer } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sellerId = searchParams.get('sellerId')

    if (!sellerId) {
      return NextResponse.json({ error: 'sellerId is required' }, { status: 400 })
    }

    let storeId: string
    try {
      const { data: sellerStore } = await Server.from('sellerStore').select('id').eq('owner_id', sellerId).single()

      if (!sellerStore) {
        return NextResponse.json({ error: 'Store not found for this user' }, { status: 404 })
      }

      storeId = sellerStore.id
    } catch (err: any) {
      console.error('Store lookup error:', err)
      return NextResponse.json({ error: 'Store lookup failed: ' + err.message }, { status: 500 })
    }

    try {
      const { data: products, error } = await Server.from('storeProducts').select('*').eq('store_id', storeId)

      if (error) {
        console.error('Supabase query error:', error)
        throw error
      }

      return NextResponse.json({ data: products }, { status: 200 })
    } catch (err: any) {
      console.error('Database query error:', err)
      return NextResponse.json({ error: 'Database query failed: ' + err.message }, { status: 500 })
    }
  } catch (error: any) {
    console.error('Unexpected error in sellerProducts:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    })
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    )
  }
}