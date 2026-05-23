const express = require("express");
const { getCustomers } = require("../controllers/customerController");
const { adminOnly, protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/customers", protect, adminOnly, getCustomers);

module.exports = router;