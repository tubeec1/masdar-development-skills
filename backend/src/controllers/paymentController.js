const PaymentService = require("../services/paymentService");

class PaymentController {
  /*
  |--------------------------------------------------------------------------
  | Create Payment
  |--------------------------------------------------------------------------
  */

  static async createPayment(req, res, next) {
    try {
      const result = await PaymentService.createPayment(
        req.user.id,
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
  | Read Student Payments
  |--------------------------------------------------------------------------
  */

  static async readStudentPayments(req, res, next) {
    try {
      const result = await PaymentService.readStudentPayments(req.user.id);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read Payment Details
  |--------------------------------------------------------------------------
  */

  static async readPayment(req, res, next) {
    try {
      const result = await PaymentService.readPayment(req.params.id, req.user);

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Read All Payments
  |--------------------------------------------------------------------------
  */

  static async readPayments(req, res, next) {
    try {
      const result = await PaymentService.readPayments();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
  /*
  |--------------------------------------------------------------------------
  | Verify Payment
  |--------------------------------------------------------------------------
  */

  static async verifyPayment(req, res, next) {
    try {
      const result = await PaymentService.verifyPayment(
        req.params.id,
        req.user.id,
      );

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Reject Payment
  |--------------------------------------------------------------------------
  */

  static async rejectPayment(req, res, next) {
    try {
      const result = await PaymentService.rejectPayment(
        req.params.id,
        req.user.id,
      );

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Payment Dashboard Counts
  |--------------------------------------------------------------------------
  */

  static async dashboardCounts(req, res, next) {
    try {
      const result = await PaymentService.dashboardCounts();

      return res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PaymentController;
