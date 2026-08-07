// ======================================
// PATHLY AI
// Login
// ======================================
// ==========================
// Google Login Success
// ==========================

const params = new URLSearchParams(window.location.search);
const googleToken = params.get("token");

if (googleToken) {
    localStorage.setItem("token", googleToken);

    // URL se token hata do
    window.history.replaceState({}, document.title, window.location.pathname);

    // Dashboard par bhej do
    window.location.href = "dashboard.html";
}
const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");

    }

});
// ==========================
// Remember Me
// ==========================

const rememberMe = document.getElementById("rememberMe");
emailInput.addEventListener("input", () => {

    const email = emailInput.value.trim();

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const box = emailInput.parentElement;

    if (email === "") {

        box.classList.remove("input-success", "input-error");

       emailError.style.display = "none";

        return;

    }

    if (pattern.test(email)) {

        box.classList.add("input-success");

        box.classList.remove("input-error");

       emailError.style.display = "none";

    } else {

        box.classList.add("input-error");

        box.classList.remove("input-success");

        emailError.style.display = "none";

    }

});
// Load Saved Email

window.addEventListener("DOMContentLoaded", () => {

    const savedEmail = localStorage.getItem("rememberEmail");

    if (savedEmail) {

        document.getElementById("email").value = savedEmail;

        rememberMe.checked = true;

    }

});
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const toastIcon = document.getElementById("toastIcon");

function showToast(message, type) {

    toastMessage.innerText = message;

    toast.className = "toast show " + type;

    if (type === "success") {

        toastIcon.className = "fa-solid fa-circle-check";

    } else {

        toastIcon.className = "fa-solid fa-circle-xmark";

    }

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}
// ==========================
// Google Login
// ==========================

const googleBtn = document.querySelector(".google-btn");

googleBtn.addEventListener("click", () => {
    window.location.href =
        "http://localhost:5000/api/auth/google";
});
loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();
loginBtn.disabled = true;
loginBtn.innerHTML = "Signing In...";
await new Promise(resolve => setTimeout(resolve, 2000));
    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    try {

        const response = await fetch("http://localhost:5000/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (data.success) {
// Remember Me

if (rememberMe.checked) {

    localStorage.setItem("rememberEmail", email);

} else {

    localStorage.removeItem("rememberEmail");

}
            // Save JWT Token

            localStorage.setItem("token", data.token);

            // Save User Data

            localStorage.setItem("user", JSON.stringify(data.user));

           showToast("Login Successful!", "success");
            loginBtn.disabled = false;
            loginBtn.innerHTML = "Login";
           showToast("Login Successful!", "success");

setTimeout(() => {

    window.location.href = "dashboard.html";

}, 1500);

        }

        else {
         loginBtn.disabled = false;
         loginBtn.innerHTML = "Login";
          showToast(data.message, "error");
        }

    }

    catch (error) {

        console.log(error);
      loginBtn.disabled = false;
      loginBtn.innerHTML = "Login";
       showToast("Server Error", "error");

    }

});