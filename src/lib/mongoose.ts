import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
let isConnected = false;

export async function connectToDB() {
  if (isConnected) return;
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  isConnected = true;
  console.log("✅ MongoDB connected");
}
