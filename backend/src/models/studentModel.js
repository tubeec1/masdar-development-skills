const db = require("../config/db");

class StudentModel {
  /*
  |--------------------------------------------------------------------------
  | Read My Courses
  |--------------------------------------------------------------------------
  */

  static async findMyCourses(studentId) {
    const [rows] = await db.execute(
      `
      SELECT
        ce.id AS enrollmentId,
        ce.status,
        ce.enrolledAt,
        ce.approvedAt,

        c.id AS courseId,
        c.title,
        c.slug,
        c.thumbnail,
        c.level,
        c.language,
        c.duration,
        c.price,
        c.discountPrice,

        cat.id AS categoryId,
        cat.title AS categoryName,

        t.id AS teacherId,
        t.fullName AS teacherName,
        t.profileImage AS teacherImage

      FROM course_enrollments ce

      INNER JOIN courses c
        ON ce.courseId = c.id

      LEFT JOIN categories cat
        ON c.categoryId = cat.id

      LEFT JOIN users t
        ON c.teacherId = t.id

      WHERE
        ce.studentId = ?
        AND ce.status = 'Approved'

      ORDER BY ce.approvedAt DESC
      `,
      [studentId],
    );

    return rows;
  }

  /*
  |--------------------------------------------------------------------------
  | Dashboard Counts
  |--------------------------------------------------------------------------
  */

  static async dashboard(studentId) {
    const [rows] = await db.execute(
      `
      SELECT
        COUNT(*) AS totalCourses

      FROM course_enrollments

      WHERE
        studentId = ?
        AND status = 'Approved'
      `,
      [studentId],
    );

    return rows[0];
  }
}

module.exports = StudentModel;
