import { NextResponse } from "next/server";
import { supabaseServerAdmin as Server } from "@/lib/supabase/serverAdmin";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await supabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: sellerStore, error: storeError } = await Server
      .from("sellerStore")
      .select("*")
      .eq("owner_id", user.id)
      .single();

    if (storeError) {
      if (storeError.code === 'PGRST116') {
        return NextResponse.json({ error: "Seller store not found" }, { status: 404 });
      }
      return NextResponse.json({ error: storeError.message }, { status: 500 });
    }

    const { data: profile } = await Server
      .from("profiles")
      .select("first_name, middle_name, last_name, phone, email")
      .eq("id", user.id)
      .single();

    return NextResponse.json({ sellerStore, profile });
  } catch (err) {
    console.error("Error fetching store:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to fetch store";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
