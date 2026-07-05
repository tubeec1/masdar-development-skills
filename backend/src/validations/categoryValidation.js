const { body } = require("express-validator");

/*
|--------------------------------------------------------------------------
| Create Category Validation
|--------------------------------------------------------------------------
*/

const createCategoryValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Category title is required.")
    .isLength({ min: 3, max: 150 })
    .withMessage("Category title must be between 3 and 150 characters."),

  body("description").optional({ nullable: true }).trim(),

  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Status must be Active or Inactive."),
];

/*
|--------------------------------------------------------------------------
| Update Category Validation
|--------------------------------------------------------------------------
*/

const updateCategoryValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 150 })
    .withMessage("Category title must be between 3 and 150 characters."),

  body("description").optional({ nullable: true }).trim(),

  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Status must be Active or Inactive."),
];

/*
|--------------------------------------------------------------------------
| Change Category Status Validation
|--------------------------------------------------------------------------
*/

const changeCategoryStatusValidation = [
  body("status")
    .notEmpty()
    .withMessage("Status is required.")
    .isIn(["Active", "Inactive"])
    .withMessage("Status must be Active or Inactive."),
];

module.exports = {
  createCategoryValidation,
  updateCategoryValidation,
  changeCategoryStatusValidation,
};
