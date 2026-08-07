const Admin = require("../models/Admin");

const checkPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      const admin = await Admin.findById(req.admin._id);

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin not found.",
        });
      }

      // Super Admin can access everything
      if (admin.role === "super_admin") {
        return next();
      }

      if (!admin.permissions[permissionName]) {
        return res.status(403).json({
          success: false,
          message: "Access Denied.",
        });
      }

      next();

    } catch (error) {
      console.error("Permission Error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};

module.exports = checkPermission;