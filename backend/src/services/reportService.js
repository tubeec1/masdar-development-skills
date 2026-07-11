const ReportModel = require("../models/reportModel");

class ReportService {
  /*
  |--------------------------------------------------------------------------
  | Overview Report
  |--------------------------------------------------------------------------
  */

  static async overview() {
    const statistics = await ReportModel.overview();

    return {
      statusCode: 200,
      success: true,
      message: "Overview report fetched successfully.",
      overview: {
        users: {
          total: Number(statistics.totalUsers),
          students: Number(statistics.totalStudents),
          teachers: Number(statistics.totalTeachers),
          admins: Number(statistics.totalAdmins),
        },

        categories: Number(statistics.totalCategories),

        courses: Number(statistics.totalCourses),

        modules: Number(statistics.totalModules),

        lessons: Number(statistics.totalLessons),

        enrollments: Number(statistics.totalEnrollments),

        payments: Number(statistics.totalPayments),
      },
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Student Report
  |--------------------------------------------------------------------------
  */

  static async studentReport() {
    const students = await ReportModel.studentReport();

    return {
      statusCode: 200,
      success: true,
      message: "Student report fetched successfully.",
      total: students.length,
      students,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Teacher Report
  |--------------------------------------------------------------------------
  */

  static async teacherReport() {
    const teachers = await ReportModel.teacherReport();

    return {
      statusCode: 200,
      success: true,
      message: "Teacher report fetched successfully.",
      total: teachers.length,
      teachers,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Course Report
  |--------------------------------------------------------------------------
  */

  static async courseReport() {
    const courses = await ReportModel.courseReport();

    return {
      statusCode: 200,
      success: true,
      message: "Course report fetched successfully.",
      total: courses.length,
      courses,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Enrollment Report
  |--------------------------------------------------------------------------
  */

  static async enrollmentReport(status = null) {
    const enrollments = await ReportModel.enrollmentReport(status);

    const summary = {
      approved: 0,
      pending: 0,
      rejected: 0,
      cancelled: 0,
    };

    enrollments.forEach((item) => {
      switch (item.status) {
        case "Approved":
          summary.approved++;
          break;

        case "Pending":
          summary.pending++;
          break;

        case "Rejected":
          summary.rejected++;
          break;

        case "Cancelled":
          summary.cancelled++;
          break;
      }
    });

    return {
      statusCode: 200,
      success: true,
      message: "Enrollment report fetched successfully.",
      total: enrollments.length,
      summary,
      enrollments,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Payment Report
  |--------------------------------------------------------------------------
  */

  static async paymentReport(status = null) {
    const payments = await ReportModel.paymentReport(status);

    const summary = {
      verified: 0,
      pending: 0,
      rejected: 0,
    };

    payments.forEach((item) => {
      switch (item.status) {
        case "Verified":
          summary.verified++;
          break;

        case "Pending":
          summary.pending++;
          break;

        case "Rejected":
          summary.rejected++;
          break;
      }
    });

    return {
      statusCode: 200,
      success: true,
      message: "Payment report fetched successfully.",
      total: payments.length,
      summary,
      payments,
    };
  }
}

module.exports = ReportService;
