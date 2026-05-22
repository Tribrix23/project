import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { item_id, quantity } = body

    if (!item_id) {
      return NextResponse.json({ error: 'item_id is required' }, { status: 400 })
    }

    const qty = typeof quantity === 'number' && quantity > 0 ? quantity : 1

    const supabase = await supabaseServer()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized', cartItem: null }, { status: 401 })
    }

    // Upsert: if (user_id, item_id) row exists, update quantity (add the new qty); else insert new row
    const { data: existing } = await supabase
      .from('cart')
      .select('quantity')
      .eq('user_id', user.id)
      .eq('item_id', item_id)
      .single()

    let result
    if (existing) {
      const newQty = (existing.quantity || 0) + qty
      ;({ data: result } = await supabase
        .from('cart')
        .update({ quantity: newQty })
        .eq('user_id', user.id)
        .eq('item_id', item_id)
        .select()
        .single()
      )
    } else {
      ;({ data: result } = await supabase
        .from('cart')
        .insert({
          user_id: user.id,
          item_id,
          quantity: qty,
        })
        .select()
        .single()
      )
    }

    return NextResponse.json({ success: true, cartItem: result }, { status: 200 })
  } catch (err: any) {
    console.error('addToCart error:', err)
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 })
  }
}
