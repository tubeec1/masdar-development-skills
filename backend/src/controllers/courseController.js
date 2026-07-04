const CourseService = require("../services/courseService");

class CourseController {
  /*
  |--------------------------------------------------------------------------
  | Create Course
  |--------------------------------------------------------------------------
  */

  static async createCourse(req, res, next) {
    try {
      const teacherId = req.user.id;

      const result = await CourseService.createCourse(
        teacherId,
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
  | Read All Courses (Admin)
  |--------------------------------------------------------------------------
  */

  static async readCourses(req, res, next) {
    try {
      const result = await CourseService.readCourses();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read Published Courses
  |--------------------------------------------------------------------------
  */

  static async readPublishedCourses(req, res, next) {
    try {
      const result = await CourseService.readPublishedCourses();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read Course By Slug
  |--------------------------------------------------------------------------
  */

  static async readCourseBySlug(req, res, next) {
    try {
      const { slug } = req.params;

      const result = await CourseService.readCourseBySlug(slug);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
  /*
  |--------------------------------------------------------------------------
  | Read Teacher Courses
  |--------------------------------------------------------------------------
  */

  static async readTeacherCourses(req, res, next) {
    try {
      const teacherId = req.user.id;

      const result = await CourseService.readTeacherCourses(teacherId);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Update Course
  |--------------------------------------------------------------------------
  */

  static async updateCourse(req, res, next) {
    try {
      const { id } = req.params;

      const result = await CourseService.updateCourse(id, req.body, req.file);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Course
  |--------------------------------------------------------------------------
  */

  static async deleteCourse(req, res, next) {
    try {
      const { id } = req.params;

      const result = await CourseService.deleteCourse(id);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
  /*
  |--------------------------------------------------------------------------
  | Change Course Status
  |--------------------------------------------------------------------------
  */

  static async changeCourseStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const result = await CourseService.changeCourseStatus(id, status);

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
      const result = await CourseService.dashboardCounts();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CourseController;
