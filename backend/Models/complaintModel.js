const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    wastetype: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: "Pending",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model("Complaint", complaintSchema);