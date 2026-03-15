const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklist.model");
const { uploadFile } = require("../services/imageKit");

/**
 * @name registerUser
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
async function registerUser(req, res) {
  const { username, email, password } = req.body || {};

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  const existingUser = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);
    
    let avatarUrl = "";

    if (req.file) {
      const uploaded = await uploadFile(req.file);
      avatarUrl = uploaded.url;
    }

    // Create new user
    const user = await userModel.create({
      username,
      email,
      password: hash,
      avatar: avatarUrl,
    });

    const token = jwt.sign({ id: user._id , username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token)

    res.status(201).json({
      message: "User registered successfully",
      user:{
        id:user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      }
    });

   
}


/** * @name loginUser
 * @desc Login a user
 * @route POST /api/auth/login
 * @access Public
 */
async function loginUser(req, res) {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);  

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    const token = jwt.sign({ id: user._id , username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token)

    res.status(200).json({
      message: "User logged in successfully",
      user:{
        id:user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      }
    });
}

/** * @name logoutUser
 * @desc Logout a user
 * @route POST /api/auth/logout
 * @access Public
 */
async function logoutUser(req, res) {

    const token = req.cookies.token;

    if (token){
        // Add token to blacklist
        await blacklistTokenModel.create({ token });
    }
    
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
}

/**
 * @name getMe
 * @desc Get current logged in user
 * @route GET /api/auth/me
 * @access Private
 */
async function getMe(req, res) {
  const user = await userModel.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ user });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
};
