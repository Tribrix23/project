import { NextResponse } from "next/server";
import { supabaseServerAdmin as Server } from "@/lib/supabase/serverAdmin";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const supabase = await supabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch profile
    const { data: profile } = await Server
      .from("profiles")
      .select("first_name, middle_name, last_name, sellerStatus")
      .eq("id", user.id)
      .single();

    // Check sellerStore status
    const { data: sellerStore } = await Server
      .from("sellerStore")
      .select("status")
      .eq("owner_id", user.id)
      .single();

    return NextResponse.json({
      profile,
      sellerStore
    });
  } catch (err: any) {
    console.error("Error fetching user data:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
