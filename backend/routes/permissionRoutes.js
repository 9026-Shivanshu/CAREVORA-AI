const express = require("express");

const router = express.Router();

const { getMyPermissions } = require("../controllers/permissionController");

const adminAuth = require("../middleware/adminAuth");

// ======================================
// Get Logged In Admin Permissions
// ======================================

router.get("/me", adminAuth, getMyPermissions);

module.exports = router;