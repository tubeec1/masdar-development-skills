const StudentModel = require("../models/studentModel");

class StudentService {
  /*
  |--------------------------------------------------------------------------
  | Read My Courses
  |--------------------------------------------------------------------------
  */

  static async readMyCourses(studentId) {
    const courses = await StudentModel.findMyCourses(studentId);

    return {
      statusCode: 200,
      success: true,
      message: "My courses fetched successfully.",
      total: courses.length,
      courses,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Student Dashboard
  |--------------------------------------------------------------------------
  */

  static async dashboard(studentId) {
    const statistics = await StudentModel.dashboard(studentId);

    return {
      statusCode: 200,
      success: true,
      message: "Student dashboard fetched successfully.",
      statistics: {
        totalCourses: Number(statistics.totalCourses),
      },
    };
  }
}

module.exports = StudentService;
