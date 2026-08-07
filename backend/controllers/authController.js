const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/emailService");
const crypto = require("crypto");
// ==============================
// Password Validation
// ==============================

const isStrongPassword = (password) => {

  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^()_\-+=])[A-Za-z\d@$!%*?#&^()_\-+=]{8,}$/;

  return regex.test(password);

};
// ==============================
// Register
// ==============================

exports.register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      college,
      branch,
      graduationYear,
    } = req.body;
if (!isStrongPassword(password)) {

  return res.status(400).json({
    success: false,
    message:
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
  });

}
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      college,
      branch,
      graduationYear,
    });
const html = `
<div style="font-family:Arial,sans-serif;padding:20px">
  <h2 style="color:#2563eb;">🎉 Welcome to PATHLY AI </h2>

  <p>Hello <b>${newUser.fullName}</b>,</p>

  <p>Your account has been created successfully.</p>

  <table cellpadding="8" style="border-collapse:collapse;">
    <tr>
      <td><b>Name</b></td>
      <td>${newUser.fullName}</td>
    </tr>
    <tr>
      <td><b>Email</b></td>
      <td>${newUser.email}</td>
    </tr>
  </table>

  <p>You can now login and start using PATHLY AI.</p>

  <p>
    ✔ Resume Analyzer<br>
    ✔ ATS Score<br>
    ✔ AI Career Guidance<br>
    ✔ Mock Interview
  </p>

  <hr>

  <p style="color:gray">
    Regards,<br>
    PATHLY AI Team
  </p>
</div>
`;

await sendEmail({
  to: newUser.email,
  subject: "🎉 Welcome to PATHLY AI",
  html,
});
    res.status(201).json({
      success: true,
      message: "Registration Successful",
      user: newUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==============================
// Login
// ==============================

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
console.log("Login Email:", email);
    const user = await User.findOne({ email }).select("+password");
console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
// ==============================
// Forgot Password
// ==============================

exports.forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.resetOTP = otp;
    user.resetOTPExpire = Date.now() + 5 * 60 * 1000;

    await user.save();

    const html = `
      <h2>PATHLY AI</h2>

      <p>Your OTP for password reset is:</p>

      <h1>${otp}</h1>

      <p>This OTP is valid for only 5 minutes.</p>
    `;

   await sendEmail({
  to: user.email,
  subject: "Password Reset OTP",
  html,
});

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
// ==============================
// Verify OTP
// ==============================

exports.verifyOTP = async (req, res) => {
  try {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.resetOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.resetOTPExpire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

   const resetToken = jwt.sign(
  {
    id: user._id,
    purpose: "password-reset",
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "10m",
  }
);

user.resetToken = resetToken;
user.resetTokenExpire = Date.now() + 10 * 60 * 1000;

await user.save();

res.status(200).json({
  success: true,
  message: "OTP Verified Successfully",
  resetToken,
});
  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
// ==============================
// Reset Password
// ==============================

exports.resetPassword = async (req, res) => {
  try {

    const { email, password, resetToken } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!resetToken) {
  return res.status(401).json({
    success: false,
    message: "Reset token is missing",
  });
}

try {
  jwt.verify(resetToken, process.env.JWT_SECRET);
} catch (err) {
  return res.status(401).json({
    success: false,
    message: "Invalid or Expired Reset Token",
  });
}

if (user.resetToken !== resetToken) {
  return res.status(401).json({
    success: false,
    message: "Invalid Reset Token",
  });
}

if (
  !user.resetTokenExpire ||
  user.resetTokenExpire < Date.now()
) {
  return res.status(401).json({
    success: false,
    message: "Reset Token Expired",
  });
}

  if (!isStrongPassword(password)) {

  return res.status(400).json({
    success: false,
    message:
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
  });

}

    const hashedPassword = await bcrypt.hash(password, 10);

   user.password = hashedPassword;

// Clear OTP
user.resetOTP = "";
user.resetOTPExpire = null;

// Clear Reset Token
user.resetToken = "";
user.resetTokenExpire = null;

await user.save();
    res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};