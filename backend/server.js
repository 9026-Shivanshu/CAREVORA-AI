const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const passport = require("passport");
const session = require("express-session");
require("./config/passport");
const connectDB = require("./config/db");
const createDefaultAdmin = require("./config/createDefaultAdmin");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const resumeBuilderRoutes = require("./routes/resumeBuilderRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
connectDB();
createDefaultAdmin();
const app = express();
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/resume-builder", resumeBuilderRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/student", studentRoutes);
app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "../frontend/index.html"));

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});