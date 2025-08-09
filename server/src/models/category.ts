import mongoose, { Document, Schema } from "mongoose";

// 1. Define TypeScript interface
export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define schema
const categorySchema: Schema<ICategory> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

// 3. Export model
const CategoryModel = mongoose.model<ICategory>("Category", categorySchema);
export default CategoryModel;
