const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

const signup = async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) return res.status(400).json({ message: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ fullName, email, phone, password: hashed, role: "customer" });
  return res.status(201).json({ token: signToken(user._id), user: { ...user.toObject(), password: undefined } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const matches = await bcrypt.compare(password, user.password);
  if (!matches) return res.status(401).json({ message: "Invalid credentials" });

  return res.status(200).json({ token: signToken(user._id), user: { ...user.toObject(), password: undefined } });
};

module.exports = { signup, login };