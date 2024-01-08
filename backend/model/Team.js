import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  // members: {
  //     type: Array,
  //     default: []
  // }
  name: {
    type: String,
    required: "Name is required",
  },
  designation: {
    type: String,
    required: "Designation is required",
  },
  image: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.kindpng.com%2Fimgv%2FioJmwwJ_dummy-profile-image-jpg-hd-png-download%2F&psig=AOvVaw1zzG0-h8u68urS_2u1pdnX&ust=1672917923303000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPjilITnrfwCFQAAAAAdAAAAABAE",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("team", teamSchema);
