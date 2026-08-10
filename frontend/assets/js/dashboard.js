

/// ================================
// Login Check
// ================================

const admin = JSON.parse(localStorage.getItem("adminData"));
const token = localStorage.getItem("adminToken");
let dashboardChart = null;
if (!admin || !token) {
    window.location.href = "/admin/login.html";
}

// ================================
// Show Super Admin Menu
// ================================

const adminMenu = document.getElementById("adminManagementMenu");

if (adminMenu) {

    if (admin.role === "super_admin") {
        adminMenu.style.display = "block";
    } else {
        adminMenu.style.display = "none";
    }

}

// ================================
// Load Dashboard Statistics
// ================================

async function loadDashboardStats() {

    try {

        const response = await fetch(
"http://localhost:5000/api/dashboard/admin-stats",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!data.success) {
           showError(data.message);
            return;
        }

        document.getElementById("totalUsers").textContent =
            data.data.totalUsers;

        document.getElementById("totalAdmins").textContent =
            data.data.totalAdmins;

        document.getElementById("totalResumes").textContent =
            data.data.totalResumes;

        document.getElementById("totalInterviews").textContent =
            data.data.totalInterviews;

    } catch (error) {

        console.error(error);

    }

}

loadDashboardStats();
// ================================
// Load Recent Activities
// ================================

async function loadRecentActivities() {

    try {

        const response = await fetch(
"http://localhost:5000/api/dashboard/recent-activities",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!data.success) return;

        const activityContainer =
            document.getElementById("recentActivity");

        activityContainer.innerHTML = "";

        data.data.forEach(activity => {

            activityContainer.innerHTML += `

                <div class="activity-item">

                    <strong>${activity.admin?.fullName || "Unknown Admin"}</strong>

                    <p>${activity.description}</p>

                    <small>${new Date(activity.createdAt).toLocaleString()}</small>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

loadRecentActivities();
// ================================
// Dashboard Chart
// ================================

async function loadDashboardChart() {
    try {

        const canvas = document.getElementById("dashboardChart");
        if (!canvas) return;

        // Purana chart destroy
        if (dashboardChart) {
            dashboardChart.destroy();
            dashboardChart = null;
        }

        const response = await fetch(
"http://localhost:5000/api/dashboard/charts",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const result = await response.json();

        if (!result.success) return;

        const labels = [
            "Jan","Feb","Mar","Apr","May","Jun",
            "Jul","Aug","Sep","Oct","Nov","Dec"
        ];

        const users = Array(12).fill(0);
        const resumes = Array(12).fill(0);
        const interviews = Array(12).fill(0);

        result.data.users.forEach(item => {
            users[item._id.month - 1] = item.count;
        });

        result.data.resumes.forEach(item => {
            resumes[item._id.month - 1] = item.count;
        });

        result.data.interviews.forEach(item => {
            interviews[item._id.month - 1] = item.count;
        });

        const ctx = canvas.getContext("2d");

        dashboardChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: "Users",
                        data: users,
                        backgroundColor: "#60a5fa"
                    },
                    {
                        label: "Resumes",
                        data: resumes,
                        backgroundColor: "#f472b6"
                    },
                    {
                        label: "Interviews",
                        data: interviews,
                        backgroundColor: "#fdba74"
                    }
                ]
            },
            options: {
                responsive: true,
               maintainAspectRatio: true,
                animation: false,
                resizeDelay: 500,
                plugins: {
                    legend: {
                        position: "top"
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    } catch (err) {
        console.error("Dashboard Chart Error:", err);
    }
}
loadDashboardChart();
// ==============================
// Logout
// ==============================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

   logoutBtn.addEventListener("click", async function () {

    const confirmed = await showConfirm(
        "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    localStorage.clear();

    window.location.href = "login.html";

});
}
// =====================================
// Notification Panel
// =====================================

const notificationBtn =
document.getElementById("notificationBtn");

const notificationPanel =
document.getElementById("notificationPanel");

if(notificationBtn){

    notificationBtn.addEventListener("click",()=>{

        notificationPanel.classList.toggle("active");

    });

}

// Click outside to close

document.addEventListener("click",(e)=>{

    if(
        notificationPanel &&
        !notificationPanel.contains(e.target) &&
        !notificationBtn.contains(e.target)
    ){

        notificationPanel.classList.remove("active");

    }

});
// =====================================
// Profile Dropdown
// =====================================

const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");
const logoutDropdown = document.getElementById("logoutDropdown");

if (profileBtn) {

    profileBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        profileDropdown.classList.toggle("active");

    });

}

document.addEventListener("click", () => {

    if (profileDropdown) {

        profileDropdown.classList.remove("active");

    }

});

// Logout from Dropdown

if (logoutDropdown) {

    logoutDropdown.addEventListener("click", (e) => {

        e.preventDefault();

        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");
        localStorage.removeItem("adminRole");

        window.location.href = "/admin/login.html";

    });

}
// =====================================
// Dashboard Search
// =====================================

const dashboardSearch = document.getElementById("dashboardSearch");

if (dashboardSearch) {

    dashboardSearch.addEventListener("keyup", function (e) {

        if (e.key !== "Enter") return;

        const value = this.value.trim().toLowerCase();

        switch (value) {

            case "dashboard":
                window.location.href = "/admin/dashboard.html";
                break;

            case "admin":
            case "admins":
                window.location.href = "/admin/";
                break;

            case "students":
                window.location.href = "/admin/student.html";
                break;

            case "recruiters":
                window.location.href = "/admin/recruiters.html";
                break;

            case "jobs":
                window.location.href = "/admin/jobs.html";
                break;

            case "reports":
                window.location.href = "/admin/reports.html";
                break;

            case "settings":
                window.location.href = "/admin/settings.html";
                break;

            default:
                alert("No matching page found.");

        }

    });

}
// =====================================
// Profile Links
// =====================================

const profileLink = document.getElementById("profileLink");
const changePasswordLink = document.getElementById("changePasswordLink");

if (profileLink) {

   profileLink.addEventListener("click", function (e) {

    e.preventDefault();

   document.getElementById("dashboardContent").style.display="none";

    document.getElementById("profileSection").style.display = "block";

});

}

if (changePasswordLink) {

    changePasswordLink.addEventListener("click", function (e) {

        e.preventDefault();

        document.getElementById("dashboardContent").style.display = "none";

        document.getElementById("profileSection").style.display = "none";

        document.getElementById("changePasswordSection").style.display = "block";

        document.getElementById("profileDropdown").style.display = "none";

    });

}
// =====================================
// Dashboard Menu
// =====================================

const dashboardMenu = document.getElementById("dashboardMenu");
// =====================================
// Edit Profile
// =====================================

const editProfileBtn = document.getElementById("editProfileBtn");
const saveProfileBtn = document.getElementById("saveProfileBtn");
const cancelProfileBtn = document.getElementById("cancelProfileBtn");

const editableFields = [
    "fullName",
    "phone",
    "department"
];

function setProfileEditable(enable) {

    editableFields.forEach(id => {

        const input = document.getElementById(id);

        if (input) {

            input.readOnly = !enable;

        }

    });

}

setProfileEditable(false);

if (editProfileBtn) {

    editProfileBtn.addEventListener("click", function () {

        setProfileEditable(true);

    });

}

if (cancelProfileBtn) {
  // =====================================
// Save Profile
// =====================================

if (saveProfileBtn) {

    saveProfileBtn.addEventListener("click", async function () {

        const fullName = document.getElementById("fullName").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const department = document.getElementById("department").value.trim();

        try {

            const token = localStorage.getItem("adminToken");

            const response = await fetch(
                "http://localhost:5000/api/admin/profile",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        fullName,
                        phone,
                        department
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            setProfileEditable(false);

           showSuccess("Profile Updated Successfully.");

            loadProfile();

        } catch (error) {

            console.error(error);

           showError("Server Error");

        }

    });

}
// =====================================
// Profile Photo Preview
// =====================================

const profilePhoto = document.getElementById("profilePhoto");
const profilePreview = document.getElementById("profilePreview");
const changePhotoBtn = document.getElementById("changePhotoBtn");

if (changePhotoBtn) {

    changePhotoBtn.addEventListener("click", function () {

        profilePhoto.click();

    });

}

if (profilePhoto) {

   profilePhoto.addEventListener("change", async function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            profilePreview.src = e.target.result;

        };

        reader.readAsDataURL(file);
// Upload Image to Server

const formData = new FormData();

formData.append("profileImage", file);

try {

    const token = localStorage.getItem("adminToken");

    const response = await fetch(
        "http://localhost:5000/api/admin/profile-image",
        {

            method: "PUT",

            headers: {

                Authorization: `Bearer ${token}`

            },

            body: formData

        }
    );

    const data = await response.json();

    if (!response.ok) {

        alert(data.message);

        return;

    }

   showSuccess("Profile Photo Updated Successfully.");

    loadProfile();

} catch (error) {

    console.error(error);

 showError("Image Upload Failed");

}
    });

}

    cancelProfileBtn.addEventListener("click", function () {

        setProfileEditable(false);

    });

}


if (dashboardMenu) {

    dashboardMenu.addEventListener("click", function (e) {

        e.preventDefault();

        document.getElementById("dashboardContent").style.display = "block";

        document.getElementById("profileSection").style.display = "none";

    });

}
// =====================================
// Cancel Password
// =====================================

const cancelPasswordBtn = document.getElementById("cancelPasswordBtn");

if (cancelPasswordBtn) {

    cancelPasswordBtn.addEventListener("click", function () {

        document.getElementById("changePasswordSection").style.display = "none";

        document.getElementById("dashboardContent").style.display = "block";

    });

}
// =====================================
// Show / Hide Password
// =====================================

const togglePasswordIcons = document.querySelectorAll(".toggle-password");

togglePasswordIcons.forEach(icon => {

    icon.addEventListener("click", function () {

        const target = document.getElementById(this.dataset.target);

        if (target.type === "password") {

            target.type = "text";

            this.classList.remove("fa-eye");

            this.classList.add("fa-eye-slash");

        } else {

            target.type = "password";

            this.classList.remove("fa-eye-slash");

            this.classList.add("fa-eye");

        }

    });

});
// =====================================
// Live Password Strength + Rule Validation
// =====================================

const newPassword = document.getElementById("newPassword");

if (newPassword) {

    const strengthBar = document.getElementById("strengthBar");
    const strengthText = document.getElementById("strengthText");

    const ruleLength = document.getElementById("ruleLength");
    const ruleUpper = document.getElementById("ruleUpper");
    const ruleNumber = document.getElementById("ruleNumber");
    const ruleSpecial = document.getElementById("ruleSpecial");

    newPassword.addEventListener("input", function () {

        const password = this.value;

        let score = 0;

        const hasLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);

        updateRule(ruleLength, hasLength, "Minimum 8 Characters");
        updateRule(ruleUpper, hasUpper, "One Uppercase Letter");
        updateRule(ruleNumber, hasNumber, "One Number");
        updateRule(ruleSpecial, hasSpecial, "One Special Character");

        if (hasLength) score++;
        if (hasUpper) score++;
        if (hasNumber) score++;
        if (hasSpecial) score++;

        switch (score) {

            case 1:
                strengthBar.style.width = "25%";
                strengthBar.style.background = "#ef4444";
                strengthText.textContent = "Weak";
                break;

            case 2:
                strengthBar.style.width = "50%";
                strengthBar.style.background = "#f59e0b";
                strengthText.textContent = "Medium";
                break;

            case 3:
                strengthBar.style.width = "75%";
                strengthBar.style.background = "#3b82f6";
                strengthText.textContent = "Good";
                break;

            case 4:
                strengthBar.style.width = "100%";
                strengthBar.style.background = "#22c55e";
                strengthText.textContent = "Strong";
                break;

            default:
                strengthBar.style.width = "0%";
                strengthBar.style.background = "#ef4444";
                strengthText.textContent = "Password Strength";

        }

    });

    function updateRule(element, valid, text) {

        if (valid) {

            element.innerHTML = "✅ " + text;
            element.style.color = "#22c55e";

        } else {

            element.innerHTML = "❌ " + text;
            element.style.color = "#ef4444";

        }

    }

}
// =====================================
// Update Password Validation
// =====================================

const updatePasswordBtn =
document.getElementById("updatePasswordBtn");

if(updatePasswordBtn){

updatePasswordBtn.addEventListener("click",async()=>{

const currentPassword =
document.getElementById("currentPassword").value.trim();

const newPassword =
document.getElementById("newPassword").value.trim();

const confirmPassword =
document.getElementById("confirmPassword").value.trim();


// Empty Validation

if(!currentPassword || !newPassword || !confirmPassword){

alert("Please fill all fields.");

return;

}


// Password Match

if(newPassword !== confirmPassword){

alert("New Password and Confirm Password do not match.");

return;

}


// Same Password

if(currentPassword === newPassword){

alert("New Password must be different from Current Password.");

return;

}


const token = localStorage.getItem("adminToken");

try {

    const response = await fetch(
        "http://localhost:5000/api/admin/change-password",
        {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify({

                currentPassword,
                newPassword

            })

        }
    );

    const data = await response.json();

    if (!response.ok) {

        alert(data.message);

        return;

    }

   showSuccess("Password Changed Successfully. Please login again.");

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    localStorage.removeItem("adminRole");

    window.location.href = "/admin/login.html";

} catch (error) {

    console.error(error);

   showError("Server Error");

}

});
}
// =====================================
// Load Admin Profile
// =====================================

async function loadProfile(){

try{

const token=localStorage.getItem("adminToken");

const response=await fetch(
"http://localhost:5000/api/admin/profile",
{
headers:{
Authorization:`Bearer ${token}`
}
});

const data=await response.json();

if(!data.success){

showError(data.message);

return;

}

const admin=data.admin;

document.getElementById("fullName").value=admin.fullName || "";

document.getElementById("email").value=admin.email || "";

document.getElementById("phone").value=admin.phone || "";

document.getElementById("department").value=admin.department || "";

document.getElementById("createdDate").value=
new Date(admin.createdAt).toLocaleString();

document.getElementById("lastLogin").value=
new Date(admin.lastLogin).toLocaleString();

document.getElementById("profileName").textContent=
admin.fullName;
document.getElementById("adminName").textContent =
admin.fullName;
updateDashboardGreeting(admin);
// Load Profile Image

if (admin.profileImage) {

    document.getElementById("profilePreview").src =
        "http://localhost:5000" + admin.profileImage;

}
}
catch(error){

console.error(error);

}

}

loadProfile();
// ======================================
// Dashboard Greeting
// ======================================

function updateDashboardGreeting(admin) {

    const greeting = document.getElementById("dashboardGreeting");
    const description = document.getElementById("dashboardDescription");

    const hour = new Date().getHours();

    let wish = "Welcome";

    if (hour >= 5 && hour < 12) {

        wish = "Good Morning";

    } else if (hour >= 12 && hour < 17) {

        wish = "Good Afternoon";

    } else if (hour >= 17 && hour < 21) {

        wish = "Good Evening";

    } else {

        wish = "Good Night";

    }

    greeting.textContent = `${wish}, ${admin.fullName} 👋`;

    switch (admin.role) {

        case "super_admin":

            description.textContent =
                "Welcome back to CAREVORA AI. Manage administrators, permissions and system activities.";

            break;

        case "admin":

            description.textContent =
                "Welcome back. Manage students, recruiters and job activities.";

            break;

        case "student":

            description.textContent =
                "Welcome back to your career journey. Build your resume and prepare for placements.";

            break;

        case "recruiter":

            description.textContent =
                "Welcome back. Manage job postings and applications.";

            break;

        default:

            description.textContent =
                "Welcome back to CAREVORA AI.";

    }

}
