import { NextResponse } from "next/server";
import { supabaseServerAdmin as Server } from "@/lib/supabase/serverAdmin";
import { supabaseServer } from "@/lib/supabase/server";
import redis from "@/lib/redis";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || '';
  const skip = (page - 1) * limit;

  const supabase = await supabaseServer();

  const { data: { user } } = await supabase.auth.getUser();

  // Try cache first (cache full merged dataset)
  const cacheKey = 'users:full';
  const cached = await redis.get<string>(cacheKey);

  let authUser: { users: any[] };
  let profiles: any[];

  if (cached) {
    const { authUsers, profiles: cachedProfiles } = JSON.parse(cached);
    authUser = { users: authUsers };
    profiles = cachedProfiles;
  } else {
    const { data: authUserData, error: authError } =
      await Server.auth.admin.listUsers();

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }

    const { data: profilesData, error: profileError } =
      await Server.from("profiles").select("*");

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    authUser = authUserData;
    profiles = profilesData;

    // Cache for 5 minutes. Invalidate in user create/update/delete endpoints via redis.del('users:full')
    await redis.setex(
      cacheKey,
      300,
      JSON.stringify({ authUsers: authUser.users, profiles })
    );
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

  let filtered = merged;
  if (search.trim()) {
    const query = search.toLowerCase().trim();
    filtered = merged.filter(user => {
      const email = (user.email || '').toLowerCase();
      const firstName = (user.profile?.first_name || '').toLowerCase();
      const middleName = (user.profile?.middle_name || '').toLowerCase();
      const lastName = (user.profile?.last_name || '').toLowerCase();
      const fullName = `${firstName} ${middleName} ${lastName}`.trim();

      return email.includes(query) || fullName.includes(query);
    });
  }

  // Apply status filter if provided
  if (statusFilter.trim()) {
    filtered = filtered.filter(user => user.sellerStatus === statusFilter.toUpperCase());
  }

  let filteredActive = 0;
  let filteredInactive = 0;
  let filteredSeller = 0;
  let filteredPending = 0;

  filtered.forEach(user => {
    if (user.isActive) filteredActive++;
    else filteredInactive++;
    if (user.sellerStatus === "SELLER") filteredSeller++;
    else if (user.sellerStatus === "PENDING") filteredPending++;
  });

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const paginatedUsers = filtered.slice(skip, skip + limit);

  return NextResponse.json({
    users: paginatedUsers,
    counts: {
      seller: filteredSeller,
      pending: filteredPending,
      active: filteredActive,
      inactive: filteredInactive,
      total,
    },
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  });
}