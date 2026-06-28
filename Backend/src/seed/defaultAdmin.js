require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");

const seedAdmin = async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL || "admin@abeikufarms.com";
  const plainPassword = process.env.ADMIN_PASSWORD;

  if (!plainPassword || plainPassword.length < 12 || plainPassword === "change_this_admin_password") {
    throw new Error("Set ADMIN_PASSWORD to a strong password of at least 12 characters before seeding admin");
  }

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Default admin already exists");
    process.exit(0);
  }

  const password = await bcrypt.hash(plainPassword, 10);
  await User.create({
    fullName: "Abeiku Farms Admin",
    email,
    phone: "+233200000001",
    password,
    role: "admin",
  });

  console.log(`Default admin seeded: ${email}`);
  process.exit(0);
};

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
