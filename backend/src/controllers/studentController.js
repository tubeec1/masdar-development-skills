const StudentService = require("../services/studentService");

class StudentController {
  /*
  |--------------------------------------------------------------------------
  | Read My Courses
  |--------------------------------------------------------------------------
  */

  static async readMyCourses(req, res, next) {
    try {
      const result = await StudentService.readMyCourses(req.user.id);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Student Dashboard
  |--------------------------------------------------------------------------
  */

  static async dashboard(req, res, next) {
    try {
      const result = await StudentService.dashboard(req.user.id);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StudentController;
