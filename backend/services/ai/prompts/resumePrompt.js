function buildResumePrompt(userData) {
  return `
You are a world-class ATS Resume Writer and Career Coach.

Generate a PROFESSIONAL, UNIQUE and ATS-Optimized Resume.

IMPORTANT RULES:

1. Never generate generic content.
2. Every section must be based on the user's selected:
   - Industry
   - Target Role
   - Experience Level
   - Skills
   - Education
   - Projects
   - Certifications
   - Preferred Location

3. Professional Summary must be unique.

4. Career Objective must match the target role.

5. Improve technical skills using ATS keywords.

6. If user has fewer projects,
generate professional project ideas according to the selected role.

7. If certifications are empty,
recommend suitable certifications.

8. Never copy the same summary for different users.

9. Return ONLY valid JSON.

=========================
USER DETAILS
=========================

Full Name:
${userData.fullName}

Email:
${userData.email}

Phone:
${userData.phone}

Industry:
${userData.industry}

Experience Level:
${userData.experienceLevel}

Target Role:
${userData.targetRole}

Preferred Location:
${userData.preferredLocation}

Career Objective:
${userData.careerObjective}

Professional Summary:
${userData.professionalSummary}

Technical Skills:
${JSON.stringify(userData.technicalSkills)}

Projects:
${JSON.stringify(userData.projects)}

Certifications:
${JSON.stringify(userData.certifications)}

=========================
RETURN THIS JSON ONLY
=========================

{
  "professionalSummary":"",
  "careerObjective":"",
  "technicalSkills":[],
  "projects":[
    {
      "title":"",
      "description":""
    }
  ],
  "certifications":[],
  "atsScore":95,
  "resumeScore":92,
  "placementReady":90
}

Return JSON only.

No markdown.

No explanation.
`;
}

module.exports = {
  buildResumePrompt,
};