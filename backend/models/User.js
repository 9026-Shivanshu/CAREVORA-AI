const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
  default: "",
},
googleId: {
  type: String,
  default: "",
},

provider: {
  type: String,
  enum: ["local", "google"],
  default: "local",
},
    phone: {
      type: String,
      default: "",
    },

    college: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      default: "",
    },

    graduationYear: {
      type: Number,
      default: null,
    },

    skills: {
      type: [String],
      default: [],
    },

    resume: {
      type: String,
      default: "",
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    profileImage: {
      type: String,
      default: "",
    },

  role: {
  type: String,
  enum: [
    "student",
    "recruiter",
    "admin",
    "super_admin",
  ],
  default: "student",
},
    resetOTP: {
  type: String,
  default: "",
},

resetOTPExpire: {
  type: Date,
  default: null,
},
resetToken: {
  type: String,
  default: "",
},

resetTokenExpire: {
  type: Date,
  default: null,
},
// ==============================
// Career Intelligence
// ==============================

careerGoal: {
  type: String,
  default: "",
},

preferredJobRole: {
  type: String,
  default: "",
},

preferredLocation: {
  type: String,
  default: "",
},

experienceLevel: {
  type: String,
  enum: ["Fresher", "Student", "Experienced"],
  default: "Student",
},

// ==============================
// AI Scores
// ==============================

careerDNAScore: {
  type: Number,
  default: 0,
},

placementReadinessIndex: {
  type: Number,
  default: 0,
},

skillGapScore: {
  type: Number,
  default: 0,
},

profileCompletion: {
  type: Number,
  default: 0,
},

// ==============================
// Social Profiles
// ==============================

linkedin: {
  type: String,
  default: "",
},

github: {
  type: String,
  default: "",
},

portfolio: {
  type: String,
  default: "",
},

leetcode: {
  type: String,
  default: "",
},

hackerrank: {
  type: String,
  default: "",
},

// ==============================
// AI Settings
// ==============================

aiProvider: {
  type: String,
  enum: ["gemini", "openai"],
  default: "gemini",
},

// ==============================
// Notification Settings
// ==============================

notificationEnabled: {
  type: Boolean,
  default: true,
},

emailNotification: {
  type: Boolean,
  default: true,
},

// ==============================
// Account Status
// ==============================

accountStatus: {
  type: String,
  enum: ["active", "inactive", "blocked"],
  default: "active",
},

lastLogin: {
  type: Date,
  default: null,
},
// ==============================
// Email & Phone Verification
// ==============================

isVerified: {
  type: Boolean,
  default: false,
},

emailVerified: {
  type: Boolean,
  default: false,
},

phoneVerified: {
  type: Boolean,
  default: false,
},

// ==============================
// Login Activity
// ==============================

loginAttempts: {
  type: Number,
  default: 0,
},

lockUntil: {
  type: Date,
  default: null,
},

lastIPAddress: {
  type: String,
  default: "",
},

lastDevice: {
  type: String,
  default: "",
},

// ==============================
// Recruiter Information
// ==============================

companyName: {
  type: String,
  default: "",
},

designation: {
  type: String,
  default: "",
},

companyWebsite: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);