import { supabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const supabase = await supabaseServer();
    const body = await req.json();
    const {
      province,
      city,
      barangay,
      street,
      blkLot,
      zipcode,
    } = body;

    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to save an address" },
        { status: 401 }
      );
    }

    // Validate required fields
    if (!province || !city || !barangay) {
      return NextResponse.json(
        { error: "Please complete province, city, and barangay" },
        { status: 400 }
      );
    }

    // Insert address into database
    const { data, error } = await supabase
      .from("Adress")
      .insert({
        user_id: user.id,
        province,
        city,
        barangay,
        street,
        lot: blkLot,
        zip: zipcode,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err: any) {
    console.error("Error saving address:", err);
    return NextResponse.json(
      { error: err.message || "Failed to save address" },
      { status: 500 }
    );
  }
}