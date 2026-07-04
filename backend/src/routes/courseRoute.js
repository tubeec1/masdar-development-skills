const express = require("express");

const CourseController = require("../controllers/courseController");

const authenticateToken = require("../middleware/authenticateToken");
const authorizeRoles = require("../middleware/authorizeRoles");
const uploadCourseThumbnail = require("../middleware/uploadCourseThumbnail");

const validationHandler = require("../helpers/validationHandler");

const {
  createCourseValidation,
  updateCourseValidation,
  changeCourseStatusValidation,
} = require("../validations/courseValidation");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Read Published Courses
router.get("/", CourseController.readPublishedCourses);

// Read Course By Slug
router.get("/:slug", CourseController.readCourseBySlug);

/*
|--------------------------------------------------------------------------
| Teacher Routes
|--------------------------------------------------------------------------
*/

// Create Course
router.post(
  "/create",
  authenticateToken,
  authorizeRoles("teacher", "admin"),
  uploadCourseThumbnail.single("thumbnail"),
  createCourseValidation,
  validationHandler,
  CourseController.createCourse,
);

// Read My Courses
router.get(
  "/my-courses",
  authenticateToken,
  authorizeRoles("teacher", "admin"),
  CourseController.readTeacherCourses,
);

// Update Course
router.put(
  "/update/:id",
  authenticateToken,
  authorizeRoles("teacher", "admin"),
  uploadCourseThumbnail.single("thumbnail"),
  updateCourseValidation,
  validationHandler,
  CourseController.updateCourse,
);

// Delete Course
router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeRoles("teacher", "admin"),
  CourseController.deleteCourse,
);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Read All Courses
router.get(
  "/read",
  authenticateToken,
  authorizeRoles("admin"),
  CourseController.readCourses,
);

// Change Status
router.patch(
  "/status/:id",
  authenticateToken,
  authorizeRoles("admin"),
  changeCourseStatusValidation,
  validationHandler,
  CourseController.changeCourseStatus,
);

// Dashboard Counts
router.get(
  "/dashboard-counts",
  authenticateToken,
  authorizeRoles("admin"),
  CourseController.dashboardCounts,
);

module.exports = router;
