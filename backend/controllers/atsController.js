const fs = require('fs');
const pdfParse = require('pdf-parse');
const ResumeHistory = require('../models/ResumeHistory');
const ATSAnalysis = require('../models/ATSAnalysis');
const { generateContent } = require('../services/ai/providerManager');
const jobATSPrompt = require('../services/ai/prompts/jobATS_Prompt');

exports.analyzeResume = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required'
      });
    }
const { targetRole = '', jobDescription = '' } = req.body;
    const role = req.body.role || '';

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    const text = pdfData.text;

   let prompt;

if (jobDescription.trim()) {
  prompt = jobATSPrompt({
    resumeText: text,
    targetRole: targetRole || role,
    jobDescription
  });
} else {
  prompt = `
You are an advanced ATS and career intelligence AI for CAREVORA AI.

Target role: ${targetRole || role}

Resume text:
${text}

IMPORTANT:
- Detect the actual field from the resume.
- Do not assume the field is IT.
- Support all professional fields including IT, Nursing, Teaching, Commerce, Law, Engineering, Research, Agriculture, Hotel Management, Arts and others.
- Analyze the resume based only on information actually present.
- Never invent skills, experience, education or certifications.
- Return ONLY valid JSON.

Required JSON format:
{
  "detectedField": "",
  "atsScore": 0,
  "foundSkills": [],
  "missingSkills": [],
  "suggestions": [],
  "strengths": [],
  "priorityActions": []
}
`;
}

    const aiResponse = await generateContent(prompt);

    let result;

    try {
      result = JSON.parse(aiResponse);
    } catch (e) {

      console.error('AI JSON Parse Error:', aiResponse);

      return res.status(500).json({
        success: false,
        message: 'AI response parsing failed'
      });
    }
// Save resume history
await ResumeHistory.create({
  user: req.user ? req.user._id : null,
  resumeName: req.file.originalname,
  resumeUrl: req.file.path,
  atsScore: result.atsScore || 0,
  detectedRole: role || 'Unknown',
  detectedField: 'Unknown'
});
// Save detailed ATS analysis

const userId = req.user?._id || req.user?.id;

if (userId) {
  await ATSAnalysis.create({
   user: userId,
    resumeName: req.file.originalname,

    targetRole: targetRole || role || '',

    jobDescription: jobDescription || '',

    analysisMode: jobDescription.trim()
      ? 'job-specific'
      : 'general',

    atsScore: result.atsScore || 0,

    jobMatch: result.jobMatch || 0,

    matchedSkills: result.matchedSkills || result.foundSkills || [],

    missingSkills: result.missingSkills || [],

    matchedKeywords: result.matchedKeywords || [],

    missingKeywords: result.missingKeywords || [],

    experienceMatch: result.experienceMatch || 0,

    educationMatch: result.educationMatch || 0,

    responsibilitiesMatch:
      result.responsibilitiesMatch || 0,

    strengths: result.strengths || [],

    improvements:
      result.improvements ||
      result.suggestions ||
      [],

    aiSuggestions:
      result.aiSuggestions ||
      result.suggestions ||
      [],

    applyReadiness:
      result.applyReadiness || ''
  });
}
   return res.json({
  success: true,

  detectedField: result.detectedField || '',
  atsScore: result.atsScore || 0,

  // General ATS
  foundSkills: result.foundSkills || result.matchedSkills || [],
  missingSkills: result.missingSkills || [],
  suggestions:
    result.suggestions ||
    result.improvements ||
    result.aiSuggestions ||
    [],

  strengths: result.strengths || [],
  priorityActions: result.priorityActions || [],

  // Job-specific ATS
  jobMatch: result.jobMatch || 0,
  matchedSkills: result.matchedSkills || [],
  matchedKeywords: result.matchedKeywords || [],
  missingKeywords: result.missingKeywords || [],

  experienceMatch: result.experienceMatch || 0,
  educationMatch: result.educationMatch || 0,
  responsibilitiesMatch: result.responsibilitiesMatch || 0,

  improvements: result.improvements || [],
  aiSuggestions: result.aiSuggestions || [],

  applyReadiness: result.applyReadiness || '',
  summary: result.summary || '',

  analysisMode: jobDescription.trim()
    ? 'job-specific'
    : 'general'
});

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'ATS analysis failed'
    });
  }
};
exports.generateJD = async (req, res) => {
  try {
    const {
      company = '',
      targetRole = '',
      experience = '',
      location = '',
      skills = ''
    } = req.body;

    if (!targetRole.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Target job role is required'
      });
    }

    const prompt = `
You are CAREVORA AI's Job Description Generator.

Generate a professional reference Job Description based on the information provided below.

IMPORTANT:
- This is an AI-generated reference JD.
- Do NOT claim that it is the official job description of the company.
- Do NOT invent specific company policies, salary, benefits, or requirements.
- Keep the JD realistic and relevant to the selected role.
- Do not assume the field is IT.
- Support roles from different fields such as Nursing, Teaching, Commerce, Law, Engineering, IT, Research, Agriculture, Hotel Management, Arts, etc.
- Return ONLY valid JSON.
- Do not use Markdown.
- Do not add text outside JSON.

Company:
${company || 'Not specified'}

Target Role:
${targetRole}

Experience:
${experience || 'Not specified'}

Location:
${location || 'Not specified'}

Additional Skills:
${skills || 'Not specified'}

Return exactly this JSON structure:

{
  "company": "",
  "targetRole": "",
  "experience": "",
  "location": "",
  "jobTitle": "",
  "summary": "",
  "responsibilities": [],
  "requiredSkills": [],
  "preferredSkills": [],
  "education": [],
  "experienceRequirements": [],
  "certifications": [],
  "keywords": [],
  "referenceNote": "AI-generated reference JD. Verify against the official company job posting before applying."
}
`;

    const aiResponse = await generateContent(prompt);

    let result;

    try {
      result = JSON.parse(aiResponse);
    } catch (error) {
      console.error('JD JSON Parse Error:', aiResponse);

      return res.status(500).json({
        success: false,
        message: 'AI JD response parsing failed'
      });
    }

    return res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Generate JD Error:', error);

    return res.status(500).json({
      success: false,
      message: 'JD generation failed'
    });
  }
};