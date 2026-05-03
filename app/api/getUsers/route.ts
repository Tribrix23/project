import { NextResponse } from "next/server";
import { supabaseServerAdmin as Server } from "@/lib/supabase/serverAdmin";
import redis from "@/lib/redis";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || '';
  const skip = (page - 1) * limit;

   // Try cache first (cache full merged dataset)
   const cacheKey = 'users:full';
   let cached: string | null = null;
   try {
     const raw = await redis.get<string>(cacheKey);
     cached = typeof raw === 'string' ? raw : (raw ? String(raw) : null);
   } catch (err) {
     console.error('Redis get error:', err);
     // Continue without cache
   }

   let authUser: { users: Array<{ id: string; email: string; app_metadata: Record<string, any> }> } = { users: [] };
   let profiles: Array<{ id: string; sellerStatus: string; first_name?: string; middle_name?: string; last_name?: string }> = [];

   if (cached) {
     // Handle corrupted cache value that is the string "[object Object]"
     const trimmed = cached.trim();
     if (trimmed === '[object Object]') {
       console.warn('Cache corrupted: got [object Object] string, treating as cache miss');
       cached = null;
     } else {
       try {
         const parsed = JSON.parse(cached);
         authUser = { users: parsed.authUsers };
         profiles = parsed.profiles;
       } catch (err) {
         console.error('Cache parse error:', err);
         cached = null;
       }
     }
   }
   
   if (!cached) {
    let authUserData: Array<{ id: string; email: string; app_metadata: Record<string, any> }>;
    let profilesData: Array<{ id: string; sellerStatus: string; first_name?: string; middle_name?: string; last_name?: string }>;
    
     try {
       const { data: authResponse, error: authError } = await Server.auth.admin.listUsers();
       if (authError) {
         return NextResponse.json({ error: authError.message }, { status: 500 });
       }
       // Map Supabase user to our expected shape, ensuring email is a string
       const usersList = authResponse?.users || [];
       authUserData = usersList.map((user: any) => ({
         id: user.id,
         email: user.email ?? '',
         app_metadata: user.app_metadata || {},
       }));
     } catch (err) {
       console.error('Supabase listUsers error:', err);
       const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users';
       return NextResponse.json({ error: errorMessage }, { status: 500 });
     }

    try {
      const { data, error: profileError } = await Server.from("profiles").select("*");
      if (profileError) {
        return NextResponse.json({ error: profileError.message }, { status: 500 });
      }
      profilesData = data;
     } catch (err) {
       console.error('Supabase profiles error:', err);
       const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profiles';
       return NextResponse.json({ error: errorMessage }, { status: 500 });
     }

    authUser = { users: authUserData };
    profiles = profilesData;

    // Cache for 5 minutes. Invalidate in user create/update/delete endpoints via redis.del('users:full')
    try {
      await redis.setex(
        cacheKey,
        300,
        JSON.stringify({ authUsers: authUser.users, profiles })
      );
    } catch (err) {
      console.error('Redis setex error:', err);
      // Continue without caching
    }
  }

  const profileMap = new Map(profiles.map(p => [p.id, p]));

  const merged = authUser.users.map(user => {
    const profile = profileMap.get(user.id);

    const isActive = Boolean(user.app_metadata?.is_active);
    const status = profile?.sellerStatus;

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

  const counts = filtered.reduce((acc, user) => {
    if (user.isActive) acc.active++;
    else acc.inactive++;
    if (user.sellerStatus === "SELLER") acc.seller++;
    else if (user.sellerStatus === "PENDING") acc.pending++;
    return acc;
  }, { seller: 0, pending: 0, active: 0, inactive: 0 });

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const paginatedUsers = filtered.slice(skip, skip + limit);

  return NextResponse.json({
    users: paginatedUsers,
    counts: {
      ...counts,
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