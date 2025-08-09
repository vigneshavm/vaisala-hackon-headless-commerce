import mongoose, { Document, Schema, Types } from "mongoose";

// 1. Define TypeScript interface
export interface IUser extends Document {
  authId?: string; // From Auth0/Clerk
  email: string;
  fullName?: string;
  role: "customer" | "businessAdmin";
  profile?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define schema
const userSchema: Schema<IUser> = new Schema(
  {
    authId: { type: String },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    fullName: { type: String, trim: true },
    role: {
      type: String,
      enum: ["customer", "businessAdmin"],
      default: "customer",
    },
    profile: { type: Schema.Types.ObjectId, ref: "Profile" },
  },
  { timestamps: true }
);

// 3. Export model
const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
