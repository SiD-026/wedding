import mongoose from "mongoose";

const serviceTypeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: "Service Type required"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

export default mongoose.model("serviceType", serviceTypeSchema);