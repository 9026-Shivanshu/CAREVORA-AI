const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const protect = require('../middleware/authMiddleware');
const {
  analyzeResume,
  generateJD
} = require('../controllers/atsController');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/analyze', protect, upload.single('resume'), analyzeResume);
router.post('/generate-jd', protect, generateJD);
module.exports = router;