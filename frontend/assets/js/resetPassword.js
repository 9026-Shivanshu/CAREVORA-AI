const form = document.getElementById("resetPasswordForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const newPassword =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {

       Swal.fire({
    icon: "error",
    title: "Password Mismatch",
    text: "Both passwords must be the same."
});

        return;

    }

    const email = sessionStorage.getItem("resetEmail");

    const resetToken = sessionStorage.getItem("resetToken");

    const btn = document.querySelector(".login-btn");

    try {

        btn.disabled = true;

        btn.innerText = "Resetting...";

        const response = await fetch("/api/admin/reset-password", {

            method: "POST",

            headers: {

                "Content-Type":"application/json"

            },

            body: JSON.stringify({

                email,

                resetToken,

                newPassword

            })

        });

        const data = await response.json();

        if (!response.ok){

            alert(data.message);

            return;

        }

        alert(data.message);

        sessionStorage.removeItem("resetEmail");
        sessionStorage.removeItem("resetToken");

        window.location.href="login.html";

    }

    catch(error){

        console.error(error);

        alert("Server Error");

    }

    finally{

        btn.disabled=false;

        btn.innerText="Reset Password";

    }

});
// ===============================
// Show / Hide New Password
// ===============================

const toggleNewPassword = document.getElementById("toggleNewPassword");
const newPassword = document.getElementById("newPassword");

toggleNewPassword.addEventListener("click", () => {

    if (newPassword.type === "password") {

        newPassword.type = "text";
        toggleNewPassword.classList.remove("fa-eye");
        toggleNewPassword.classList.add("fa-eye-slash");

    } else {

        newPassword.type = "password";
        toggleNewPassword.classList.remove("fa-eye-slash");
        toggleNewPassword.classList.add("fa-eye");

    }

});

// ===============================
// Show / Hide Confirm Password
// ===============================

const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
const confirmPassword = document.getElementById("confirmPassword");

toggleConfirmPassword.addEventListener("click", () => {

    if (confirmPassword.type === "password") {

        confirmPassword.type = "text";
        toggleConfirmPassword.classList.remove("fa-eye");
        toggleConfirmPassword.classList.add("fa-eye-slash");

    } else {

        confirmPassword.type = "password";
        toggleConfirmPassword.classList.remove("fa-eye-slash");
        toggleConfirmPassword.classList.add("fa-eye");

    }

});