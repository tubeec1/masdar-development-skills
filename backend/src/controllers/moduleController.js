const ModuleService = require("../services/moduleService");

class ModuleController {
  /*
  |--------------------------------------------------------------------------
  | Create Module
  |--------------------------------------------------------------------------
  */

  static async createModule(req, res, next) {
    try {
      const result = await ModuleService.createModule(req.user, req.body);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read Modules By Course
  |--------------------------------------------------------------------------
  */

  static async readCourseModules(req, res, next) {
    try {
      const { courseId } = req.params;

      const result = await ModuleService.readCourseModules(courseId);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Update Module
  |--------------------------------------------------------------------------
  */

  static async updateModule(req, res, next) {
    try {
      const { id } = req.params;

      const result = await ModuleService.updateModule(req.user, id, req.body);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
  /*
  |--------------------------------------------------------------------------
  | Delete Module
  |--------------------------------------------------------------------------
  */

  static async deleteModule(req, res, next) {
    try {
      const { id } = req.params;

      const result = await ModuleService.deleteModule(req.user, id);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read All Modules (Admin)
  |--------------------------------------------------------------------------
  */

  static async readModules(req, res, next) {
    try {
      const result = await ModuleService.readModules();

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
      const result = await ModuleService.dashboardCounts();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ModuleController;
