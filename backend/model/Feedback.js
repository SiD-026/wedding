import mongoose from "mongoose";

import validator from "validator";

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required",
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Invalid email"],
    required: "Email is required",
  },
  subject: {
    type: String,
    requied: "Subject is requird",
  },
  phone: {
    type: Number,
    required: "Phone number is required",
  },
  message: {
    type: String,
    required: "Message is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("feedback", feedbackSchema);
