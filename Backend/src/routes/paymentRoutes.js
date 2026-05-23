const express = require("express");
const { initializeHubtelPayment } = require("../services/payments/hubtelService");
const { initializePaystackTransaction } = require("../services/payments/paystackService");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/paystack/initialize", protect, async (req, res) => {
  const response = await initializePaystackTransaction(req.body);
  res.json(response);
});

router.post("/hubtel/initialize", protect, async (req, res) => {
  const response = await initializeHubtelPayment(req.body);
  res.json(response);
});

module.exports = router;