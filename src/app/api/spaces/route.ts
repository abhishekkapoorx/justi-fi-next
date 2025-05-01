import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";          // Updated import for auth
import { connectToDB } from "@/lib/mongoose";
import { Space } from "@/models/spaces.model";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  console.log("[spaces] GET received at", new Date().toISOString());
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDB();
  try {
    const spaces = await Space.find({ owner: userId }).sort({ createdAt: -1 });
    return NextResponse.json(spaces, { status: 200 });
  } catch (err) {
    console.error("[spaces] GET error:", err);
    return NextResponse.json({ error: "Failed to fetch spaces" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  console.log("[spaces] POST received at", new Date().toISOString());
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { spaceName?: string };
  try {
    body = await req.json();
  } catch (err) {
    console.warn("[spaces] Invalid JSON body", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { spaceName } = body;
  if (!spaceName || spaceName.trim().length === 0) {
    return NextResponse.json({ error: "spaceName is required" }, { status: 400 });
  }

  await connectToDB();
  try {
    const newSpace = await Space.create({
      spaceName: spaceName.trim(),
      owner:     userId,
      threads:   [],
      documents: [],
    });
    console.log("[spaces] Created space", newSpace._id);
    return NextResponse.json(newSpace, { status: 201 });
  } catch (err) {
    console.error("[spaces] POST error:", err);
    return NextResponse.json({ error: "Failed to create space" }, { status: 500 });
  }
}