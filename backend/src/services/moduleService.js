const ModuleModel = require("../models/moduleModel");
const CourseModel = require("../models/courseModel");

class ModuleService {
  /*
  |--------------------------------------------------------------------------
  | Create Module
  |--------------------------------------------------------------------------
  */

  static async createModule(user, body) {
    const { courseId, title, description, moduleOrder } = body;

    // Check Course
    const course = await CourseModel.findById(courseId);

    if (!course) {
      return {
        statusCode: 404,
        success: false,
        message: "Course not found.",
      };
    }

    // Teacher can only manage their own courses
    if (user.role !== "admin" && Number(course.teacherId) !== Number(user.id)) {
      return {
        statusCode: 403,
        success: false,
        message: "You are not allowed to manage this course.",
      };
    }

    // Check Duplicate Module Order
    const existingOrder = await ModuleModel.findByOrder(courseId, moduleOrder);

    if (existingOrder) {
      return {
        statusCode: 400,
        success: false,
        message: "Module order already exists for this course.",
      };
    }

    // Create Module
    const moduleId = await ModuleModel.create({
      courseId,
      title,
      description,
      moduleOrder,
    });

    const module = await ModuleModel.findById(moduleId);

    return {
      statusCode: 201,
      success: true,
      message: "Module created successfully.",
      module,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Read Modules By Course
  |--------------------------------------------------------------------------
  */

  static async readCourseModules(courseId) {
    const course = await CourseModel.findById(courseId);

    if (!course) {
      return {
        statusCode: 404,
        success: false,
        message: "Course not found.",
      };
    }

    const modules = await ModuleModel.findByCourse(courseId);

    return {
      statusCode: 200,
      success: true,
      message: "Modules fetched successfully.",
      total: modules.length,
      modules,
    };
  }
  /*
  |--------------------------------------------------------------------------
  | Update Module
  |--------------------------------------------------------------------------
  */

  static async updateModule(user, moduleId, body) {
    const module = await ModuleModel.findById(moduleId);

    if (!module) {
      return {
        statusCode: 404,
        success: false,
        message: "Module not found.",
      };
    }

    // Only owner teacher or admin
    if (user.role !== "admin" && Number(module.teacherId) !== Number(user.id)) {
      return {
        statusCode: 403,
        success: false,
        message: "You are not allowed to update this module.",
      };
    }

    // Check duplicate order
    if (
      body.moduleOrder &&
      Number(body.moduleOrder) !== Number(module.moduleOrder)
    ) {
      const existingOrder = await ModuleModel.findByOrder(
        module.courseId,
        body.moduleOrder,
      );

      if (existingOrder && Number(existingOrder.id) !== Number(moduleId)) {
        return {
          statusCode: 400,
          success: false,
          message: "Module order already exists for this course.",
        };
      }
    }

    await ModuleModel.update(moduleId, {
      title: body.title ?? module.title,
      description: body.description ?? module.description,
      moduleOrder: body.moduleOrder ?? module.moduleOrder,
    });

    const updatedModule = await ModuleModel.findById(moduleId);

    return {
      statusCode: 200,
      success: true,
      message: "Module updated successfully.",
      module: updatedModule,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Module
  |--------------------------------------------------------------------------
  */

  static async deleteModule(user, moduleId) {
    const module = await ModuleModel.findById(moduleId);

    if (!module) {
      return {
        statusCode: 404,
        success: false,
        message: "Module not found.",
      };
    }

    // Only owner teacher or admin
    if (user.role !== "admin" && Number(module.teacherId) !== Number(user.id)) {
      return {
        statusCode: 403,
        success: false,
        message: "You are not allowed to delete this module.",
      };
    }

    await ModuleModel.delete(moduleId);

    return {
      statusCode: 200,
      success: true,
      message: "Module deleted successfully.",
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Read All Modules (Admin)
  |--------------------------------------------------------------------------
  */

  static async readModules() {
    const modules = await ModuleModel.findAll();

    return {
      statusCode: 200,
      success: true,
      message: "Modules fetched successfully.",
      total: modules.length,
      modules,
    };
  }
  /*
  |--------------------------------------------------------------------------
  | Dashboard Counts
  |--------------------------------------------------------------------------
  */

  static async dashboardCounts() {
    const statistics = await ModuleModel.dashboardCounts();

    return {
      statusCode: 200,
      success: true,
      message: "Module dashboard statistics fetched successfully.",
      statistics: {
        totalModules: Number(statistics.totalModules),
      },
    };
  }
}

module.exports = ModuleService;
