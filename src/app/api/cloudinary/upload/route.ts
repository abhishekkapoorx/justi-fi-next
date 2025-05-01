// File: src/app/api/upload/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";  

export async function POST(request: NextRequest) {
  try {
  
    const formData = await request.formData();
    const fileField = formData.get("file");
    if (!fileField || !(fileField instanceof Blob)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 2) Convert the Blob into a Buffer
    const arrayBuffer = await fileField.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3) Stream that buffer into Cloudinary
    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "justifi_docs" },
        (err, res) => {
          if (err) return reject(err);
          resolve(res);
        }
      );
      // pipe our Buffer into the upload stream
      Readable.from(buffer).pipe(uploadStream);
    });

    // 4) Return the IDs & URL back to the client
    return NextResponse.json(
      {
        publicId:  result.public_id,
        secureUrl: result.secure_url,
        format:    result.format,
        width:     result.width,
        height:    result.height,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Cloudinary upload failed:", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
