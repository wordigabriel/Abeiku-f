const Order = require("../models/Order");

const getDeliveryFee = (option, address) => {
  if (option === "Pickup") return 0;
  const normalized = address.toLowerCase();
  if (normalized.includes("accra") || normalized.includes("tema")) return 15;
  if (normalized.includes("kumasi") || normalized.includes("takoradi")) return 25;
  return 35;
};

const createOrder = async (req, res) => {
  const { fullName, phone, deliveryAddress, gpsLocation, deliveryOption, paymentMethod, items } = req.body;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = getDeliveryFee(deliveryOption, deliveryAddress);
  const order = await Order.create({
    orderNumber: `ABF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    customer: req.user._id,
    fullName,
    phone,
    deliveryAddress,
    gpsLocation,
    deliveryOption,
    paymentMethod,
    items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
  });

  res.status(201).json(order);
};

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ customer: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

const getAllOrders = async (_req, res) => {
  const orders = await Order.find().populate("customer", "fullName email phone").sort({ createdAt: -1 });
  res.json(orders);
};

const updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};

const trackOrder = async (req, res) => {
  const order = await Order.findOne({ orderNumber: req.params.orderNumber });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus, trackOrder };