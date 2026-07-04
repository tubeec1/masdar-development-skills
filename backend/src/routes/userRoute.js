const express = require("express");

const UserController = require("../controllers/userController");

const authenticateToken = require("../middleware/authenticateToken");
const authorizeRoles = require("../middleware/authorizeRoles");
const uploadProfileImage = require("../middleware/uploadProfileImage");

const validationHandler = require("../helpers/validationHandler");

const {
  createTeacherValidation,
  updateUserValidation,
  changeStatusValidation,
} = require("../validations/userValidation");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Read All Users
|--------------------------------------------------------------------------
*/

router.get(
  "/read",
  authenticateToken,
  authorizeRoles("admin"),
  UserController.readUsers,
);

/*
|--------------------------------------------------------------------------
| Read User By ID
|--------------------------------------------------------------------------
*/

router.get(
  "/read/:id",
  authenticateToken,
  authorizeRoles("admin"),
  UserController.readUserById,
);

/*
|--------------------------------------------------------------------------
| Create Teacher
|--------------------------------------------------------------------------
*/

router.post(
  "/create-teacher",
  authenticateToken,
  authorizeRoles("admin"),
  createTeacherValidation,
  validationHandler,
  UserController.createTeacher,
);

/*
|--------------------------------------------------------------------------
| Update User
|--------------------------------------------------------------------------
*/

router.put(
  "/update/:id",
  authenticateToken,
  authorizeRoles("admin"),
  uploadProfileImage.single("profileImage"),
  updateUserValidation,
  validationHandler,
  UserController.updateUser,
);

/*
|--------------------------------------------------------------------------
| Delete User
|--------------------------------------------------------------------------
*/

router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeRoles("admin"),
  UserController.deleteUser,
);

/*
|--------------------------------------------------------------------------
| Change User Status
|--------------------------------------------------------------------------
*/

router.patch(
  "/status/:id",
  authenticateToken,
  authorizeRoles("admin"),
  changeStatusValidation,
  validationHandler,
  UserController.changeUserStatus,
);

/*
|--------------------------------------------------------------------------
| Read Students
|--------------------------------------------------------------------------
*/

router.get(
  "/students",
  authenticateToken,
  authorizeRoles("admin"),
  UserController.readStudents,
);

/*
|--------------------------------------------------------------------------
| Read Teachers
|--------------------------------------------------------------------------
*/

router.get(
  "/teachers",
  authenticateToken,
  authorizeRoles("admin"),
  UserController.readTeachers,
);

/*
|--------------------------------------------------------------------------
| Read Admins
|--------------------------------------------------------------------------
*/

router.get(
  "/admins",
  authenticateToken,
  authorizeRoles("admin"),
  UserController.readAdmins,
);

/*
|--------------------------------------------------------------------------
| Dashboard Counts
|--------------------------------------------------------------------------
*/

router.get(
  "/dashboard-counts",
  authenticateToken,
  authorizeRoles("admin"),
  UserController.dashboardCounts,
);

module.exports = router;
