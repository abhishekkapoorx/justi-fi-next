import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoose";
import Thread, { IMessage } from "@/models/threads.model";
import { Space } from "@/models/spaces.model";
import User from "@/models/user.model";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: { spaceId: string; threadId: string } }
) {
  console.log("[messages] 🔔 GET messages for thread:", params.threadId);
  const { userId: clerkId } = getAuth(req);
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDB();
  
  // Verify user
  const user = await User.findOne({ clerkId });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Verify space
  const space = await Space.findOne({ _id: params.spaceId, owner: user._id });
  if (!space) return NextResponse.json({ error: "Space not found" }, { status: 404 });

  // Verify thread belongs to space
  const thread = await Thread.findOne({ 
    _id: params.threadId, 
    space: space._id 
  });
  
  if (!thread) return NextResponse.json({ error: "Thread not found" }, { status: 404 });

  return NextResponse.json(thread.messages, { status: 200 });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { spaceId: string; threadId: string } }
) {
  console.log("[messages] 🔔 POST new message to thread:", params.threadId);
  const { userId: clerkId } = getAuth(req);
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { content, role = "user" } = await req.json();
  if (!content || !content.trim()) {
    return NextResponse.json({ error: "Message content is required" }, { status: 400 });
  }

  if (role !== "user" && role !== "agent") {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  await connectToDB();
  const user = await User.findOne({ clerkId });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const space = await Space.findOne({ _id: params.spaceId, owner: user._id });
  if (!space) return NextResponse.json({ error: "Space not found" }, { status: 404 });

  const thread = await Thread.findOne({ 
    _id: params.threadId, 
    space: space._id 
  });
  
  if (!thread) return NextResponse.json({ error: "Thread not found" }, { status: 404 });

  // Create new message
  const newMessage: IMessage = {
    role,
    content: content.trim(),
    createdAt: new Date()
  };

  // Add message to thread
  thread.messages.push(newMessage);
  await thread.save();

  return NextResponse.json(newMessage, { status: 201 });
}