const PaymentModel = require("../models/paymentModel");
const EnrollmentModel = require("../models/enrollmentModel");
const CourseModel = require("../models/courseModel");

class PaymentService {
  /*
  |--------------------------------------------------------------------------
  | Create Payment
  |--------------------------------------------------------------------------
  */

  static async createPayment(studentId, body, file) {
    const { courseId, phoneNumber, transactionReference, paymentMethod } = body;

    // Check course
    const course = await CourseModel.findById(courseId);

    if (!course) {
      return {
        statusCode: 404,
        success: false,
        message: "Course not found.",
      };
    }

    // Calculate actual payable amount
    const amount =
      Number(course.discountPrice) > 0
        ? Number(course.discountPrice)
        : Number(course.price);

    // Free courses don't require payment
    if (amount <= 0) {
      return {
        statusCode: 400,
        success: false,
        message: "This course is free. No payment is required.",
      };
    }

    // Check enrollment
    const enrollment = await EnrollmentModel.findStudentEnrollment(
      studentId,
      courseId,
    );

    if (!enrollment) {
      return {
        statusCode: 404,
        success: false,
        message: "Enrollment not found.",
      };
    }

    // Enrollment must be pending
    if (enrollment.status !== "Pending") {
      return {
        statusCode: 400,
        success: false,
        message: `Enrollment is already ${enrollment.status.toLowerCase()}.`,
      };
    }

    // Prevent duplicate payment
    const existingPayment = await PaymentModel.findStudentPayment(
      studentId,
      courseId,
    );

    if (existingPayment) {
      return {
        statusCode: 400,
        success: false,
        message: "Payment has already been submitted for this course.",
      };
    }

    // Prevent duplicate transaction reference
    const existingReference =
      await PaymentModel.findByTransactionReference(transactionReference);

    if (existingReference) {
      return {
        statusCode: 400,
        success: false,
        message: "Transaction reference already exists.",
      };
    }

    // Screenshot path
    const paymentScreenshot = file
      ? `uploads/paymentScreenshots/${file.filename}`
      : null;

    // Create payment
    const paymentId = await PaymentModel.create({
      studentId,
      courseId,
      amount,
      phoneNumber,
      transactionReference,
      paymentMethod,
      paymentScreenshot,
      status: "Pending",
    });

    const payment = await PaymentModel.findById(paymentId);

    return {
      statusCode: 201,
      success: true,
      message:
        "Payment submitted successfully. Waiting for admin verification.",
      payment,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Read Student Payments
  |--------------------------------------------------------------------------
  */

  static async readStudentPayments(studentId) {
    const payments = await PaymentModel.findStudentPayments(studentId);

    return {
      statusCode: 200,
      success: true,
      message: "Student payments fetched successfully.",
      total: payments.length,
      payments,
    };
  }
  /*
  |--------------------------------------------------------------------------
  | Read Payment Details
  |--------------------------------------------------------------------------
  */

  static async readPayment(paymentId, user) {
    const payment = await PaymentModel.findById(paymentId);

    if (!payment) {
      return {
        statusCode: 404,
        success: false,
        message: "Payment not found.",
      };
    }

    // Students can only view their own payments
    if (
      user.role === "student" &&
      Number(payment.studentId) !== Number(user.id)
    ) {
      return {
        statusCode: 403,
        success: false,
        message: "You are not authorized to view this payment.",
      };
    }

    return {
      statusCode: 200,
      success: true,
      message: "Payment fetched successfully.",
      payment,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Read All Payments (Admin)
  |--------------------------------------------------------------------------
  */

  static async readPayments() {
    const payments = await PaymentModel.findAll();

    return {
      statusCode: 200,
      success: true,
      message: "Payments fetched successfully.",
      total: payments.length,
      payments,
    };
  }
  /*
  |--------------------------------------------------------------------------
  | Verify Payment
  |--------------------------------------------------------------------------
  */

  static async verifyPayment(paymentId, adminId) {
    const payment = await PaymentModel.findById(paymentId);

    if (!payment) {
      return {
        statusCode: 404,
        success: false,
        message: "Payment not found.",
      };
    }

    // Only pending payments can be verified
    if (payment.status !== "Pending") {
      return {
        statusCode: 400,
        success: false,
        message: `Payment is already ${payment.status.toLowerCase()}.`,
      };
    }

    const enrollment = await EnrollmentModel.findStudentEnrollment(
      payment.studentId,
      payment.courseId,
    );

    if (!enrollment) {
      return {
        statusCode: 404,
        success: false,
        message: "Enrollment not found.",
      };
    }

    // Enrollment must still be pending
    if (enrollment.status !== "Pending") {
      return {
        statusCode: 400,
        success: false,
        message: `Enrollment is already ${enrollment.status.toLowerCase()}.`,
      };
    }

    const verifiedAt = new Date();

    // Update payment
    await PaymentModel.updateStatus(
      payment.id,
      "Verified",
      adminId,
      verifiedAt,
    );

    // Approve enrollment
    await EnrollmentModel.updateStatus(
      enrollment.id,
      "Approved",
      payment.id,
      verifiedAt,
    );

    const updatedPayment = await PaymentModel.findById(payment.id);

    return {
      statusCode: 200,
      success: true,
      message: "Payment verified successfully.",
      payment: updatedPayment,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Reject Payment
  |--------------------------------------------------------------------------
  */

  static async rejectPayment(paymentId, adminId) {
    const payment = await PaymentModel.findById(paymentId);

    if (!payment) {
      return {
        statusCode: 404,
        success: false,
        message: "Payment not found.",
      };
    }

    // Only pending payments can be rejected
    if (payment.status !== "Pending") {
      return {
        statusCode: 400,
        success: false,
        message: `Payment is already ${payment.status.toLowerCase()}.`,
      };
    }

    const enrollment = await EnrollmentModel.findStudentEnrollment(
      payment.studentId,
      payment.courseId,
    );

    if (!enrollment) {
      return {
        statusCode: 404,
        success: false,
        message: "Enrollment not found.",
      };
    }

    // Enrollment must still be pending
    if (enrollment.status !== "Pending") {
      return {
        statusCode: 400,
        success: false,
        message: `Enrollment is already ${enrollment.status.toLowerCase()}.`,
      };
    }

    const verifiedAt = new Date();

    // Update payment
    await PaymentModel.updateStatus(
      payment.id,
      "Rejected",
      adminId,
      verifiedAt,
    );

    // Reject enrollment
    await EnrollmentModel.updateStatus(
      enrollment.id,
      "Rejected",
      payment.id,
      null,
    );

    const updatedPayment = await PaymentModel.findById(payment.id);

    return {
      statusCode: 200,
      success: true,
      message: "Payment rejected successfully.",
      payment: updatedPayment,
    };
  }
  /*
  |--------------------------------------------------------------------------
  | Payment Dashboard Counts
  |--------------------------------------------------------------------------
  */

  static async dashboardCounts() {
    const statistics = await PaymentModel.dashboardCounts();

    return {
      statusCode: 200,
      success: true,
      message: "Payment dashboard statistics fetched successfully.",
      statistics: {
        totalPayments: Number(statistics.totalPayments),

        pendingPayments: Number(statistics.pendingPayments),

        verifiedPayments: Number(statistics.verifiedPayments),

        rejectedPayments: Number(statistics.rejectedPayments),
      },
    };
  }
}

module.exports = PaymentService;
