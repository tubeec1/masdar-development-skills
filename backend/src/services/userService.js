const bcrypt = require("bcryptjs");

const UserModel = require("../models/userModel");

class UserService {
  /*
  |--------------------------------------------------------------------------
  | Read All Users
  |--------------------------------------------------------------------------
  */

  static async readUsers() {
    const users = await UserModel.findAll();

    return {
      statusCode: 200,
      success: true,
      message: "Users fetched successfully.",
      total: users.length,
      users,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Read User By ID
  |--------------------------------------------------------------------------
  */

  static async readUserById(userId) {
    const user = await UserModel.findUserById(userId);

    if (!user) {
      return {
        statusCode: 404,
        success: false,
        message: "User not found.",
      };
    }

    return {
      statusCode: 200,
      success: true,
      message: "User fetched successfully.",
      user,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Create Teacher
  |--------------------------------------------------------------------------
  */

  static async createTeacher(data) {
    const { fullName, email, password, phone, gender, nationality, country } =
      data;

    // Check Email
    const existingUser = await UserModel.findByEmail(email);

    if (existingUser) {
      return {
        statusCode: 400,
        success: false,
        message: "Email already exists.",
      };
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default Image
    const profileImage =
      gender === "Female"
        ? "uploads/profileImages/default/female.png"
        : "uploads/profileImages/default/male.png";

    const teacherId = await UserModel.createTeacher({
      fullName,
      email,
      password: hashedPassword,
      phone,
      gender,
      nationality,
      country,
      profileImage,
      bio: null,
    });

    const teacher = await UserModel.findUserById(teacherId);

    return {
      statusCode: 201,
      success: true,
      message: "Teacher created successfully.",
      teacher,
    };
  }
  /*
  |--------------------------------------------------------------------------
  | Update User (Admin)
  |--------------------------------------------------------------------------
  */

  static async updateUser(userId, body, file) {
    const user = await UserModel.findById(userId);

    if (!user) {
      return {
        statusCode: 404,
        success: false,
        message: "User not found.",
      };
    }

    let profileImage = user.profileImage;

    if (file) {
      profileImage = `uploads/profileImages/${file.filename}`;
    }

    let password = "";

    if (body.password) {
      password = await bcrypt.hash(body.password, 10);
    } else {
      password = user.password;
    }

    await UserModel.updateUser(userId, {
      fullName: body.fullName || user.fullName,
      phone: body.phone || user.phone,
      password: password,
      gender: body.gender || user.gender,
      nationality: body.nationality || user.nationality,
      country: body.country || user.country,
      role: body.role || user.role,
      bio: body.bio || user.bio,
      profileImage,
    });

    const updatedUser = await UserModel.findUserById(userId);

    return {
      statusCode: 200,
      success: true,
      message: "User updated successfully.",
      user: updatedUser,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Delete User
  |--------------------------------------------------------------------------
  */

  static async deleteUser(userId) {
    const user = await UserModel.findUserById(userId);

    if (!user) {
      return {
        statusCode: 404,
        success: false,
        message: "User not found.",
      };
    }

    await UserModel.delete(userId);

    return {
      statusCode: 200,
      success: true,
      message: "User deleted successfully.",
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Change User Status
  |--------------------------------------------------------------------------
  */

  static async changeUserStatus(userId, status) {
    const user = await UserModel.findUserById(userId);

    if (!user) {
      return {
        statusCode: 404,
        success: false,
        message: "User not found.",
      };
    }

    await UserModel.updateStatus(userId, status);

    const updatedUser = await UserModel.findUserById(userId);

    return {
      statusCode: 200,
      success: true,
      message: updatedUser.isActive
        ? "User activated successfully."
        : "User deactivated successfully.",
      user: updatedUser,
    };
  }
  /*
  |--------------------------------------------------------------------------
  | Read Students
  |--------------------------------------------------------------------------
  */

  static async readStudents() {
    const students = await UserModel.findStudents();

    return {
      statusCode: 200,
      success: true,
      message: "Students fetched successfully.",
      total: students.length,
      students,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Read Teachers
  |--------------------------------------------------------------------------
  */

  static async readTeachers() {
    const teachers = await UserModel.findTeachers();

    return {
      statusCode: 200,
      success: true,
      message: "Teachers fetched successfully.",
      total: teachers.length,
      teachers,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Read Admins
  |--------------------------------------------------------------------------
  */

  static async readAdmins() {
    const admins = await UserModel.findAdmins();

    return {
      statusCode: 200,
      success: true,
      message: "Admins fetched successfully.",
      total: admins.length,
      admins,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Dashboard Counts
  |--------------------------------------------------------------------------
  */

  static async dashboardCounts() {
    const counts = await UserModel.dashboardCounts();

    return {
      statusCode: 200,
      success: true,
      message: "Dashboard statistics fetched successfully.",
      statistics: {
        totalUsers: Number(counts.totalUsers),
        totalStudents: Number(counts.totalStudents),
        totalTeachers: Number(counts.totalTeachers),
        totalAdmins: Number(counts.totalAdmins),
        activeUsers: Number(counts.activeUsers),
        inactiveUsers: Number(counts.inactiveUsers),
      },
    };
  }
}

module.exports = UserService;
