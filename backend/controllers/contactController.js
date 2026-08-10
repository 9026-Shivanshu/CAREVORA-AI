const Contact = require("../models/Contact");
const sendEmail = require("../utils/emailService");
// Create Contact Message
const createContact = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    // Validation
    if (!fullName || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields.",
      });
    }

    // Save to Database
    const contact = await Contact.create({
      fullName,
      email,
      phone,
      subject,
      message,
    });
// Email Notification to Admin
await sendEmail({
  to: process.env.EMAIL_USER,
  subject: `📩 New Contact Message - ${subject}`,
  html: `
    <h2>New Contact Message</h2>

    <p><strong>Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Subject:</strong> ${subject}</p>

    <hr>

    <p>${message}</p>
  `,
});
// Thank You Email to User
await sendEmail({
  to: email,
  subject: "✅ Thank You for Contacting CAREVORA AI",
  html: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:10px;">
      
      <h2 style="color:#2563eb;text-align:center;">
        CAREVORA AI
      </h2>

      <p>Dear <strong>${fullName}</strong>,</p>

      <p>
        Thank you for contacting <strong>CAREVORA AI</strong>.
      </p>

      <p>
        We have successfully received your message.
        Our team will review it and get back to you as soon as possible.
      </p>

      <div style="background:#f4f4f4;padding:15px;border-radius:8px;">
        <strong>Your Message</strong><br><br>

        Subject: ${subject}<br><br>

        ${message}
      </div>

      <br>

      <p>
        We usually respond within <strong>24-48 hours</strong>.
      </p>

      <br>

      <p>
        Regards,<br>
        <strong>CAREVORA AI Team</strong>
      </p>

      <hr>
    

      <p style="font-size:12px;color:#777;text-align:center;">
        This is an automated email. Please do not reply directly to this message.
      </p>

    </div>
  `,
});
    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: contact,
    });

  } catch (error) {
    console.error("Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createContact,
};