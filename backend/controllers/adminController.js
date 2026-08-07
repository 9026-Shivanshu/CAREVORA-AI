const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const logActivity = require("../services/activityService");
const sendEmail = require("../utils/emailService");
const path = require("path");
// ======================================
// Admin Login
// ======================================

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check Empty Fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    // Find Admin
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    // Check Active
    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been disabled.",
      });
    }
    // Check Account Lock
if (admin.lockUntil && admin.lockUntil > Date.now()) {
  const minutesLeft = Math.ceil(
    (admin.lockUntil - Date.now()) / (1000 * 60)
  );

  return res.status(423).json({
    success: false,
    message: `Account is locked. Try again after ${minutesLeft} minute(s).`,
  });
}

    // Verify Password
const isMatch = await bcrypt.compare(password, admin.password);
if (!isMatch) {

  admin.loginAttempts += 1;

  // Lock account after 5 failed attempts
  if (admin.loginAttempts >= 5) {

    admin.lockUntil = new Date(Date.now() + 30 * 60 * 1000);

    await admin.save();

    return res.status(423).json({
      success: false,
      message: "Account locked for 30 minutes due to multiple failed login attempts.",
    });
  }

  await admin.save();

  return res.status(401).json({
    success: false,
    message: `Invalid email or password. Attempt ${admin.loginAttempts} of 5.`,
  });
}
// Reset Login Attempts
admin.loginAttempts = 0;
admin.lockUntil = null;

// Update Last Login
admin.lastLogin = new Date();

await admin.save();
await logActivity({
  admin: admin._id,
  action: "LOGIN",
 module: "Admin",
 description:
  admin.role === "super_admin"
    ? "Super Admin Logged In"
    : "Admin Logged In",
  status: "Success",
  ipAddress: req.ip,
  device: req.headers["user-agent"] || "",
  browser: req.headers["user-agent"] || "",
});
    // Generate Admin Token
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.ADMIN_JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Admin Login Successful.",
      token,
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// ======================================
// Get Admin Profile
// ======================================

exports.getAdminProfile = async (req, res) => {
  try {
    const admin = req.admin;

    res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        phone: admin.phone,
department: admin.department,
        role: admin.role,
        profileImage: admin.profileImage,
        lastLogin: admin.lastLogin,
        createdAt: admin.createdAt,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch admin profile.",
    });
  }
};
// ======================================
// Update Own Profile
// ======================================

exports.updateAdminProfile = async (req, res) => {

  try {

    const admin = await Admin.findById(req.admin._id);

    if (!admin) {

      return res.status(404).json({
        success: false,
        message: "Admin not found."
      });

    }

    const { fullName, phone, department } = req.body;

    if (fullName) admin.fullName = fullName;

    if (phone) admin.phone = phone;

    if (department) admin.department = department;

    await admin.save();

   return res.status(200).json({

  success: true,

  message: "Profile updated successfully.",

  admin: {

    id: admin._id,

    fullName: admin.fullName,

    email: admin.email,

    phone: admin.phone,

    department: admin.department,

    role: admin.role,

    profileImage: admin.profileImage,

    lastLogin: admin.lastLogin,

    createdAt: admin.createdAt,

    isActive: admin.isActive

  }

});

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error"

    });

  }

};
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Email Required
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Search ONLY Admin Collection
    const admin = await Admin.findOne({
  email: email.toLowerCase(),
  role: "super_admin",
});

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found",
      });
    }
// Generate 6-digit OTP
const otp = Math.floor(100000 + Math.random() * 900000).toString();

// OTP Expiry (5 minutes)
admin.resetPasswordOTP = otp;
admin.resetPasswordOTPExpires = new Date(Date.now() + 5 * 60 * 1000);

await admin.save();
await sendEmail({
  to: admin.email,
  subject: "Admin Password Reset OTP",
  html: `
      <h2> PATHLY AI - Admin Password Reset</h2>

      <p>Hello ${admin.fullName},</p>

      <p>Your OTP is:</p>

      <h1 style="color:#2563eb;letter-spacing:6px;">
        ${otp}
      </h1>

      <p>This OTP will expire in <b>5 minutes</b>.</p>

      <p>If you didn't request this, ignore this email.</p>
  `,
});
    return res.status(200).json({
    success: true,
    message: "OTP sent successfully to your registered admin email."
});
  } catch (error) {
    console.error("Forgot Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ======================================
// Create Admin (Super Admin Only)
// ======================================

exports.createAdmin = async (req, res) => {
  const {
  fullName,
  email,
  password,
  permissions,
} = req.body;

// Validation
if (!fullName || !email || !password) {
  return res.status(400).json({
    success: false,
    message: "Full Name, Email and Password are required.",
  });
}

// Check existing admin
const existingAdmin = await Admin.findOne({
  email: email.toLowerCase(),
});

if (existingAdmin) {
  return res.status(400).json({
    success: false,
    message: "Admin already exists with this email.",
  });
}

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);
// Create Admin
const admin = await Admin.create({
  fullName,
  email: email.toLowerCase(),
  password: hashedPassword,
  role: "admin",
  permissions: permissions || {},
});

// Log Activity
await logActivity({
  adminId: req.admin._id,
  action: "CREATE_ADMIN",
  description: `Created new admin: ${admin.email}`,
  req,
});

// Response
return res.status(201).json({
  success: true,
  message: "Admin created successfully.",
  data: {
    id: admin._id,
    fullName: admin.fullName,
    email: admin.email,
    role: admin.role,
    permissions: admin.permissions,
  },
});
};
// ======================================
// Verify Admin OTP
// ======================================
exports.verifyOTP = async (req, res) => {
  
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const admin = await Admin.findOne({
  email: email.toLowerCase(),
  role: "super_admin",
});

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    if (admin.resetPasswordOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (admin.resetPasswordOTPExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    // Generate Temporary Reset Token
const resetToken = crypto.randomBytes(32).toString("hex");


admin.resetPasswordToken = resetToken;



await admin.save();



const savedAdmin = await Admin.findOne({
  email: email.toLowerCase(),
  role: "super_admin",
});



return res.status(200).json({
  success: true,
  message: "OTP verified successfully.",
  resetToken,
});
  } catch (error) {
    console.error("Verify OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ======================================
// Reset Admin Password
// ======================================
exports.resetPassword = async (req, res) => {
  try {

const { email, resetToken, newPassword } = req.body;

    if (!email || !resetToken || !newPassword) {
      return res.status(400).json({
        success: false,
       message: "Email, Reset Token and New Password are required.",
      });
    }

   const admin = await Admin.findOne({
  email: email.toLowerCase(),
  role: "super_admin",
}).select("+password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found.",
      });
    }
if (admin.resetPasswordToken !== resetToken) {
  return res.status(400).json({
    success: false,
    message: "Invalid or expired reset token.",
  });
}

    // Hash Password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;

    // Clear OTP
    admin.resetPasswordOTP = undefined;
    admin.resetPasswordOTPExpires = undefined;
    admin.resetPasswordToken = undefined;

    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });

  } catch (error) {

    console.error("Reset Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// ======================================
// Get All Admins (Super Admin Only)
// ======================================
exports.getAllAdmins = async (req, res) => {
  try {

    const admins = await Admin.find({ role: "admin" })
      .select("-password -resetPasswordOTP -resetPasswordOTPExpires -resetPasswordToken")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalAdmins: admins.length,
      data: admins,
    });

  } catch (error) {

    console.error("Get All Admins Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// ======================================
// Search Admins (Super Admin Only)
// ======================================
exports.searchAdmins = async (req, res) => {
  try {
    const { keyword } = req.query;

    const filter = {
      role: "admin",
    };

    if (keyword) {
      filter.$or = [
        { fullName: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ];
    }

    const admins = await Admin.find(filter)
      .select("-password -resetPasswordOTP -resetPasswordOTPExpires -resetPasswordToken")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalAdmins: admins.length,
      data: admins,
    });

  } catch (error) {
    console.error("Search Admin Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ======================================
// Get Single Admin (Super Admin Only)
// ======================================
exports.getSingleAdmin = async (req, res) => {
  try {

    const { id } = req.params;

    const admin = await Admin.findById(id)
      .select("-password -resetPasswordOTP -resetPasswordOTPExpires -resetPasswordToken");

    if (!admin || admin.role !== "admin") {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: admin,
    });

  } catch (error) {

    console.error("Get Single Admin Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// ======================================
// Update Admin (Super Admin Only)
// ======================================
exports.updateAdmin = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      fullName,
      email,
      isActive,
      permissions,
    } = req.body;

    const admin = await Admin.findById(id);

    if (!admin || admin.role !== "admin") {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    // Email Duplicate Check
   // Email Duplicate Check
if (email && email.toLowerCase() !== admin.email) {

    const existingAdmin = await Admin.findOne({
        email: email.toLowerCase(),
        _id: { $ne: id }
    });

    if (existingAdmin) {

        return res.status(400).json({
            success: false,
            message: "Email already exists."
        });

    }

    admin.email = email.toLowerCase();

}
    if (fullName) admin.fullName = fullName;

    if (typeof isActive === "boolean") {
      admin.isActive = isActive;
    }

    if (permissions) {
      admin.permissions = {
        ...admin.permissions,
        ...permissions,
      };
    }

    await admin.save();

    await logActivity({
      adminId: req.admin._id,
      action: "UPDATE_ADMIN",
      description: `Updated admin: ${admin.email}`,
      req,
    });

    return res.status(200).json({
      success: true,
      message: "Admin updated successfully.",
      data: admin,
    });

  } catch (error) {

    console.error("Update Admin Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// ======================================
// Update Admin Status (Super Admin Only)
// ======================================
exports.updateAdminStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { isActive } = req.body;

    const admin = await Admin.findById(id);

    if (!admin || admin.role !== "admin") {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false.",
      });
    }

    admin.isActive = isActive;

    await admin.save();

    await logActivity({
      adminId: req.admin._id,
      action: isActive ? "ACTIVATE_ADMIN" : "DEACTIVATE_ADMIN",
      description: `${isActive ? "Activated" : "Deactivated"} admin: ${admin.email}`,
      req,
    });

    return res.status(200).json({
      success: true,
      message: `Admin ${isActive ? "activated" : "deactivated"} successfully.`,
      data: admin,
    });

  } catch (error) {

    console.error("Update Admin Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// ======================================
// Delete Admin (Super Admin Only)
// ======================================
exports.deleteAdmin = async (req, res) => {
  try {

    const { id } = req.params;

    const admin = await Admin.findById(id);

    if (!admin || admin.role !== "admin") {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    await logActivity({
      adminId: req.admin._id,
      action: "DELETE_ADMIN",
      description: `Deleted admin: ${admin.email}`,
      req,
    });

    await Admin.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Admin deleted successfully.",
    });

  } catch (error) {

    console.error("Delete Admin Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// ======================================
// Super Admin Reset Admin Password
// ======================================

exports.resetAdminPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
// Strong Password Validation
const strongPasswordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/;

if (!strongPasswordRegex.test(newPassword)) {

    return res.status(400).json({

        success: false,

        message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character."

    });

}
    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password is required.",
      });
    }

    const admin = await Admin.findById(id).select("+password");

    if (!admin || admin.role !== "admin") {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }
// ======================================
// Check Same Password
// ======================================

const isSamePassword = await bcrypt.compare(
    newPassword,
    admin.password
);

if (isSamePassword) {

    return res.status(400).json({

        success: false,

        message: "New password cannot be the same as the current password."

    });

}
    admin.password = await bcrypt.hash(newPassword, 10);

    admin.loginAttempts = 0;
    admin.lockUntil = null;

    await admin.save();

    await logActivity({
      adminId: req.admin._id,
      action: "RESET_ADMIN_PASSWORD",
      description: `Reset password for ${admin.email}`,
      req,
    });

    return res.status(200).json({
      success: true,
      message: "Admin password reset successfully.",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// ======================================
// Update Admin Permissions (Super Admin)
// ======================================

exports.updateAdminPermissions = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissions } = req.body;

    if (!permissions) {
      return res.status(400).json({
        success: false,
        message: "Permissions are required.",
      });
    }

    const admin = await Admin.findById(id);

    if (!admin || admin.role !== "admin") {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    admin.permissions = {
      ...admin.permissions,
      ...permissions,
    };

    await admin.save();

    await logActivity({
      adminId: req.admin._id,
      action: "UPDATE_PERMISSIONS",
      description: `Updated permissions for ${admin.email}`,
      req,
    });

    return res.status(200).json({
      success: true,
      message: "Permissions updated successfully.",
      permissions: admin.permissions,
    });

  } catch (error) {
    console.error("Update Permission Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ======================================
// Get Admin Permissions (Super Admin)
// ======================================

exports.getAdminPermissions = async (req, res) => {
  try {

    const { id } = req.params;

    const admin = await Admin.findById(id);

    if (!admin || admin.role !== "admin") {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    return res.status(200).json({
      success: true,
      permissions: admin.permissions,
    });

  } catch (error) {

    console.error("Get Admin Permissions Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// ======================================
// Reset Admin Permissions (Super Admin)
// ======================================

exports.resetAdminPermissions = async (req, res) => {
  try {

    const { id } = req.params;

    const admin = await Admin.findById(id);

    if (!admin || admin.role !== "admin") {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    admin.permissions = {

    dashboard: {
        view: true,
        create: false,
        edit: false,
        delete: false,
        export: false,
        import: false,
        approve: false,
        reject: false
    },

    adminManagement: {
        view: false,
        create: false,
        edit: false,
        delete: false,
        export: false,
        import: false,
        approve: false,
        reject: false
    },

    students: {
        view: false,
        create: false,
        edit: false,
        delete: false,
        export: false,
        import: false,
        approve: false,
        reject: false
    },

    recruiters: {
        view: false,
        create: false,
        edit: false,
        delete: false,
        export: false,
        import: false,
        approve: false,
        reject: false
    },

    jobs: {
        view: false,
        create: false,
        edit: false,
        delete: false,
        export: false,
        import: false,
        approve: false,
        reject: false
    },

    reports: {
        view: false,
        create: false,
        edit: false,
        delete: false,
        export: false,
        import: false,
        approve: false,
        reject: false
    },

    settings: {
        view: false,
        create: false,
        edit: false,
        delete: false,
        export: false,
        import: false,
        approve: false,
        reject: false
    }

};

    await admin.save();

    await logActivity({
      adminId: req.admin._id,
      action: "RESET_PERMISSIONS",
      description: `Reset permissions for ${admin.email}`,
      req,
    });

    return res.status(200).json({
      success: true,
      message: "Permissions reset successfully.",
      permissions: admin.permissions,
    });

  } catch (error) {

    console.error("Reset Permission Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// ======================================
// Super Admin Change Own Password
// ======================================

exports.changePassword = async (req, res) => {

    try {

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {

            return res.status(400).json({

                success: false,
                message: "Current Password and New Password are required."

            });

        }

        const admin = await Admin.findById(req.admin._id)
            .select("+password");

        if (!admin) {

            return res.status(404).json({

                success: false,
                message: "Admin not found."

            });

        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            admin.password
        );

        if (!isMatch) {

            return res.status(400).json({

                success: false,
                message: "Current Password is incorrect."

            });

        }

        admin.password = await bcrypt.hash(newPassword, 10);

        await admin.save();

        await logActivity({

            admin: admin._id,

            action: "CHANGE_PASSWORD",

            module: "Profile",

            description: "Password Changed Successfully",

            status: "Success",

            ipAddress: req.ip,

            device: req.headers["user-agent"] || ""

        });

        return res.status(200).json({

            success: true,

            message: "Password updated successfully."

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};
// ======================================
// Upload Profile Image
// ======================================

exports.uploadProfileImage = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "Please select an image."
            });

        }

        const admin = await Admin.findById(req.admin._id);

        if (!admin) {

            return res.status(404).json({
                success: false,
                message: "Admin not found."
            });

        }

        admin.profileImage = `/uploads/profile/${req.file.filename}`;

        await admin.save();

        return res.status(200).json({

            success: true,

            message: "Profile photo updated successfully.",

            profileImage: admin.profileImage

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};