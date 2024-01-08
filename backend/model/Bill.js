import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid",
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "card", "upi"],
    default: "card",
  },
  serviceName: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Bill", BillSchema);
