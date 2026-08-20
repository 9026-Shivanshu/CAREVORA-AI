const mongoose = require('mongoose');

const atsAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    resumeName: {
      type: String,
      required: true
    },

    targetRole: {
      type: String,
      default: ''
    },

    jobDescription: {
      type: String,
      default: ''
    },

    analysisMode: {
      type: String,
      enum: ['general', 'job-specific'],
      default: 'general'
    },

    atsScore: {
      type: Number,
      default: 0
    },

    jobMatch: {
      type: Number,
      default: 0
    },

    matchedSkills: {
      type: [String],
      default: []
    },

    missingSkills: {
      type: [String],
      default: []
    },

    matchedKeywords: {
      type: [String],
      default: []
    },

    missingKeywords: {
      type: [String],
      default: []
    },

    experienceMatch: {
      type: Number,
      default: 0
    },

    educationMatch: {
      type: Number,
      default: 0
    },

    responsibilitiesMatch: {
      type: Number,
      default: 0
    },

    strengths: {
      type: [String],
      default: []
    },

    improvements: {
      type: [String],
      default: []
    },

    aiSuggestions: {
      type: [String],
      default: []
    },

    applyReadiness: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ATSAnalysis', atsAnalysisSchema);