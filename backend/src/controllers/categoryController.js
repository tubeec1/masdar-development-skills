const CategoryService = require("../services/categoryService");

class CategoryController {
  /*
  |--------------------------------------------------------------------------
  | Create Category
  |--------------------------------------------------------------------------
  */

  static async createCategory(req, res, next) {
    try {
      const result = await CategoryService.createCategory(
        req.user,
        req.body,
        req.file,
      );

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read Active Categories (Public)
  |--------------------------------------------------------------------------
  */

  static async readActiveCategories(req, res, next) {
    try {
      const result = await CategoryService.readActiveCategories();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read Category By Slug
  |--------------------------------------------------------------------------
  */

  static async readCategoryBySlug(req, res, next) {
    try {
      const { slug } = req.params;

      const result = await CategoryService.readCategoryBySlug(slug);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read All Categories (Admin)
  |--------------------------------------------------------------------------
  */

  static async readCategories(req, res, next) {
    try {
      const result = await CategoryService.readCategories();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Update Category
  |--------------------------------------------------------------------------
  */

  static async updateCategory(req, res, next) {
    try {
      const { id } = req.params;

      const result = await CategoryService.updateCategory(
        id,
        req.body,
        req.file,
      );

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Category
  |--------------------------------------------------------------------------
  */

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;

      const result = await CategoryService.deleteCategory(id);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Change Category Status
  |--------------------------------------------------------------------------
  */

  static async changeCategoryStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const result = await CategoryService.changeCategoryStatus(id, status);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Dashboard Counts
  |--------------------------------------------------------------------------
  */

  static async dashboardCounts(req, res, next) {
    try {
      const result = await CategoryService.dashboardCounts();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
