const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    location: {
        type: String,
        default: "Punjab"
    },

    cropType: {
        type: String,
        default: "Wheat"
    }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);