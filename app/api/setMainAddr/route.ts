import { supabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const supabase = await supabaseServer();
    const body = await req.json();
    const { addressId, isMain } = body;

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to update address" },
        { status: 401 }
      );
    }

    // Update the isMain field for this address
    const { error } = await supabase
      .from("Adress")
      .update({ isMain })
      .eq("id", addressId)
      .eq("user_id", user.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error updating main address:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update address" },
      { status: 500 }
    );
  }
}