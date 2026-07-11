const ReportService = require("../services/reportService");

class ReportController {
  /*
  |--------------------------------------------------------------------------
  | Overview Report
  |--------------------------------------------------------------------------
  */

  static async overview(req, res, next) {
    try {
      const result = await ReportService.overview();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Student Report
  |--------------------------------------------------------------------------
  */

  static async studentReport(req, res, next) {
    try {
      const result = await ReportService.studentReport();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Teacher Report
  |--------------------------------------------------------------------------
  */

  static async teacherReport(req, res, next) {
    try {
      const result = await ReportService.teacherReport();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Course Report
  |--------------------------------------------------------------------------
  */

  static async courseReport(req, res, next) {
    try {
      const result = await ReportService.courseReport();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Enrollment Report
  |--------------------------------------------------------------------------
  */

  static async enrollmentReport(req, res, next) {
    try {
      const { status } = req.query;

      const result = await ReportService.enrollmentReport(status);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Payment Report
  |--------------------------------------------------------------------------
  */

  static async paymentReport(req, res, next) {
    try {
      const { status } = req.query;

      const result = await ReportService.paymentReport(status);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReportController;
