// ======================================
// 
// Verify OTP
// Part 1
// ======================================

const otpInputs = document.querySelectorAll(".otp-input");
const form = document.getElementById("verifyOtpForm");
const verifyBtn = document.getElementById("verifyBtn");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const toastIcon = document.getElementById("toastIcon");

// =========================
// Toast
// =========================

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

// =========================
// OTP Input
// =========================

otpInputs.forEach((input, index) => {

    input.addEventListener("input", (e) => {

        input.value = input.value.replace(/\D/g, "");

        if (input.value && index < otpInputs.length - 1) {

            otpInputs[index + 1].focus();

        }

    });

    input.addEventListener("keydown", (e) => {

        if (
            e.key === "Backspace" &&
            input.value === "" &&
            index > 0
        ) {

            otpInputs[index - 1].focus();

        }

    });

});

// =========================
// Paste OTP
// =========================

otpInputs[0].addEventListener("paste", (e) => {

    e.preventDefault();

    const pasted = e.clipboardData
        .getData("text")
        .trim()
        .replace(/\D/g, "");

    if (pasted.length === 6) {

        otpInputs.forEach((box, i) => {

            box.value = pasted[i];

        });

        otpInputs[5].focus();

    }

});

// =========================
// Get OTP
// =========================

function getOTP() {

    let otp = "";

    otpInputs.forEach((box) => {

        otp += box.value;

    });

    return otp;

}
// =========================
// Countdown Timer
// =========================

let timeLeft = 300; // 5 Minutes

const countdown = document.getElementById("countdown");
const resendBtn = document.getElementById("resendOtp");

function startTimer() {

    clearInterval(window.otpTimer);

   let timeLeft = 300;

    verifyBtn.disabled = false;

    window.otpTimer = setInterval(() => {

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        countdown.innerText =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (timeLeft <= 0) {

            clearInterval(window.otpTimer);

            verifyBtn.disabled = true;

            showToast("OTP Expired", "error");

            countdown.innerText = "00:00";

            return;

        }

        timeLeft--;

    }, 1000);

}

startTimer();

// =========================
// Resend OTP
// =========================

resendBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    const email = localStorage.getItem("resetEmail");

    if (!email) {

        showToast("Email not found", "error");

        return;

    }

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

            showToast("New OTP Sent", "success");

            startTimer();

        }

        else {

            showToast(data.message, "error");

        }

    }

    catch (error) {

        console.log(error);

        showToast("Server Error", "error");

    }

});
// =========================
// Verify OTP
// =========================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const otp = getOTP();

    const email = localStorage.getItem("resetEmail");

    if (!email) {

        showToast("Email not found", "error");

        return;

    }

    if (otp.length !== 6) {

        showToast("Please enter 6-digit OTP", "error");

        return;

    }

    verifyBtn.disabled = true;
    verifyBtn.innerHTML = "Verifying...";

    try {

        const response = await fetch("http://localhost:5000/api/auth/verify-otp", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                email,
                otp

            })

        });

        const data = await response.json();
if (data.success) {

    showToast("OTP Verified Successfully", "success");

    localStorage.setItem("otpVerified", "true");

    localStorage.setItem("resetToken", data.resetToken);

    setTimeout(() => {

        window.location.href = "reset-password.html";

    }, 1500);

}

        else {

            showToast(data.message || "Invalid OTP", "error");

        }

    }

    catch (error) {

        console.log(error);

        showToast("Server Error", "error");

    }

    verifyBtn.disabled = false;
    verifyBtn.innerHTML = "Verify OTP";

});