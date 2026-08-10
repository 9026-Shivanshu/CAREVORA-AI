// ======================================
// CAREVORA AI
// Reset Password
// ======================================

const form = document.getElementById("resetPasswordForm");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");

const toggleNew = document.getElementById("toggleNewPassword");
const toggleConfirm = document.getElementById("toggleConfirmPassword");

const strengthText = document.getElementById("strengthText");
const resetBtn = document.getElementById("resetBtn");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const toastIcon = document.getElementById("toastIcon");

// ==========================
// Toast
// ==========================

function showToast(message, type){

    toastMessage.innerText = message;

    toast.className = "toast show";

    if(type==="success"){

        toast.style.background="#16a34a";
        toastIcon.className="fa-solid fa-circle-check";

    }else{

        toast.style.background="#dc2626";
        toastIcon.className="fa-solid fa-circle-xmark";

    }

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}

// ==========================
// Show Hide Password
// ==========================

function togglePassword(input, icon){

    if(input.type==="password"){

        input.type="text";
        icon.classList.replace("fa-eye","fa-eye-slash");

    }else{

        input.type="password";
        icon.classList.replace("fa-eye-slash","fa-eye");

    }

}

toggleNew.addEventListener("click",()=>{

    togglePassword(newPassword,toggleNew);

});

toggleConfirm.addEventListener("click",()=>{

    togglePassword(confirmPassword,toggleConfirm);

});

// ==========================
// Password Strength
// ==========================

newPassword.addEventListener("input",()=>{

    const pass=newPassword.value;

    if(pass.length<6){

        strengthText.innerText="Password Strength : Weak";
        strengthText.style.color="#dc2626";

    }else if(pass.length<10){

        strengthText.innerText="Password Strength : Medium";
        strengthText.style.color="#f59e0b";

    }else{

        strengthText.innerText="Password Strength : Strong";
        strengthText.style.color="#16a34a";

    }

});

// ==========================
// Reset Password
// ==========================

form.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const password=newPassword.value;
    const confirm=confirmPassword.value;

    if(password!==confirm){

        showToast("Passwords do not match","error");

        return;

    }

    const email=localStorage.getItem("resetEmail");
    const resetToken = localStorage.getItem("resetToken");

    if(!email){

        showToast("Session Expired","error");

        return;

    }

    resetBtn.disabled=true;
    resetBtn.innerHTML="Resetting...";

    try{

        const response=await fetch("http://localhost:5000/api/auth/reset-password",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

           body: JSON.stringify({

    email,
    password,
    resetToken

})

        });

        const data=await response.json();

        if(data.success){

            showToast("Password Reset Successful","success");

            localStorage.removeItem("resetEmail");
            localStorage.removeItem("otpVerified");
            localStorage.removeItem("resetToken");

            setTimeout(()=>{

                window.location.href="login.html";

            },1500);

        }else{

            showToast(data.message,"error");

        }

    }catch(error){

        console.log(error);

        showToast("Server Error","error");

    }

    resetBtn.disabled=false;
    resetBtn.innerHTML="Reset Password";

});