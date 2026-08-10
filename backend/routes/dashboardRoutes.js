const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminAuth = require("../middleware/adminAuth");
const dashboardController = require("../controllers/dashboardController");


router.get("/stats", authMiddleware, dashboardController.getDashboardStats);
router.get("/admin-stats", adminAuth, dashboardController.getAdminDashboardStats);

router.get("/recent-activities", adminAuth, dashboardController.getRecentActivities);
router.get(
  "/analytics",
  authMiddleware,
  dashboardController.getDashboardAnalytics
);
router.get("/charts", adminAuth, dashboardController.getDashboardCharts);
module.exports = router;