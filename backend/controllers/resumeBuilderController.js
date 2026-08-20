const ResumeBuilder = require("../models/resumeBuilder");
const { generateResumeAI } = require('../services/ai/resumeGenerator');
// Save Resume
exports.saveResume = async (req, res) => {

    try {
        // Resume Score Calculation
let resumeScore = 0;

if (req.body.fullName?.trim()) resumeScore += 10;
if (req.body.email?.trim()) resumeScore += 10;
if (req.body.phone?.trim()) resumeScore += 10;

if (req.body.professionalSummary?.trim())
    resumeScore += 15;

if (
    Array.isArray(req.body.technicalSkills) &&
    req.body.technicalSkills.length >= 2
)
    resumeScore += 20;

if (
    Array.isArray(req.body.projects) &&
    req.body.projects.length >= 1
)
    resumeScore += 20;

if (
    Array.isArray(req.body.certifications) &&
    req.body.certifications.length >= 1
)
    resumeScore += 15;

resumeScore = Math.min(resumeScore, 100);
console.log("BODY DATA:", req.body);
const resume = await ResumeBuilder.create({
    user: req.user.id,
    ...req.body,
    resumeScore
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

        // ======================================
        // Generate Resume using AI
        // ======================================

        const aiResume = await generateResumeAI(req.body);


        // ======================================
        // Save AI Generated Resume
        // ======================================

        const resume = await ResumeBuilder.create({

            user: req.user.id,

            // Personal Information
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,

            // Career Information
            targetJob: req.body.targetRole,
            experience: req.body.experienceLevel,
            jobLocation: req.body.preferredLocation,

            // AI Generated Content
            professionalSummary:
                aiResume.professionalSummary || "",

            careerObjective:
                aiResume.careerObjective || "",

            technicalSkills:
                Array.isArray(aiResume.technicalSkills)
                    ? aiResume.technicalSkills.join(", ")
                    : aiResume.technicalSkills || "",

            projects:
                Array.isArray(aiResume.projects)
                    ? aiResume.projects
                        .map(project => {
                            if (typeof project === "string") {
                                return project;
                            }

                            return `${project.title || ""}: ${project.description || ""}`;
                        })
                        .join("\n")
                    : aiResume.projects || "",

            certifications:
                Array.isArray(aiResume.certifications)
                    ? aiResume.certifications.join(", ")
                    : aiResume.certifications || "",


            // ======================================
            // Scores
            // ======================================

            resumeScore:
                Number(aiResume.resumeScore) || 0,

            atsScore:
                Number(aiResume.atsScore) || 0,

            placementReady:
                Number(aiResume.placementReady) || 0

        });


        // ======================================
        // Send Response to Frontend
        // ======================================

        res.status(200).json({

            success: true,

            message: "AI Resume Generated Successfully",

            data: aiResume,

            resumeId: resume._id

        });


    } catch (error) {

        console.error("AI Resume Generation Error:", error);

        res.status(500).json({

            success: false,

            message: "AI Resume Generation Failed"

        });

    }

};