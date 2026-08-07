const Admin = require("../models/Admin");

// ======================================
// Get Logged In Admin Permissions
// ======================================

exports.getMyPermissions = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("permissions role");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    return res.status(200).json({
      success: true,
      role: admin.role,
      permissions: admin.permissions,
    });

  } catch (error) {
    console.error("Get Permission Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};