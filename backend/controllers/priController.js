const { calculatePRI } = require('../services/ai/priEngine');

exports.generatePRI = async (req, res) => {
  try {

    const result = await calculatePRI(req.body);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'PRI generation failed'
    });
  }
};