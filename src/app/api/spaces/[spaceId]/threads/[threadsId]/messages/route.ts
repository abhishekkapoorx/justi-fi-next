// src/app/api/spaces/[spaceId]/threads/[threadId]/messages/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoose";
import Thread from "@/models/threads.model";
import { Space } from "@/models/spaces.model";
import User from "@/models/user.model";
import Message from "@/models/message.model";
import axios from "axios";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: { spaceId: string; threadId: string } }
) {
  const { spaceId, threadId } = params;
  console.log("[messages] 🔔 GET messages for thread:", threadId);

  // 1) Auth check
  const { userId: clerkId } = getAuth(req);
  if (!clerkId) {
    console.warn("[messages] 🚫 Unauthorized");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2) Connect
  await connectToDB();

  // 3) Verify user exists
  const user = await User.findOne({ clerkId });
  if (!user) {
    console.warn("[messages] ⚠️ User not found for clerkId:", clerkId);
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // 4) Verify space ownership
  const space = await Space.findOne({ _id: spaceId, owner: user._id });
  if (!space) {
    console.warn("[messages] ⚠️ Space not found or not owned by user:", spaceId);
    return NextResponse.json({ error: "Space not found" }, { status: 404 });
  }

  // 5) Verify thread belongs to space
  const thread = await Thread.findOne({ _id: threadId, space: space._id });
  if (!thread) {
    console.warn("[messages] ⚠️ Thread not found in space:", threadId);
    return NextResponse.json({ error: "Thread not found" }, { status: 404 });
  }

  // 6) Fetch messages from the separate collection
  const messages = await Message.find({ thread: thread._id })
    .sort({ createdAt: 1 })
    .lean();
  return NextResponse.json(messages, { status: 200 });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { spaceId: string; threadId: string } }
) {
  const { spaceId, threadId } = params;
  console.log("[messages] 🔔 POST new message to thread:", threadId);

  // 1) Auth check
  const { userId: clerkId } = getAuth(req);
  if (!clerkId) {
    console.warn("[messages] 🚫 Unauthorized");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2) Parse request body
  const { content, role = "user" } = await req.json();
  if (!content?.trim()) {
    return NextResponse.json({ error: "Message content is required" }, { status: 400 });
  }
  if (!["user", "agent"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  // 3) Connect
  await connectToDB();

  // 4) Verify user
  const user = await User.findOne({ clerkId });
  if (!user) {
    console.warn("[messages] ⚠️ User not found for clerkId:", clerkId);
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // 5) Verify space
  const space = await Space.findOne({ _id: spaceId, owner: user._id });
  if (!space) {
    console.warn("[messages] ⚠️ Space not found or not owned by user:", spaceId);
    return NextResponse.json({ error: "Space not found" }, { status: 404 });
  }

  // 6) Verify thread
  const thread = await Thread.findOne({ _id: threadId, space: space._id });
  if (!thread) {
    console.warn("[messages] ⚠️ Thread not found in space:", threadId);
    return NextResponse.json({ error: "Thread not found" }, { status: 404 });
  }

  // 7) Create the message in its own collection
  const newMessage = await Message.create({
    thread:  thread._id,
    space:   space._id,
    sender:  user._id,
    role,
    content: content.trim(),
  });

  // talk with llm 

  // Make API call to insights endpoint to get agent response
  let agentResponse = null;
  
  if (role === "user") {

    
    try {
      // Call the insights route to get the AI response
      const insightResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/spaces/${spaceId}/insights`);
      
      if (insightResponse.data) {
        agentResponse = await Message.create({
          thread: thread._id,
          space: space._id,
          sender: user._id,
          role: "agent",
          content: insightResponse.data.result || "I'm sorry, I couldn't generate a response at this time.",
        });
      }
    } catch (error) {
      console.error("[messages] ⚠️ Error fetching agent response:", error);
      // Create a fallback agent response in case of error
      agentResponse = await Message.create({
        thread: thread._id,
        space: space._id,
        sender: user._id,
        role: "agent",
        content: "I'm sorry, I encountered an error while processing your request.",
      });
    }
  }

  console.log("[messages] 🎉 Created message:", newMessage._id);
  return NextResponse.json({ 
    userMessage: newMessage, 
    agentResponse 
  }, { status: 201 });
}
