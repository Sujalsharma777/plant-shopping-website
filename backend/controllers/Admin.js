const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const OrderModel = require("../models/Order");

const loginAdminUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user || user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized: Not an admin" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res
      .status(200)
      .json({ message: "Admin login successful", redirect: "/adminpanel" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({}).populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
const getDashboardStats = async (req, res) => {
  try {
    const orders = await OrderModel.find();

    const totalSales = orders.reduce(
      (sum, order) => sum + (order.totalPrice || 0),
      0
    );
    const pendingOrders = orders.filter(
      (order) => order.orderStatus === "Pending"
    ).length;
    const deliveredOrders = orders.filter(
      (order) => order.orderStatus === "Delivered"
    ).length;

    res.status(200).json({
      totalSales,
      pendingOrders,
      deliveredOrders,
    });
  } catch (error) {
    console.error("Error fetching order summary:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getPendingOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ orderStatus: "Pending" });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
const getConfirmedOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ orderStatus: "Confirmed" });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
const getDeliverOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ orderStatus: "Delivered" });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  loginAdminUser,
  getAllOrders,
  getDashboardStats,
  getPendingOrders,
  updateOrderStatus,
  getConfirmedOrders,
  getDeliverOrders,
};
