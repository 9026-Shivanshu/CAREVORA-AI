const { generateContent } = require('./providerManager');

async function generateResumeAI(data) {

  const prompt = `
You are CAREVORA AI Resume Intelligence.

Generate professional ATS-friendly resume content AND evaluate the resume quality.

User Data:
- Full Name: ${data.fullName}
- Industry: ${data.industry}
- Experience Level: ${data.experienceLevel}
- Target Role: ${data.targetRole}
- Preferred Location: ${data.preferredLocation}
- Skills: ${data.technicalSkills?.join(', ')}
- Projects: ${data.projects?.join(', ')}
- Certifications: ${data.certifications?.join(', ')}

Rules:
- Do not assume the field is IT.
- If Nursing, generate nursing summary/objective.
- If Teaching, generate teaching summary/objective.
- If Commerce, generate finance/accounting summary/objective.
- If Law, generate legal summary/objective.
- If Engineering, generate engineering summary/objective.
- Keep the resume ATS-friendly and professional.
- Use the user's actual skills, projects and certifications.
- Do not invent certifications or work experience.
- Score the resume based on the information actually provided.
- ATS Score should represent ATS compatibility.
- Resume Score should represent overall resume quality and completeness.
- Placement Readiness should represent how ready the candidate is for the target role.

Scoring Rules:
- atsScore: 0-100
- resumeScore: 0-100
- placementReady: 0-100
- Return scores as numbers only.
- Do not return % symbol.
- Do not use random scores.
- Scores must be based on the user's provided information.

Return ONLY valid JSON.

{
  "careerObjective": "",
  "professionalSummary": "",
  "technicalSkills": [],
  "projects": [
    {
      "title": "",
      "description": ""
    }
  ],
  "certifications": [],
  "atsScore": 0,
  "resumeScore": 0,
  "placementReady": 0
}
`;

  const response = await generateContent(prompt);

  return JSON.parse(response);
}

module.exports = { generateResumeAI };