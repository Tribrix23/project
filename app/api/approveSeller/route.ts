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

    if (action === "approve") {
      const { data: profile, error: profileError } = await Server
        .from("profiles")
        .update({ sellerStatus: "SELLER" })
        .eq("id", userId)
        .select()
        .single();

      if (profileError) throw profileError;

      await Server
        .from("sellerStore")
        .update({ 
          status: "APPROVED",
          date_approved: new Date().toISOString()
        })
        .eq("owner_id", userId);

      const status = "APPROVED";
      return NextResponse.json({ success: true, profile, status });
     } else {
       const { data: profile, error: profileError } = await Server
         .from("profiles")
         .update({ sellerStatus: "BUYER" })
         .eq("id", userId)
         .select()
         .single();

      if (profileError) throw profileError;

      await Server
        .from("sellerStore")
        .update({ 
          status: "REJECTED",
          date_rejected: new Date().toISOString()
        })
        .eq("owner_id", userId);

      const status = "REJECTED";
      return NextResponse.json({ success: true, profile, status });
    }
  } catch (err: any) {
    console.error("Error updating seller status:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update seller status" },
      { status: 500 }
    );
  }
}