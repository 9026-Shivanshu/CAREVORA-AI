const ResumeBuilder = require("../models/resumeBuilder");
const ATSAnalysis = require("../models/ATSAnalysis");
const Interview = require("../models/interview");
const User = require("../models/user");
const Admin = require("../models/admin");
const Contact = require("../models/contact");
const ActivityLog = require("../models/ActivityLog");
const ResumeHistory = require("../models/ResumeHistory");
exports.getDashboardStats = async (req, res) => {
    try {

        // ==============================
        // 1. Resume Builder Data
        // ==============================

        const resumes = await ResumeBuilder.find({
            user: req.user.id
        }).sort({
            createdAt: -1
        });

        // ==============================
        // 2. ATS Analysis Data
        // ==============================

        const atsAnalyses = await ATSAnalysis.find({
            user: req.user.id
        }).sort({
            createdAt: -1
        });

        // ==============================
        // 3. Interview Data
        // ==============================

        const interviews = await Interview.find({
            user: req.user.id
        }).sort({
            createdAt: -1
        });

        // ==============================
        // Latest Records
        // ==============================

        const latestResume =
            resumes.length > 0 ? resumes[0] : null;
            

        const latestATS =
            atsAnalyses.length > 0 ? atsAnalyses[0] : null;

        const latestInterview =
            interviews.length > 0 ? interviews[0] : null;

        // ==============================
        // Dashboard Response
        // ==============================

        res.status(200).json({

            success: true,

            // Resume Builder Score
            resumeScore: latestResume
                ? Number(latestResume.resumeScore) || 0
                : 0,

            // Latest ATS Analysis Score
            atsScore: latestATS
                ? Number(latestATS.atsScore) || 0
                : 0,

            // Latest Mock Interview Score
            interviewScore: latestInterview
                ? Number(latestInterview.score) || 0
                : 0,

            // Total Mock Interviews
            totalInterviews: interviews.length

        });

    } catch (error) {

        console.error("Dashboard Stats Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
// ======================================
// Super Admin Dashboard Stats
// ======================================

exports.getAdminDashboardStats = async (req, res) => {
    try {

    const totalUsers = await User.countDocuments();

    const totalAdmins = await Admin.countDocuments({
        role: "admin"
    });

   const activeAdmins = await Admin.countDocuments({
    role: "admin",
    isActive: true
});

const inactiveAdmins = await Admin.countDocuments({
    role: "admin",
    isActive: false
});

const totalResumes = await ResumeHistory.countDocuments();

    const totalInterviews = await Interview.countDocuments();

    const totalContacts = await Contact.countDocuments();

    return res.status(200).json({
        success: true,
        data: {
            totalUsers,
            totalAdmins,
            activeAdmins,
            inactiveAdmins,
            totalResumes,
            totalInterviews,
            totalContacts
        }
    });

} catch (error) {

    console.error(error);

    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });

}
};
// ======================================
// Recent Activity (Super Admin)
// ======================================

exports.getRecentActivities = async (req, res) => {
  try {

    const activities = await ActivityLog.find()
      .populate("admin", "fullName email role")
      .sort({ createdAt: -1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      total: activities.length,
      data: activities,
    });

  } catch (error) {

    console.error("Recent Activity Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
/// ======================================
// Dashboard Analytics (Super Admin)
// ======================================

exports.getDashboardAnalytics = async (req, res) => {

    try {

        const today = new Date();

        const firstDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        const newUsersThisMonth = await User.countDocuments({
            createdAt: {
                $gte: firstDayOfMonth,
            },
        });

        const newAdminsThisMonth = await Admin.countDocuments({
            role: "admin",
            createdAt: {
                $gte: firstDayOfMonth,
            },
        });

const newResumesThisMonth = await ResumeBuilder.countDocuments({
            createdAt: {
                $gte: firstDayOfMonth,
            },
        });

        const newInterviewsThisMonth = await Interview.countDocuments({
            createdAt: {
                $gte: firstDayOfMonth,
            },
        });

        return res.status(200).json({
            success: true,
            data: {
                newUsersThisMonth,
                newAdminsThisMonth,
                newResumesThisMonth,
                newInterviewsThisMonth,
            },
        });

    } catch (error) {

        console.error("Dashboard Analytics Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};
// ======================================
// Dashboard Charts
// ======================================

exports.getDashboardCharts = async (req, res) => {

    try {

        const userData = await User.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.month": 1
                }
            }
        ]);
const resumeData = await ResumeHistory.aggregate([
{
    $group: {
        _id: {
            month: { $month: "$uploadedAt" }
        },
        count: { $sum: 1 }
    }
},
{
    $sort: {
        "_id.month": 1
    }
}
]);

        const interviewData = await Interview.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.month": 1
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            data: {
                users: userData,
                resumes: resumeData,
                interviews: interviewData
            }
        });

    } catch (error) {

        console.error("Dashboard Charts Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};