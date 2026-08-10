// ==========================================
// CAREVORA AI
// Profile
// ==========================================

// User Details

const user = JSON.parse(localStorage.getItem("user"));

async function loadStudentProfile() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:5000/api/student/profile",
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const data = await response.json();

        console.log("Student Profile:", data);
if (!data.success) return;

const student = data.student;
window.currentStudent = student;

// SHOW SKILLS AFTER PROFILE LOAD
renderSkills(student.skills || []);

const profileImage = document.getElementById("profileImage");
if (student.profileImage && profileImage) {
    profileImage.src =
        `http://localhost:5000${student.profileImage}?t=${Date.now()}`;
}
document.getElementById("profileName").innerHTML = student.fullName;
document.getElementById("profileEmail").innerHTML = student.email;
// Personal Information
document.getElementById("studentPhone").textContent =
    student.phone || "-";

document.getElementById("studentGender").textContent =
    student.gender || "-";

document.getElementById("studentDob").textContent =
    student.dob
        ? new Date(student.dob).toLocaleDateString()
        : "-";
        // Academic Information
document.getElementById("studentCollege").textContent =
    student.college || "-";

document.getElementById("studentCourse").textContent =
    student.course || "-";

document.getElementById("studentBranch").textContent =
    student.branch || "-";

document.getElementById("studentYear").textContent =
    student.year || "-";
    // Career Information
document.getElementById("studentCareerGoal").textContent =
    student.careerGoal || "-";

document.getElementById("studentPreferredRole").textContent =
    student.preferredRole || "-";

document.getElementById("studentPreferredLocation").textContent =
    student.preferredLocation || "-";

document.getElementById("studentExpectedSalary").textContent =
    student.expectedSalary || "-";

document.getElementById("studentBio").textContent =
    student.bio || "-";
    // Social Links
document.getElementById("studentLinkedin").textContent =
    student.linkedin || "-";

document.getElementById("studentGithub").textContent =
    student.github || "-";

document.getElementById("studentPortfolio").textContent =
    student.portfolio || "-";
   document.getElementById("profileProgressBar").style.width =
    student.profileCompletion + "%";

document.getElementById("profilePercentage").textContent =
    student.profileCompletion + "%"; 
console.log(student);
    } catch (error) {

        console.log(error);

    }

}
if (user) {

    document.getElementById("profileName").innerHTML = user.fullName;

    document.getElementById("profileEmail").innerHTML = user.email;

}

// Logout

document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("atsScore");

    window.location.href = "login.html";

});

// Load Resume History

async function loadHistory() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:5000/api/resume/history",
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const data = await response.json();

        if (!data.success) return;

        document.getElementById("resumeCount").innerHTML = data.count;

        const tbody = document.getElementById("historyBody");

        tbody.innerHTML = "";

        if (data.count === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="3" style="text-align:center;">
                        No Resume Uploaded
                    </td>
                </tr>
            `;

            return;
        }

        // Latest ATS Score

        document.getElementById("latestScore").innerHTML =
            data.resumes[0].atsScore + "%";

        data.resumes.forEach((resume) => {

            const date = new Date(resume.uploadedAt)
                .toLocaleDateString();

            tbody.innerHTML += `
                <tr>

                    <td>${resume.fileName}</td>

                    <td>${resume.atsScore}%</td>

                    <td>${date}</td>

                </tr>
            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}

loadHistory();
loadStudentProfile();
const profileSections = {

    personal: [
        {
            label: "Phone",
            id: "phone"
        },
        {
            label: "Gender",
            id: "gender"
        },
        {
            label: "Date of Birth",
            id: "dob"
        }
    ],

    academic: [
        {
            label: "College",
            id: "college"
        },
        {
            label: "Course",
            id: "course"
        },
        {
            label: "Branch",
            id: "branch"
        },
        {
            label: "Year",
            id: "year"
        }
    ],

    career: [
        {
            label: "Career Goal",
            id: "careerGoal"
        },
        {
            label: "Preferred Role",
            id: "preferredRole"
        },
        {
            label: "Preferred Location",
            id: "preferredLocation"
        },
        {
            label: "Expected Salary",
            id: "expectedSalary"
        },
        {
            label: "Bio",
            id: "bio"
        }
    ],

    social: [
        {
            label: "LinkedIn",
            id: "linkedin"
        },
        {
            label: "GitHub",
            id: "github"
        },
        {
            label: "Portfolio",
            id: "portfolio"
        }
    ]

};
// ===== Dynamic Edit Modal =====
const modal = document.getElementById("editModal");
const modalTitle = document.getElementById("modalTitle");
const modalFields = document.getElementById("modalFields");
const closeModal = document.getElementById("closeModal");

// Open modal and generate fields
function openModal(section) {
    modal.style.display = "block";

    const titleMap = {
        personal: "Edit Personal Information",
        academic: "Edit Academic Information",
        career: "Edit Career Information",
        social: "Edit Social Links"
    };

    modalTitle.textContent = titleMap[section];

    const fields = profileSections[section];

    modalFields.innerHTML = "";

    fields.forEach(field => {

        const value = window.currentStudent?.[field.id] || "";

        modalFields.innerHTML += `
            <div class="form-group">
                <label>${field.label}</label>
                <input
                    type="text"
                    id="edit_${field.id}"
                    value="${value}"
                    placeholder="Enter ${field.label}"
                />
            </div>
        `;

    });
}

// Attach edit buttons
document.querySelectorAll(".section-edit-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        openModal(btn.dataset.section);

    });

});

// Close modal
closeModal.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};
// ===== Save Profile Changes =====
document.getElementById("editForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const section = document.querySelector(".section-edit-btn[data-section]")?.dataset.section;

    const updatedData = {};

    Object.values(profileSections).flat().forEach(field => {
        const input = document.getElementById(`edit_${field.id}`);
        if (input) {
            updatedData[field.id] = input.value.trim();
        }
    });

    try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/student/profile/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        });

        const data = await response.json();

        if (data.success) {

            // Update local student object
            window.currentStudent = data.student;

            // Refresh page data
            loadStudentProfile();

            // Close modal
            modal.style.display = "none";

            alert("Profile updated successfully!");

        } else {

            alert(data.message || "Update failed");

        }

    } catch (error) {

        console.error(error);
        alert("Something went wrong");

    }
});
const profileImageInput = document.getElementById("profileImageInput");
const profileImage = document.getElementById("profileImage");
// ===== Profile Image Upload =====
if (profileImageInput) {

    profileImageInput.addEventListener("change", async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        // Preview
        const reader = new FileReader();

        reader.onload = (event) => {
            profileImage.src = event.target.result;
        };

        reader.readAsDataURL(file);

        // Upload to backend
        const formData = new FormData();
        formData.append("profileImage", file);

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/student/profile/image",
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                }
            );

            const data = await response.json();

            console.log(data);

            if (data.success) {

                const imageUrl =
                    `http://localhost:5000${data.image}`;

                profileImage.src = imageUrl;
                // also update current student
if (window.currentStudent) {
    window.currentStudent.profileImage = data.image;
}

                alert("Profile photo updated successfully");

            } else {

                alert(data.message || "Upload failed");

            }

        } catch (error) {

            console.error(error);

            alert("Upload failed");

        }

    });

}
// =====================================
// Skills
// =====================================

async function addSkill() {

    const name = document.getElementById("skillName").value.trim();
    const level = document.getElementById("skillLevel").value;

    if (!name) {
        alert("Enter a skill");
        return;
    }

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:5000/api/student/skills",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ name, level })
            }
        );

        const data = await response.json();

        if (data.success) {

            window.currentStudent.skills = data.skills;

            renderSkills(data.skills);

            document.getElementById("skillName").value = "";

            updateCareerDNA();

        }

    } catch (error) {

        console.error(error);

    }

}

function renderSkills(skills = []) {

    const container = document.getElementById("skillsList");

    if (!container) return;

    container.innerHTML = "";

    skills.forEach(skill => {

        container.innerHTML += `
            <div class="skill-chip ${skill.level.toLowerCase()}">
                <span>${skill.name} (${skill.level})</span>
                <button onclick="deleteSkill('${skill._id}')">×</button>
            </div>
        `;

    });

}

async function deleteSkill(id) {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:5000/api/student/skills/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (data.success) {

            window.currentStudent.skills = data.skills;

            renderSkills(data.skills);

            updateCareerDNA();

        }

    } catch (error) {

        console.error(error);

    }

}

document
    .getElementById("addSkillBtn")
    ?.addEventListener("click", addSkill);

            