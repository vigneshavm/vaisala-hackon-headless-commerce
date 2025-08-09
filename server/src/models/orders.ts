import mongoose, { Document, Schema, Types } from "mongoose";

// 1. Define TypeScript interface
export interface IOrderItem {
  product: Types.ObjectId; // Reference to Product
  quantity: number;
  price: number; // Price at purchase time
}

export interface IOrder extends Document {
  orderNumber: string;
  user: Types.ObjectId; // Reference to User
  items: IOrderItem[];
  totalAmount: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  payment?: Types.ObjectId; // Reference to Payment
  tracking?: Types.ObjectId; // Reference to Tracking
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define schema
const orderSchema: Schema<IOrder> = new Schema(
  {
    orderNumber: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    payment: { type: Schema.Types.ObjectId, ref: "Payment" },
    tracking: { type: Schema.Types.ObjectId, ref: "Tracking" },
  },
  { timestamps: true }
);

// 3. Export model
const OrderModel = mongoose.model<IOrder>("Order", orderSchema);
export default OrderModel;
