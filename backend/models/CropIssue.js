const mongoose = require("mongoose");

const cropIssueSchema = new mongoose.Schema({

userId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
},

cropName: {
type: String,
required: true
},

problem: {
type: String,
required: true
},

solution: {
type: String
}

}, { timestamps: true });

module.exports = mongoose.model("CropIssue", cropIssueSchema);