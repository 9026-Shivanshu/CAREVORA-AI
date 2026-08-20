/* =====================================================
   CAREVORA AI
   Resume Builder
   resume.js
===================================================== */

"use strict";

/* =====================================================
   Global Object
===================================================== */

window.ResumeBuilder = {

    elements: {},

    init() {

        console.log("✅ Resume Builder Started");

        this.cacheElements();

        this.bindEvents();
        this.loadDraft();
        this.validateAIResume();

    },

    cacheElements() {

        this.elements = {
industry: document.getElementById("industry"),
targetRole: document.getElementById("targetRole"),

            educationContainer: document.getElementById("educationContainer"),
            addEducationBtn: document.getElementById("addEducationBtn"),

            skillsContainer: document.getElementById("skillsContainer"),
            addSkillBtn: document.getElementById("addSkillBtn"),

            experienceContainer: document.getElementById("experienceContainer"),
            addExperienceBtn: document.getElementById("addExperienceBtn"),

              
            projectsContainer: document.getElementById("projectsContainer"),
            addProjectBtn: document.getElementById("addProjectBtn"),

            certificationContainer: document.getElementById("certificationContainer"),
            addCertificationBtn: document.getElementById("addCertificationBtn"),

            languageContainer: document.getElementById("languageContainer"),
            addLanguageBtn: document.getElementById("addLanguageBtn"),

            previewResumeBtn: document.getElementById("previewResumeBtn"),
            generateResumeBtn: document.getElementById("generateResumeBtn"),
            saveResumeBtn: document.getElementById("saveResumeBtn"),
            saveDraftBtn: document.getElementById("saveDraftBtn"),
            clearDraftBtn: document.getElementById("clearDraftBtn"),
            downloadPdfBtn: document.getElementById("downloadPdfBtn"),
            resumeUpload: document.getElementById("resumeUpload"),
            uploadResumeBtn: document.getElementById("uploadResumeBtn"),
            printResumeBtn: document.getElementById("printResumeBtn"),
             aiImproveBtn: document.getElementById("aiImproveBtn"),
            resumeTemplate: document.getElementById("resumeTemplate")

        };
//this.elements.generateResumeBtn.disabled = true;
    },

    bindEvents() {

        if (this.elements.addEducationBtn) {
            this.elements.addEducationBtn.addEventListener(
                "click",
                () => this.addEducation()
            );
        }

        if (this.elements.addSkillBtn) {
            this.elements.addSkillBtn.addEventListener(
                "click",
                () => this.addSkill()
            );
        }

        if (this.elements.addExperienceBtn) {
            this.elements.addExperienceBtn.addEventListener(
                "click",
                () => this.addExperience()
            );
        }

        if (this.elements.addProjectBtn) {
            this.elements.addProjectBtn.addEventListener(
                "click",
                () => this.addProject()
            );
        }

        if (this.elements.addCertificationBtn) {
            this.elements.addCertificationBtn.addEventListener(
                "click",
                () => this.addCertification()
            );
        }

        if (this.elements.addLanguageBtn) {
            this.elements.addLanguageBtn.addEventListener(
                "click",
                () => this.addLanguage()
            );
        }

        if (this.elements.previewResumeBtn) {
            this.elements.previewResumeBtn.addEventListener(
                "click",
                () => this.previewResume()
            );
        }
        if (this.elements.generateResumeBtn) {
    this.elements.generateResumeBtn.addEventListener(
        "click",
        () => this.generateResume()
    );
}
if (this.elements.saveResumeBtn) {
    this.elements.saveResumeBtn.addEventListener(
        "click",
        () => this.saveResume()
    );
}
        if (this.elements.saveDraftBtn) {
            this.elements.saveDraftBtn.addEventListener(
                "click",
                () => this.saveDraft()
            );
        }
if (this.elements.clearDraftBtn) {
    this.elements.clearDraftBtn.addEventListener(
        "click",
        () => this.clearDraft()
    );
}
if (this.elements.uploadResumeBtn) {
    this.elements.uploadResumeBtn.addEventListener(
        "click",
        () => this.uploadResume()
    );
}
        if (this.elements.downloadPdfBtn) {
            this.elements.downloadPdfBtn.addEventListener(
                "click",
                () => this.downloadPDF()
            );
        }

        if (this.elements.printResumeBtn) {
            this.elements.printResumeBtn.addEventListener(
                "click",
                () => window.print()
            );
        }
// ===== AUTO ROLE FILL =====
const roleMap = {
    'Healthcare / Nursing': 'Staff Nurse',
    'Teaching / Education': 'Teacher',
    'Professor / Research': 'Research Assistant',
    'Commerce & Finance': 'Accountant',
    'Law': 'Legal Associate',
    'Mechanical Engineering': 'Mechanical Engineer',
    'Civil Engineering': 'Civil Engineer',
    'Electrical Engineering': 'Electrical Engineer',
    'Electronics': 'Electronics Engineer',
    'Digital Marketing': 'Digital Marketing Executive',
    'Hotel Management': 'Hotel Operations Executive',
    'Agriculture': 'Agriculture Officer',
    'Graphic / UI-UX Design': 'UI/UX Designer',
    'Computer Science': 'Software Developer',
    'Information Technology': 'Frontend Developer'
};

this.elements.industry?.addEventListener('change', (e) => {
    const role = roleMap[e.target.value];
    if (role && this.elements.targetRole) {
        this.elements.targetRole.value = role;
    }
});
        if (this.elements.aiImproveBtn) {
            this.elements.aiImproveBtn.addEventListener(
                "click",
                () => this.aiImproveResume()
            );
        }
// ===============================
// Live Resume Preview
// ===============================
const previewFields = [
    "fullName",
    "email",
    "phone",
    "city",
    "professionalSummary",
    "careerObjective",
    "targetRole"
];
previewFields.forEach(id => {

    const input = document.getElementById(id);

    if (input) {
        input.addEventListener("input", () => this.updateLivePreview());
    }
// Live Education Preview
document.addEventListener("input", (e) => {

    if (
        e.target.closest(".education-item")
    ) {

        this.updateEducationPreview();

    }

});
document.addEventListener("input", (e) => {

    if (
        e.target.closest(".skill-item")
    ) {

        this.updateSkillsPreview();

    }

});
document.addEventListener("input", (e) => {

    if (e.target.closest(".experience-item")) {

        this.updateExperiencePreview();

    }

});
document.addEventListener("input", (e) => {

    if (e.target.closest(".project-item")) {

        this.updateProjectsPreview();

    }

});
document.addEventListener("input", (e) => {

    if (e.target.closest(".certification-item")) {

        this.updateCertificationsPreview();

    }

});
document.addEventListener("input",(e)=>{

    if(e.target.closest(".language-item")){

        this.updateLanguagesPreview();

    }

});
});
    },
updateLivePreview() {

    document.getElementById("previewName").textContent =
        document.getElementById("fullName").value || "Your Name";

    document.getElementById("previewEmail").textContent =
        document.getElementById("email").value || "your@email.com";

    document.getElementById("previewPhone").textContent =
        document.getElementById("phone").value || "+91 9876543210";

    document.getElementById("previewCity").textContent =
        document.getElementById("city").value || "Lucknow";

    document.getElementById("previewSummary").textContent =
        document.getElementById("professionalSummary").value ||
        "Your professional summary will appear here...";

        document.getElementById("previewObjective").textContent =
    document.getElementById("careerObjective").value ||
    "Your career objective will appear here...";

document.getElementById("previewRole").textContent =
    document.getElementById("targetRole").value ||
    "Frontend Developer";

    this.updateEducationPreview();
    this.updateSkillsPreview();
    this.updateExperiencePreview();
    this.updateProjectsPreview();
    this.updateCertificationsPreview();
    this.updateLanguagesPreview();
    this.validateAIResume();

},
validateAIResume() {

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    

    const skills = [...document.querySelectorAll(".skillName")]
        .filter(skill => skill.value.trim() !== "");

    const projects = [...document.querySelectorAll(".projectName")]
        .filter(project => project.value.trim() !== "");

    const isValid =
    name !== "" &&
    email !== "" &&
    skills.length >= 2 &&
    projects.length >= 1;
this.elements.generateResumeBtn.disabled = false;
},

updateEducationPreview() 
{

    const preview = document.getElementById("previewEducation");

    if (!preview) return;

    const educationItems = document.querySelectorAll(".education-item");

    if (educationItems.length === 0) {

        preview.innerHTML = "<p>No education added.</p>";

        return;

    }

    let html = "";

    educationItems.forEach(item => {

        const qualification = item.querySelector(".qualificationLevel")?.value || "";
        const degree = item.querySelector(".degreeName")?.value || "";
        const specialization = item.querySelector(".specialization")?.value || "";
        const college = item.querySelector(".collegeName")?.value || "";
        const university = item.querySelector(".university")?.value || "";
        const year = item.querySelector(".passingYear")?.value || "";
        const grade = item.querySelector(".grade")?.value || "";

        html += `
        <div class="preview-education-item">

            <strong>${degree || qualification}</strong>

            ${specialization ? `<br>${specialization}` : ""}
            ${college ? `<br>${college}` : ""}
            ${university ? `<br>${university}` : ""}
            ${year ? `<br>${year}` : ""}
            ${grade ? `<br>Grade: ${grade}` : ""}
            <hr>

        </div>
        `;

    });

    preview.innerHTML = html;
   
},
updateSkillsPreview() {

    const preview = document.getElementById("previewSkills");

    if (!preview) return;

    const skills = document.querySelectorAll(".skill-item");

    if (skills.length === 0) {
        preview.innerHTML = "<p>No skills added.</p>";
        return;
    }

    let html = "<ul>";

    skills.forEach(skill => {

        const skillName = skill.querySelector(".skillName")?.value || "";

        if (skillName.trim() !== "") {
            html += `<li>${skillName}</li>`;
        }

    });

    html += "</ul>";

    preview.innerHTML = html;
    this.updateSkillNumbers();

},
updateExperiencePreview() {

    const preview = document.getElementById("previewExperience");

    if (!preview) return;

    const experiences = document.querySelectorAll(".experience-item");

    if (experiences.length === 0) {

        preview.innerHTML = "<p>No experience added.</p>";

        return;

    }

    let html = "";

    experiences.forEach(exp => {

        const jobTitle = exp.querySelector(".jobTitle")?.value || "";
        const company = exp.querySelector(".companyName")?.value || "";
        const startDate = exp.querySelector(".startDate")?.value || "";
        const endDate = exp.querySelector(".endDate")?.value || "";
        const description = exp.querySelector(".jobDescription")?.value || "";

        if (
            jobTitle.trim() === "" &&
            company.trim() === "" &&
            description.trim() === ""
        ) {
            return;
        }

        html += `
            <div class="preview-experience-item">

                <strong>${jobTitle}</strong>

                ${company ? `<br>${company}` : ""}

                ${(startDate || endDate)
                    ? `<br><small>${startDate} - ${endDate || "Present"}</small>`
                    : ""}

                ${description
                    ? `<br>${description}`
                    : ""}

                <hr>

            </div>
        `;

    });

    preview.innerHTML = html || "<p>No experience added.</p>";

},
updateProjectsPreview() {

    const preview = document.getElementById("previewProjects");

    if (!preview) return;

    const projects = document.querySelectorAll(".project-item");

    if (projects.length === 0) {

        preview.innerHTML = "<p>No projects added.</p>";

        return;

    }

    let html = "";

    projects.forEach(project => {

        const projectName = project.querySelector(".projectName")?.value || "";
        const projectType = project.querySelector(".projectType")?.value || "";
        const projectRole = project.querySelector(".projectRole")?.value || "";
        const projectTech = project.querySelector(".projectTech")?.value || "";
        const description = project.querySelector(".projectDescription")?.value || "";

        if (
            projectName.trim() === "" &&
            description.trim() === ""
        ) {
            return;
        }

        html += `
            <div class="preview-project-item">

                <strong>${projectName}</strong>

                ${projectType ? `<br><em>${projectType}</em>` : ""}

                ${projectRole ? `<br>Role: ${projectRole}` : ""}

                ${projectTech ? `<br>Tech: ${projectTech}` : ""}

                ${description ? `<br>${description}` : ""}

                <hr>

            </div>
        `;

    });

    preview.innerHTML = html || "<p>No projects added.</p>";

},
updateCertificationsPreview() {

    const preview = document.getElementById("previewCertifications");

    if (!preview) return;

    const certifications = document.querySelectorAll(".certification-item");

    if (certifications.length === 0) {

        preview.innerHTML = "<p>No certifications added.</p>";

        return;

    }

    let html = "";

    certifications.forEach(cert => {

        const certificationName = cert.querySelector(".certificationName")?.value || "";
        const issuedBy = cert.querySelector(".issuedBy")?.value || "";
        const issueDate = cert.querySelector(".issueDate")?.value || "";
        const expiryDate = cert.querySelector(".expiryDate")?.value || "";

        if (
            certificationName.trim() === "" &&
            issuedBy.trim() === ""
        ) {
            return;
        }

        html += `
            <div class="preview-certification-item">

                <strong>${certificationName}</strong>

                ${issuedBy ? `<br>Issued By: ${issuedBy}` : ""}

                ${(issueDate || expiryDate)
                    ? `<br><small>${issueDate} ${expiryDate ? `- ${expiryDate}` : ""}</small>`
                    : ""}

                <hr>

            </div>
        `;

    });

    preview.innerHTML = html || "<p>No certifications added.</p>";

},
updateLanguagesPreview() {

    const preview = document.getElementById("previewLanguages");

    if (!preview) return;

    const languages = document.querySelectorAll(".language-item");

    if (languages.length === 0) {

        preview.innerHTML = "<p>No languages added.</p>";

        return;

    }

    let html = "<ul>";

    languages.forEach(lang => {

        const language = lang.querySelector(".languageName")?.value || "";
        const level = lang.querySelector(".languageLevel")?.value || "";

        if (language.trim() !== "") {

            html += `<li><strong>${language}</strong> (${level})</li>`;

        }

    });

    html += "</ul>";

    preview.innerHTML = html || "<p>No languages added.</p>";

},
removeItem(button, itemClass, titleClass, titlePrefix, previewFunction) {

    const item = button.closest(itemClass);

    if (!item) return;

    item.remove();

    document.querySelectorAll(itemClass).forEach((element, index) => {

        const title = element.querySelector(titleClass);

        if (title) {
            title.textContent = `${titlePrefix} #${index + 1}`;
        }

    });

    if (typeof previewFunction === "function") {
        previewFunction.call(this);
    }

},
    /* ======================================
       Temporary Functions
    ====================================== */
addEducation() {

    const container = this.elements.educationContainer;

    if (!container) return;

    const educationHTML = `

    <div class="education-item">

        <button
            type="button"
            class="remove-btn">

            ✖ Remove

        </button>

        <div class="grid-2">

            <div class="form-group">

                <label>Qualification Level</label>

                <select class="qualificationLevel">

                    <option>10th</option>

                    <option>12th</option>

                    <option>ITI</option>

                    <option>Diploma</option>

                    <option>Bachelor's Degree</option>

                    <option>Master's Degree</option>

                    <option>Doctorate (PhD)</option>

                </select>

            </div>

            <div class="form-group">

                <label>Course / Degree</label>

                <input
                    type="text"
                    class="degreeName"
                    placeholder="Example: B.Tech">

            </div>

            <div class="form-group">

                <label>Institute</label>

                <input
                    type="text"
                    class="collegeName"
                    placeholder="Institute Name">

            </div>

            <div class="form-group">

                <label>Passing Year</label>

                <input
                    type="number"
                    class="passingYear"
                    placeholder="2026">

            </div>

        </div>

    </div>

    `;

    container.insertAdjacentHTML("beforeend", educationHTML);
this.updateEducationNumbers();
    const removeButtons =
        container.querySelectorAll(".remove-btn");

    removeButtons.forEach(button => {

      button.onclick = () => {

    this.removeItem(
        button,
        ".education-item",
        ".education-title",
        "Education",
        this.updateEducationPreview
    );

};

    });
ResumeBuilder.updateEducationPreview();
},
updateEducationNumbers() {

    const cards = this.elements.educationContainer.querySelectorAll(".education-item");

    cards.forEach((card, index) => {

        let title = card.querySelector(".education-title");

        if (!title) {

            title = document.createElement("h3");
            title.className = "education-title";
            card.prepend(title);

        }

        title.textContent = `Qualification #${index + 1}`;

    });
this.updateEducationPreview();
},addSkill() {

    const container = this.elements.skillsContainer;

    if (!container) return;

    const skillHTML = `

    <div class="skill-item">

        <button
            type="button"
            class="remove-btn">
            ✖ Remove
        </button>

        <div class="grid-2">

            <div class="form-group">
                <label>Skill</label>
                <input
                    type="text"
                    class="skillName"
                    placeholder="Example: JavaScript">
            </div>

            <div class="form-group">
                <label>Category</label>
                <select class="skillCategory">
                    <option>Technical</option>
                    <option>Soft Skill</option>
                    <option>Language</option>
                    <option>Management</option>
                    <option>Other</option>
                </select>
            </div>

            <div class="form-group">
                <label>Proficiency</label>
                <select class="skillLevel">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                </select>
            </div>

            <div class="form-group">
                <label>Experience</label>
                <input
                    type="text"
                    class="skillExperience"
                    placeholder="Example: 2 Years">
            </div>

        </div>

    </div>

    `;

    container.insertAdjacentHTML("beforeend", skillHTML);

    container.querySelectorAll(".remove-btn").forEach(button => {
button.onclick = function () {

    this.closest(".skill-item").remove();

    ResumeBuilder.updateSkillNumbers();

    ResumeBuilder.updateSkillsPreview();

};

    });

    this.updateSkillNumbers();

},
updateSkillNumbers() {

    const cards = this.elements.skillsContainer.querySelectorAll(".skill-item");

    cards.forEach((card, index) => {

        let title = card.querySelector(".skill-title");

        if (!title) {

            title = document.createElement("h3");

            title.className = "skill-title";

            card.prepend(title);

        }

        title.textContent = `Skill #${index + 1}`;

    });

},addExperience() {

    const container = this.elements.experienceContainer;

    if (!container) return;

    const html = `

    <div class="experience-item">

        <button
            type="button"
            class="remove-btn">

            ✖ Remove

        </button>

        <div class="grid-2">

            <div class="form-group">
                <label>Job Title</label>
                <input
                    type="text"
                    class="jobTitle"
                    placeholder="Software Engineer">
            </div>

            <div class="form-group">
                <label>Company Name</label>
                <input
                    type="text"
                    class="companyName"
                    placeholder="ABC Pvt Ltd">
            </div>

            <div class="form-group">
                <label>Start Date</label>
                <input
                    type="month"
                    class="startDate">
            </div>

            <div class="form-group">
                <label>End Date</label>
                <input
                    type="month"
                    class="endDate">
            </div>

        </div>

        <div class="form-group">

            <label>Job Description</label>

            <textarea
                class="jobDescription"
                rows="4"
                placeholder="Describe your responsibilities..."></textarea>

        </div>

    </div>

    `;

    container.insertAdjacentHTML("beforeend", html);

    container.querySelectorAll(".remove-btn").forEach(button => {

        button.onclick = () => {

            this.removeItem(
                button,
                ".experience-item",
                ".experience-title",
                "Experience",
                this.updateExperiencePreview
            );

        };

    });

    this.updateExperienceNumbers();

    this.updateExperiencePreview();

},
updateExperienceNumbers() {

    const cards =
        this.elements.experienceContainer.querySelectorAll(".experience-item");

    cards.forEach((card, index) => {

        let title = card.querySelector(".experience-title");

        if (!title) {

            title = document.createElement("h3");

            title.className = "experience-title";

            card.prepend(title);

        }

        title.textContent = `Experience #${index + 1}`;

    });

},
    addProject() {

        console.log("Project Button Clicked");

    },

    addCertification() {

        console.log("Certification Button Clicked");

    },

   addLanguage() {

    const container = this.elements.languageContainer;

    if (!container) return;

    const html = `

    <div class="language-item">

        <button
            type="button"
            class="remove-btn">

            ✖ Remove

        </button>

        <div class="grid-2">

            <div class="form-group">

                <label>Language</label>

                <input
                    type="text"
                    class="languageName"
                    placeholder="English">

            </div>

            <div class="form-group">

                <label>Proficiency</label>

                <select class="languageLevel">

                    <option>Basic</option>
                    <option>Intermediate</option>
                    <option>Fluent</option>
                    <option>Native</option>

                </select>

            </div>

        </div>

    </div>

    `;

    container.insertAdjacentHTML("beforeend", html);

    container.querySelectorAll(".remove-btn").forEach(button => {

        button.onclick = function () {

            this.closest(".language-item").remove();

            ResumeBuilder.updateLanguagesPreview();

        };

    });

    this.updateLanguagesPreview();

},

   previewResume() {},
saveDraft() {

    const data = {};

    document.querySelectorAll("input, textarea, select").forEach((field) => {

        const key = field.id || field.className;

        if (key) {
            data[key] = field.value;
        }

    });

    localStorage.setItem(
        "resumeDraft",
        JSON.stringify(data)
    );

    alert("Resume Draft Saved Successfully!");

},
async saveResume() {

    const token = localStorage.getItem("token");

    const skills = [...document.querySelectorAll(".skillName")]
        .map(skill => skill.value.trim())
        .filter(skill => skill !== "");

    const projects = [...document.querySelectorAll(".projectName")]
        .map(project => project.value.trim())
        .filter(project => project !== "");

    const certifications = [...document.querySelectorAll(".certificationName")]
        .map(cert => cert.value.trim())
        .filter(cert => cert !== "");

    const resumeData = {

        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,

        industry: document.getElementById("industry").value,
        experienceLevel: document.getElementById("experienceLevel").value,
        targetRole: document.getElementById("targetRole").value,
        preferredLocation: document.getElementById("preferredLocation").value,

        careerObjective: document.getElementById("careerObjective").value,
        professionalSummary: document.getElementById("professionalSummary").value,

        technicalSkills: skills,
        projects: projects,
        certifications: certifications

    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/resume-builder/save",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(resumeData)
            }
        );

        const result = await response.json();

        if (result.success) {

            alert("Resume Saved Successfully!");

        } else {

            alert(result.message || "Failed to save resume");

        }

    } catch (error) {

        console.error(error);
        alert("Error saving resume");

    }

},
clearDraft() {

    localStorage.removeItem("resumeDraft");

    alert("Resume Draft Cleared Successfully!");

    location.reload();

},
loadDraft() {

    const savedData = localStorage.getItem("resumeDraft");

    if (!savedData) return;

    const data = JSON.parse(savedData);

    document.querySelectorAll("input, textarea, select").forEach((field) => {

        const key = field.id || field.className;

        if (data[key] !== undefined) {
            field.value = data[key];
        }

    });

    this.updateLivePreview();

},

async downloadPDF() {

    const resume = document.querySelector(".live-resume-paper");

    if (!resume) {
        alert("Resume Preview not found.");
        return;
    }

    const canvas = await html2canvas(resume, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
    );


        "Resume";

    pdf.save(`${name}_Resume.pdf`);

},
async generateResume() {
console.log("🔥 Generate button clicked");
    const token = localStorage.getItem("token");

const name = document.getElementById("fullName").value.trim();
const email = document.getElementById("email").value.trim();

   const skills = [...document.querySelectorAll(".skillName")]
    .map(skill => skill.value.trim())
    .filter(skill => skill !== "");

const projects = [...document.querySelectorAll(".projectName")]
    .map(project => project.value.trim())
    .filter(project => project !== "");

const certifications = [...document.querySelectorAll(".certificationName")]
    .map(cert => cert.value.trim())
    .filter(cert => cert !== "");

const resumeData = {

    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,

    industry: document.getElementById("industry").value,
    experienceLevel: document.getElementById("experienceLevel").value,
    targetRole: document.getElementById("targetRole").value,
    preferredLocation: document.getElementById("preferredLocation").value,

   careerObjective: "",
professionalSummary: "",

    technicalSkills: skills,
    projects: projects,
    certifications: certifications

};

if (!name) {
    alert("Please fill Full Name");
    return;
}

if (!email) {
    alert("Please fill Email");
    return;
}

if (skills.length < 2) {
    alert("Please add at least 2 skills");
    return;
}

if (projects.length < 1) {
    alert("Please add at least 1 project");
    return;
}
    try {

        const response = await fetch(
            "http://localhost:5000/api/resume-builder/generate-ai",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify(resumeData)

            }
        );

        const result = await response.json();

        if (!result.success) {

            alert(result.message);

            return;

        }

      const ai = result.data;
      console.log("Complete AI Response:", ai);

// Professional Summary
document.getElementById("professionalSummary").value =
    ai.professionalSummary || "";

// Career Objective
document.getElementById("careerObjective").value =
    ai.careerObjective || "";
    // Auto update role if AI suggests a better one
if (ai.targetRole && ai.targetRole.trim() !== "") {
    document.getElementById("targetRole").value = ai.targetRole;
}

// Auto update industry if AI suggests one
if (ai.industry && ai.industry.trim() !== "") {
    document.getElementById("industry").value = ai.industry;
}

// Target Role (AI agar bheje)
if (ai.targetRole) {
    document.getElementById("targetRole").value = ai.targetRole;
}

// AI Skills ko Console me check karo
console.log("AI Skills:", ai.technicalSkills);
console.log("AI Projects:", ai.projects);
console.log("AI Certifications:", ai.certifications);
// =======================
// AI Skills Autofill
// =======================

this.elements.skillsContainer.innerHTML = "";

if (Array.isArray(ai.technicalSkills)) {

    ai.technicalSkills.forEach(skill => {

        this.addSkill();

        const lastSkill =
            this.elements.skillsContainer.lastElementChild;

        lastSkill.querySelector(".skillName").value = skill;

    });

}
// =======================
// AI Projects Autofill
// =======================

this.elements.projectsContainer.innerHTML = "";

if (Array.isArray(ai.projects)) {

    ai.projects.forEach(project => {

        this.addProject();

        const lastProject =
            this.elements.projectsContainer.lastElementChild;

        if (!lastProject) return;

        lastProject.querySelector(".projectName").value =
            project.title || "";

        lastProject.querySelector(".projectDescription").value =
            project.description || "";

    });

}

this.updateProjectsPreview();


// =======================
// AI Certifications Autofill
// =======================

this.elements.certificationContainer.innerHTML = "";

if (Array.isArray(ai.certifications)) {

    ai.certifications.forEach(cert => {

        this.addCertification();

        const lastCert =
            this.elements.certificationContainer.lastElementChild;

        if (!lastCert) return;

        lastCert.querySelector(".certificationName").value = cert;

    });

}

this.updateCertificationsPreview();
this.updateSkillsPreview();

// Live Preview Update
this.updateLivePreview();

alert("AI Resume Generated Successfully!");

    } catch (err) {

        console.error(err);

        alert("AI Generation Failed");

    }

},
async uploadResume() {

    const file = this.elements.resumeUpload.files[0];

    if (!file) {

        alert("Please select your resume first.");

        return;

    }

    const formData = new FormData();

    formData.append("resume", file);

    const token = localStorage.getItem("token");

    try {

        const response = await fetch("http://localhost:5000/api/resume/upload", {

            method: "POST",

            headers: {

                Authorization: `Bearer ${token}`

            },

            body: formData

        });

        const data = await response.json();

        console.log(data);

        if (data.success) {

    document.getElementById("atsResultCard").style.display = "block";

    document.getElementById("atsScore").innerText = data.atsScore + "%";

    document.getElementById("foundSkillsList").innerHTML =
        data.foundSkills.map(skill => `<li>${skill}</li>`).join("");

    document.getElementById("missingSkillsList").innerHTML =
        data.missingSkills.map(skill => `<li>${skill}</li>`).join("");

    alert("Resume Uploaded Successfully!");

} else {

    alert(data.message);

}

    } catch (error) {

        console.error(error);

        alert("Something went wrong.");

    }

}

};
/* =====================================================
   Start Application
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    ResumeBuilder.init();

});
