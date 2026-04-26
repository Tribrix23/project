import { NextResponse } from "next/server";
import { supabaseServerAdmin as Server } from "@/lib/supabase/serverAdmin";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await supabaseServer();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: authUser, error: authError } =
    await Server.auth.admin.listUsers();

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  const { data: profiles, error: profileError } =
    await Server.from("profiles").select("*");

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  const profileMap = new Map(profiles.map(p => [p.id, p]));

  let seller = 0;
  let pending = 0;
  let active = 0;
  let inactive = 0;

  const merged = authUser.users.map(user => {
    const profile = profileMap.get(user.id);

    const isActive = Boolean(user.app_metadata?.is_active);
    const status = profile?.sellerStatus;

    if (isActive) active++;
    else inactive++;

    if (status === "SELLER") seller++;
    else if (status === "PENDING") pending++;

    return {
      id: user.id,
      email: user.email,
      isActive,
      sellerStatus: status,
      profile,
    };
  });

  return NextResponse.json({
    users: merged,
    counts: {
      seller,
      pending,
      active,
      inactive,
      total: merged.length,
    },
  });
}