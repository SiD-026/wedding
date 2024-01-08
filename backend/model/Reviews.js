import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
  brideName: {
    type: String,
    required: "Bride Name is required",
  },
  groomName: {
    type: String,
    required: "Groom Name is required",
  },
  city: {
    type: String,
    requied: "City is requird",
  },
  image: {
    type: String,
    // default:
    //   "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.kindpng.com%2Fimgv%2FioJmwwJ_dummy-profile-image-jpg-hd-png-download%2F&psig=AOvVaw1zzG0-h8u68urS_2u1pdnX&ust=1672917923303000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPjilITnrfwCFQAAAAAdAAAAABAE",
  },
  comments: {
    type: String,
    required: "Comments is required",
  },
  status: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("reviews", reviewsSchema);
