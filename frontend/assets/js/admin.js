const createAdminBtn = document.getElementById("createAdminBtn");
const createAdminModal = document.getElementById("createAdminModal");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");

createAdminBtn.addEventListener("click", () => {
    createAdminModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
    createAdminModal.style.display = "none";
});

cancelBtn.addEventListener("click", () => {
    createAdminModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === createAdminModal) {
        createAdminModal.style.display = "none";
    }
});
const createAdminForm = document.getElementById("createAdminForm");

createAdminForm.addEventListener("submit", (e) => {

    e.preventDefault();

    console.log("Create Admin Button Clicked");

});
// ===============================
// Delete Admin
// ===============================

function deleteAdmin(adminId) {

    document.getElementById("deleteAdminId").value = adminId;

    document.getElementById("deleteAdminModal").style.display = "flex";

}
// Close Delete Modal

document.getElementById("closeDeleteModal").addEventListener("click", () => {

    document.getElementById("deleteAdminModal").style.display = "none";

});

document.getElementById("cancelDeleteBtn").addEventListener("click", () => {

    document.getElementById("deleteAdminModal").style.display = "none";

});
