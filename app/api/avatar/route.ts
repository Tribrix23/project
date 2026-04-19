import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// --------------------
// R2 CLIENT
// --------------------
const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

// --------------------
// SUPABASE
// --------------------
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// --------------------
// GET AVATAR
// --------------------
export async function GET(req: Request) {
  try {
    // --------------------
    // 1. AUTH USER
    // --------------------
    let user = null;

    const authHeader = req.headers.get("Authorization");

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      const { data: { user: authUser } } = await supabase.auth.getUser(token);
      user = authUser;
    }

    if (!user) {
      const cookieStore = await cookies();
      const token = cookieStore.get("sb-access-token")?.value;

      if (token) {
        const { data: { user: cookieUser } } = await supabase.auth.getUser(token);
        user = cookieUser;
      }
    }

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // --------------------
    // 2. GET FILE KEY FROM DB
    // (latest upload as avatar)
    // --------------------
    const { data, error } = await supabase
      .from("uploads")
      .select("file_key, mime_type")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "No avatar found" }, { status: 404 });
    }

    // --------------------
    // 3. FETCH FROM R2
    // --------------------
    const object = await r2.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: data.file_key,
      })
    );

    if (!object.Body) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // --------------------
    // 4. RETURN STREAM
    // --------------------
    return new NextResponse(object.Body as any, {
      headers: {
        "Content-Type": data.mime_type,
        "Cache-Control": "private, max-age=3600",
      },
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load avatar" }, { status: 500 });
  }
}