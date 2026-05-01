import { supabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const supabase = await supabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to delete an address" },
        { status: 401 }
      );
    }

    // Get address ID from URL search params
    const { searchParams } = new URL(req.url);
    const addressId = searchParams.get("id");

    if (!addressId) {
      return NextResponse.json(
        { error: "Address ID is required" },
        { status: 400 }
      );
    }

    // Delete the address, ensuring it belongs to the user
    const { error } = await supabase
      .from("Adress")
      .delete()
      .eq("id", addressId)
      .eq("user_id", user.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error deleting address:", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete address" },
      { status: 500 }
    );
  }
}
