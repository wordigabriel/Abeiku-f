const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (id) => {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === "change_this_secret") {
    throw new Error("JWT_SECRET must be configured before issuing tokens");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
};

const signup = async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  if (!fullName || !email || !phone || !password || password.length < 8) {
    return res.status(400).json({ message: "Full name, email, phone, and an 8+ character password are required" });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const exists = await User.findOne({ email: normalizedEmail });
  if (exists) return res.status(400).json({ message: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ fullName, email: normalizedEmail, phone, password: hashed, role: "customer" });
  return res.status(201).json({ token: signToken(user._id), user: { ...user.toObject(), password: undefined } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const matches = await bcrypt.compare(password, user.password);
  if (!matches) return res.status(401).json({ message: "Invalid credentials" });

  return res.status(200).json({ token: signToken(user._id), user: { ...user.toObject(), password: undefined } });
};

module.exports = { signup, login };
