const express = require("express");

const authController = require("../controllers/authController");
const authenticateToken = require("../middleware/authenticateToken");
const uploadProfileImage = require("../middleware/uploadProfileImage");

const validationHandler = require("../helpers/validationHandler");

const {
  registerValidation,
  loginValidation,
  updateProfileValidation,
} = require("../validations/authValidation");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

router.post(
  "/register",
  registerValidation,
  validationHandler,
  authController.register,
);

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

router.post("/login", loginValidation, validationHandler, authController.login);

/*
|--------------------------------------------------------------------------
| Get Profile
|--------------------------------------------------------------------------
*/

router.get("/profile", authenticateToken, authController.getProfile);

/*
|--------------------------------------------------------------------------
| Update Profile
|--------------------------------------------------------------------------
*/

router.put(
  "/update-profile",
  authenticateToken,
  uploadProfileImage.single("profileImage"),
  updateProfileValidation,
  validationHandler,
  authController.updateProfile,
);

module.exports = router;
