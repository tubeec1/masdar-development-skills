const { body } = require("express-validator");

/*
|--------------------------------------------------------------------------
| Create Module Validation
|--------------------------------------------------------------------------
*/

const createModuleValidation = [
  body("courseId")
    .notEmpty()
    .withMessage("Course is required.")
    .isInt({ min: 1 })
    .withMessage("Invalid course."),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Module title is required.")
    .isLength({ min: 3, max: 200 })
    .withMessage("Module title must be between 3 and 200 characters."),

  body("description").optional({ nullable: true }).trim(),

  body("moduleOrder")
    .notEmpty()
    .withMessage("Module order is required.")
    .isInt({ min: 1 })
    .withMessage("Module order must be a positive integer."),
];

/*
|--------------------------------------------------------------------------
| Update Module Validation
|--------------------------------------------------------------------------
*/

const updateModuleValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Module title must be between 3 and 200 characters."),

  body("description").optional({ nullable: true }).trim(),

  body("moduleOrder")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Module order must be a positive integer."),
];

module.exports = {
  createModuleValidation,
  updateModuleValidation,
};
