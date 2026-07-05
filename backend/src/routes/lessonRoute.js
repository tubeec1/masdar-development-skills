const express = require("express");

const LessonController = require("../controllers/lessonController");

const authenticateToken = require("../middleware/authenticateToken");
const authorizeRoles = require("../middleware/authorizeRoles");

const validationHandler = require("../helpers/validationHandler");

const {
  createLessonValidation,
  updateLessonValidation,
} = require("../validations/lessonValidation");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Read Lessons By Module
router.get("/module/:moduleId", LessonController.readModuleLessons);

/*
|--------------------------------------------------------------------------
| Teacher Routes
|--------------------------------------------------------------------------
*/

// Create Lesson
router.post(
  "/create",
  authenticateToken,
  authorizeRoles("teacher", "admin"),
  createLessonValidation,
  validationHandler,
  LessonController.createLesson,
);

// Update Lesson
router.put(
  "/update/:id",
  authenticateToken,
  authorizeRoles("teacher", "admin"),
  updateLessonValidation,
  validationHandler,
  LessonController.updateLesson,
);

// Delete Lesson
router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeRoles("teacher", "admin"),
  LessonController.deleteLesson,
);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Read All Lessons
router.get(
  "/read",
  authenticateToken,
  authorizeRoles("admin"),
  LessonController.readLessons,
);

// Dashboard Counts
router.get(
  "/dashboard-counts",
  authenticateToken,
  authorizeRoles("admin"),
  LessonController.dashboardCounts,
);

module.exports = router;
