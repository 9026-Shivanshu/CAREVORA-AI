// ==========================================
// PATHLY AI
// Dashboard V2
// ==========================================

// Get User

const user = JSON.parse(localStorage.getItem("user"));

// User Name

const userName = document.getElementById("userName");

if (user) {

    userName.innerHTML = user.fullName;

}

// ATS Score

const atsScore = localStorage.getItem("atsScore");

if (atsScore) {

    document.getElementById("atsScore").innerHTML = atsScore + "%";

    document.getElementById("resumeScore").innerHTML = atsScore + "%";

}

// Logout

document.getElementById("logoutBtn").addEventListener("click", () => {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        localStorage.removeItem("atsScore");

        window.location.href = "login.html";

    }

});
// =====================================
// Load Interview History
// =====================================

async function loadInterviewHistory() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/interview/history", {

            method: "GET",

            headers: {

                "Authorization": `Bearer ${token}`

            }

        });

        const data = await response.json();

        const table = document.getElementById("historyTable");

        table.innerHTML = "";

        if (!data.success || data.interviews.length === 0) {

            table.innerHTML = `

            <tr>

                <td colspan="7">

                    No Interview History Found

                </td>

            </tr>

            `;

            return;

        }

        data.interviews.forEach(interview => {

            const date = new Date(interview.createdAt);

            const row = `

            <tr>

                <td>${date.toLocaleDateString()}</td>

                <td>${interview.interviewType}</td>

                <td>${interview.difficulty}</td>

                <td>${interview.score}%</td>

                <td>${interview.confidence}%</td>

                <td>${interview.communication}%</td>

                <td>${interview.grammar}%</td>

            </tr>

            `;

            table.innerHTML += row;

        });

    }

    catch (error) {

        console.error(error);

    }

}

loadInterviewHistory();
// ======================================
// Dashboard Live Statistics
// ======================================

async function loadDashboardStats() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/dashboard/stats", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        if (!data.success) return;

        document.getElementById("resumeScore").innerText =
            data.resumeScore + "%";

        document.getElementById("atsScore").innerText =
            data.atsScore + "%";

        document.getElementById("interviewScore").innerText =
            data.interviewScore + "%";

        document.getElementById("totalInterviews").innerText =
            data.totalInterviews;

    }

    catch (error) {

        console.error("Dashboard Error:", error);

    }

}

loadDashboardStats();