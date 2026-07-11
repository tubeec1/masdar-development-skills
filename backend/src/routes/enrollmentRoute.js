const express = require("express");

const EnrollmentController = require("../controllers/enrollmentController");

const authenticateToken = require("../middleware/authenticateToken");
const authorizeRoles = require("../middleware/authorizeRoles");

const validationHandler = require("../helpers/validationHandler");

const {
  changeEnrollmentStatusValidation,
} = require("../validations/enrollmentValidation");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Student Routes
|--------------------------------------------------------------------------
*/

// Enroll in Course
router.post(
  "/enroll/:courseId",
  authenticateToken,
  authorizeRoles("student"),
  EnrollmentController.enrollStudent,
);

// My Enrolled Courses
router.get(
  "/my-courses",
  authenticateToken,
  authorizeRoles("student"),
  EnrollmentController.readStudentCourses,
);

// My Enrollment Status
router.get(
  "/my-course/:courseId",
  authenticateToken,
  authorizeRoles("student"),
  EnrollmentController.readStudentEnrollment,
);

/*
|--------------------------------------------------------------------------
| Teacher Routes
|--------------------------------------------------------------------------
*/

// Students of My Course
router.get(
  "/course/:courseId",
  authenticateToken,
  authorizeRoles("teacher"),
  EnrollmentController.readTeacherStudents,
);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Read All Enrollments
router.get(
  "/read",
  authenticateToken,
  authorizeRoles("admin"),
  EnrollmentController.readEnrollments,
);

// Change Enrollment Status
router.patch(
  "/status/:id",
  authenticateToken,
  authorizeRoles("admin"),
  changeEnrollmentStatusValidation,
  validationHandler,
  EnrollmentController.changeEnrollmentStatus,
);

// Dashboard Counts
router.get(
  "/dashboard-counts",
  authenticateToken,
  authorizeRoles("admin"),
  EnrollmentController.dashboardCounts,
);

module.exports = router;
