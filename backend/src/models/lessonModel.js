const db = require("../config/db");

class LessonModel {
  // ==============================
  // Create Lesson
  // ==============================
  static async create(lessonData) {
    const sql = `
      INSERT INTO lessons (
        moduleId,
        title,
        description,
        videoProvider,
        videoUrl,
        duration,
        lessonOrder,
        isPreview
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      lessonData.moduleId,
      lessonData.title,
      lessonData.description ?? null,
      lessonData.videoProvider ?? null,
      lessonData.videoUrl ?? null,
      lessonData.duration ?? null,
      lessonData.lessonOrder,
      lessonData.isPreview ?? false,
    ];

    const [result] = await db.execute(sql, values);

    return result.insertId;
  }

  // ==============================
  // Find Lesson By ID
  // ==============================
  static async findById(id) {
    const [rows] = await db.execute(
      `
      SELECT
        l.*,
        cm.courseId,
        cm.title AS moduleTitle,
        c.teacherId,
        c.title AS courseTitle
      FROM lessons l
      INNER JOIN course_modules cm
        ON l.moduleId = cm.id
      INNER JOIN courses c
        ON cm.courseId = c.id
      WHERE l.id = ?
      LIMIT 1
      `,
      [id],
    );

    return rows[0] || null;
  }

  // ==============================
  // Read Lessons By Module
  // ==============================
  // ==============================
  // Read Lessons By Module
  // ==============================
  static async findByModule(moduleId) {
    const [rows] = await db.execute(
      `
    SELECT
      id,
      moduleId,
      title,
      duration,
      lessonOrder,
      isPreview,
      createdAt,
      updatedAt

    FROM lessons

    WHERE moduleId = ?

    ORDER BY lessonOrder ASC
    `,
      [moduleId],
    );

    return rows;
  }

  // ==============================
  // Find Lesson For Learning
  // ==============================
  static async findLessonForLearning(id) {
    const [rows] = await db.execute(
      `
    SELECT
      l.*,

      cm.courseId,
      cm.title AS moduleTitle,

      c.teacherId,
      c.title AS courseTitle,
      c.price,
      c.discountPrice

    FROM lessons l

    INNER JOIN course_modules cm
      ON l.moduleId = cm.id

    INNER JOIN courses c
      ON cm.courseId = c.id

    WHERE l.id = ?

    LIMIT 1
    `,
      [id],
    );

    return rows[0] || null;
  }

  // ==============================
  // Check Duplicate Lesson Order
  // ==============================
  static async findByOrder(moduleId, lessonOrder) {
    const [rows] = await db.execute(
      `
      SELECT
        id,
        lessonOrder
      FROM lessons
      WHERE moduleId = ?
        AND lessonOrder = ?
      LIMIT 1
      `,
      [moduleId, lessonOrder],
    );

    return rows[0] || null;
  }
  // ==============================
  // Update Lesson
  // ==============================
  static async update(id, lessonData) {
    const sql = `
      UPDATE lessons
      SET
        title = ?,
        description = ?,
        videoProvider = ?,
        videoUrl = ?,
        duration = ?,
        lessonOrder = ?,
        isPreview = ?,
        updatedAt = NOW()
      WHERE id = ?
    `;

    const values = [
      lessonData.title,
      lessonData.description ?? null,
      lessonData.videoProvider ?? null,
      lessonData.videoUrl ?? null,
      lessonData.duration ?? null,
      lessonData.lessonOrder,
      lessonData.isPreview,
      id,
    ];

    const [result] = await db.execute(sql, values);

    return result;
  }

  // ==============================
  // Delete Lesson
  // ==============================
  static async delete(id) {
    const [result] = await db.execute(
      `
      DELETE FROM lessons
      WHERE id = ?
      `,
      [id],
    );

    return result;
  }

  // ==============================
  // Read All Lessons (Admin)
  // ==============================
  static async findAll() {
    const [rows] = await db.execute(`
      SELECT
        l.*,
        cm.title AS moduleTitle,
        c.title AS courseTitle,
        u.fullName AS teacherName
      FROM lessons l
      INNER JOIN course_modules cm
        ON l.moduleId = cm.id
      INNER JOIN courses c
        ON cm.courseId = c.id
      INNER JOIN users u
        ON c.teacherId = u.id
      ORDER BY
        c.id DESC,
        cm.moduleOrder ASC,
        l.lessonOrder ASC
    `);

    return rows;
  }

  // ==============================
  // Count Lessons By Module
  // ==============================
  static async countByModule(moduleId) {
    const [rows] = await db.execute(
      `
      SELECT
        COUNT(*) AS total
      FROM lessons
      WHERE moduleId = ?
      `,
      [moduleId],
    );

    return rows[0].total;
  }
  // ==============================
  // Dashboard Counts
  // ==============================
  static async dashboardCounts() {
    const [rows] = await db.execute(`
      SELECT
        COUNT(*) AS totalLessons,

        SUM(
          CASE
            WHEN isPreview = 1
            THEN 1
            ELSE 0
          END
        ) AS previewLessons,

        SUM(
          CASE
            WHEN isPreview = 0
            THEN 1
            ELSE 0
          END
        ) AS paidLessons

      FROM lessons
    `);

    return rows[0];
  }

  // ==============================
  // Count All Lessons
  // ==============================
  static async countLessons() {
    const [rows] = await db.execute(`
      SELECT
        COUNT(*) AS total
      FROM lessons
    `);

    return rows[0].total;
  }
}

module.exports = LessonModel;
