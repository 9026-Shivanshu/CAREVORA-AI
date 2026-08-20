const ResumeHistory = require('../models/ResumeHistory');

exports.getResumeHistory = async (req, res) => {
  try {

    const history = await ResumeHistory.find({ user: req.user._id })
      .sort({ uploadedAt: -1 });

    res.json({
      success: true,
      history
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Failed to fetch resume history'
    });
  }
};