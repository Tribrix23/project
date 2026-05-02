import { NextResponse } from "next/server";
import { supabaseServerAdmin as Server } from "@/lib/supabase/serverAdmin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const { data: sellerStore, error } = await Server
      .from("sellerStore")
      .select("*")
      .eq("owner_id", userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: "Seller store not found" }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: profile } = await Server
      .from("profiles")
      .select("first_name, middle_name, last_name, email, phone")
      .eq("id", userId)
      .single();

    return NextResponse.json({ sellerStore, profile });
  } catch (err: any) {
    console.error("Error fetching seller store:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch seller store" }, { status: 500 });
  }
}