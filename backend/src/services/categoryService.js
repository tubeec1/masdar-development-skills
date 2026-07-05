const slugify = require("slugify");

const CategoryModel = require("../models/categoryModel");

class CategoryService {
  /*
  |--------------------------------------------------------------------------
  | Create Category
  |--------------------------------------------------------------------------
  */

  static async createCategory(user, body, file) {
    const { title, description, status } = body;

    // Generate Slug
    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Check Existing Title
    const existingTitle = await CategoryModel.findByTitle(title);

    if (existingTitle) {
      return {
        statusCode: 400,
        success: false,
        message: "Category title already exists.",
      };
    }

    // Check Existing Slug
    const existingSlug = await CategoryModel.findByCategorySlug(slug);

    if (existingSlug) {
      return {
        statusCode: 400,
        success: false,
        message: "Category slug already exists.",
      };
    }

    // Image
    const image = file ? `uploads/categoryImages/${file.filename}` : null;

    // Create Category
    const categoryId = await CategoryModel.create({
      title,
      slug,
      description,
      image,
      status: status ?? "Active",
      createdBy: user.id,
    });

    const category = await CategoryModel.findById(categoryId);

    return {
      statusCode: 201,
      success: true,
      message: "Category created successfully.",
      category,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Read Active Categories (Public)
  |--------------------------------------------------------------------------
  */

  static async readActiveCategories() {
    const categories = await CategoryModel.findActive();

    return {
      statusCode: 200,
      success: true,
      message: "Categories fetched successfully.",
      total: categories.length,
      categories,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Read Category By Slug
  |--------------------------------------------------------------------------
  */

  static async readCategoryBySlug(slug) {
    const category = await CategoryModel.findBySlug(slug);

    if (!category || category.status !== "Active") {
      return {
        statusCode: 404,
        success: false,
        message: "Category not found.",
      };
    }

    return {
      statusCode: 200,
      success: true,
      message: "Category fetched successfully.",
      category,
    };
  }
  /*
  |--------------------------------------------------------------------------
  | Read All Categories (Admin)
  |--------------------------------------------------------------------------
  */

  static async readCategories() {
    const categories = await CategoryModel.findAll();

    return {
      statusCode: 200,
      success: true,
      message: "Categories fetched successfully.",
      total: categories.length,
      categories,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Update Category
  |--------------------------------------------------------------------------
  */

  static async updateCategory(categoryId, body, file) {
    const category = await CategoryModel.findById(categoryId);

    if (!category) {
      return {
        statusCode: 404,
        success: false,
        message: "Category not found.",
      };
    }

    // Generate slug
    const slug = body.title
      ? slugify(body.title, {
          lower: true,
          strict: true,
          trim: true,
        })
      : category.slug;

    // Check duplicate title
    if (body.title && body.title !== category.title) {
      const existingTitle = await CategoryModel.findByTitle(body.title);

      if (existingTitle && existingTitle.id !== category.id) {
        return {
          statusCode: 400,
          success: false,
          message: "Category title already exists.",
        };
      }
    }

    // Check duplicate slug
    if (slug !== category.slug) {
      const existingSlug = await CategoryModel.findByCategorySlug(slug);

      if (existingSlug && existingSlug.id !== category.id) {
        return {
          statusCode: 400,
          success: false,
          message: "Category slug already exists.",
        };
      }
    }

    // Keep old image if no new upload
    let image = category.image;

    if (file) {
      image = `uploads/categoryImages/${file.filename}`;
    }

    await CategoryModel.update(categoryId, {
      title: body.title ?? category.title,
      slug,
      description: body.description ?? category.description,
      image,
      status: body.status ?? category.status,
    });

    const updatedCategory = await CategoryModel.findById(categoryId);

    return {
      statusCode: 200,
      success: true,
      message: "Category updated successfully.",
      category: updatedCategory,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Category
  |--------------------------------------------------------------------------
  */

  static async deleteCategory(categoryId) {
    const category = await CategoryModel.findById(categoryId);

    if (!category) {
      return {
        statusCode: 404,
        success: false,
        message: "Category not found.",
      };
    }

    await CategoryModel.delete(categoryId);

    return {
      statusCode: 200,
      success: true,
      message: "Category deleted successfully.",
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Change Category Status
  |--------------------------------------------------------------------------
  */

  static async changeCategoryStatus(categoryId, status) {
    const category = await CategoryModel.findById(categoryId);

    if (!category) {
      return {
        statusCode: 404,
        success: false,
        message: "Category not found.",
      };
    }

    const allowedStatuses = ["Active", "Inactive"];

    if (!allowedStatuses.includes(status)) {
      return {
        statusCode: 400,
        success: false,
        message: "Invalid category status.",
      };
    }

    await CategoryModel.updateStatus(categoryId, status);

    const updatedCategory = await CategoryModel.findById(categoryId);

    return {
      statusCode: 200,
      success: true,
      message: `Category ${status.toLowerCase()} successfully.`,
      category: updatedCategory,
    };
  }
  /*
  |--------------------------------------------------------------------------
  | Dashboard Counts
  |--------------------------------------------------------------------------
  */

  static async dashboardCounts() {
    const statistics = await CategoryModel.dashboardCounts();

    return {
      statusCode: 200,
      success: true,
      message: "Category dashboard statistics fetched successfully.",
      statistics: {
        totalCategories: Number(statistics.totalCategories),
        activeCategories: Number(statistics.activeCategories),
        inactiveCategories: Number(statistics.inactiveCategories),
      },
    };
  }
}

module.exports = CategoryService;
