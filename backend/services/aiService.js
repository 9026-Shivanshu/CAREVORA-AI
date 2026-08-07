const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateResumeWithAI(userData) {

    const prompt = `
You are an expert ATS Resume Writer.

Generate a professional resume in JSON format.

User Information:

Full Name: ${userData.fullName}
Email: ${userData.email}
Phone: ${userData.phone}
Address: ${userData.address}
Career Category: ${userData.careerCategory}
Target Job: ${userData.targetJob}
Experience: ${userData.experience}
Job Location: ${userData.jobLocation}
Skills: ${userData.technicalSkills}
Projects: ${userData.projects}
Certifications: ${userData.certifications}

Instructions:

Return ONLY valid JSON.

Format:

{
  "professionalSummary":"",
  "careerObjective":"",
  "technicalSkills":[
    ""
  ],
  "projects":[
    {
      "title":"",
      "description":""
    }
  ],
  "certifications":[
    ""
  ],
  "atsScore":95,
  "resumeScore":92,
  "placementReady":90
}

Do not return markdown.
Do not return explanation.
Return JSON only.
`;

    try {

        const response = await ai.models.generateContent({
         model: "gemini-2.0-flash",
            contents: prompt
        });

        return JSON.parse(response.text);

    } catch (error) {

        console.error("Gemini Error:", error);

        throw error;

    }

}

module.exports = {
    generateResumeWithAI
};