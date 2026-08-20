const mongoose = require('mongoose');

const resumeHistorySchema = new mongoose.Schema({
 user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: false
},
  resumeName: String,

  resumeUrl: String,

  atsScore: Number,

  detectedRole: String,

  detectedField: String,

  uploadedAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model('ResumeHistory', resumeHistorySchema);