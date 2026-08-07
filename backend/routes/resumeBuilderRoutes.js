const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    saveResume,
    getResumes,
    getResumeById,
    updateResume,
    deleteResume,
    generateAIResume
} = require("../controllers/resumeBuilderController");
// Generate Resume with AI
router.post("/generate-ai", authMiddleware, generateAIResume);
// Save Resume
router.post("/save", authMiddleware, saveResume);

// Get Resume History
router.get("/", authMiddleware, getResumes);

// Get Resume By ID
router.get("/:id", authMiddleware, getResumeById);

// Update Resume
router.put("/:id", authMiddleware, updateResume);

// Delete Resume
router.delete("/:id", authMiddleware, deleteResume);

module.exports = router;