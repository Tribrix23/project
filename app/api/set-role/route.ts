import { NextResponse } from "next/server";
import { supabaseServerAdmin as supabaseServer } from "@/lib/supabase/serverAdmin";

export async function POST(req: Request) {
    try {

        const body = await req.json();
        const userId = body.userId;

        if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    const role = 'user'

    let userData;
    try {
      const result = await supabaseServer.auth.admin.getUserById(userId);
      userData = result.data;
    } catch (err: unknown) {
      const error = err as Error;
      console.error('getUserById threw:', error.message);
      return NextResponse.json(
        { error: 'Failed to fetch user', details: error.message },
        { status: 500 }
      )
    }

    if (!userData?.user) {
      return NextResponse.json(
        { error: 'User not found - may need to confirm email first' },
        { status: 404 }
      )
    }

    const meta = userData.user.app_metadata || {}

    const newMeta = {
        ...meta,
        role,
        is_active: true,
    }

    let updateResult;
    try {
      updateResult = await supabaseServer.auth.admin.updateUserById(userId, {
        app_metadata: newMeta,
      })
    } catch (err: unknown) {
      const error = err as Error;
      console.error('updateUserById threw:', error.message);
      return NextResponse.json(
        { error: 'Failed to update user', details: error.message },
        { status: 500 }
      )
    }

    const { error: updateError } = updateResult

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: 'Role updated' })
    
    } catch (err: unknown) {
      const error = err as Error;
      console.error('set-role route error:', error.message);
      return NextResponse.json(
            { error: error.message || 'Server error' },
            { status: 500 }
        )
    }
}