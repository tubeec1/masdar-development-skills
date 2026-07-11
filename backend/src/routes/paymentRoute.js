const express = require("express");

const PaymentController = require("../controllers/paymentController");

const authenticateToken = require("../middleware/authenticateToken");
const authorizeRoles = require("../middleware/authorizeRoles");
const uploadPaymentScreenshot = require("../middleware/uploadPaymentScreenshot");

const validationHandler = require("../helpers/validationHandler");

const { createPaymentValidation } = require("../validations/paymentValidation");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Create Payment
|--------------------------------------------------------------------------
*/

router.post(
  "/create",
  authenticateToken,
  authorizeRoles("student"),
  uploadPaymentScreenshot.single("paymentScreenshot"),
  createPaymentValidation,
  validationHandler,
  PaymentController.createPayment,
);

/*
|--------------------------------------------------------------------------
| Read My Payments
|--------------------------------------------------------------------------
*/

router.get(
  "/my-payments",
  authenticateToken,
  authorizeRoles("student"),
  PaymentController.readStudentPayments,
);

/*
|--------------------------------------------------------------------------
| Read All Payments
|--------------------------------------------------------------------------
*/

router.get(
  "/read",
  authenticateToken,
  authorizeRoles("admin"),
  PaymentController.readPayments,
);

/*
|--------------------------------------------------------------------------
| Read Payment By ID
|--------------------------------------------------------------------------
*/

router.get(
  "/read/:id",
  authenticateToken,
  authorizeRoles("student", "admin"),
  PaymentController.readPayment,
);

/*
|--------------------------------------------------------------------------
| Verify Payment
|--------------------------------------------------------------------------
*/

router.patch(
  "/verify/:id",
  authenticateToken,
  authorizeRoles("admin"),
  PaymentController.verifyPayment,
);

/*
|--------------------------------------------------------------------------
| Reject Payment
|--------------------------------------------------------------------------
*/

router.patch(
  "/reject/:id",
  authenticateToken,
  authorizeRoles("admin"),
  PaymentController.rejectPayment,
);

/*
|--------------------------------------------------------------------------
| Dashboard Counts
|--------------------------------------------------------------------------
*/

router.get(
  "/dashboard-counts",
  authenticateToken,
  authorizeRoles("admin"),
  PaymentController.dashboardCounts,
);

module.exports = router;
