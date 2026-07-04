const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/userModel");

class AuthService {
  /*
  |--------------------------------------------------------------------------
  | Register
  |--------------------------------------------------------------------------
  */

  static async register(data) {
    const { fullName, email, password, phone, gender, nationality, country } =
      data;

    // Check existing email
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

    // Default Profile Image
    const profileImage =
      gender === "Female"
        ? "uploads/profileImages/default/female.png"
        : "uploads/profileImages/default/male.png";

    // Create User
    const userId = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
      phone: phone || null,
      gender,
      nationality,
      country,
      profileImage,
      role: "student",
      bio: null,
      isActive: true,
    });

    if (!userId) {
      return {
        statusCode: 500,
        success: false,
        message: "Failed to create account.",
      };
    }

    return {
      statusCode: 201,
      success: true,
      message: "Account created successfully. Please login.",
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Login
  |--------------------------------------------------------------------------
  */

  static async login(data) {
    const { email, password } = data;

    // Find User
    const user = await UserModel.findByEmail(email);

    if (!user) {
      return {
        statusCode: 401,
        success: false,
        message: "Invalid email or password.",
      };
    }

    // Check Active
    if (!user.isActive) {
      return {
        statusCode: 403,
        success: false,
        message:
          "Your account has been deactivated. Please contact administrator.",
      };
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        statusCode: 401,
        success: false,
        message: "Invalid email or password.",
      };
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    delete user.password;

    return {
      statusCode: 200,
      success: true,
      message: "Login successful.",
      token,
      user,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Get Profile
  |--------------------------------------------------------------------------
  */

  static async getProfile(userId) {
    const user = await UserModel.findById(userId);

    if (!user) {
      return {
        statusCode: 404,
        success: false,
        message: "User not found.",
      };
    }

    delete user.password;

    return {
      statusCode: 200,
      success: true,
      message: "Profile fetched successfully.",
      user,
    };
  }
  /*
  |--------------------------------------------------------------------------
  | Update Profile
  |--------------------------------------------------------------------------
  */

  static async updateProfile(userId, body, file) {
    // Get Current User
    const user = await UserModel.findById(userId);

    if (!user) {
      return {
        statusCode: 404,
        success: false,
        message: "User not found.",
      };
    }

    // Keep existing password
    let password = user.password;

    // Update password if provided
    if (
      body.password &&
      typeof body.password === "string" &&
      body.password.trim() !== ""
    ) {
      password = await bcrypt.hash(body.password, 10);
    }

    // Keep existing profile image
    let profileImage = user.profileImage;

    // Update profile image if uploaded
    if (file) {
      profileImage = `uploads/profileImages/${file.filename}`;
    }

    // Update User
    await UserModel.updateProfile(userId, {
      fullName: body.fullName ?? user.fullName,
      password,
      phone: body.phone ?? user.phone,
      gender: body.gender ?? user.gender,
      nationality: body.nationality ?? user.nationality,
      country: body.country ?? user.country,
      bio: body.bio ?? user.bio,
      profileImage,
    });

    // Get Updated User
    const updatedUser = await UserModel.findById(userId);

    delete updatedUser.password;

    return {
      statusCode: 200,
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    };
  }
}

module.exports = AuthService;
