const express = require('express');

const router = express.Router();

const { generateCareerDNA } = require('../controllers/careerDNAController');

router.post('/generate', generateCareerDNA);

module.exports = router;