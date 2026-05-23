import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { item_id, type } = body // type: 'increase' | 'decrease'

    if (!item_id || !type) {
      return NextResponse.json({ error: 'item_id and type are required' }, { status: 400 })
    }

    const supabase = await supabaseServer()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 1. Get current cart item quantity
    const { data: cartItem, error: cartError } = await supabase
      .from('cart')
      .select('quantity')
      .eq('user_id', user.id)
      .eq('item_id', item_id)
      .single()

    if (cartError && cartError.code !== 'PGRST116') { // PGRST116 means no rows returned
      console.error('Cart fetch error:', cartError)
      return NextResponse.json({ error: 'Failed to fetch cart item' }, { status: 500 })
    }

    let currentQuantity = cartItem?.quantity ?? 0

    // 2. Get product stock count
    const { data: product, error: productError } = await supabase
      .from('storeProducts')
      .select('count')
      .eq('id', item_id)
      .single()

    if (productError) {
      console.error('Product fetch error:', productError)
      return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
    }

    const stock = product.count ?? 0

    // 3. Compute new quantity based on type
    let newQuantity = currentQuantity
    if (type === 'increase') {
      newQuantity = currentQuantity + 1
    } else if (type === 'decrease') {
      newQuantity = currentQuantity - 1
    }

    // 4. Enforce bounds: between 1 and stock (inclusive)
    if (newQuantity < 1) {
      newQuantity = 1
    }
    if (newQuantity > stock) {
      newQuantity = stock
    }

    // If newQuantity equals currentQuantity, no change needed
    if (newQuantity === currentQuantity) {
      return NextResponse.json({ success: true, quantity: currentQuantity }, { status: 200 })
    }

    // 5. Update cart item quantity
    let result
    if (currentQuantity === 0) {
      // Insert new cart item
      ;({ data: result } = await supabase
        .from('cart')
        .insert({
          user_id: user.id,
          item_id,
          quantity: newQuantity,
        })
        .select()
        .single())
    } else {
      // Update existing
      ;({ data: result } = await supabase
        .from('cart')
        .update({ quantity: newQuantity })
        .eq('user_id', user.id)
        .eq('item_id', item_id)
        .select()
        .single())
    }

    if (result) {
      return NextResponse.json({ success: true, cartItem: result }, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
    }
  } catch (err: any) {
    console.error('action error:', err)
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 })
  }
}