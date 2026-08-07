// ==========================================
// PATHLY AI
// Profile
// ==========================================

// User Details

const user = JSON.parse(localStorage.getItem("user"));

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