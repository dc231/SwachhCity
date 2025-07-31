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

module.exports.getComplaintHistory = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ status: false, message: "No token provided" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({ status: false, message: "Invalid token" });
    } else {
      try {
        const complaints = await Complaint.find({ user: data.id });
        res.status(200).json({ success: true, complaints });
      } catch (error) {
        console.error("Error fetching complaint history:", error);
        res.status(500).json({ success: false, message: "Server error" });
      }
    }
  });
};