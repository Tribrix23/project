import { NextResponse } from "next/server";
import { setUserRole } from "@/lib/set-role";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const userId = body.userId;

        if (!userId) {
            return NextResponse.json(
                { error: 'userId is required' },
                { status: 400 }
            );
        }

        const result = await setUserRole(userId);
        return NextResponse.json(result);
    } catch (err: unknown) {
        const error = err as Error;
        console.error('set-role route error:', error.message);
        return NextResponse.json(
            { error: error.message || 'Server error' },
            { status: 500 }
        );
    }
}