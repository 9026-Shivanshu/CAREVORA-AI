console.log("admins.js Loaded");
// ===============================
// Admin Management JS
// ===============================

// Elements
const createAdminBtn = document.getElementById("createAdminBtn");
const createAdminModal = document.getElementById("createAdminModal");
const closeModal =
document.getElementById("closeCreateAdminModal");

const cancelBtn =
document.getElementById("cancelCreateAdminBtn");

// Open Modal
createAdminBtn.addEventListener("click", () => {

    createAdminModal.style.display = "flex";

});

// Close Modal (X)
closeModal.addEventListener("click", () => {

    createAdminModal.style.display = "none";

});

// Cancel Button
cancelBtn.addEventListener("click", () => {

    createAdminModal.style.display = "none";

});

// Click Outside
window.addEventListener("click", (e) => {

    if (e.target === createAdminModal) {

        createAdminModal.style.display = "none";

    }

});

// ESC Key
document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        createAdminModal.style.display = "none";

    }

});

// ===============================
// Load All Admins
// ===============================

async function loadAdmins() {

    try {

        const token = localStorage.getItem("adminToken");
// =====================================
// Load Admins for Permission Management
// =====================================

async function loadPermissionAdmins() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/admin/all-admins",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const result = await response.json();

        if (!result.success) return;

        const select = document.getElementById("permissionAdmin");

        if (!select) return;

        select.innerHTML = `
            <option value="">
                -- Select Admin --
            </option>
        `;

        result.data.forEach(admin => {

            select.innerHTML += `
                <option value="${admin._id}">
                    ${admin.fullName} (${admin.email})
                </option>
            `;

        });

    } catch (error) {

        console.error("Permission Admin Load Error:", error);

    }

}
        const response = await fetch(
            "http://localhost:5000/api/admin/all-admins",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        console.log("Admins Data:", data);
        if (data.success) {

    renderTable(data.data);

}

    } catch (error) {

        console.error("Error Loading Admins:", error);

    }

}
 document.addEventListener("DOMContentLoaded", () => {

    loadAdmins();

});
// ===============================
// Create Admin
// ===============================

const createAdminForm = document.getElementById("createAdminForm");
console.log(createAdminForm);

createAdminForm.addEventListener("submit", createAdmin);
async function createAdmin(e) {
console.log("Create Admin Clicked");
    e.preventDefault();

    try {

        const token = localStorage.getItem("adminToken");

       const adminData = {

    fullName: document.getElementById("adminFullName").value.trim(),

    email: document.getElementById("adminEmail").value.trim(),

    phone: document.getElementById("adminPhone").value.trim(),

    department: document.getElementById("adminDepartment").value,

    password: document.getElementById("adminPassword").value,

    confirmPassword: document.getElementById("adminConfirmPassword").value

};
if (adminData.password !== adminData.confirmPassword) {

    alert("Passwords do not match.");

    return;

}console.log("Admin Data :", adminData);
       const response = await fetch(
    "http://localhost:5000/api/admin/create-admin",
    {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify(adminData)

    }
);

const data = await response.json();

console.log(data);
if (data.success) {

    alert("Admin Created Successfully");

    createAdminModal.style.display = "none";

    createAdminForm.reset();

    loadAdmins();
  

} else {

    alert(data.message);

}

    } catch (error) {

        console.error(error);

    }

}

  // ===============================
// Render Admin Table
// ===============================

function renderTable(admins) {

    const tableBody = document.getElementById("adminTableBody");
document.getElementById("totalAdmins").textContent = admins.length;

const activeAdmins = admins.filter(admin => admin.isActive);

document.getElementById("activeAdmins").textContent = activeAdmins.length;

document.getElementById("inactiveAdmins").textContent = admins.length - activeAdmins.length;
    tableBody.innerHTML = "";

    admins.forEach((admin) => {

        tableBody.innerHTML += `

            <tr>

                <td>${admin.fullName}</td>

                <td>${admin.email}</td>

                <td>

<label class="switch">

<input
type="checkbox"
${admin.isActive ? "checked" : ""}

onchange="toggleStatus('${admin._id}', this.checked)">

<span class="slider round"></span>

</label>

</td>

                <td>${admin.role}</td>

                <td>${admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : "-"}</td>

               <td class="action-buttons">

    <button class="view-btn"
            onclick="viewAdmin('${admin._id}')">
        <i class="fa-solid fa-eye"></i>
    </button>

    <button class="edit-btn"
            onclick="editAdmin('${admin._id}')">
        <i class="fa-solid fa-pen-to-square"></i>
    </button>

    <button class="delete-btn"
            onclick="deleteAdmin('${admin._id}')">
        <i class="fa-solid fa-trash"></i>
    </button>

    <button class="reset-btn"
            onclick="resetPasswordModal('${admin._id}')">
        <i class="fa-solid fa-key"></i>
    </button>

</td>
            </tr>

        `;

    });

}
// ===============================
// View Admin
// ===============================

function viewAdmin(adminId) {

    const token = localStorage.getItem("adminToken");

    fetch(`http://localhost:5000/api/admin/${adminId}`, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    })

    .then(res => res.json())

    .then(data => {

        if(data.success){

            const admin = data.data;

            document.getElementById("viewFullName").textContent = admin.fullName;

            document.getElementById("viewEmail").textContent = admin.email;

            document.getElementById("viewRole").textContent = admin.role;

            document.getElementById("viewStatus").textContent =
              admin.isActive
? '<span class="status-active">● Active</span>'
: '<span class="status-inactive">● Inactive</span>';

document.getElementById("viewStatus").innerHTML =
admin.isActive
? '<span class="status-active">● Active</span>'
: '<span class="status-inactive">● Inactive</span>';

            document.getElementById("viewLastLogin").textContent =
                admin.lastLogin
                ? new Date(admin.lastLogin).toLocaleString()
                : "Never Logged In";

            document.getElementById("viewAdminModal").style.display = "flex";

        }else{

            alert(data.message);

        }

    })

    .catch(err => console.error(err));

}
    // ===============================
// Edit Admin
// ===============================

function editAdmin(adminId) {

    const token = localStorage.getItem("adminToken");

    fetch(`http://localhost:5000/api/admin/${adminId}`, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    })

    .then(res => res.json())

    .then(data => {

        if(data.success){

            const admin = data.data;

            document.getElementById("editAdminId").value = admin._id;
            document.getElementById("editFullName").value = admin.fullName;
            document.getElementById("editEmail").value = admin.email;
            document.getElementById("editRole").value = admin.role;

            document.getElementById("editAdminModal").style.display = "flex";

        }else{

            alert(data.message);

        }

    })

    .catch(err => console.error(err));

}


// Close Edit Modal

const closeEditModal = document.getElementById("closeEditModal");
const cancelEditBtn = document.getElementById("cancelEditBtn");

if (closeEditModal) {

    closeEditModal.addEventListener("click", () => {

        document.getElementById("editAdminModal").style.display = "none";

    });

}

if (cancelEditBtn) {

    cancelEditBtn.addEventListener("click", () => {

        document.getElementById("editAdminModal").style.display = "none";

    });

}
// ===============================
// Update Admin
// ===============================

const editAdminForm = document.getElementById("editAdminForm");

if (editAdminForm) {

editAdminForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    // ⚠️ Iske andar ka poora existing code SAME rehne dena.
    // Sirf opening aur closing add karni hai.


    

    const token = localStorage.getItem("adminToken");

    const adminId = document.getElementById("editAdminId").value;

    const updatedData = {

        fullName: document.getElementById("editFullName").value,

        email: document.getElementById("editEmail").value,

        role: document.getElementById("editRole").value

    };

    try {

        const response = await fetch(`http://localhost:5000/api/admin/${adminId}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify(updatedData)

        });

        const data = await response.json();

        if (data.success) {

            alert("Admin Updated Successfully");

            document.getElementById("editAdminModal").style.display = "none";

            loadAdmins();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

    }

});
}
// ===============================
// Delete Admin
// ===============================

function deleteAdmin(adminId) {

    document.getElementById("deleteAdminId").value = adminId;

    document.getElementById("deleteAdminModal").style.display = "flex";

}

// Close Delete Modal

const closeDeleteModal = document.getElementById("closeDeleteModal");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

if (closeDeleteModal) {

    closeDeleteModal.addEventListener("click", () => {

        document.getElementById("deleteAdminModal").style.display = "none";

    });

}

if (cancelDeleteBtn) {

    cancelDeleteBtn.addEventListener("click", () => {

        document.getElementById("deleteAdminModal").style.display = "none";

    });

}
// ===============================
// Confirm Delete Admin
// ===============================

const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

if (confirmDeleteBtn) {

confirmDeleteBtn.addEventListener("click", async () => {

    // ⚠️ Iske andar ka POORA existing code SAME rehne dena.
    // Sirf opening aur closing add karni hai.


    const token = localStorage.getItem("adminToken");

    const adminId = document.getElementById("deleteAdminId").value;

    try {

        const response = await fetch(`http://localhost:5000/api/admin/${adminId}`, {

            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        if (data.success) {

            alert("Admin Deleted Successfully");

            document.getElementById("deleteAdminModal").style.display = "none";

            loadAdmins();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

    }

});
}
// ===============================
// Search Admin
// ===============================

const searchInput = document.getElementById("searchAdmin");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", searchAdmins);

async function searchAdmins() {

    const keyword = searchInput.value.trim();

    if (keyword === "") {

        loadAdmins();
        return;

    }

    try {

        const token = localStorage.getItem("adminToken");

        const response = await fetch(

            `http://localhost:5000/api/admin/search?keyword=${encodeURIComponent(keyword)}`,

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        const data = await response.json();

        console.log(data);

        if (data.success) {

            renderTable(data.data);

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

    }

}
// ===============================
// Live Search
// ===============================

searchInput.addEventListener("keyup", () => {

    searchAdmins();

});
// ===============================
// Toggle Admin Status
// ===============================

async function toggleStatus(adminId, isActive) {

    const token = localStorage.getItem("adminToken");

    try {

        const response = await fetch(
            `http://localhost:5000/api/admin/${adminId}/status`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ isActive })
            }
        );

        const data = await response.json();

        if (data.success) {

            loadAdmins();

        } else {

            alert(data.message);

            loadAdmins();

        }

    } catch (error) {

        console.error(error);

        loadAdmins();

    }

}
// ===============================
// Reset Password
// ===============================

function resetPasswordModal(adminId) {

    document.getElementById("resetAdminId").value = adminId;

   document.getElementById("resetNewPassword").value = "";
document.getElementById("resetConfirmPassword").value = "";

    document.getElementById("resetPasswordModal").style.display = "flex";

}
const closeResetModal = document.getElementById("closeResetModal");
const cancelResetBtn = document.getElementById("cancelResetBtn");
const resetPasswordForm = document.getElementById("resetPasswordForm");

if (closeResetModal) {
    closeResetModal.addEventListener("click", () => {
        document.getElementById("resetPasswordModal").style.display = "none";
    });
}

if (cancelResetBtn) {
    cancelResetBtn.addEventListener("click", () => {
        document.getElementById("resetPasswordModal").style.display = "none";
    });
}

// ===============================
// Reset Admin Password API
// ===============================
// ===============================
// Password Strength Checker
// ===============================

const resetNewPassword = document.getElementById("resetNewPassword");
const passwordStrength = document.getElementById("passwordStrength");

if (resetNewPassword && passwordStrength) {

    resetNewPassword.addEventListener("input", () => {

        const password = resetNewPassword.value;

        let score = 0;

        if (password.length >= 8) score++;

        if (/[A-Z]/.test(password)) score++;

        if (/[a-z]/.test(password)) score++;

        if (/[0-9]/.test(password)) score++;

        if (/[^A-Za-z0-9]/.test(password)) score++;

        passwordStrength.className = "password-strength";

        if (password.length === 0) {

            passwordStrength.textContent = "";

        }

        else if (score <= 2) {

            passwordStrength.textContent = "🔴 Weak Password";

            passwordStrength.classList.add("weak");

        }

        else if (score <= 4) {

            passwordStrength.textContent = "🟡 Medium Password";

            passwordStrength.classList.add("medium");

        }

        else {

            passwordStrength.textContent = "🟢 Strong Password";

            passwordStrength.classList.add("strong");

        }

    });

}

const resetPasswordFormAPI = document.getElementById("resetPasswordForm");

if (resetPasswordFormAPI) {

resetPasswordFormAPI.addEventListener("submit", async (e) => {

    e.preventDefault();

    const adminId = document.getElementById("resetAdminId").value;

  const newPassword =
document.getElementById("resetNewPassword").value.trim();

const confirmPassword =
document.getElementById("resetConfirmPassword").value.trim();
// ===============================
// Strong Password Validation
// ===============================

const strongPasswordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/;

if (!strongPasswordRegex.test(newPassword)) {

    Swal.fire({

        icon: "error",

        title: "Weak Password",

        html: `
        Password must contain:<br><br>
        ✅ Minimum 8 Characters<br>
        ✅ One Uppercase Letter<br>
        ✅ One Lowercase Letter<br>
        ✅ One Number<br>
        ✅ One Special Character
        `

    });

    return;

}

if (newPassword !== confirmPassword) {

    Swal.fire({

        icon: "error",

        title: "Password Mismatch",

        text: "New Password and Confirm Password do not match."

    });

    return;

}
   

    const token = localStorage.getItem("adminToken");

    try {

        const response = await fetch(
            `http://localhost:5000/api/admin/${adminId}/reset-password`,
            {

                method: "PATCH",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    newPassword
                })

            }
        );

        const data = await response.json();


       if (data.success) {

    const result = await Swal.fire({

        icon: "success",

        title: "Password Reset Successful",

        text: "The admin password has been updated successfully.",

        confirmButtonColor: "#2563eb",

        confirmButtonText: "OK"

    });

    if (result.isConfirmed) {

        document.getElementById("resetPasswordModal").style.display = "none";

        document.getElementById("resetPasswordForm").reset();

        loadAdmins();

    }

}
        
        else {

           Swal.fire({

    icon: "error",

    title: "Reset Failed",

    text: data.message,

    confirmButtonColor: "#dc2626"

});

        }

    } catch (error) {

        console.error(error);

       Swal.fire({

    icon: "error",

    title: "Server Error",

    text: "Something went wrong. Please try again.",

    confirmButtonColor: "#dc2626"

});

    }

});
}
// =========================================
// VIEW ADMIN MODAL
// =========================================
console.log("VIEW EVENTS REGISTERING...");
const viewAdminModal = document.getElementById("viewAdminModal");
const closeViewModal = document.getElementById("closeViewModal");
const closeViewBtn = document.getElementById("closeViewBtn");
console.log(closeViewModal);
console.log(closeViewBtn);
// Close by X
if (closeViewModal) {
    closeViewModal.addEventListener("click", () => {
        viewAdminModal.style.display = "none";
    });
}

// Close by Button
if (closeViewBtn) {
    closeViewBtn.addEventListener("click", () => {
        viewAdminModal.style.display = "none";
    });
}

// Close by clicking outside
window.addEventListener("click", (e) => {
    if (e.target === viewAdminModal) {
        viewAdminModal.style.display = "none";
    }
});
// =====================================
// Permission Management
// =====================================

const permissionMenu = document.getElementById("permissionMenu");
const permissionSection = document.getElementById("permissionSection");

if (permissionMenu) {

    permissionMenu.addEventListener("click", () => {

        // Hide Dashboard
        document.getElementById("dashboardContent").style.display = "none";

        // Hide Admin Management
        document.querySelector(".admin-list-section").style.display = "none";

        // Hide Profile
        document.getElementById("profileSection").style.display = "none";

        // Hide Change Password
        document.getElementById("changePasswordSection").style.display = "none";

        // Show Permission Section
        permissionSection.style.display = "block";

    });

}