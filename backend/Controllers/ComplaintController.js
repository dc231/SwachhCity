const Complaint = require("../Models/complaintModel");
const User = require('../Models/userModel');
const jwt = require("jsonwebtoken");

module.exports.RaiseComplaint = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ status: false, message: "Authentication required" });
        }
        const data = jwt.verify(token, process.env.TOKEN_KEY);
        const { wastetype, date, time, address, description } = req.body; 
        const newComplaint = new Complaint({
            wastetype,
            date,
            time,
            address,
            description,
            user: data.id
        });
        await newComplaint.save();
        res.status(201).json({ message: "Complaint raised successfully", success: true });
    } catch (error) {
        console.error("Error raising complaint:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ status: false, message: "Invalid token" });
        }
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

module.exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({}).populate('user', 'name email');
        res.status(200).json({ success: true, complaints });
    } catch (error) {
        console.error("Error fetching all complaints:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports.updateComplaintStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            id,
            { status: 'Resolved' },
            { new: true } 
        );

        if (!updatedComplaint) {
            return res.status(404).json({ success: false, message: "Complaint not found" });
        }

        res.status(200).json({ success: true, message: "Complaint resolved successfully", complaint: updatedComplaint });
    } catch (error) {
        console.error("Error updating complaint status:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};