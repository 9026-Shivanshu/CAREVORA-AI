const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const profileUpload = require("../middleware/profileUpload");

const {
  createStudentProfile,
  getStudentProfile,
  updateStudentProfile,
  uploadProfileImage,
  addSkill,
  deleteSkill
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

// Upload Profile Image
router.put(
    "/profile/image",
    authMiddleware,
    profileUpload.single("profileImage"),
    uploadProfileImage
);
// =====================================
// Skills
// =====================================

// Add Skill
router.post(
  "/skills",
  authMiddleware,
  addSkill
);

// Delete Skill
router.delete(
  "/skills/:id",
  authMiddleware,
  deleteSkill
);
module.exports = router;