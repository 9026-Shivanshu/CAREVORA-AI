const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createStudentProfile,
    getStudentProfile,
    updateStudentProfile
} = require("../controllers/studentController");

// ===============================
// Student Profile
// ===============================

// Create Profile
router.post(
    "/profile/create",
    authMiddleware,
    createStudentProfile
);

// Get Profile
router.get(
    "/profile",
    authMiddleware,
    getStudentProfile
);

// Update Profile
router.put(
    "/profile/update",
    authMiddleware,
    updateStudentProfile
);

module.exports = router;