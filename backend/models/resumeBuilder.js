const mongoose = require("mongoose");

const resumeBuilderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    fullName: {
        type: String,
        required: true
    },

    email: String,

    phone: String,

    address: String,

    linkedin: String,

    github: String,

    portfolio: String,

    careerCategory: String,

    targetJob: String,

    targetCompany: String,

    experience: String,

    jobLocation: String,

    resumeTemplate: String,

    resumeLanguage: String,

    jobDescription: String,

    professionalSummary: String,

    careerObjective: String,

    technicalSkills: [{
    type: String
}],

projects: [{
    type: String
}],

certifications: [{
    type: String
}],
    resumeScore: {
        type: Number,
        default: 0
    },

    atsScore: {
        type: Number,
        default: 0
    },

    jdMatch: {
        type: Number,
        default: 0
    },

    placementReady: {
        type: Number,
        default: 0
    },
careerDNA: {
    frontend: Number,
    backend: Number,
    dsa: Number,
    communication: Number
},
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports =
mongoose.models.ResumeBuilder ||
mongoose.model("ResumeBuilder", resumeBuilderSchema);