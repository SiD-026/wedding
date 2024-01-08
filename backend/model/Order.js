import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
 
  vendorId: {
    type: mongoose.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  customerId: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  serviceId: {
    type: mongoose.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid",
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  details : {
    type : [],
    default: []
  },
  price: {
    type: Number,
    required: "Price is required"
},
});

export default mongoose.model("orders", orderSchema);
