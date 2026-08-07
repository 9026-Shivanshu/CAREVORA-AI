console.log("PATHLY AI App Loaded Successfully");

const contactForm = document.getElementById("contactForm");
const submitBtn = contactForm.querySelector("button[type='submit']");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("http://localhost:5000/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName,
                email,
                phone,
                subject,
                message,
            }),
        });

        const data = await response.json();

        if (data.success) {
            alert("✅ Message Sent Successfully!");
            contactForm.reset();
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error(error);
        alert("❌ Server Error");
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Send Message";
    }
});