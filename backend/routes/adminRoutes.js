const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  loginAdminUser,
  getDashboardStats,
  getPendingOrders,
  updateOrderStatus,
  getConfirmedOrders,
  getDeliverOrders,
} = require("../controllers/Admin.js");
const { isAdmin } = require("../middlewares/Verifiytoken.js");

router.post("/loginadmin", loginAdminUser);
router.get("/orders", isAdmin, getAllOrders);
router.get("/Dashboard", isAdmin, getDashboardStats);
router.get("/pending", isAdmin, getPendingOrders);
router.get("/confirm", isAdmin, getConfirmedOrders);
router.get("/Deliver", isAdmin, getDeliverOrders);
router.put("/:id/update", isAdmin, updateOrderStatus);

module.exports = router;
