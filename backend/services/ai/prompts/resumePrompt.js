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
10. Expand every project name into a professional, ATS-ready project description.
IMPORTANT: NEVER change, replace, rename, or invent project titles. Preserve the exact project titles provided by the user and generate descriptions only.
11. Project descriptions must:
   - Be 2-4 lines
   - Mention purpose
   - Mention technologies or domain
   - Mention impact or functionality

12. If the project title contains "CAREVORA AI", generate a description about an AI-powered career intelligence platform with resume generation, ATS analysis, career roadmap, adaptive interviews, placement readiness scoring, and skill gap prediction.

13. If the project title contains "E-Commerce", generate a description about authentication, product management, cart, orders, and responsive shopping experience.

14. If the project title contains "Hospital", generate a description about patient management, appointments, medical records, and healthcare workflow.

15. If the project title contains "Attendance", generate a description about attendance tracking, reporting, and management features.

16. For all other project titles, infer the domain from the title and generate a professional description suitable for recruiters and ATS systems.
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