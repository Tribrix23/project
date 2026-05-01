import { supabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await supabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to view addresses" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("Adress")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ addresses: data || [] });
  } catch (err: any) {
    console.error("Error fetching addresses:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch addresses" },
      { status: 500 }
    );
  }
}
