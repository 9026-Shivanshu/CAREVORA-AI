const { analyzeCareerDNA } = require('../services/ai/careerDNA');

exports.generateCareerDNA = async (req, res) => {
  try {

    const result = await analyzeCareerDNA(req.body);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Career DNA generation failed'
    });
  }
};