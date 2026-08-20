const { generateContent } = require('./providerManager');

async function analyzeCareerDNA(data) {

  const prompt = `
You are CAREVORA AI Career DNA Engine.

Analyze the student's career profile for ANY field.

Profile:
- Industry: ${data.industry}
- Experience: ${data.experienceLevel}
- Target Role: ${data.targetRole}
- Skills: ${data.skills?.join(', ')}
- ATS Score: ${data.atsScore || 'Not available'}

Return ONLY valid JSON:

{
  "personalityType": "",
  "coreStrengths": [],
  "workStyle": "",
  "leadershipPotential": 0,
  "communicationPotential": 0,
  "learningAgility": 0,
  "analyticalThinking": 0,
  "recommendedCareerPath": "",
  "growthAreas": []
}
`;

  const response = await generateContent(prompt);

  return JSON.parse(response);
}

module.exports = { analyzeCareerDNA };