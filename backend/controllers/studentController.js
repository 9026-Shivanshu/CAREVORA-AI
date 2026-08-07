const Student = require("../models/Student");
const User = require("../models/User");

// =====================================
// Create Student Profile
// =====================================

exports.createStudentProfile = async (req, res) => {
    try {

        const existing = await Student.findOne({ user: req.user.id });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Profile already exists."
            });
        }

       const user = await User.findById(req.user.id);

if (!user) {
    return res.status(404).json({
        success: false,
        message: "User not found."
    });
}

const student = await Student.create({
    user: user._id,
    fullName: user.fullName,
    email: user.email
});
        res.status(201).json({
            success: true,
            message: "Student profile created successfully.",
            student
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// =====================================
// Get Student Profile
// =====================================

exports.getStudentProfile = async (req, res) => {

    try {

        const student = await Student.findOne({
            user: req.user.id
        });

        if (!student) {

            return res.status(404).json({
                success: false,
                message: "Profile not found."
            });

        }

        res.json({
            success: true,
            student
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// =====================================
// Update Student Profile
// =====================================

exports.updateStudentProfile = async (req, res) => {

    try {

        const student = await Student.findOne({
            user: req.user.id
        });

        if (!student) {

            return res.status(404).json({
                success: false,
                message: "Profile not found."
            });

        }

        Object.assign(student, req.body);

        await student.save();

        res.json({
            success: true,
            message: "Profile updated successfully.",
            student
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};