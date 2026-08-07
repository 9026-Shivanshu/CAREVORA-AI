const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existingAdmin) {
      console.log("✅ Default Admin already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await Admin.create({
      fullName: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "super_admin",
    });

    console.log("✅ Default Super Admin Created Successfully.");
  } catch (error) {
    console.error("❌ Error Creating Default Admin:", error.message);
  }
};

module.exports = createDefaultAdmin;