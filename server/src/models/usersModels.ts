import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  authId: string; // Auth0/Clerk ID
  email: string;
  password?: string;  
  name: string;
  role: "customer" | "businessAdmin";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    authId: { type: String },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: false },
    role: { type: String, enum: ["customer", "businessAdmin"], default: "customer" }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
