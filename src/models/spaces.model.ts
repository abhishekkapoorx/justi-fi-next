import mongoose, { Document, Schema, Model, Types } from "mongoose";

export interface ISpace extends Document {
  spaceName: string;
  owner: Types.ObjectId;          
  threads: Types.ObjectId[];      
  documents: Types.ObjectId[];    
  createdAt: Date;
  updatedAt: Date;
}

const SpaceSchema = new Schema<ISpace>(
  {
    spaceName: { type: String, required: true, trim: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    threads: [{ type: Schema.Types.ObjectId, ref: "Thread" }],
    documents: [{ type: Schema.Types.ObjectId, ref: "Document" }],
  },
  { timestamps: true }
);

export const Space: Model<ISpace> =
  mongoose.models.Space || mongoose.model<ISpace>("Space", SpaceSchema);

