import { NextResponse } from "next/server"
import { supabaseServerAdmin as Server } from "@/lib/supabase/serverAdmin"
import { supabaseServer } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await supabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: sellerStore, error: storeError } = await Server
      .from("sellerStore")
      .select("id, revenue, sold, orders")
      .eq("owner_id", user.id)
      .single()

    if (storeError) {
      if (storeError.code === 'PGRST116') {
        return NextResponse.json({ error: "Seller store not found" }, { status: 404 })
      }
      return NextResponse.json({ error: storeError.message }, { status: 500 })
    }

    const { count: totalProducts, error: productsError } = await Server
      .from("storeProducts")
      .select("*", { count: "exact", head: true })
      .eq("store_id", sellerStore.id)

    if (productsError) {
      console.error("Products count error:", productsError)
    }

    return NextResponse.json({
      revenue: sellerStore.revenue || 0,
      sold: sellerStore.sold || 0,
      orders: sellerStore.orders || 0,
      totalProducts: totalProducts || 0
    })
  } catch (err) {
    console.error("Error fetching dashboard data:", err)
    const errorMessage = err instanceof Error ? err.message : "Failed to fetch dashboard data"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}