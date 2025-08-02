const User = require("../Models/userModel");
const Admin = require("../Models/adminModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

// User Signup
module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, name, address, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists", success: false });
    }
    const user = await User.create({ email, password, name, address, createdAt });

    res
      .status(201)
      .json({ message: "Signup successful, please log in.", success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An internal server error occurred", success: false });
  }
};

// User Login
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' })
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' })
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      secure: true, 
      sameSite: 'none',
    });
    res.status(201).json({ 
      message: "User logged in successfully", 
      success: true, 
      user: { name: user.name, email: user.email, address: user.address } 
    });
    next()
  } catch (error) {
    console.error(error);
  }
};

// Admin Signup
module.exports.AdminSignup = async (req, res, next) => {
    try {
        const { email, password, name, createdAt } = req.body;
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.json({ message: "Admin already exists" });
        }
        const admin = await Admin.create({ email, password, name, createdAt });
        const token = createSecretToken(admin._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(201)
            .json({ message: "Admin signed in successfully", success: true, admin });
        next();
    } catch (error) {
        console.error(error);
    }
};

// Admin Login
module.exports.AdminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, admin.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(admin._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      secure: true, 
      sameSite: 'none',
    });
    res.status(201).json({ message: "Admin logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};


module.exports.Logout = (req, res) => {
    res.cookie('token', '', { 
      expires: new Date(0) ,
      httpOnly: false,
      secure: true, 
      sameSite: 'none',
    });
    res.status(200).json({ message: "Logged out successfully", success: true });
};