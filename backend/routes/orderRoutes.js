const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
} = require("../controllers/orderController.js");
const auth = require("../middlewares/auth.js");
const { cancelOrder } = require("../controllers/orderController.js");
// ✅ Create new order
router.post("/userorder", auth, createOrder);

// ✅ Get current user's orders
router.get("/my-orders", auth, getMyOrders);

router.delete("/cancel-order/:id", auth, cancelOrder);

module.exports = router;
