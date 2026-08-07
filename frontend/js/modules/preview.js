// ===========================================
// PATHLY AI
// Live Resume Preview v3
// ===========================================

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // Form Inputs
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const city = document.getElementById("city");
    const summary = document.getElementById("professionalSummary");

    // Preview Elements
    const previewName = document.getElementById("previewName");
    const previewEmail = document.getElementById("previewEmail");
    const previewPhone = document.getElementById("previewPhone");
    const previewCity = document.getElementById("previewCity");
    const previewSummary = document.getElementById("previewSummary");

    function updatePreview(){

        previewName.textContent =
            fullName.value || "Your Name";

        previewEmail.textContent =
            email.value || "your@email.com";

        previewPhone.textContent =
            phone.value || "+91 9876543210";

        previewCity.textContent =
            city.value || "Lucknow";

        previewSummary.textContent =
            summary.value || "Your professional summary will appear here...";
    }

    fullName.addEventListener("input", updatePreview);
    email.addEventListener("input", updatePreview);
    phone.addEventListener("input", updatePreview);
    city.addEventListener("input", updatePreview);
    summary.addEventListener("input", updatePreview);

    updatePreview();

});