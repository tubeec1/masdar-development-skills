const { body } = require("express-validator");

// =====================================
// Change Enrollment Status Validation
// =====================================

const changeEnrollmentStatusValidation = [
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required.")
    .isIn(["Pending", "Approved", "Rejected", "Cancelled"])
    .withMessage("Invalid enrollment status."),

  body("paymentId")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage("Payment ID must be a valid integer."),
];

module.exports = {
  changeEnrollmentStatusValidation,
};
