import mongoose, { Document, Schema, Types } from "mongoose";

// 1. Define TypeScript interface
export interface IPayment extends Document {
  order: Types.ObjectId; // Reference to Order
  method: "creditCard" | "debitCard" | "upi" | "netBanking" | "wallet";
  transactionId?: string;
  status: "pending" | "success" | "failed";
  amount: number;
  currency: string;
  paidAt?: Date;
  createdAt?: Date;
}

// 2. Define schema
const paymentSchema: Schema<IPayment> = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    method: {
      type: String,
      enum: ["creditCard", "debitCard", "upi", "netBanking", "wallet"],
      required: true,
    },
    transactionId: { type: String },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    paidAt: { type: Date },
  },
  { timestamps: { createdAt: true, updatedAt: false } } // Only createdAt
);

// 3. Export model
const PaymentModel = mongoose.model<IPayment>("Payment", paymentSchema);
export default PaymentModel;
