// models/User.ts

import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
  clerkId: string;      // Clerk’s user.id
  email: string;        // Primary email address
  firstName?: string;   // event.data.first_name
  lastName?: string;    // event.data.last_name
  username?: string;    // event.data.username
  imageUrl?: string;    // event.data.image_url
  createdAt: Date;      // when this record was created in your DB
  updatedAt: Date;      // when this record was last updated in your DB
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    firstName: { type: String, default: "" },
    lastName:  { type: String, default: "" },
    username:  { type: String, default: "" },
    imageUrl:  { type: String, default: "" },
  },
  {
    timestamps: true, // auto-manages createdAt & updatedAt
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
