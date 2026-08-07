const form = document.getElementById("forgotPasswordForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const btn = document.querySelector(".login-btn");

    if (!email) {

        alert("Please enter your email.");

        return;

    }

    try {

        btn.disabled = true;
        btn.innerText = "Sending OTP...";

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

            alert(data.message);

            return;

        }

        alert(data.message);

        // Email save for next page
        sessionStorage.setItem("resetEmail", email);

        // OTP Page
        window.location.href = "verify-otp.html";

    } catch (error) {

        console.error(error);

        alert("Server Error");

    } finally {

        btn.disabled = false;
        btn.innerText = "Send OTP";

    }

});