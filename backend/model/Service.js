import mongoose from "mongoose";

const serviceShema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is required",
  },
  type: {
    type: String,
    required: "Service Type required",
  },
  price: {
    type: Number,
    required: "Price is required",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  vendorId: {
    type: mongoose.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://picsum.photos/1920/1800",
  },
  description: {
    type: String,
  },
  likes: [{ type: mongoose.Types.ObjectId, ref: "Customer" }],
});

export default mongoose.model("service", serviceShema);
