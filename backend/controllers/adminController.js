const User = require("../models/User");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.role !== "admin") {
    return res
      .status(401)
      .json({ message: "Invalid credentials or not an admin" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, "secret_key", {
    expiresIn: "1h",
  });
  res.json({ token });
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find().populate("orders");
  res.json(users);
};
