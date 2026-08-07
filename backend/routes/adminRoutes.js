const express = require("express");

const router = express.Router();
const {
  adminLogin,
  getAdminProfile,
  updateAdminProfile,
  forgotPassword,
  verifyOTP,
  resetPassword,
  createAdmin,
    getAllAdmins,
      searchAdmins,
      getSingleAdmin, 
        updateAdmin,
        updateAdminStatus, 
        deleteAdmin,
        resetAdminPassword,
        updateAdminPermissions,
         getAdminPermissions,
         resetAdminPermissions,
         changePassword,
         uploadProfileImage,
} = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");
const roleMiddleware = require("../middleware/roleMiddleware");
const checkPermission = require("../middleware/permissionMiddleware");
const profileUpload = require("../middleware/profileUpload");
// ===============================
// Admin Login
// ===============================

router.post("/login", adminLogin);
router.get(
  "/profile",
  adminAuth,
  roleMiddleware("super_admin", "admin"),
  getAdminProfile
);
router.put(
  "/profile",
  adminAuth,
  roleMiddleware("super_admin", "admin"),
  updateAdminProfile
);

// NEW
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post(
  "/create-admin",
  adminAuth,
  roleMiddleware("super_admin"),
  createAdmin
);
router.get(
  "/all-admins",
  adminAuth,
  roleMiddleware("super_admin"),
  getAllAdmins
);
router.get(
  "/search",
  adminAuth,
  roleMiddleware("super_admin"),
  searchAdmins
);
router.get(
  "/:id",
  adminAuth,
  roleMiddleware("super_admin"),
  getSingleAdmin
);
// ======================================
// Change Own Password
// ======================================

router.put(
  "/change-password",
  adminAuth,
  roleMiddleware("super_admin", "admin"),
  changePassword
);
// ======================================
// Upload Profile Image
// ======================================

router.put(
  "/profile-image",
  adminAuth,
  roleMiddleware("super_admin", "admin"),
  profileUpload.single("profileImage"),
  uploadProfileImage
);
router.put(
  "/:id",
  adminAuth,
  roleMiddleware("super_admin"),
  updateAdmin
);
router.patch(
  "/:id/status",
  adminAuth,
  roleMiddleware("super_admin"),
  updateAdminStatus
);
router.delete(
  "/:id",
  adminAuth,
  roleMiddleware("super_admin"),
  deleteAdmin
);
router.get(
  "/:id/permissions",
  adminAuth,
  roleMiddleware("super_admin"),
  getAdminPermissions
);
router.put(
  "/:id/permissions",
  adminAuth,
  roleMiddleware("super_admin"),
  updateAdminPermissions
);
router.patch(
  "/:id/reset-permissions",
  adminAuth,
  roleMiddleware("super_admin"),
  resetAdminPermissions
);
router.patch(
  "/:id/reset-password",
  adminAuth,
  roleMiddleware("super_admin"),
  resetAdminPassword
);

module.exports = router;