const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contactInfo: {
    name: String,
    phone: String,
    email: String,
  },
  addressInfo: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
  },
  paymentMethod: { type: String, default: "COD" },
  orderItems: [
    {
      name: String,
      qty: Number,
      price: Number,
      image: String,
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    },
  ],
  orderStatus: {
    type: String,
    enum: ["Pending", "Conform", "Delivered"],
    default: "Pending",
  },
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
module.exports = Order;
