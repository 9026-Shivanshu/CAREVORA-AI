const { generateContent } = require('./providerManager');

async function calculatePRI(data) {

  const prompt = `
You are CAREVORA AI Placement Readiness Engine.

Evaluate the candidate for ANY field.

Data:
- Industry: ${data.industry}
- Target Role: ${data.targetRole}
- ATS Score: ${data.atsScore}
- Skills: ${data.skills?.join(', ')}
- Projects Count: ${data.projectsCount}
- Certifications Count: ${data.certificationsCount}
- Experience Level: ${data.experienceLevel}
- Communication Potential: ${data.communicationPotential}
- Learning Agility: ${data.learningAgility}

Return ONLY valid JSON:

{
  "overallPRI": 0,
  "resumeReadiness": 0,
  "skillReadiness": 0,
  "projectReadiness": 0,
  "interviewReadiness": 0,
  "careerClarity": 0,
  "placementChance": "",
  "next30DaysPlan": []
}
`;

  const response = await generateContent(prompt);

  return JSON.parse(response);
}

module.exports = { calculatePRI };