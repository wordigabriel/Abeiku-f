const User = require("../models/User");

const getCustomers = async (_req, res) => {
  const customers = await User.find({ role: "customer" }).select("-password").sort({ createdAt: -1 });
  res.json(customers);
};

module.exports = { getCustomers };