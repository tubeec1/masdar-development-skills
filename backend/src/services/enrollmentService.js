const EnrollmentModel = require("../models/enrollmentModel");
const CourseModel = require("../models/courseModel");

class EnrollmentService {
  /*
  |--------------------------------------------------------------------------
  | Enroll Student
  |--------------------------------------------------------------------------
  */

  static async enrollStudent(studentId, courseId) {
    // Check Course
    const course = await CourseModel.findById(courseId);

    if (!course) {
      return {
        statusCode: 404,
        success: false,
        message: "Course not found.",
      };
    }

    // Check Existing Enrollment
    const existingEnrollment = await EnrollmentModel.findStudentEnrollment(
      studentId,
      courseId,
    );

    if (existingEnrollment) {
      return {
        statusCode: 400,
        success: false,
        message: "You are already enrolled in this course.",
      };
    }

    // Determine Final Price
    const finalPrice =
      Number(course.discountPrice) > 0
        ? Number(course.discountPrice)
        : Number(course.price);

    let status = "Pending";
    let approvedAt = null;

    // Free Course
    if (finalPrice === 0) {
      status = "Approved";
      approvedAt = new Date();
    }

    // Create Enrollment
    const enrollmentId = await EnrollmentModel.create({
      studentId,
      courseId,
      paymentId: null,
      status,
      enrolledAt: new Date(),
      approvedAt,
    });

    const enrollment = await EnrollmentModel.findById(enrollmentId);

    return {
      statusCode: 201,
      success: true,
      message:
        status === "Approved"
          ? "Successfully enrolled."
          : "Enrollment created. Waiting for payment approval.",
      enrollment,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Read My Courses
  |--------------------------------------------------------------------------
  */

  static async readStudentCourses(studentId) {
    const courses = await EnrollmentModel.findStudentCourses(studentId);

    return {
      statusCode: 200,
      success: true,
      message: "Student courses fetched successfully.",
      total: courses.length,
      courses,
    };
  }
  /*
  |--------------------------------------------------------------------------
  | Read My Enrollment
  |--------------------------------------------------------------------------
  */

  static async readStudentEnrollment(studentId, courseId) {
    const enrollment = await EnrollmentModel.findStudentEnrollment(
      studentId,
      courseId,
    );

    if (!enrollment) {
      return {
        statusCode: 404,
        success: false,
        message: "Enrollment not found.",
      };
    }

    return {
      statusCode: 200,
      success: true,
      message: "Enrollment fetched successfully.",
      enrollment,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Read Teacher Students
  |--------------------------------------------------------------------------
  */

  static async readTeacherStudents(teacherId, courseId) {
    // Make sure the course exists
    const course = await CourseModel.findById(courseId);

    if (!course) {
      return {
        statusCode: 404,
        success: false,
        message: "Course not found.",
      };
    }

    // Teacher can only view students in their own course
    if (Number(course.teacherId) !== Number(teacherId)) {
      return {
        statusCode: 403,
        success: false,
        message: "You are not authorized to access this course.",
      };
    }

    const students = await EnrollmentModel.findTeacherStudents(
      teacherId,
      courseId,
    );

    return {
      statusCode: 200,
      success: true,
      message: "Course students fetched successfully.",
      total: students.length,
      students,
    };
  }
  /*
  |--------------------------------------------------------------------------
  | Read All Enrollments (Admin)
  |--------------------------------------------------------------------------
  */

  static async readEnrollments() {
    const enrollments = await EnrollmentModel.findAll();

    return {
      statusCode: 200,
      success: true,
      message: "Enrollments fetched successfully.",
      total: enrollments.length,
      enrollments,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Change Enrollment Status
  |--------------------------------------------------------------------------
  */

  static async changeEnrollmentStatus(enrollmentId, status, paymentId = null) {
    const enrollment = await EnrollmentModel.findById(enrollmentId);

    if (!enrollment) {
      return {
        statusCode: 404,
        success: false,
        message: "Enrollment not found.",
      };
    }

    const allowedStatuses = ["Pending", "Approved", "Rejected", "Cancelled"];

    if (!allowedStatuses.includes(status)) {
      return {
        statusCode: 400,
        success: false,
        message: "Invalid enrollment status.",
      };
    }

    await EnrollmentModel.updateStatus(enrollmentId, status, paymentId);

    const updatedEnrollment = await EnrollmentModel.findById(enrollmentId);

    return {
      statusCode: 200,
      success: true,
      message: `Enrollment ${status.toLowerCase()} successfully.`,
      enrollment: updatedEnrollment,
    };
  }
  /*
  |--------------------------------------------------------------------------
  | Dashboard Counts
  |--------------------------------------------------------------------------
  */

  static async dashboardCounts() {
    const statistics = await EnrollmentModel.dashboardCounts();

    return {
      statusCode: 200,
      success: true,
      message: "Enrollment dashboard statistics fetched successfully.",
      statistics: {
        totalEnrollments: Number(statistics.totalEnrollments),

        approvedEnrollments: Number(statistics.approvedEnrollments),

        pendingEnrollments: Number(statistics.pendingEnrollments),

        rejectedEnrollments: Number(statistics.rejectedEnrollments),

        cancelledEnrollments: Number(statistics.cancelledEnrollments),
      },
    };
  }
}

module.exports = EnrollmentService;
