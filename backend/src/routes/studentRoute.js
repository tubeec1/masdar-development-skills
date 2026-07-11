const express = require("express");

const StudentController = require("../controllers/studentController");

const authenticateToken = require("../middleware/authenticateToken");
const authorizeRoles = require("../middleware/authorizeRoles");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| My Courses
|--------------------------------------------------------------------------
*/

router.get(
  "/my-courses",
  authenticateToken,
  authorizeRoles("student"),
  StudentController.readMyCourses,
);

/*
|--------------------------------------------------------------------------
| Student Dashboard
|--------------------------------------------------------------------------
*/

router.get(
  "/dashboard",
  authenticateToken,
  authorizeRoles("student"),
  StudentController.dashboard,
);

module.exports = router;
