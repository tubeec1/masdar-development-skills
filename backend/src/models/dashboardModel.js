const db = require("../config/db");

class DashboardModel {
  // ==============================
  // Admin Dashboard
  // ==============================
  static async adminDashboard() {
    const [rows] = await db.execute(`
      SELECT
        /* Users */
        (SELECT COUNT(*) FROM users) AS totalUsers,
        (SELECT COUNT(*) FROM users WHERE role='admin') AS totalAdmins,
        (SELECT COUNT(*) FROM users WHERE role='teacher') AS totalTeachers,
        (SELECT COUNT(*) FROM users WHERE role='student') AS totalStudents,

        /* Categories */
        (SELECT COUNT(*) FROM categories) AS totalCategories,

        /* Courses */
        (SELECT COUNT(*) FROM courses) AS totalCourses,

        (SELECT COUNT(*)
         FROM courses
         WHERE status='Published') AS publishedCourses,

        (SELECT COUNT(*)
         FROM courses
         WHERE status='Draft') AS draftCourses,

        (SELECT COUNT(*)
         FROM courses
         WHERE price = 0
            OR price IS NULL) AS freeCourses,

        (SELECT COUNT(*)
         FROM courses
         WHERE price > 0) AS paidCourses,

        /* Modules */
        (SELECT COUNT(*)
         FROM course_modules) AS totalModules,

        /* Lessons */
        (SELECT COUNT(*)
         FROM lessons) AS totalLessons,

        (SELECT COUNT(*)
         FROM lessons
         WHERE isPreview = 1) AS previewLessons,

        (SELECT COUNT(*)
         FROM lessons
         WHERE isPreview = 0) AS paidLessons,

        /* Enrollments */
        (SELECT COUNT(*)
         FROM course_enrollments) AS totalEnrollments,

        (SELECT COUNT(*)
         FROM course_enrollments
         WHERE status='Approved') AS approvedEnrollments,

        (SELECT COUNT(*)
         FROM course_enrollments
         WHERE status='Pending') AS pendingEnrollments,

        (SELECT COUNT(*)
         FROM course_enrollments
         WHERE status='Rejected') AS rejectedEnrollments,

        /* Payments */
        (SELECT COUNT(*)
         FROM payments) AS totalPayments,

        (SELECT COUNT(*)
         FROM payments
         WHERE status='Pending') AS pendingPayments,

        (SELECT COUNT(*)
         FROM payments
         WHERE status='Verified') AS verifiedPayments,

        (SELECT COUNT(*)
         FROM payments
         WHERE status='Rejected') AS rejectedPayments
    `);

    return rows[0];
  }

  // ==============================
  // Teacher Dashboard
  // ==============================
  static async teacherDashboard(teacherId) {
    const [rows] = await db.execute(
      `
      SELECT

      /* Courses */

      (
        SELECT COUNT(*)
        FROM courses
        WHERE teacherId = ?
      ) AS totalCourses,

      /* Modules */

      (
        SELECT COUNT(*)
        FROM course_modules cm
        INNER JOIN courses c
          ON cm.courseId = c.id
        WHERE c.teacherId = ?
      ) AS totalModules,

      /* Lessons */

      (
        SELECT COUNT(*)
        FROM lessons l
        INNER JOIN course_modules cm
          ON l.moduleId = cm.id
        INNER JOIN courses c
          ON cm.courseId = c.id
        WHERE c.teacherId = ?
      ) AS totalLessons,

      /* Students */

      (
        SELECT COUNT(DISTINCT ce.studentId)
        FROM course_enrollments ce
        INNER JOIN courses c
          ON ce.courseId = c.id
        WHERE
          c.teacherId = ?
          AND ce.status='Approved'
      ) AS totalStudents,

      /* Pending Payments */

      (
        SELECT COUNT(*)
        FROM payments p
        INNER JOIN courses c
          ON p.courseId = c.id
        WHERE
          c.teacherId = ?
          AND p.status='Pending'
      ) AS pendingPayments
      `,
      [teacherId, teacherId, teacherId, teacherId, teacherId],
    );

    return rows[0];
  }

  // ==============================
  // Student Dashboard
  // ==============================
  static async studentDashboard(studentId) {
    const [rows] = await db.execute(
      `
      SELECT

      (
        SELECT COUNT(*)
        FROM course_enrollments
        WHERE
          studentId = ?
          AND status='Approved'
      ) AS myCourses,

      (
        SELECT COUNT(*)
        FROM lessons l
        INNER JOIN course_modules cm
          ON l.moduleId = cm.id
        INNER JOIN course_enrollments ce
          ON ce.courseId = cm.courseId
        WHERE
          ce.studentId = ?
          AND ce.status='Approved'
      ) AS totalLessons
      `,
      [studentId, studentId],
    );

    return rows[0];
  }
}

module.exports = DashboardModel;
