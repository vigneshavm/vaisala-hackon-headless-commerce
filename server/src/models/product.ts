import mongoose, { Document, Schema, Types } from "mongoose";

// 1. Define TypeScript interface
export interface IProduct extends Document {
  name: string;
  slug: string;
  description?: string;
  price: number;
  inventory: number;
  category: Types.ObjectId; // Reference to Category
  images?: string[]; // URLs
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define schema
const productSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    inventory: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    images: [{ type: String }],
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// 3. Export model
const ProductModel = mongoose.model<IProduct>("Product", productSchema);
export default ProductModel;
