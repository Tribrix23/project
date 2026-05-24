import { NextRequest, NextResponse } from 'next/server'
import { supabaseServerAdmin as Server } from "@/lib/supabase/serverAdmin"
import { supabaseServer } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    // Get session to get user ID
    const supabase = await supabaseServer()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Fetch profile data
    const { data: profileData, error: profileError } = await Server
      .from('profiles')
      .select('id, first_name, middle_name, last_name, email, phone')
      .eq('id', userId)
      .single()

    if (profileError) throw profileError

    // Fetch store data
    const { data: storeData, error: storeError } = await Server
      .from('sellerStore')
      .select('*')
      .eq('owner_id', userId)
      .single()

    if (storeError) throw storeError

    return NextResponse.json({ profile: profileData, store: storeData })
  } catch (err: any) {
    console.error('Error fetching seller profile:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to fetch profile data' },
      { status: 500 }
    )
  }
}