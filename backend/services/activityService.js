const ActivityLog = require("../models/ActivityLog");

const logActivity = async ({
  admin = null,
  user = null,
  action,
  module,
  description,
  status = "success",
  ipAddress = "",
  device = "",
  browser = "",
}) => {
  try {
await ActivityLog.create({
  admin,
  user,
  action,
  description,
  module,
  status,
  ipAddress,
  device,
  browser,
});
   
  } catch (error) {
    console.error("Activity Log Error:", error.message);
  }
};

module.exports = logActivity;