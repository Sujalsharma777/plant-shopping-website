const Order = require("../models/order.js");

// ✅ Create new order
const createOrder = async (req, res) => {
  const { contactInfo, addressInfo, orderItems, paymentMethod, totalPrice } =
    req.body;

  try {
    const order = new Order({
      user: req.user.id,
      contactInfo,
      addressInfo,
      orderItems,
      paymentMethod,
      totalPrice,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error while placing order" });
  }
};

// ✅ Get orders of logged-in user
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};
const cancelOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findOne({ _id: orderId, user: req.user.id });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.orderStatus !== "Pending") {
      return res
        .status(400)
        .json({ message: "Only pending orders can be cancelled" });
    }

    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createOrder, getMyOrders, cancelOrder };
