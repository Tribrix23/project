import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  const { data: authUser, error: authError } =
    await supabaseServer.auth.admin.listUsers();

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  const { data: profiles, error: profileError } =
    await supabaseServer.from("profiles").select("*");

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  const profileMap = new Map(profiles.map(p => [p.id, p]));

  const merged = authUser.users.map(user => {
    const profile = profileMap.get(user.id);

    return {
      id: user.id,
      email: user.email,
      profile,
      avatarUrl: `/api/avatar?userId=${user.id}`,
    };
  });

  return NextResponse.json(merged);
}