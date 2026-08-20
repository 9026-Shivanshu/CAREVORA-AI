const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    // ==========================
    // Authentication
    // ==========================

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    // ==========================
    // Personal Information
    // ==========================

    profileImage: {
        type: String,
        default: ""
    },

    fullName: {
        type: String,
        default: ""
    },

    email: {
        type: String,
        default: ""
    },

    phone: {
        type: String,
        default: ""
    },

    gender: {
        type: String,
        default: ""
    },

    dob: {
        type: Date
    },

    // ==========================
    // Academic Information
    // ==========================

    college: {
        type: String,
        default: ""
    },

    course: {
        type: String,
        default: ""
    },

    branch: {
        type: String,
        default: ""
    },

    year: {
        type: String,
        default: ""
    },

    // ==========================
    // Address
    // ==========================

    city: {
        type: String,
        default: ""
    },

    state: {
        type: String,
        default: ""
    },

    country: {
        type: String,
        default: "India"
    },

    // ==========================
    // Career
    // ==========================

    careerGoal: {
        type: String,
        default: ""
    },

    preferredRole: {
        type: String,
        default: ""
    },

    preferredLocation: {
        type: String,
        default: ""
    },

    expectedSalary: {
        type: String,
        default: ""
    },

    bio: {
        type: String,
        default: ""
    },

    // ==========================
    // Social Links
    // ==========================

    linkedin: {
        type: String,
        default: ""
    },

    github: {
        type: String,
        default: ""
    },

    portfolio: {
        type: String,
        default: ""
    },
    communicationSkill: {
    type: Number,
    default: 0
},
// ================= Skills =================
skills: [
  {
    name: {
      type: String,
      trim: true
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner"
    }
  }
],
    // ==========================
    // Dashboard
    // ==========================

    profileCompletion: {
        type: Number,
        default: 0
    },

    resumeScore: {
        type: Number,
        default: 0
    },

    jdMatchScore: {
        type: Number,
        default: 0
    },

    appliedJobs: {
        type: Number,
        default: 0
    },

    savedJobs: {
        type: Number,
        default: 0
    },

    interviews: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);