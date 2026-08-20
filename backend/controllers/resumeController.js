const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const Resume = require("../models/Resume");
// ==========================================
// Resume Controller
// CAREVORA AI
// ==========================================

exports.uploadResume = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "Please upload a resume."

            });

        }

       // ==============================
// Extract Resume Text
// ==============================

let resumeText = "";

const extension = path.extname(req.file.originalname).toLowerCase();

// PDF

if (extension === ".pdf") {

    const pdfBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(pdfBuffer);

    resumeText = pdfData.text;

}

// DOCX

else if (extension === ".docx") {

    const result = await mammoth.extractRawText({

        path: req.file.path

    });

    resumeText = result.value;

}

// DOC

else if (extension === ".doc") {

    return res.status(400).json({

        success: false,

        message: "DOC files are not supported. Please upload PDF or DOCX."

    });

}

// Invalid

else {

    return res.status(400).json({

        success: false,

        message: "Unsupported file format."

    });

}
console.log("==================================");
console.log("Resume Text:");
console.log(resumeText);
console.log("==================================");
       // ==============================
// Required Skills
// ==============================

const requiredSkills = [

    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "MySQL",
    "SQL",
    "Git",
    "GitHub",
    "Bootstrap",
    "REST API"

];

// Convert Resume Text to Lowercase

const resumeTextLower = resumeText.toLowerCase();

// Found Skills

const foundSkills = [];

// Missing Skills

const missingSkills = [];

// Skill Detection

requiredSkills.forEach(skill => {

if (resumeTextLower.includes(skill.toLowerCase())) {

        foundSkills.push(skill);

    } else {

        missingSkills.push(skill);

    }

});

// ATS Score

const atsScore = Math.round(

    (foundSkills.length / requiredSkills.length) * 100

);
// Save Resume History

await Resume.create({

    user: req.user.id,

    fileName: req.file.originalname,

    atsScore,

    foundSkills,

    missingSkills

});
        res.status(200).json({

    success: true,

    message: "Resume Uploaded Successfully",

    fileName: req.file.originalname,

    resumeText,

    atsScore,

    foundSkills,

    missingSkills

});

    }

  catch (error) {

    console.error("Resume Upload Error:");
    console.error(error);

    res.status(500).json({
        success: false,
        message: error.message
    });

}
};

// ==========================================
// Get User Resume History
// ==========================================

exports.getResumeHistory = async (req, res) => {

    try {

        const resumes = await Resume.find({

            user: req.user.id

        }).sort({

            uploadedAt: -1

        });

        res.status(200).json({

            success: true,

            count: resumes.length,

            resumes

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};
// ==========================================
// Delete Single Resume History
// ==========================================

exports.deleteResumeHistory = async (req, res) => {
    try {

        const resume = await Resume.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Resume deleted successfully"
        });

    } catch (error) {

        console.error("Delete Resume History Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete resume"
        });
    }
};
// ==========================================
// Delete All Resume History
// ==========================================

exports.deleteAllResumeHistory = async (req, res) => {
    try {

        const result = await Resume.deleteMany({
            user: req.user.id
        });

        res.status(200).json({
            success: true,
            message: "All resume history deleted successfully",
            deletedCount: result.deletedCount
        });

    } catch (error) {

        console.error("Delete All Resume History Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to clear resume history"
        });
    }
};