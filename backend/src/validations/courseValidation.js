const { body } = require("express-validator");

/*
|--------------------------------------------------------------------------
| Create Course Validation
|--------------------------------------------------------------------------
*/

const createCourseValidation = [
  body("categoryId")
    .notEmpty()
    .withMessage("Category is required.")
    .isInt({ min: 1 })
    .withMessage("Invalid category."),

  body("title").trim().notEmpty().withMessage("Course title is required."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Course description is required."),

  body("duration")
    .trim()
    .notEmpty()
    .withMessage("Course duration is required."),

  body("language")
    .trim()
    .notEmpty()
    .withMessage("Course language is required."),

  body("level").trim().notEmpty().withMessage("Course level is required."),

  body("price")
    .notEmpty()
    .withMessage("Course price is required.")
    .isFloat({ min: 0 })
    .withMessage("Invalid price."),

  body("discountPrice")
    .optional({ values: "falsy" })
    .isFloat({ min: 0 })
    .withMessage("Invalid discount price."),

  body("introVideo")
    .optional()
    .trim()
    .isURL()
    .withMessage("Invalid intro video URL."),
];

/*
|--------------------------------------------------------------------------
| Update Course Validation
|--------------------------------------------------------------------------
*/

const updateCourseValidation = [
  body("categoryId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid category."),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Course title cannot be empty."),

  body("description").optional().trim(),

  body("duration").optional().trim(),

  body("language").optional().trim(),

  body("level").optional().trim(),

  body("price").optional().isFloat({ min: 0 }).withMessage("Invalid price."),

  body("discountPrice")
    .optional({ values: "falsy" })
    .isFloat({ min: 0 })
    .withMessage("Invalid discount price."),

  body("introVideo")
    .optional()
    .trim()
    .isURL()
    .withMessage("Invalid intro video URL."),
];

/*
|--------------------------------------------------------------------------
| Change Course Status Validation
|--------------------------------------------------------------------------
*/

const changeCourseStatusValidation = [
  body("status")
    .notEmpty()
    .withMessage("Status is required.")
    .isIn(["Draft", "Published", "Archived"])
    .withMessage("Status must be Draft, Published or Archived."),
];

module.exports = {
  createCourseValidation,
  updateCourseValidation,
  changeCourseStatusValidation,
};
