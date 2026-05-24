import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

function generateTrackId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const segments = Array.from({ length: 3 }, () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  )
  return `${segments[0]}-${segments[1]}-${segments[2]}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, user_id, address, total } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Items are required' }, { status: 400 })
    }
    if (!total || total < 0) {
      return NextResponse.json({ error: 'Total is required' }, { status: 400 })
    }

    const supabase = await supabaseServer()

    let userId = user_id
    if (!userId) {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      userId = user.id
    }

    const trackId = generateTrackId()
    while (true) {
      const { data: existing } = await supabase
        .from('orders')
        .select('track_id')
        .eq('track_id', trackId)
        .single()
      if (!existing) break
    }

    const itemsJson = items.map((item: { id: number; name: string; category: string; price: number; quantity: number; image: string }) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }))

    const { error } = await supabase
      .from('orders')
      .insert({
        track_id: trackId,
        user_id: userId,
        payment: 'cod',
        items: itemsJson,
        total,
        isPaid: false,
        status: 'Order Placed',
        shipping_address: address ?? null,
      })
      .select()
      .single()

    if (error) {
      console.error('Order insert error:', error)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Decrement product counts in storeProducts (only after successful order creation)
    const productUpdates = items
      .filter(item => item.id)
      .map(async (item) => {
        const { data: product } = await supabase
          .from('storeProducts')
          .select('count')
          .eq('id', item.id)
          .single()
        
        if (product) {
          const newCount = Math.max(0, (product.count || 0) - item.quantity)
          await supabase
            .from('storeProducts')
            .update({ count: newCount })
            .eq('id', item.id)
        }
      })
    
    await Promise.all(productUpdates)

    // Delete cart items that were ordered (only after successful order creation)
    const itemIds = items.map(item => item.id).filter(Boolean)
    if (userId && itemIds.length > 0) {
      await supabase
        .from('cart')
        .delete()
        .eq('user_id', userId)
        .in('item_id', itemIds)
    }

    return NextResponse.json({ success: true, track_id: trackId }, { status: 201 })
  } catch (err: unknown) {
    console.error('setOrders error:', err)
    return NextResponse.json({ error: 'Server error', details: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}
