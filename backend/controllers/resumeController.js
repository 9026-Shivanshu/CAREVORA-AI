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