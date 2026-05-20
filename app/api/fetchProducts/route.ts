import { NextRequest, NextResponse } from 'next/server'
import { supabaseServerAdmin as Server } from "@/lib/supabase/serverAdmin"

export async function GET(request: NextRequest) {
  try {
    // Fetch all products from storeProducts, limit to 4
    const { data: products, error } = await Server
      .from('storeProducts')
      .select('*')
      .limit(4)

    if (error) {
      console.error('Supabase query error:', error)
      throw error
    }

    return NextResponse.json({ data: products }, { status: 200 })
  } catch (err: any) {
    console.error('Database query error:', err)
    return NextResponse.json({ error: 'Database query failed: ' + err.message }, { status: 500 })
  }
}