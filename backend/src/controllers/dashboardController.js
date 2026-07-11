const DashboardService = require("../services/dashboardService");

class DashboardController {
  /*
  |--------------------------------------------------------------------------
  | Admin Dashboard
  |--------------------------------------------------------------------------
  */

  static async adminDashboard(req, res, next) {
    try {
      const result = await DashboardService.adminDashboard();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Teacher Dashboard
  |--------------------------------------------------------------------------
  */

  static async teacherDashboard(req, res, next) {
    try {
      const result = await DashboardService.teacherDashboard(req.user.id);

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

  static async studentDashboard(req, res, next) {
    try {
      const result = await DashboardService.studentDashboard(req.user.id);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DashboardController;
