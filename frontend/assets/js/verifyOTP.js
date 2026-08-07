const form = document.getElementById("verifyOTPForm");
const timer = document.getElementById("timer");
const resendBtn = document.getElementById("resendOTP");

let seconds = 60;
let interval;
function startTimer() {

    clearInterval(interval);

interval = setInterval(() => {

        seconds--;

        timer.innerText = `Resend OTP in ${seconds}s`;

        if (seconds <= 0) {

            clearInterval(interval);

            timer.style.display = "none";

            resendBtn.style.display = "inline";

        }

    }, 1000);

}

startTimer();
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const otp = document.getElementById("otp").value.trim();

    const email = sessionStorage.getItem("resetEmail");

    const btn = document.querySelector(".login-btn");

    if (!otp) {

        alert("Please enter OTP.");

        return;

    }

    try {

        btn.disabled = true;

        btn.innerText = "Verifying...";

        const response = await fetch("/api/admin/verify-otp", {

            method: "POST",

            headers: {

                "Content-Type":"application/json"

            },

            body: JSON.stringify({

                email,

                otp

            })

        });

        const data = await response.json();

        if (!response.ok){

            alert(data.message);

            return;

        }

        sessionStorage.setItem("resetToken", data.resetToken);

        alert(data.message);

        window.location.href="reset-password.html";

    }

    catch(error){

        console.error(error);

        alert("Server Error");

    }

    finally{

        btn.disabled=false;

        btn.innerText="Verify OTP";

    }

});
// ===============================
// Resend OTP
// ===============================

resendBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    const email = sessionStorage.getItem("resetEmail");

    try {

        const response = await fetch("/api/admin/forgot-password", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email
            })

        });

        const data = await response.json();

        if (!response.ok) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: data.message
            });

            return;

        }

        Swal.fire({
            icon: "success",
            title: "OTP Sent",
            text: "A new OTP has been sent to your email.",
            timer: 1500,
            showConfirmButton: false
        });

        // Restart Timer
        seconds = 60;

        timer.style.display = "inline";

        resendBtn.style.display = "none";

        startTimer();

    } catch (error) {

        Swal.fire({
            icon: "error",
            title: "Server Error",
            text: "Please try again."
        });

    }

});