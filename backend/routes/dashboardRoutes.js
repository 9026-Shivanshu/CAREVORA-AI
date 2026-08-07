const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const dashboardController = require("../controllers/dashboardController");

router.get("/stats", authMiddleware, dashboardController.getDashboardStats);
router.get(
  "/admin-stats",
  authMiddleware,
  dashboardController.getAdminDashboardStats
);
router.get(
    "/recent-activities",
    authMiddleware,
    dashboardController.getRecentActivities
);
router.get(
  "/analytics",
  authMiddleware,
  dashboardController.getDashboardAnalytics
);
router.get(
  "/charts",
  authMiddleware,
  dashboardController.getDashboardCharts
);
module.exports = router;