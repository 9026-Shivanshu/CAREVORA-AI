const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["super_admin", "admin", "moderator"],
      default: "admin",
    },
permissions: {
  dashboard: { type: Boolean, default: true },

  studentManagement: { type: Boolean, default: false },

  recruiterManagement: { type: Boolean, default: false },

  adminManagement: { type: Boolean, default: false },

  resumeManagement: { type: Boolean, default: false },

  interviewManagement: { type: Boolean, default: false },

  jobManagement: { type: Boolean, default: false },

  reports: { type: Boolean, default: false },

  analytics: { type: Boolean, default: false },

  notifications: { type: Boolean, default: false },

  contacts: { type: Boolean, default: false },

  aiModule: { type: Boolean, default: false },

  settings: { type: Boolean, default: false },

  exportData: { type: Boolean, default: false },
},
    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
    },

    profileImage: {
      type: String,
      default: "",
    },
    phone: {
  type: String,
  default: "",
},

department: {
  type: String,
  default: "Administration",
},
    loginAttempts: {
  type: Number,
  default: 0,
},

lockUntil: {
  type: Date,
  default: null,
},

lastLoginIP: {
  type: String,
  default: "",
},

lastBrowser: {
  type: String,
  default: "",
},

lastDevice: {
  type: String,
  default: "",
},

lastLoginLocation: {
  type: String,
  default: "",
},
resetPasswordOTP: {
  type: String,
  default: null,
},

resetPasswordOTPExpires: {
  type: Date,
  default: null,
},
resetPasswordToken: {
  type: String,
  default: null,
},
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);