const DashboardModel = require("../models/dashboardModel");

class DashboardService {
  /*
  |--------------------------------------------------------------------------
  | Admin Dashboard
  |--------------------------------------------------------------------------
  */

  static async adminDashboard() {
    const statistics = await DashboardModel.adminDashboard();

    return {
      statusCode: 200,
      success: true,
      message: "Admin dashboard fetched successfully.",
      statistics: {
        users: {
          total: Number(statistics.totalUsers),
          admins: Number(statistics.totalAdmins),
          teachers: Number(statistics.totalTeachers),
          students: Number(statistics.totalStudents),
        },

        categories: {
          total: Number(statistics.totalCategories),
        },

        courses: {
          total: Number(statistics.totalCourses),
          published: Number(statistics.publishedCourses),
          draft: Number(statistics.draftCourses),
          free: Number(statistics.freeCourses),
          paid: Number(statistics.paidCourses),
        },

        modules: {
          total: Number(statistics.totalModules),
        },

        lessons: {
          total: Number(statistics.totalLessons),
          preview: Number(statistics.previewLessons),
          paid: Number(statistics.paidLessons),
        },

        enrollments: {
          total: Number(statistics.totalEnrollments),
          approved: Number(statistics.approvedEnrollments),
          pending: Number(statistics.pendingEnrollments),
          rejected: Number(statistics.rejectedEnrollments),
        },

        payments: {
          total: Number(statistics.totalPayments),
          pending: Number(statistics.pendingPayments),
          verified: Number(statistics.verifiedPayments),
          rejected: Number(statistics.rejectedPayments),
        },
      },
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Teacher Dashboard
  |--------------------------------------------------------------------------
  */

  static async teacherDashboard(teacherId) {
    const statistics = await DashboardModel.teacherDashboard(teacherId);

    return {
      statusCode: 200,
      success: true,
      message: "Teacher dashboard fetched successfully.",
      statistics: {
        totalCourses: Number(statistics.totalCourses),
        totalModules: Number(statistics.totalModules),
        totalLessons: Number(statistics.totalLessons),
        totalStudents: Number(statistics.totalStudents),
        pendingPayments: Number(statistics.pendingPayments),
      },
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Student Dashboard
  |--------------------------------------------------------------------------
  */

  static async studentDashboard(studentId) {
    const statistics = await DashboardModel.studentDashboard(studentId);

    return {
      statusCode: 200,
      success: true,
      message: "Student dashboard fetched successfully.",
      statistics: {
        myCourses: Number(statistics.myCourses),

        totalLessons: Number(statistics.totalLessons),

        completedLessons: 0,

        remainingLessons: Number(statistics.totalLessons),

        completedCourses: 0,
      },
    };
  }
}

module.exports = DashboardService;
