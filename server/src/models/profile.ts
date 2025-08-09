import mongoose, { Document, Schema, Types } from "mongoose";

// 1. Define TypeScript interface
export interface IProfile extends Document {
  user: Types.ObjectId; // Reference to User
  phoneNumber?: string;
  addresses?: Types.ObjectId[]; // References to Address
  profileImage?: string; // URL
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define schema
const profileSchema: Schema<IProfile> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    phoneNumber: { type: String },
    addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    profileImage: { type: String },
  },
  { timestamps: true }
);

// 3. Export model
const ProfileModel = mongoose.model<IProfile>("Profile", profileSchema);
export default ProfileModel;
