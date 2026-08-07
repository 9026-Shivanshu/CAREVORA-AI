const form = document.getElementById("adminLoginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const loginBtn = document.querySelector(".login-btn");

  if (!email || !password) {
  Swal.fire({
  icon: "warning",
  title: "Required",
  text: "Please enter email and password."
});
    return;
  }

  try {
    loginBtn.disabled = true;
    loginBtn.innerText = "Logging in...";

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
    Swal.fire({
  icon: "error",
  title: "Login Failed",
  text: data.message || "Invalid Email or Password"
});
      loginBtn.disabled = false;
      loginBtn.innerText = "Login";
      return;
    }

    // Save Token
    localStorage.setItem("adminToken", data.token);

    // Save Admin Info
    localStorage.setItem("adminData", JSON.stringify(data.admin));
    localStorage.setItem("adminRole", data.admin.role);

   await Swal.fire({
  icon: "success",
  title: "Login Successful",
  text: "Welcome to PATHLY AI Admin Panel",
  timer: 1500,
  showConfirmButton: false
});

    // Redirect According to Role

if (data.admin.role === "super_admin") {

  window.location.href = "/admin/dashboard.html";

} else if (data.admin.role === "admin") {

        window.location.href = "/admin/admin-dashboard.html";

} else {

   Swal.fire({
  icon: "error",
  title: "Unauthorized",
  text: "You don't have permission to login."
});

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");

}

  } catch (error) {

    console.error(error);

   Swal.fire({
  icon: "error",
  title: "Server Error",
  text: "Please try again later."
});

  } finally {

    loginBtn.disabled = false;
    loginBtn.innerText = "Login";

  }

});
// ===============================
// Show / Hide Password
// ===============================

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {

  const type =
    passwordInput.getAttribute("type") === "password"
      ? "text"
      : "password";

  passwordInput.setAttribute("type", type);

  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");

});