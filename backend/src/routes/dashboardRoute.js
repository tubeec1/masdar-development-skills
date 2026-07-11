const express = require("express");

const DashboardController = require("../controllers/dashboardController");

const authenticateToken = require("../middleware/authenticateToken");
const authorizeRoles = require("../middleware/authorizeRoles");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Admin Dashboard
|--------------------------------------------------------------------------
*/

router.get(
  "/admin",
  authenticateToken,
  authorizeRoles("admin"),
  DashboardController.adminDashboard,
);

/*
|--------------------------------------------------------------------------
| Teacher Dashboard
|--------------------------------------------------------------------------
*/

router.get(
  "/teacher",
  authenticateToken,
  authorizeRoles("teacher"),
  DashboardController.teacherDashboard,
);

/*
|--------------------------------------------------------------------------
| Student Dashboard
|--------------------------------------------------------------------------
*/

router.get(
  "/student",
  authenticateToken,
  authorizeRoles("student"),
  DashboardController.studentDashboard,
);

module.exports = router;
