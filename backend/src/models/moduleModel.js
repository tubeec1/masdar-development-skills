const db = require("../config/db");

class ModuleModel {
  // ==============================
  // Create Module
  // ==============================
  static async create(moduleData) {
    const sql = `
      INSERT INTO course_modules (
        courseId,
        title,
        description,
        moduleOrder
      )
      VALUES (?, ?, ?, ?)
    `;

    const values = [
      moduleData.courseId,
      moduleData.title,
      moduleData.description ?? null,
      moduleData.moduleOrder,
    ];

    const [result] = await db.execute(sql, values);

    return result.insertId;
  }

  // ==============================
  // Find Module By ID
  // ==============================
  static async findById(id) {
    const [rows] = await db.execute(
      `
      SELECT
        cm.*,
        c.title AS courseTitle,
        c.teacherId
      FROM course_modules cm
      INNER JOIN courses c
        ON cm.courseId = c.id
      WHERE cm.id = ?
      LIMIT 1
      `,
      [id],
    );

    return rows[0] || null;
  }

  // ==============================
  // Read Modules By Course
  // ==============================
  static async findByCourse(courseId) {
    const [rows] = await db.execute(
      `
      SELECT
        id,
        courseId,
        title,
        description,
        moduleOrder,
        createdAt,
        updatedAt
      FROM course_modules
      WHERE courseId = ?
      ORDER BY moduleOrder ASC, id ASC
      `,
      [courseId],
    );

    return rows;
  }
  // ==============================
  // Update Module
  // ==============================
  static async update(id, moduleData) {
    const sql = `
      UPDATE course_modules
      SET
        title = ?,
        description = ?,
        moduleOrder = ?,
        updatedAt = NOW()
      WHERE id = ?
    `;

    const values = [
      moduleData.title,
      moduleData.description ?? null,
      moduleData.moduleOrder,
      id,
    ];

    const [result] = await db.execute(sql, values);

    return result;
  }

  // ==============================
  // Delete Module
  // ==============================
  static async delete(id) {
    const [result] = await db.execute(
      `
      DELETE FROM course_modules
      WHERE id = ?
      `,
      [id],
    );

    return result;
  }

  // ==============================
  // Count Modules By Course
  // ==============================
  static async countByCourse(courseId) {
    const [rows] = await db.execute(
      `
      SELECT COUNT(*) AS total
      FROM course_modules
      WHERE courseId = ?
      `,
      [courseId],
    );

    return rows[0].total;
  }

  // ==============================
  // Check Existing Module Order
  // ==============================
  static async findByOrder(courseId, moduleOrder) {
    const [rows] = await db.execute(
      `
      SELECT
        id,
        moduleOrder
      FROM course_modules
      WHERE courseId = ?
        AND moduleOrder = ?
      LIMIT 1
      `,
      [courseId, moduleOrder],
    );

    return rows[0] || null;
  }
  // ==============================
  // Read All Modules (Admin)
  // ==============================
  static async findAll() {
    const [rows] = await db.execute(`
      SELECT
        cm.*,
        c.title AS courseTitle,
        c.teacherId,
        u.fullName AS teacherName
      FROM course_modules cm
      INNER JOIN courses c
        ON cm.courseId = c.id
      INNER JOIN users u
        ON c.teacherId = u.id
      ORDER BY
        c.id DESC,
        cm.moduleOrder ASC
    `);

    return rows;
  }

  // ==============================
  // Dashboard Counts
  // ==============================
  static async dashboardCounts() {
    const [rows] = await db.execute(`
      SELECT
        COUNT(*) AS totalModules
      FROM course_modules
    `);

    return rows[0];
  }

  // ==============================
  // Count All Modules
  // ==============================
  static async countModules() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM course_modules
    `);

    return rows[0].total;
  }
}

module.exports = ModuleModel;
