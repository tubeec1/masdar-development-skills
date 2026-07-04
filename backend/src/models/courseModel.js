const db = require("../config/db");

class CourseModel {
  // ==============================
  // Create Course
  // ==============================
  static async create(courseData) {
    const sql = `
      INSERT INTO courses (
        categoryId,
        teacherId,
        title,
        slug,
        description,
        thumbnail,
        introVideo,
        duration,
        language,
        level,
        price,
        discountPrice,
        totalStudents,
        averageRating,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      courseData.categoryId,
      courseData.teacherId,
      courseData.title,
      courseData.slug,
      courseData.description ?? null,
      courseData.thumbnail ?? null,
      courseData.introVideo ?? null,
      courseData.duration ?? null,
      courseData.language ?? null,
      courseData.level ?? null,
      courseData.price ?? 0,
      courseData.discountPrice ?? 0,
      0,
      0,
      courseData.status ?? "Draft",
    ];

    const [result] = await db.execute(sql, values);

    return result.insertId;
  }

  // ==============================
  // Find Course By ID
  // ==============================
  static async findById(id) {
    const [rows] = await db.execute(
      `
      SELECT
        c.*,
        u.fullName AS teacherName,
        u.profileImage AS teacherImage,
        cat.title AS categoryName
      FROM courses c
      LEFT JOIN users u
        ON c.teacherId = u.id
      LEFT JOIN categories cat
        ON c.categoryId = cat.id
      WHERE c.id = ?
      LIMIT 1
      `,
      [id],
    );

    return rows[0] || null;
  }

  // ==============================
  // Find Course By Slug
  // ==============================
  static async findBySlug(slug) {
    const [rows] = await db.execute(
      `
      SELECT
        c.*,
        u.fullName AS teacherName,
        u.profileImage AS teacherImage,
        cat.title AS categoryName
      FROM courses c
      LEFT JOIN users u
        ON c.teacherId = u.id
      LEFT JOIN categories cat
        ON c.categoryId = cat.id
      WHERE c.slug = ?
      LIMIT 1
      `,
      [slug],
    );

    return rows[0] || null;
  }

  // ==============================
  // Check Existing Title
  // ==============================
  static async findByTitle(title) {
    const [rows] = await db.execute(
      `
      SELECT
        id,
        title
      FROM courses
      WHERE title = ?
      LIMIT 1
      `,
      [title],
    );

    return rows[0] || null;
  }

  // ==============================
  // Check Existing Slug
  // ==============================
  static async findByCourseSlug(slug) {
    const [rows] = await db.execute(
      `
      SELECT
        id,
        slug
      FROM courses
      WHERE slug = ?
      LIMIT 1
      `,
      [slug],
    );

    return rows[0] || null;
  }
  // ==============================
  // Update Course
  // ==============================
  static async update(id, courseData) {
    const sql = `
      UPDATE courses
      SET
        categoryId = ?,
        title = ?,
        slug = ?,
        description = ?,
        thumbnail = ?,
        introVideo = ?,
        duration = ?,
        language = ?,
        level = ?,
        price = ?,
        discountPrice = ?,
        updatedAt = NOW()
      WHERE id = ?
    `;

    const values = [
      courseData.categoryId,
      courseData.title,
      courseData.slug,
      courseData.description ?? null,
      courseData.thumbnail ?? null,
      courseData.introVideo ?? null,
      courseData.duration ?? null,
      courseData.language ?? null,
      courseData.level ?? null,
      courseData.price ?? 0,
      courseData.discountPrice ?? 0,
      id,
    ];

    const [result] = await db.execute(sql, values);

    return result;
  }

  // ==============================
  // Delete Course
  // ==============================
  static async delete(id) {
    const [result] = await db.execute(
      `
      DELETE FROM courses
      WHERE id = ?
      `,
      [id],
    );

    return result;
  }

  // ==============================
  // Read All Courses (Admin)
  // ==============================
  static async findAll() {
    const [rows] = await db.execute(`
      SELECT
        c.*,
        u.fullName AS teacherName,
        u.profileImage AS teacherImage,
        cat.title AS categoryName
      FROM courses c
      LEFT JOIN users u
        ON c.teacherId = u.id
      LEFT JOIN categories cat
        ON c.categoryId = cat.id
      ORDER BY c.createdAt DESC
    `);

    return rows;
  }

  // ==============================
  // Read Published Courses
  // ==============================
  static async findPublished() {
    const [rows] = await db.execute(`
      SELECT
        c.*,
        u.fullName AS teacherName,
        u.profileImage AS teacherImage,
        cat.title AS categoryName
      FROM courses c
      LEFT JOIN users u
        ON c.teacherId = u.id
      LEFT JOIN categories cat
        ON c.categoryId = cat.id
      WHERE c.status = 'Published'
      ORDER BY c.createdAt DESC
    `);

    return rows;
  }

  // ==============================
  // Read Teacher Courses
  // ==============================
  static async findTeacherCourses(teacherId) {
    const [rows] = await db.execute(
      `
      SELECT
        c.*,
        cat.title AS categoryName
      FROM courses c
      LEFT JOIN categories cat
        ON c.categoryId = cat.id
      WHERE c.teacherId = ?
      ORDER BY c.createdAt DESC
      `,
      [teacherId],
    );

    return rows;
  }
  // ==============================
  // Update Course Status
  // ==============================
  static async updateStatus(id, status) {
    const [result] = await db.execute(
      `
      UPDATE courses
      SET
        status = ?,
        updatedAt = NOW()
      WHERE id = ?
      `,
      [status, id],
    );

    return result;
  }

  // ==============================
  // Dashboard Counts
  // ==============================
  static async dashboardCounts() {
    const [rows] = await db.execute(`
      SELECT
        COUNT(*) AS totalCourses,

        SUM(
          CASE
            WHEN status = 'Published'
            THEN 1
            ELSE 0
          END
        ) AS publishedCourses,

        SUM(
          CASE
            WHEN status = 'Draft'
            THEN 1
            ELSE 0
          END
        ) AS draftCourses,

        SUM(
          CASE
            WHEN status = 'Archived'
            THEN 1
            ELSE 0
          END
        ) AS archivedCourses

      FROM courses
    `);

    return rows[0];
  }

  // ==============================
  // Count All Courses
  // ==============================
  static async countCourses() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM courses
    `);

    return rows[0].total;
  }

  // ==============================
  // Count Published Courses
  // ==============================
  static async countPublishedCourses() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM courses
      WHERE status = 'Published'
    `);

    return rows[0].total;
  }

  // ==============================
  // Count Draft Courses
  // ==============================
  static async countDraftCourses() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM courses
      WHERE status = 'Draft'
    `);

    return rows[0].total;
  }

  // ==============================
  // Count Archived Courses
  // ==============================
  static async countArchivedCourses() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM courses
      WHERE status = 'Archived'
    `);

    return rows[0].total;
  }
}

module.exports = CourseModel;
