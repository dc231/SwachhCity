const Complaint = require("../Models/complaintModel");
const User = require('../Models/userModel');
const jwt = require("jsonwebtoken");

module.exports.RaiseComplaint = async (req, res) => {
    // I will add logic here later to get the user ID from a token
    try {
        const { wastetype, date, time, address, description, userId } = req.body; // Assume userId is sent for now
        const newComplaint = new Complaint({
            wastetype,
            date,
            time,
            address,
            description,
            user: userId
        });
        await newComplaint.save();
        res.status(201).json({ message: "Complaint raised successfully", success: true });
    } catch (error) {
        console.error("Error raising complaint:", error);
        res.status(500).json({ message: "Error raising complaint", success: false });
    }
};