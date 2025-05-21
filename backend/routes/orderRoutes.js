const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders } = require("../controllers/orderController");
const auth = require("../middlewares/auth");
const { cancelOrder } = require("../controllers/orderController");
// ✅ Create new order
router.post("/userorder", auth, createOrder);

// ✅ Get current user's orders
router.get("/my-orders", auth, getMyOrders);

router.delete("/cancel-order/:id", auth, cancelOrder);

module.exports = router;
