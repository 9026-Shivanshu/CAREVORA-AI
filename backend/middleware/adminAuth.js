const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided.",
      });
    }

    const token = authHeader.split(" ")[1];
    

    const decoded = jwt.verify(
      token,
      process.env.ADMIN_JWT_SECRET
    );
   

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is disabled.",
      });
    }

    req.admin = admin;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Admin Token.",
    });

  }
};

module.exports = adminAuth;