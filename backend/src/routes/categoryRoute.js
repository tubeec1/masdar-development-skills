const express = require("express");

const CategoryController = require("../controllers/categoryController");

const authenticateToken = require("../middleware/authenticateToken");
const authorizeRoles = require("../middleware/authorizeRoles");
const uploadCategoryImage = require("../middleware/uploadCategoryImage");

const validationHandler = require("../helpers/validationHandler");

const {
  createCategoryValidation,
  updateCategoryValidation,
  changeCategoryStatusValidation,
} = require("../validations/categoryValidation");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Read Active Categories
router.get("/", CategoryController.readActiveCategories);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Create Category
router.post(
  "/create",
  authenticateToken,
  authorizeRoles("admin"),
  uploadCategoryImage.single("image"),
  createCategoryValidation,
  validationHandler,
  CategoryController.createCategory,
);

// Read All Categories
router.get(
  "/read",
  authenticateToken,
  authorizeRoles("admin"),
  CategoryController.readCategories,
);

// Update Category
router.put(
  "/update/:id",
  authenticateToken,
  authorizeRoles("admin"),
  uploadCategoryImage.single("image"),
  updateCategoryValidation,
  validationHandler,
  CategoryController.updateCategory,
);

// Delete Category
router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeRoles("admin"),
  CategoryController.deleteCategory,
);

// Change Category Status
router.patch(
  "/status/:id",
  authenticateToken,
  authorizeRoles("admin"),
  changeCategoryStatusValidation,
  validationHandler,
  CategoryController.changeCategoryStatus,
);

// Dashboard Counts
router.get(
  "/dashboard-counts",
  authenticateToken,
  authorizeRoles("admin"),
  CategoryController.dashboardCounts,
);

// Read Category By Slug
router.get("/:slug", CategoryController.readCategoryBySlug);

module.exports = router;
