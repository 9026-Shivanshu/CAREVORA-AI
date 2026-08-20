// ==========================================
// CAREVORA AI
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
console.log("DASHBOARD API DATA:", data);
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

        if (!token) {
            console.log("No token found");
            return;
        }

        const response = await fetch(
            "http://localhost:5000/api/dashboard/stats",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        console.log("DASHBOARD STATS:", data);

        if (!data.success) {
            console.error(data.message);
            return;
        }

        // Resume Score
        document.getElementById("resumeScore").innerText =
            `${data.resumeScore || 0}%`;

        // ATS Score
        document.getElementById("atsScore").innerText =
            `${data.atsScore || 0}%`;

        // Interview Score
        document.getElementById("interviewScore").innerText =
            `${data.interviewScore || 0}%`;

        // Total Interviews
        document.getElementById("totalInterviews").innerText =
            data.totalInterviews || 0;

    } catch (error) {

        console.error(
            "Dashboard Statistics Error:",
            error
        );

    }
}

loadDashboardStats();
// ================= Career DNA Demo =================

function updateCareerDNA(data){

  document.getElementById('frontendValue').textContent = data.frontend + '%';
  document.getElementById('backendValue').textContent = data.backend + '%';
  document.getElementById('dsaValue').textContent = data.dsa + '%';
  document.getElementById('commValue').textContent = data.communication + '%';

  document.getElementById('frontendBar').style.width = data.frontend + '%';
  document.getElementById('backendBar').style.width = data.backend + '%';
  document.getElementById('dsaBar').style.width = data.dsa + '%';
  document.getElementById('commBar').style.width = data.communication + '%';

  document.getElementById('priValue').textContent = data.pri;

}

// Demo values
updateCareerDNA({
  frontend:78,
  backend:65,
  dsa:42,
  communication:71,
  pri:73
});
// =====================================
// Career DNA + PRI from real skills
// =====================================

async function loadCareerDNA() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:5000/api/student/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();
console.log("DASHBOARD API DATA:", data);
        if (!data.success) return;

        const skills = data.student.skills || [];
        const communication =
    parseInt(data.student.communicationSkill) || 0;
        

       let frontend = 0;
let backend = 0;
let dsa = 0;

        skills.forEach(skill => {

            const name = skill.name.toLowerCase();
            const level = skill.level;

            const weight =
                level === "Advanced" ? 15 :
                level === "Intermediate" ? 10 : 5;

            // Frontend
            if (["html", "css", "html/css", "javascript", "react"].includes(name)) {
                frontend += weight;
            }

            // Backend
            if (["node.js", "express", "mongodb", "mysql"].includes(name)) {
                backend += weight;
            }

            // DSA
            if (["java", "python", "c++", "dsa"].includes(name)) {
                dsa += weight;
            }
            // Communication
if (
    [
        "communication",
        "english",
        "public speaking",
        "presentation",
        "soft skills",
        "teamwork"
    ].includes(name)
) {
    communication += weight;
}

        });

        frontend = Math.min(frontend, 100);
        backend = Math.min(backend, 100);
        dsa = Math.min(dsa, 100);

        // Update values
        document.getElementById("frontendValue").textContent = frontend + "%";
        document.getElementById("backendValue").textContent = backend + "%";
        document.getElementById("dsaValue").textContent = dsa + "%";
        document.getElementById("commValue").textContent = communication + "%";

        // Update bars
        document.getElementById("frontendBar").style.width = frontend + "%";
        document.getElementById("backendBar").style.width = backend + "%";
        document.getElementById("dsaBar").style.width = dsa + "%";
        document.getElementById("commBar").style.width = communication + "%";

        // PRI
        const pri = Math.round(
            (frontend + backend + dsa + communication) / 4
        );

        document.getElementById("priValue").textContent = pri;
        const scores = {
    Frontend: frontend,
    Backend: backend,
    DSA: dsa,
    Communication: communication
};

const strength = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
);

const improve = Object.keys(scores).reduce((a, b) =>
    scores[a] < scores[b] ? a : b
);

document.getElementById("strengthText").textContent = strength;
document.getElementById("improveText").textContent = improve;

    } catch (error) {

        console.error(error);

    }

}

// Run on page load
loadCareerDNA();