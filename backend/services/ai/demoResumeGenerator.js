function generateDemoResume(userData) {

  const role = (userData.targetRole || "").toLowerCase();
  const industry = (userData.industry || "").toLowerCase();

  let summary = "";
  let objective = "";
  let skills = [];
  let project = {
    title: "Professional Project",
    description: ""
  };
  let certifications = [];

  // Frontend Developer
  if (role.includes("frontend")) {

    summary = `${userData.fullName} is an enthusiastic Frontend Developer with strong knowledge of HTML, CSS, JavaScript and modern UI development. Passionate about building responsive, user-friendly and ATS-compliant web applications.`;

    objective = "To obtain a Frontend Developer position where I can create responsive web applications, improve user experience and continuously enhance my technical expertise.";

    skills = [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "Responsive Design",
      "Git",
      "REST API"
    ];

    project = {
      title: "Responsive E-Commerce Website",
      description:
        "Designed and developed a responsive e-commerce website with authentication, product management and modern UI."
    };

    certifications = [
      "Responsive Web Design",
      "JavaScript Certification"
    ];

  }

  // Java Developer
  else if (role.includes("java")) {

    summary = `${userData.fullName} is a Java Developer with strong understanding of Core Java, OOP concepts and backend application development.`;

    objective = "Seeking a Java Developer role to build secure and scalable enterprise applications.";

    skills = [
      "Java",
      "Spring Boot",
      "MySQL",
      "REST API",
      "Git"
    ];

    project = {
      title: "Bank Management System",
      description:
        "Developed a banking management application using Java, MySQL and REST APIs."
    };

    certifications = [
      "Oracle Java Certification"
    ];

  }

  // Data Analyst
  else if (role.includes("data")) {

    summary = `${userData.fullName} is a Data Analyst skilled in transforming raw data into meaningful business insights.`;

    objective = "To work as a Data Analyst and support business decisions using data-driven solutions.";

    skills = [
      "Python",
      "SQL",
      "Excel",
      "Power BI",
      "Data Visualization"
    ];

    project = {
      title: "Sales Dashboard",
      description:
        "Built an interactive dashboard for sales analysis using Power BI and SQL."
    };

    certifications = [
      "Google Data Analytics"
    ];

  }

  // Default
  else {

    summary = `${userData.fullName} is a motivated professional eager to build a successful career in the ${industry || "technology"} industry.`;

    objective = `Seeking a challenging ${userData.targetRole || "professional"} position to apply my skills, learn continuously and contribute to organizational success.`;

    skills = Array.isArray(userData.technicalSkills)
      ? userData.technicalSkills
      : typeof userData.technicalSkills === "string"
      ? userData.technicalSkills.split(",").map(s => s.trim())
      : [];

    project = {
      title: "Professional Project",
      description:
        Array.isArray(userData.projects)
          ? userData.projects.join(", ")
          : userData.projects || "Project details not provided."
    };

    certifications = Array.isArray(userData.certifications)
      ? userData.certifications
      : typeof userData.certifications === "string"
      ? userData.certifications.split(",").map(c => c.trim())
      : [];
  }

  return {

    professionalSummary: summary,

    careerObjective: objective,

    technicalSkills: skills,

    projects: [project],

    certifications: certifications,

    atsScore: 94,

    resumeScore: 92,

    placementReady: 91

  };

}

module.exports = {
  generateDemoResume
};