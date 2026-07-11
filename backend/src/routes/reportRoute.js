const express = require("express");

const ReportController = require("../controllers/reportController");

const authenticateToken = require("../middleware/authenticateToken");
const authorizeRoles = require("../middleware/authorizeRoles");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Overview Report
|--------------------------------------------------------------------------
*/

router.get(
  "/overview",
  authenticateToken,
  authorizeRoles("admin"),
  ReportController.overview,
);

/*
|--------------------------------------------------------------------------
| Student Report
|--------------------------------------------------------------------------
*/

router.get(
  "/students",
  authenticateToken,
  authorizeRoles("admin"),
  ReportController.studentReport,
);

/*
|--------------------------------------------------------------------------
| Teacher Report
|--------------------------------------------------------------------------
*/

router.get(
  "/teachers",
  authenticateToken,
  authorizeRoles("admin"),
  ReportController.teacherReport,
);

/*
|--------------------------------------------------------------------------
| Course Report
|--------------------------------------------------------------------------
*/

router.get(
  "/courses",
  authenticateToken,
  authorizeRoles("admin"),
  ReportController.courseReport,
);

/*
|--------------------------------------------------------------------------
| Enrollment Report
|--------------------------------------------------------------------------
*/

router.get(
  "/enrollments",
  authenticateToken,
  authorizeRoles("admin"),
  ReportController.enrollmentReport,
);

/*
|--------------------------------------------------------------------------
| Payment Report
|--------------------------------------------------------------------------
*/

router.get(
  "/payments",
  authenticateToken,
  authorizeRoles("admin"),
  ReportController.paymentReport,
);

module.exports = router;
