const { body } = require("express-validator");

/*
|--------------------------------------------------------------------------
| Register Validation
|--------------------------------------------------------------------------
*/

const registerValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("phone").trim().notEmpty().withMessage("Phone number is required"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female"])
    .withMessage("Gender must be Male or Female"),

  body("nationality").trim().notEmpty().withMessage("Nationality is required"),

  body("country").trim().notEmpty().withMessage("Country is required"),
];

/*
|--------------------------------------------------------------------------
| Login Validation
|--------------------------------------------------------------------------
*/

const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),

  body("password").notEmpty().withMessage("Password is required"),
];

/*
|--------------------------------------------------------------------------
| Update Profile Validation
|--------------------------------------------------------------------------
*/

const updateProfileValidation = [
  body("fullName")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters"),

  body("password")
    .optional()
    .custom((value) => {
      if (value === "") return true;

      if (value.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      return true;
    }),

  body("phone").optional().trim(),

  body("gender")
    .optional()
    .isIn(["Male", "Female"])
    .withMessage("Gender must be Male or Female"),

  body("nationality").optional().trim(),

  body("country").optional().trim(),

  body("bio")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Bio cannot exceed 1000 characters"),
];

module.exports = {
  registerValidation,
  loginValidation,
  updateProfileValidation,
};
