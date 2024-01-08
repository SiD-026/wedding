import mongoose from "mongoose";

const stateCitychema = new mongoose.Schema({
  state: {
    type: String,
  },
  districts: {
    type: [],
  },
});

export default mongoose.model("state-city", stateCitychema);
