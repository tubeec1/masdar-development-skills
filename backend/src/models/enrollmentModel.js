const db = require("../config/db");

class EnrollmentModel {
  // ==============================
  // Create Enrollment
  // ==============================
  static async create(enrollmentData) {
    const sql = `
      INSERT INTO course_enrollments (
        studentId,
        courseId,
        paymentId,
        status,
        enrolledAt,
        approvedAt
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      enrollmentData.studentId,
      enrollmentData.courseId,
      enrollmentData.paymentId ?? null,
      enrollmentData.status,
      enrollmentData.enrolledAt,
      enrollmentData.approvedAt,
    ];

    const [result] = await db.execute(sql, values);

    return result.insertId;
  }

  // ==============================
  // Find Enrollment By ID
  // ==============================
  static async findById(id) {
    const [rows] = await db.execute(
      `
      SELECT
        ce.*,

        u.fullName AS studentName,
        u.email AS studentEmail,
        u.profileImage AS studentImage,

        c.title AS courseTitle,
        c.slug AS courseSlug,
        c.thumbnail AS courseThumbnail

      FROM course_enrollments ce

      LEFT JOIN users u
        ON ce.studentId = u.id

      LEFT JOIN courses c
        ON ce.courseId = c.id

      WHERE ce.id = ?

      LIMIT 1
      `,
      [id],
    );

    return rows[0] || null;
  }

  // ==============================
  // Find Student Enrollment
  // ==============================
  static async findStudentEnrollment(studentId, courseId) {
    const [rows] = await db.execute(
      `
      SELECT *
      FROM course_enrollments
      WHERE studentId = ?
      AND courseId = ?
      LIMIT 1
      `,
      [studentId, courseId],
    );

    return rows[0] || null;
  }

  // ==============================
  // Find Course Enrollment
  // ==============================
  static async findCourseEnrollment(courseId) {
    const [rows] = await db.execute(
      `
      SELECT
        ce.*,

        u.fullName,
        u.email,
        u.profileImage

      FROM course_enrollments ce

      LEFT JOIN users u
        ON ce.studentId = u.id

      WHERE ce.courseId = ?

      ORDER BY ce.createdAt DESC
      `,
      [courseId],
    );

    return rows;
  }
  // ==============================
  // Read Student Courses
  // ==============================
  static async findStudentCourses(studentId) {
    const [rows] = await db.execute(
      `
      SELECT
        ce.*,

        c.title AS courseTitle,
        c.slug AS courseSlug,
        c.thumbnail AS courseThumbnail,
        c.price,
        c.discountPrice,
        c.level,
        c.duration,
        c.language,

        cat.title AS categoryName,

        u.fullName AS teacherName

      FROM course_enrollments ce

      INNER JOIN courses c
        ON ce.courseId = c.id

      LEFT JOIN categories cat
        ON c.categoryId = cat.id

      LEFT JOIN users u
        ON c.teacherId = u.id

      WHERE ce.studentId = ?

      ORDER BY ce.createdAt DESC
      `,
      [studentId],
    );

    return rows;
  }

  // ==============================
  // Read All Enrollments (Admin)
  // ==============================
  static async findAll() {
    const [rows] = await db.execute(`
      SELECT
        ce.*,

        s.fullName AS studentName,
        s.email AS studentEmail,

        c.title AS courseTitle,
        c.slug AS courseSlug,

        t.fullName AS teacherName

      FROM course_enrollments ce

      INNER JOIN users s
        ON ce.studentId = s.id

      INNER JOIN courses c
        ON ce.courseId = c.id

      INNER JOIN users t
        ON c.teacherId = t.id

      ORDER BY ce.createdAt DESC
    `);

    return rows;
  }

  // ==============================
  // Read Teacher Students
  // ==============================
  static async findTeacherStudents(teacherId, courseId) {
    const [rows] = await db.execute(
      `
      SELECT
        ce.*,

        s.fullName AS studentName,
        s.email AS studentEmail,
        s.profileImage

      FROM course_enrollments ce

      INNER JOIN users s
        ON ce.studentId = s.id

      INNER JOIN courses c
        ON ce.courseId = c.id

      WHERE
        c.teacherId = ?
        AND c.id = ?

      ORDER BY ce.createdAt DESC
      `,
      [teacherId, courseId],
    );

    return rows;
  }

  // ==============================
  // Update Enrollment Status
  // ==============================
  static async updateStatus(id, status, paymentId = null) {
    const [result] = await db.execute(
      `
      UPDATE course_enrollments
      SET
        paymentId = ?,
        status = ?,
        approvedAt =
          CASE
            WHEN ? = 'Approved'
            THEN NOW()
            ELSE approvedAt
          END,
        updatedAt = NOW()
      WHERE id = ?
      `,
      [paymentId, status, status, id],
    );

    return result;
  }
  // ==============================
  // Dashboard Counts
  // ==============================
  static async dashboardCounts() {
    const [rows] = await db.execute(`
      SELECT
        COUNT(*) AS totalEnrollments,

        SUM(
          CASE
            WHEN status = 'Approved'
            THEN 1
            ELSE 0
          END
        ) AS approvedEnrollments,

        SUM(
          CASE
            WHEN status = 'Pending'
            THEN 1
            ELSE 0
          END
        ) AS pendingEnrollments,

        SUM(
          CASE
            WHEN status = 'Rejected'
            THEN 1
            ELSE 0
          END
        ) AS rejectedEnrollments,

        SUM(
          CASE
            WHEN status = 'Cancelled'
            THEN 1
            ELSE 0
          END
        ) AS cancelledEnrollments

      FROM course_enrollments
    `);

    return rows[0];
  }

  // ==============================
  // Count All Enrollments
  // ==============================
  static async countEnrollments() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM course_enrollments
    `);

    return rows[0].total;
  }

  // ==============================
  // Count Approved Enrollments
  // ==============================
  static async countApprovedEnrollments() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM course_enrollments
      WHERE status = 'Approved'
    `);

    return rows[0].total;
  }

  // ==============================
  // Count Pending Enrollments
  // ==============================
  static async countPendingEnrollments() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM course_enrollments
      WHERE status = 'Pending'
    `);

    return rows[0].total;
  }

  // ==============================
  // Count Rejected Enrollments
  // ==============================
  static async countRejectedEnrollments() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM course_enrollments
      WHERE status = 'Rejected'
    `);

    return rows[0].total;
  }

  // ==============================
  // Count Cancelled Enrollments
  // ==============================
  static async countCancelledEnrollments() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM course_enrollments
      WHERE status = 'Cancelled'
    `);

    return rows[0].total;
  }
}

module.exports = EnrollmentModel;
