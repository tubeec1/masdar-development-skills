const db = require("../config/db");

class UserModel {
  // ==============================
  // Create User
  // ==============================
  static async create(userData) {
    const sql = `
      INSERT INTO users (
        fullName,
        email,
        password,
        phone,
        gender,
        nationality,
        country,
        profileImage,
        role,
        bio,
        isActive
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      userData.fullName,
      userData.email,
      userData.password,
      userData.phone ?? null,
      userData.gender,
      userData.nationality,
      userData.country,
      userData.profileImage,
      userData.role,
      userData.bio ?? null,
      userData.isActive,
    ];

    const [result] = await db.execute(sql, values);

    return result.insertId;
  }

  // ==============================
  // Create Teacher (Admin)
  // ==============================
  static async createTeacher(userData) {
    const sql = `
      INSERT INTO users (
        fullName,
        email,
        password,
        phone,
        gender,
        nationality,
        country,
        profileImage,
        role,
        bio,
        isActive
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      userData.fullName,
      userData.email,
      userData.password,
      userData.phone ?? null,
      userData.gender,
      userData.nationality,
      userData.country,
      userData.profileImage,
      "teacher",
      userData.bio ?? null,
      true,
    ];

    const [result] = await db.execute(sql, values);

    return result.insertId;
  }

  // ==============================
  // Find User By Email
  // ==============================
  static async findByEmail(email) {
    const [rows] = await db.execute(
      `
      SELECT *
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [email],
    );

    return rows[0] || null;
  }

  // ==============================
  // Find User By ID
  // ==============================
  static async findById(id) {
    const [rows] = await db.execute(
      `
      SELECT
        id,
        fullName,
        email,
        password,
        phone,
        gender,
        nationality,
        country,
        profileImage,
        role,
        bio,
        isActive,
        createdAt,
        updatedAt
      FROM users
      WHERE id = ?
      LIMIT 1
      `,
      [id],
    );

    return rows[0] || null;
  }

  // ==============================
  // Find User By ID (Without Password)
  // ==============================
  static async findUserById(id) {
    const [rows] = await db.execute(
      `
      SELECT
        id,
        fullName,
        email,
        phone,
        gender,
        nationality,
        country,
        profileImage,
        role,
        bio,
        isActive,
        createdAt,
        updatedAt
      FROM users
      WHERE id = ?
      LIMIT 1
      `,
      [id],
    );

    return rows[0] || null;
  }
  // ==============================
  // Update Profile
  // ==============================
  static async updateProfile(id, userData) {
    const sql = `
      UPDATE users
      SET
        fullName = ?,
        password = ?,
        phone = ?,
        gender = ?,
        nationality = ?,
        country = ?,
        bio = ?,
        profileImage = ?,
        updatedAt = NOW()
      WHERE id = ?
    `;

    const values = [
      userData.fullName ?? null,
      userData.password ?? null,
      userData.phone ?? null,
      userData.gender ?? null,
      userData.nationality ?? null,
      userData.country ?? null,
      userData.bio ?? null,
      userData.profileImage ?? null,
      id,
    ];

    const [result] = await db.execute(sql, values);

    return result;
  }

  // ==============================
  // Update User (Admin)
  // ==============================
  static async updateUser(id, userData) {
    const sql = `
      UPDATE users
      SET
        fullName = ?,
        password = ?,
        phone = ?,
        gender = ?,
        nationality = ?,
        country = ?,
        role = ?,
        bio = ?,
        profileImage = ?,
        updatedAt = NOW()
      WHERE id = ?
    `;

    const values = [
      userData.fullName ?? null,
      userData.password ?? null,
      userData.phone ?? null,
      userData.gender ?? null,
      userData.nationality ?? null,
      userData.country ?? null,
      userData.role ?? "student",
      userData.bio ?? null,
      userData.profileImage ?? null,
      id,
    ];

    const [result] = await db.execute(sql, values);

    return result;
  }

  // ==============================
  // Read All Users
  // ==============================
  static async findAll() {
    const [rows] = await db.execute(`
      SELECT
        id,
        fullName,
        email,
        phone,
        gender,
        nationality,
        country,
        profileImage,
        role,
        bio,
        isActive,
        createdAt,
        updatedAt
      FROM users
      ORDER BY id DESC
    `);

    return rows;
  }

  // ==============================
  // Read Students
  // ==============================
  static async findStudents() {
    const [rows] = await db.execute(`
      SELECT
        id,
        fullName,
        email,
        phone,
        gender,
        nationality,
        country,
        profileImage,
        role,
        bio,
        isActive,
        createdAt,
        updatedAt
      FROM users
      WHERE role = 'student'
      ORDER BY id DESC
    `);

    return rows;
  }

  // ==============================
  // Read Teachers
  // ==============================
  static async findTeachers() {
    const [rows] = await db.execute(`
      SELECT
        id,
        fullName,
        email,
        phone,
        gender,
        nationality,
        country,
        profileImage,
        role,
        bio,
        isActive,
        createdAt,
        updatedAt
      FROM users
      WHERE role = 'teacher'
      ORDER BY id DESC
    `);

    return rows;
  }

  // ==============================
  // Read Admins
  // ==============================
  static async findAdmins() {
    const [rows] = await db.execute(`
      SELECT
        id,
        fullName,
        email,
        phone,
        gender,
        nationality,
        country,
        profileImage,
        role,
        bio,
        isActive,
        createdAt,
        updatedAt
      FROM users
      WHERE role = 'admin'
      ORDER BY id DESC
    `);

    return rows;
  }
  // ==============================
  // Delete User
  // ==============================
  static async delete(id) {
    const [result] = await db.execute(
      `
      DELETE FROM users
      WHERE id = ?
      `,
      [id],
    );

    return result;
  }

  // ==============================
  // Change User Status
  // ==============================
  static async updateStatus(id, status) {
    const [result] = await db.execute(
      `
      UPDATE users
      SET
        isActive = ?,
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
        COUNT(*) AS totalUsers,

        SUM(CASE WHEN role = 'student' THEN 1 ELSE 0 END) AS totalStudents,

        SUM(CASE WHEN role = 'teacher' THEN 1 ELSE 0 END) AS totalTeachers,

        SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) AS totalAdmins,

        SUM(CASE WHEN isActive = 1 THEN 1 ELSE 0 END) AS activeUsers,

        SUM(CASE WHEN isActive = 0 THEN 1 ELSE 0 END) AS inactiveUsers

      FROM users
    `);

    return rows[0];
  }

  // ==============================
  // Count Users
  // ==============================
  static async countUsers() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM users
    `);

    return rows[0].total;
  }

  // ==============================
  // Count Students
  // ==============================
  static async countStudents() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM users
      WHERE role = 'student'
    `);

    return rows[0].total;
  }

  // ==============================
  // Count Teachers
  // ==============================
  static async countTeachers() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM users
      WHERE role = 'teacher'
    `);

    return rows[0].total;
  }

  // ==============================
  // Count Admins
  // ==============================
  static async countAdmins() {
    const [rows] = await db.execute(`
      SELECT COUNT(*) AS total
      FROM users
      WHERE role = 'admin'
    `);

    return rows[0].total;
  }
}

module.exports = UserModel;
