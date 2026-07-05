const db = require("../config/db");

class CategoryModel {
  // ==============================
  // Create Category
  // ==============================
  static async create(categoryData) {
    const sql = `
      INSERT INTO categories (
        title,
        slug,
        description,
        image,
        status,
        createdBy
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      categoryData.title,
      categoryData.slug,
      categoryData.description ?? null,
      categoryData.image ?? null,
      categoryData.status ?? "Active",
      categoryData.createdBy,
    ];

    const [result] = await db.execute(sql, values);

    return result.insertId;
  }

  // ==============================
  // Find Category By ID
  // ==============================
  static async findById(id) {
    const [rows] = await db.execute(
      `
      SELECT
        c.*,
        u.fullName AS createdByName
      FROM categories c
      LEFT JOIN users u
        ON c.createdBy = u.id
      WHERE c.id = ?
      LIMIT 1
      `,
      [id],
    );

    return rows[0] || null;
  }

  // ==============================
  // Find Category By Slug
  // ==============================
  static async findBySlug(slug) {
    const [rows] = await db.execute(
      `
      SELECT
        c.*,
        u.fullName AS createdByName
      FROM categories c
      LEFT JOIN users u
        ON c.createdBy = u.id
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
      FROM categories
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
  static async findByCategorySlug(slug) {
    const [rows] = await db.execute(
      `
      SELECT
        id,
        slug
      FROM categories
      WHERE slug = ?
      LIMIT 1
      `,
      [slug],
    );

    return rows[0] || null;
  }
  // ==============================
  // Update Category
  // ==============================
  static async update(id, categoryData) {
    const sql = `
      UPDATE categories
      SET
        title = ?,
        slug = ?,
        description = ?,
        image = ?,
        status = ?,
        updatedAt = NOW()
      WHERE id = ?
    `;

    const values = [
      categoryData.title,
      categoryData.slug,
      categoryData.description ?? null,
      categoryData.image ?? null,
      categoryData.status,
      id,
    ];

    const [result] = await db.execute(sql, values);

    return result;
  }

  // ==============================
  // Delete Category
  // ==============================
  static async delete(id) {
    const [result] = await db.execute(
      `
      DELETE FROM categories
      WHERE id = ?
      `,
      [id],
    );

    return result;
  }

  // ==============================
  // Read All Categories (Admin)
  // ==============================
  static async findAll() {
    const [rows] = await db.execute(`
      SELECT
        c.*,
        u.fullName AS createdByName
      FROM categories c
      LEFT JOIN users u
        ON c.createdBy = u.id
      ORDER BY c.createdAt DESC
    `);

    return rows;
  }

  // ==============================
  // Read Active Categories (Public)
  // ==============================
  static async findActive() {
    const [rows] = await db.execute(`
      SELECT
        id,
        title,
        slug,
        description,
        image,
        createdAt
      FROM categories
      WHERE status = 'Active'
      ORDER BY title ASC
    `);

    return rows;
  }

  // ==============================
  // Change Category Status
  // ==============================
  static async updateStatus(id, status) {
    const [result] = await db.execute(
      `
      UPDATE categories
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
        COUNT(*) AS totalCategories,

        SUM(
          CASE
            WHEN status = 'Active'
            THEN 1
            ELSE 0
          END
        ) AS activeCategories,

        SUM(
          CASE
            WHEN status = 'Inactive'
            THEN 1
            ELSE 0
          END
        ) AS inactiveCategories

      FROM categories
    `);

    return rows[0];
  }

  // ==============================
  // Count All Categories
  // ==============================
  static async countCategories() {
    const [rows] = await db.execute(`
      SELECT
        COUNT(*) AS total
      FROM categories
    `);

    return rows[0].total;
  }

  // ==============================
  // Count Active Categories
  // ==============================
  static async countActiveCategories() {
    const [rows] = await db.execute(`
      SELECT
        COUNT(*) AS total
      FROM categories
      WHERE status = 'Active'
    `);

    return rows[0].total;
  }

  // ==============================
  // Count Inactive Categories
  // ==============================
  static async countInactiveCategories() {
    const [rows] = await db.execute(`
      SELECT
        COUNT(*) AS total
      FROM categories
      WHERE status = 'Inactive'
    `);

    return rows[0].total;
  }
}

module.exports = CategoryModel;
