import { NextResponse } from "next/server";
import { supabaseServerAdmin as Server } from "@/lib/supabase/serverAdmin";

export async function POST(req: Request) {
  try {
    const { userId, action } = await req.json();

    if (!userId || !action) {
      return NextResponse.json(
        { error: "userId and action are required" },
        { status: 400 }
      );
    }

    if (action !== "approve" && action !== "reject") {
      return NextResponse.json(
        { error: "action must be 'approve' or 'reject'" },
        { status: 400 }
      );
    }

    const { data: profile, error: profileError } = await Server
      .from("profiles")
      .update({ sellerStatus: action === "approve" ? "SELLER" : "BUYER" })
      .eq("id", userId)
      .select()
      .single();

    if (profileError) throw profileError;

    await Server
      .from("sellerStore")
      .update({ status: action === "approve" ? "APPROVED" : "REJECTED" })
      .eq("owner_id", userId);

    const status = action === "approve" ? "APPROVED" : "REJECTED";

    return NextResponse.json({ success: true, profile, status });
  } catch (err: any) {
    console.error("Error updating seller status:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update seller status" },
      { status: 500 }
    );
  }
}