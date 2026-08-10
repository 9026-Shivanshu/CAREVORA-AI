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

       let student = await Student.findOne({ user: req.user.id });

        if (!student) {

    const user = await User.findById(req.user.id);

    student = await Student.create({
        user: req.user.id,
        fullName: user?.fullName || "Student",
        email: user?.email || ""
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
        // =====================================
// Upload Profile Image
// =====================================

exports.uploadProfileImage = async (req, res) => {

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

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No image selected."
            });

        }

        student.profileImage = `/uploads/profiles/${req.file.filename}`;

        await student.save();

        res.json({
            success: true,
            message: "Profile image uploaded successfully.",
            image: student.profileImage
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};
// ===== Auto Profile Completion =====
let completion = 0;

if (student.profileImage) completion += 10;
if (student.phone) completion += 10;
if (student.gender) completion += 5;
if (student.dateOfBirth) completion += 5;
if (student.college) completion += 10;
if (student.course) completion += 10;
if (student.branch) completion += 10;
if (student.year) completion += 10;
if (student.city) completion += 5;
if (student.state) completion += 5;
if (student.country) completion += 5;
if (student.careerGoal) completion += 5;
if (student.bio) completion += 10;

student.profileCompletion = Math.min(completion, 100);
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
exports.uploadProfileImage = async (req, res) => {
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

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image selected."
            });
        }

        student.profileImage =
            `/uploads/profile/${req.file.filename}`;
        await student.save();

        res.json({
            success: true,
            image: student.profileImage
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
// Add Skill
// =====================================
exports.addSkill = async (req, res) => {
  try {

    const { name, level } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required"
      });
    }

    const student = await Student.findOne({
      user: req.user.id
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    student.skills.push({
      name,
      level: level || "Beginner"
    });

    await student.save();

    res.json({
      success: true,
      skills: student.skills
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};
// =====================================
// Delete Skill
// =====================================
exports.deleteSkill = async (req, res) => {
  try {

    const student = await Student.findOne({
      user: req.user.id
    });

    student.skills = student.skills.filter(
      skill => skill._id.toString() !== req.params.id
    );

    await student.save();

    res.json({
      success: true,
      skills: student.skills
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};