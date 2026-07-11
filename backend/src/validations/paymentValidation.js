const { body } = require("express-validator");

class PaymentValidation {
  /*
  |--------------------------------------------------------------------------
  | Create Payment Validation
  |--------------------------------------------------------------------------
  */

  static createPaymentValidation = [
    body("courseId")
      .notEmpty()
      .withMessage("Course ID is required.")
      .isInt({ min: 1 })
      .withMessage("Course ID must be a valid integer."),

    body("phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("Phone number is required.")
      .isLength({ min: 6, max: 20 })
      .withMessage("Phone number must be between 6 and 20 characters."),

    body("transactionReference")
      .trim()
      .notEmpty()
      .withMessage("Transaction reference is required.")
      .isLength({ min: 3, max: 100 })
      .withMessage(
        "Transaction reference must be between 3 and 100 characters.",
      ),

    body("paymentMethod")
      .trim()
      .notEmpty()
      .withMessage("Payment method is required.")
      .isIn([
        "EVC Plus",
        "Zaad",
        "Sahal",
        "Premier Wallet",
        "Edahab",
        "Bank Transfer",
      ])
      .withMessage("Invalid payment method."),
  ];
}

module.exports = PaymentValidation;
