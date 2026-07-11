const db = require("../config/db");

class ReportModel {
  // ==============================
  // Overview Report
  // ==============================
  static async overview() {
    const [rows] = await db.execute(`
      SELECT
        (SELECT COUNT(*) FROM users) AS totalUsers,
        (SELECT COUNT(*) FROM users WHERE role='student') AS totalStudents,
        (SELECT COUNT(*) FROM users WHERE role='teacher') AS totalTeachers,
        (SELECT COUNT(*) FROM users WHERE role='admin') AS totalAdmins,

        (SELECT COUNT(*) FROM categories) AS totalCategories,

        (SELECT COUNT(*) FROM courses) AS totalCourses,

        (SELECT COUNT(*) FROM course_modules) AS totalModules,

        (SELECT COUNT(*) FROM lessons) AS totalLessons,

        (SELECT COUNT(*) FROM course_enrollments) AS totalEnrollments,

        (SELECT COUNT(*) FROM payments) AS totalPayments
    `);

    return rows[0];
  }

  // ==============================
  // Student Report
  // ==============================
  static async studentReport() {
    const [rows] = await db.execute(`
      SELECT
        u.id,
        u.fullName,
        u.email,
        u.profileImage,

        COUNT(DISTINCT ce.courseId) AS totalCourses,

        SUM(
          CASE
            WHEN ce.status='Approved'
            THEN 1
            ELSE 0
          END
        ) AS approvedCourses,

        SUM(
          CASE
            WHEN ce.status='Pending'
            THEN 1
            ELSE 0
          END
        ) AS pendingCourses,

        SUM(
          CASE
            WHEN ce.status='Rejected'
            THEN 1
            ELSE 0
          END
        ) AS rejectedCourses

      FROM users u

      LEFT JOIN course_enrollments ce
        ON u.id = ce.studentId

      WHERE u.role='student'

      GROUP BY u.id

      ORDER BY u.fullName ASC
    `);

    return rows;
  }

  // ==============================
  // Teacher Report
  // ==============================
  static async teacherReport() {
    const [rows] = await db.execute(`
      SELECT
        u.id,
        u.fullName,
        u.email,
        u.profileImage,

        COUNT(DISTINCT c.id) AS totalCourses,

        COUNT(DISTINCT cm.id) AS totalModules,

        COUNT(DISTINCT l.id) AS totalLessons,

        COUNT(DISTINCT ce.studentId) AS totalStudents

      FROM users u

      LEFT JOIN courses c
        ON u.id = c.teacherId

      LEFT JOIN course_modules cm
        ON c.id = cm.courseId

      LEFT JOIN lessons l
        ON cm.id = l.moduleId

      LEFT JOIN course_enrollments ce
        ON c.id = ce.courseId
       AND ce.status='Approved'

      WHERE u.role='teacher'

      GROUP BY u.id

      ORDER BY u.fullName ASC
    `);

    return rows;
  }

  // ==============================
  // Course Report
  // ==============================
  static async courseReport() {
    const [rows] = await db.execute(`
      SELECT
        c.id,
        c.title,
        c.slug,
        c.thumbnail,

        c.price,
        c.discountPrice,

        c.status,

        u.fullName AS teacherName,

        COUNT(DISTINCT ce.studentId) AS totalStudents

      FROM courses c

      LEFT JOIN users u
        ON c.teacherId = u.id

      LEFT JOIN course_enrollments ce
        ON c.id = ce.courseId
       AND ce.status='Approved'

      GROUP BY c.id

      ORDER BY c.createdAt DESC
    `);

    return rows;
  }

  // ==============================
  // Enrollment Report
  // ==============================
  static async enrollmentReport(status = null) {
    let sql = `
      SELECT
        ce.*,

        s.fullName AS studentName,

        c.title AS courseTitle,

        t.fullName AS teacherName

      FROM course_enrollments ce

      INNER JOIN users s
        ON ce.studentId = s.id

      INNER JOIN courses c
        ON ce.courseId = c.id

      INNER JOIN users t
        ON c.teacherId = t.id
    `;

    const values = [];

    if (status) {
      sql += " WHERE ce.status = ?";
      values.push(status);
    }

    sql += " ORDER BY ce.createdAt DESC";

    const [rows] = await db.execute(sql, values);

    return rows;
  }

  // ==============================
  // Payment Report
  // ==============================
  static async paymentReport(status = null) {
    let sql = `
      SELECT
        p.*,

        s.fullName AS studentName,

        c.title AS courseTitle,

        t.fullName AS teacherName

      FROM payments p

      INNER JOIN users s
        ON p.studentId = s.id

      INNER JOIN courses c
        ON p.courseId = c.id

      INNER JOIN users t
        ON c.teacherId = t.id
    `;

    const values = [];

    if (status) {
      sql += " WHERE p.status = ?";
      values.push(status);
    }

    sql += " ORDER BY p.createdAt DESC";

    const [rows] = await db.execute(sql, values);

    return rows;
  }
}

module.exports = ReportModel;
