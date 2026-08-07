// ======================================
// PATHLY AI
// Forgot Password
// ======================================

const form = document.getElementById("forgotPasswordForm");
const btn = document.getElementById("sendOtpBtn");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const toastIcon = document.getElementById("toastIcon");

function showToast(message, type) {

    toastMessage.innerText = message;

    toast.className = "toast show";

    if (type === "success") {

        toast.style.background = "#16a34a";
        toastIcon.className = "fa-solid fa-circle-check";

    } else {

        toast.style.background = "#dc2626";
        toastIcon.className = "fa-solid fa-circle-xmark";

    }

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    btn.disabled = true;
    btn.innerHTML = "Sending OTP...";

    try {

        const response = await fetch("http://localhost:5000/api/auth/forgot-password", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email
            })

        });

        const data = await response.json();

        if (data.success) {

            showToast("OTP sent successfully!", "success");

            localStorage.setItem("resetEmail", email);

            setTimeout(() => {

                window.location.href = "verify-otp.html";

            }, 1500);

        } else {

            showToast(data.message || "Something went wrong", "error");

        }

    } catch (error) {

        console.error(error);

        showToast("Server Error", "error");

    }

    btn.disabled = false;
    btn.innerHTML = "Send OTP";

});