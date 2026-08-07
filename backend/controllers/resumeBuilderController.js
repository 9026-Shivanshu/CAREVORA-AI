const ResumeBuilder = require("../models/resumeBuilder");
const { generateResumeWithAI } = require("../services/ai/aiService");
// Save Resume
exports.saveResume = async (req, res) => {
    try {

        const resume = await ResumeBuilder.create({
            user: req.user.id,
            ...req.body
        });

        res.status(201).json({
            success: true,
            message: "Resume saved successfully.",
            resume
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// Get All Resumes
exports.getResumes = async (req, res) => {

    try {

        const resumes = await ResumeBuilder.find({
            user: req.user.id
        }).sort({
            createdAt: -1
        });

        res.json({
            success: true,
            resumes
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Get Resume By ID
exports.getResumeById = async (req, res) => {

    try {

        const resume = await ResumeBuilder.findById(req.params.id);

        if (!resume) {

            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });

        }

        res.json({
            success: true,
            resume
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Update Resume
exports.updateResume = async (req, res) => {

    try {

        const resume = await ResumeBuilder.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            message: "Resume updated successfully.",
            resume
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// Delete Resume
exports.deleteResume = async (req, res) => {

    try {

        await ResumeBuilder.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Resume deleted successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};
exports.generateAIResume = async (req, res) => {

    try {

        const aiResume = await generateResumeWithAI(req.body);

        res.status(200).json({
            success: true,
            message: "AI Resume Generated Successfully",
            data: aiResume
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "AI Resume Generation Failed"
        });

    }

};