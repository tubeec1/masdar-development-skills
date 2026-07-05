const LessonService = require("../services/lessonService");

class LessonController {
  /*
  |--------------------------------------------------------------------------
  | Create Lesson
  |--------------------------------------------------------------------------
  */

  static async createLesson(req, res, next) {
    try {
      const result = await LessonService.createLesson(req.user, req.body);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read Lessons By Module
  |--------------------------------------------------------------------------
  */

  static async readModuleLessons(req, res, next) {
    try {
      const { moduleId } = req.params;

      const result = await LessonService.readModuleLessons(moduleId);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Update Lesson
  |--------------------------------------------------------------------------
  */

  static async updateLesson(req, res, next) {
    try {
      const { id } = req.params;

      const result = await LessonService.updateLesson(req.user, id, req.body);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
  /*
  |--------------------------------------------------------------------------
  | Delete Lesson
  |--------------------------------------------------------------------------
  */

  static async deleteLesson(req, res, next) {
    try {
      const { id } = req.params;

      const result = await LessonService.deleteLesson(req.user, id);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read All Lessons (Admin)
  |--------------------------------------------------------------------------
  */

  static async readLessons(req, res, next) {
    try {
      const result = await LessonService.readLessons();

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
      const result = await LessonService.dashboardCounts();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LessonController;
