import { supabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const supabase = await supabaseServer();
    const body = await req.json();
    const {
      storeName,
      storeDescription,
      businessType,
      province,
      city,
      barangay,
      street,
      zipcode,
    } = body;

    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to apply" },
        { status: 401 }
      );
    }

    // Validate required fields
    if (!storeName || !storeDescription || !businessType) {
      return NextResponse.json(
        { error: "Store name, description, and business type are required" },
        { status: 400 }
      );
    }


    // Insert seller application into database
    const { data, error } = await supabase
      .from("sellerStore")
      .insert({
        owner_id: user.id,
        name: storeName,
        description: storeDescription,
        business_type: businessType,
        province,
        city,
        barangay,
        street,
        zipcode,
        status: 'PENDING',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err: any) {
    console.error("Error submitting seller application:", err);
    return NextResponse.json(
      { error: err.message || "Failed to submit application" },
      { status: 500 }
    );
  }
}
