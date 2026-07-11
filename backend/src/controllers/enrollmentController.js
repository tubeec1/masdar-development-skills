const EnrollmentService = require("../services/enrollmentService");

class EnrollmentController {
  /*
  |--------------------------------------------------------------------------
  | Enroll Student
  |--------------------------------------------------------------------------
  */

  static async enrollStudent(req, res, next) {
    try {
      const studentId = req.user.id;
      console.log("Student ID:", studentId); // Log the student ID
      const { courseId } = req.params;
      console.log("Course ID:", courseId); // Log the course ID

      const result = await EnrollmentService.enrollStudent(studentId, courseId);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read My Courses
  |--------------------------------------------------------------------------
  */

  static async readStudentCourses(req, res, next) {
    try {
      const studentId = req.user.id;

      const result = await EnrollmentService.readStudentCourses(studentId);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read My Enrollment
  |--------------------------------------------------------------------------
  */

  static async readStudentEnrollment(req, res, next) {
    try {
      const studentId = req.user.id;
      const { courseId } = req.params;

      const result = await EnrollmentService.readStudentEnrollment(
        studentId,
        courseId,
      );

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read Teacher Students
  |--------------------------------------------------------------------------
  */

  static async readTeacherStudents(req, res, next) {
    try {
      const teacherId = req.user.id;
      const { courseId } = req.params;

      const result = await EnrollmentService.readTeacherStudents(
        teacherId,
        courseId,
      );

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read All Enrollments
  |--------------------------------------------------------------------------
  */

  static async readEnrollments(req, res, next) {
    try {
      const result = await EnrollmentService.readEnrollments();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Change Enrollment Status
  |--------------------------------------------------------------------------
  */

  static async changeEnrollmentStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status, paymentId } = req.body;

      const result = await EnrollmentService.changeEnrollmentStatus(
        id,
        status,
        paymentId,
      );

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Dashboard Counts
  |--------------------------------------------------------------------------
  */

  static async dashboardCounts(req, res, next) {
    try {
      const result = await EnrollmentService.dashboardCounts();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = EnrollmentController;
