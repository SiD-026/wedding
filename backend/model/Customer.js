import mongoose from "mongoose"


import validator from "validator";

// customer schema for the customer
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        validate: [validator.isEmail, 'Invalid email']
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    phone: {
        type: String,
        unique: true,
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
    joinedAt: {
        type: Date,
        default: Date.now()
    },
    orders: {
        type: Array,
        default: []
    }
})

export default mongoose.model("customer", customerSchema);