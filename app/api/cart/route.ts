import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await supabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 1. Get cart rows for this user
    const { data: cartRows, error: cartError } = await supabase
      .from('cart')
      .select('*')
      .eq('user_id', user.id)

    if (cartError) {
      console.error('Cart query error:', cartError)
      return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
    }

    if (!cartRows || cartRows.length === 0) {
      return NextResponse.json({ data: [] }, { status: 200 })
    }

    // 2. Extract item_ids and look up each product in storeProducts
    const itemIds = cartRows.map(row => row.item_id)

     const { data: products, error: productsError } = await supabase
       .from('storeProducts')
       .select('id, productName, category, price, image_url, count')
       .in('id', itemIds)

    if (productsError) {
      console.error('Products query error:', productsError)
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }

    // 3. Map product data with cart quantity to return as CartItem[]
    const productMap = new Map(products?.map(p => [p.id, p]))

     const cartItems = cartRows.map(cartRow => {
       const product = productMap.get(cartRow.item_id)
       return {
         id: cartRow.item_id,
         name: product?.productName ?? 'Unknown Product',
         category: product?.category ?? '',
         price: product?.price ?? 0,
         quantity: cartRow.quantity,
         image: product?.image_url ?? '',
         count: product?.count ?? 0,
       }
     })

    return NextResponse.json({ data: cartItems }, { status: 200 })
  } catch (err: any) {
    console.error('Unexpected error in cart route:', err)
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 })
  }
}
