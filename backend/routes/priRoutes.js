const express = require('express');

const router = express.Router();

const { generatePRI } = require('../controllers/priController');

router.post('/generate', generatePRI);

module.exports = router;