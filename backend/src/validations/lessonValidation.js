const { body } = require("express-validator");

/*
|--------------------------------------------------------------------------
| Create Lesson Validation
|--------------------------------------------------------------------------
*/

const createLessonValidation = [
  body("moduleId")
    .notEmpty()
    .withMessage("Module is required.")
    .isInt({ min: 1 })
    .withMessage("Invalid module."),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Lesson title is required.")
    .isLength({ min: 3, max: 200 })
    .withMessage("Lesson title must be between 3 and 200 characters."),

  body("description").optional({ nullable: true }).trim(),

  body("videoProvider")
    .optional({ nullable: true })
    .isIn(["YouTube", "Vimeo", "Bunny", "Cloudinary", "SelfHosted"])
    .withMessage(
      "Video provider must be YouTube, Vimeo, Bunny, Cloudinary or SelfHosted.",
    ),

  body("videoUrl")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Video URL cannot exceed 500 characters."),

  body("duration")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage("Duration cannot exceed 100 characters."),

  body("lessonOrder")
    .notEmpty()
    .withMessage("Lesson order is required.")
    .isInt({ min: 1 })
    .withMessage("Lesson order must be a positive integer."),

  body("isPreview")
    .optional()
    .isBoolean()
    .withMessage("Preview must be true or false."),
];

/*
|--------------------------------------------------------------------------
| Update Lesson Validation
|--------------------------------------------------------------------------
*/

const updateLessonValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Lesson title must be between 3 and 200 characters."),

  body("description").optional({ nullable: true }).trim(),

  body("videoProvider")
    .optional({ nullable: true })
    .isIn(["YouTube", "Vimeo", "Bunny", "Cloudinary", "SelfHosted"])
    .withMessage(
      "Video provider must be YouTube, Vimeo, Bunny, Cloudinary or SelfHosted.",
    ),

  body("videoUrl")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Video URL cannot exceed 500 characters."),

  body("duration")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage("Duration cannot exceed 100 characters."),

  body("lessonOrder")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Lesson order must be a positive integer."),

  body("isPreview")
    .optional()
    .isBoolean()
    .withMessage("Preview must be true or false."),
];

module.exports = {
  createLessonValidation,
  updateLessonValidation,
};
