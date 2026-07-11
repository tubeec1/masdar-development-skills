const db = require("../config/db");

class PaymentModel {
  /*
  |--------------------------------------------------------------------------
  | Create Payment
  |--------------------------------------------------------------------------
  */

  static async create(paymentData) {
    const sql = `
      INSERT INTO payments (
        studentId,
        courseId,
        amount,
        phoneNumber,
        transactionReference,
        paymentMethod,
        paymentScreenshot,
        status,
        verifiedBy,
        verifiedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      paymentData.studentId,
      paymentData.courseId,
      paymentData.amount,
      paymentData.phoneNumber,
      paymentData.transactionReference,
      paymentData.paymentMethod,
      paymentData.paymentScreenshot,
      paymentData.status || "Pending",
      paymentData.verifiedBy || null,
      paymentData.verifiedAt || null,
    ];

    const [result] = await db.execute(sql, values);

    return result.insertId;
  }

  /*
  |--------------------------------------------------------------------------
  | Find Payment By ID
  |--------------------------------------------------------------------------
  */

  static async findById(id) {
    const [rows] = await db.execute(
      `
      SELECT
        p.*,

        s.fullName AS studentName,
        s.email AS studentEmail,

        c.title AS courseTitle,
        c.slug AS courseSlug,

        v.fullName AS verifiedByName

      FROM payments p

      INNER JOIN users s
        ON p.studentId = s.id

      INNER JOIN courses c
        ON p.courseId = c.id

      LEFT JOIN users v
        ON p.verifiedBy = v.id

      WHERE p.id = ?

      LIMIT 1
      `,
      [id],
    );

    return rows[0] || null;
  }

  /*
  |--------------------------------------------------------------------------
  | Find Student Payment
  |--------------------------------------------------------------------------
  */

  static async findStudentPayment(studentId, courseId) {
    const [rows] = await db.execute(
      `
      SELECT *
      FROM payments
      WHERE studentId = ?
      AND courseId = ?
      LIMIT 1
      `,
      [studentId, courseId],
    );

    return rows[0] || null;
  }

  /*
  |--------------------------------------------------------------------------
  | Find By Transaction Reference
  |--------------------------------------------------------------------------
  */

  static async findByTransactionReference(transactionReference) {
    const [rows] = await db.execute(
      `
      SELECT *
      FROM payments
      WHERE transactionReference = ?
      LIMIT 1
      `,
      [transactionReference],
    );

    return rows[0] || null;
  }
  /*
  |--------------------------------------------------------------------------
  | Read Student Payments
  |--------------------------------------------------------------------------
  */

  static async findStudentPayments(studentId) {
    const [rows] = await db.execute(
      `
      SELECT
        p.*,

        c.title AS courseTitle,
        c.slug AS courseSlug,
        c.thumbnail AS courseThumbnail

      FROM payments p

      INNER JOIN courses c
        ON p.courseId = c.id

      WHERE p.studentId = ?

      ORDER BY p.createdAt DESC
      `,
      [studentId],
    );

    return rows;
  }

  /*
  |--------------------------------------------------------------------------
  | Read All Payments
  |--------------------------------------------------------------------------
  */

  static async findAll() {
    const [rows] = await db.execute(`
      SELECT
        p.*,

        s.fullName AS studentName,
        s.email AS studentEmail,

        c.title AS courseTitle,
        c.slug AS courseSlug,

        v.fullName AS verifiedByName

      FROM payments p

      INNER JOIN users s
        ON p.studentId = s.id

      INNER JOIN courses c
        ON p.courseId = c.id

      LEFT JOIN users v
        ON p.verifiedBy = v.id

      ORDER BY p.createdAt DESC
    `);

    return rows;
  }

  /*
  |--------------------------------------------------------------------------
  | Read Course Payments
  |--------------------------------------------------------------------------
  */

  static async findCoursePayments(courseId) {
    const [rows] = await db.execute(
      `
      SELECT
        p.*,

        s.fullName AS studentName,
        s.email AS studentEmail

      FROM payments p

      INNER JOIN users s
        ON p.studentId = s.id

      WHERE p.courseId = ?

      ORDER BY p.createdAt DESC
      `,
      [courseId],
    );

    return rows;
  }

  /*
  |--------------------------------------------------------------------------
  | Update Payment Status
  |--------------------------------------------------------------------------
  */

  static async updateStatus(id, status, verifiedBy = null, verifiedAt = null) {
    const [result] = await db.execute(
      `
      UPDATE payments
      SET
        status = ?,
        verifiedBy = ?,
        verifiedAt = ?,
        updatedAt = NOW()
      WHERE id = ?
      `,
      [status, verifiedBy, verifiedAt, id],
    );

    return result;
  }
  /*
  |--------------------------------------------------------------------------
  | Dashboard Counts
  |--------------------------------------------------------------------------
  */

  static async dashboardCounts() {
    const [rows] = await db.execute(`
      SELECT
        COUNT(*) AS totalPayments,

        SUM(
          CASE
            WHEN status = 'Pending'
            THEN 1
            ELSE 0
          END
        ) AS pendingPayments,

        SUM(
          CASE
            WHEN status = 'Verified'
            THEN 1
            ELSE 0
          END
        ) AS verifiedPayments,

        SUM(
          CASE
            WHEN status = 'Rejected'
            THEN 1
            ELSE 0
          END
        ) AS rejectedPayments

      FROM payments
    `);

    return rows[0];
  }

  /*
  |--------------------------------------------------------------------------
  | Count All Payments
  |--------------------------------------------------------------------------
  */

  static async countAll() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM payments
    `);

    return Number(rows[0].total);
  }

  /*
  |--------------------------------------------------------------------------
  | Count Pending Payments
  |--------------------------------------------------------------------------
  */

  static async countPending() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM payments
      WHERE status = 'Pending'
    `);

    return Number(rows[0].total);
  }

  /*
  |--------------------------------------------------------------------------
  | Count Verified Payments
  |--------------------------------------------------------------------------
  */

  static async countVerified() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM payments
      WHERE status = 'Verified'
    `);

    return Number(rows[0].total);
  }

  /*
  |--------------------------------------------------------------------------
  | Count Rejected Payments
  |--------------------------------------------------------------------------
  */

  static async countRejected() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM payments
      WHERE status = 'Rejected'
    `);

    return Number(rows[0].total);
  }
}

module.exports = PaymentModel;
