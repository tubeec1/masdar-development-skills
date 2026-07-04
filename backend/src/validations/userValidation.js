const { body } = require("express-validator");

/*
|--------------------------------------------------------------------------
| Create Teacher Validation
|--------------------------------------------------------------------------
*/

const createTeacherValidation = [
  body("fullName").trim().notEmpty().withMessage("Full name is required."),

  body("email").trim().isEmail().withMessage("Valid email is required."),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters."),

  body("phone").optional().trim(),

  body("gender")
    .isIn(["Male", "Female"])
    .withMessage("Gender must be Male or Female."),

  body("nationality").trim().notEmpty().withMessage("Nationality is required."),

  body("country").trim().notEmpty().withMessage("Country is required."),
];

/*
|--------------------------------------------------------------------------
| Update User Validation
|--------------------------------------------------------------------------
*/

const updateUserValidation = [
  body("fullName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name cannot be empty."),

  body("phone").optional().trim(),

  body("gender")
    .optional()
    .isIn(["Male", "Female"])
    .withMessage("Gender must be Male or Female."),

  body("nationality").optional().trim(),

  body("country").optional().trim(),

  body("role")
    .optional()
    .isIn(["admin", "teacher", "student"])
    .withMessage("Invalid role."),

  body("bio").optional().trim(),
];

/*
|--------------------------------------------------------------------------
| Change Status Validation
|--------------------------------------------------------------------------
*/

const changeStatusValidation = [
  body("isActive").isBoolean().withMessage("isActive must be true or false."),
];

module.exports = {
  createTeacherValidation,
  updateUserValidation,
  changeStatusValidation,
};
