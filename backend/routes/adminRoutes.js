const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/adminController");
const auth = require("../middlewares/AuthVaildation");
const admin = require("../middlewares/isAdmin");

router.use(auth, admin);
router.get("/dashboard", getDashboardStats);
router.get("/orders", getAllOrders);
router.put("/order/:id/status", updateOrderStatus);

module.exports = router;
