import { NextResponse } from "next/server";
import { supabaseServerAdmin as Server } from "@/lib/supabase/serverAdmin";
import { supabaseServer } from "@/lib/supabase/server";
export async function GET() {
  const supabase = await supabaseServer();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  const merged = authUser.users.map(user => {
    const profile = profileMap.get(user.id);

    return {
      id: user.id,
      email: user.email,
      isActive: user.app_metadata.is_active,
      profile,
    };
  });

  return NextResponse.json(merged);
}