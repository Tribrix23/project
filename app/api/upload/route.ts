import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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
// SUPABASE CLIENT (SERVER COMPONENT)
// --------------------
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only
);

// --------------------
// ROUTE
// --------------------
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // --------------------
    // 1. GET USER FROM AUTH
    // --------------------
    const authHeader = req.headers.get("Authorization");
    let user = null;

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser(token);
      if (!authError && authUser) {
        user = authUser;
      }
    }

    if (!user) {
      const cookieStore = await cookies();
      const supabaseToken = cookieStore.get("sb-access-token")?.value;
      if (supabaseToken) {
        const { data: { user: cookieUser }, error: cookieError } = await supabase.auth.getUser(supabaseToken);
        if (!cookieError && cookieUser) {
          user = cookieUser;
        }
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user_id = user.id;

    // --------------------
    // 2. CHECK EXISTING UPLOAD (1 WEEK LIMIT)
    // --------------------
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { data: existingUpload } = await supabase
      .from("uploads")
      .select("created_at")
      .eq("user_id", user_id)
      .gte("created_at", oneWeekAgo.toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (existingUpload) {
      return NextResponse.json(
        { error: "Profile picture can only be changed once a week" },
        { status: 429 }
      );
    }

    // --------------------
    // 3. PREP FILE
    // --------------------
    const buffer = Buffer.from(await file.arrayBuffer());

    const fileKey = `uploads/${user_id}/${crypto.randomUUID()}-${file.name}`;

    // --------------------
    // 4. UPLOAD TO R2
    // --------------------
    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: fileKey,
        Body: buffer,
        ContentType: file.type,
      })
    );

    // --------------------
    // 4. SAVE TO SUPABASE
    // --------------------
    const { data, error } = await supabase.from("uploads").insert({
      user_id,
      file_key: fileKey,
      file_name: file.name,
      mime_type: file.type,
      size: file.size,
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "DB insert failed" },
        { status: 500 }
      );
    }

    // --------------------
    // 5. RETURN RESPONSE
    // --------------------
    return NextResponse.json({
      success: true,
      file_key: fileKey,
      data,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}