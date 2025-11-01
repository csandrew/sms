import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["ride_payment", "owner_earnings", "refund", "wallet_topup", "platform_fee"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    rental: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rental",
    },
    description: String,
    metadata: mongoose.Schema.Types.Mixed,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

// Index for faster queries
transactionSchema.index({ user: 1, createdAt: -1 })
transactionSchema.index({ type: 1 })
transactionSchema.index({ status: 1 })

export default mongoose.model("Transaction", transactionSchema)
