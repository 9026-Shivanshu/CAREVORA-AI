const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
  if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    if (!allowedRoles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied.",
      });
    }

    next();
  };
};

module.exports = roleMiddleware;