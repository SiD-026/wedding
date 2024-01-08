import mongoose from "mongoose";

import validator from "validator";

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required",
  },
  email: {
    type: String,
    unique: true,
    required: "Email is required",
    validate: [validator.isEmail, "Invalid email"],
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  phone: {
    type: Number,
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: String,
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
});

export default mongoose.model("vendor", vendorSchema);
