import mongoose, { Document, Schema, Types } from "mongoose";

// 1. Define TypeScript interface
export interface IAddress extends Document {
  user: Types.ObjectId; // Reference to User
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define schema
const addressSchema: Schema<IAddress> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

// 3. Export model
const AddressModel = mongoose.model<IAddress>("Address", addressSchema);
export default AddressModel;
