const express = require("express");

const ModuleController = require("../controllers/moduleController");

const authenticateToken = require("../middleware/authenticateToken");
const authorizeRoles = require("../middleware/authorizeRoles");

const validationHandler = require("../helpers/validationHandler");

const {
  createModuleValidation,
  updateModuleValidation,
} = require("../validations/moduleValidation");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Read Modules By Course
router.get("/course/:courseId", ModuleController.readCourseModules);

/*
|--------------------------------------------------------------------------
| Teacher Routes
|--------------------------------------------------------------------------
*/

// Create Module
router.post(
  "/create",
  authenticateToken,
  authorizeRoles("teacher", "admin"),
  createModuleValidation,
  validationHandler,
  ModuleController.createModule,
);

// Update Module
router.put(
  "/update/:id",
  authenticateToken,
  authorizeRoles("teacher", "admin"),
  updateModuleValidation,
  validationHandler,
  ModuleController.updateModule,
);

// Delete Module
router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeRoles("teacher", "admin"),
  ModuleController.deleteModule,
);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Read All Modules
router.get(
  "/read",
  authenticateToken,
  authorizeRoles("admin"),
  ModuleController.readModules,
);

// Dashboard Counts
router.get(
  "/dashboard-counts",
  authenticateToken,
  authorizeRoles("admin"),
  ModuleController.dashboardCounts,
);

module.exports = router;
