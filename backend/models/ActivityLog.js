const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
admin: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Admin",
  default: null,
},
    action: {
      type: String,
      required: true,
      trim: true,
    },
description: {
  type: String,
  trim: true,
  default: "",
},
    module: {
      type: String,
      enum: [
        "Authentication",
        "Resume",
        "AI",
        "Research",
        "Email",
        "Jobs",
        "Contact",
        "Admin",
        "System"
      ],
      required: true,
    },

    aiProvider: {
      type: String,
      enum: ["ChatGPT", "Gemini", "None"],
      default: "None",
    },

    ipAddress: {
      type: String,
      default: "",
    },

    device: {
      type: String,
      default: "",
    },

    browser: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Success", "Failed"],
      default: "Success",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.ActivityLog ||
  mongoose.model("ActivityLog", activityLogSchema);