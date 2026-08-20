const express = require('express');
const router = express.Router();

const { getResumeHistory } = require('../controllers/profileController');
const protect = require('../middleware/authMiddleware');

router.get('/resume-history', protect, getResumeHistory);

module.exports = router;