require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");

const seedAdmin = async () => {
  await connectDB();

  const email = "admin@abeikufarms.com";
  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Default admin already exists");
    process.exit(0);
  }

  const password = await bcrypt.hash("admin123", 10);
  await User.create({
    fullName: "Abeiku Farms Admin",
    email,
    phone: "+233200000001",
    password,
    role: "admin",
  });

  console.log("Default admin seeded: admin@abeikufarms.com / admin123");
  process.exit(0);
};

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});