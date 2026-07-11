const LessonModel = require("../models/lessonModel");
const ModuleModel = require("../models/moduleModel");
const EnrollmentModel = require("../models/enrollmentModel");

class LessonService {
  /*
  |--------------------------------------------------------------------------
  | Create Lesson
  |--------------------------------------------------------------------------
  */

  static async createLesson(user, body) {
    const {
      moduleId,
      title,
      description,
      videoProvider,
      videoUrl,
      duration,
      lessonOrder,
      isPreview,
    } = body;

    // Check Module
    const module = await ModuleModel.findById(moduleId);

    if (!module) {
      return {
        statusCode: 404,
        success: false,
        message: "Module not found.",
      };
    }

    // Teacher can only create lessons in his own course
    if (user.role !== "admin" && Number(module.teacherId) !== Number(user.id)) {
      return {
        statusCode: 403,
        success: false,
        message: "You are not allowed to add lessons to this module.",
      };
    }

    // Check duplicate lesson order
    const existingOrder = await LessonModel.findByOrder(moduleId, lessonOrder);

    if (existingOrder) {
      return {
        statusCode: 400,
        success: false,
        message: "Lesson order already exists in this module.",
      };
    }

    const lessonId = await LessonModel.create({
      moduleId,
      title,
      description,
      videoProvider,
      videoUrl,
      duration,
      lessonOrder,
      isPreview,
    });

    const lesson = await LessonModel.findById(lessonId);

    return {
      statusCode: 201,
      success: true,
      message: "Lesson created successfully.",
      lesson,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Read Lessons By Module
  |--------------------------------------------------------------------------
  */

  static async readModuleLessons(moduleId) {
    const module = await ModuleModel.findById(moduleId);

    if (!module) {
      return {
        statusCode: 404,
        success: false,
        message: "Module not found.",
      };
    }

    const lessons = await LessonModel.findByModule(moduleId);

    return {
      statusCode: 200,
      success: true,
      message: "Lessons fetched successfully.",
      total: lessons.length,
      lessons,
    };
  }

  /*
|--------------------------------------------------------------------------
| Read Lesson For Learning
|--------------------------------------------------------------------------
*/

  static async readLesson(user, lessonId) {
    const lesson = await LessonModel.findLessonForLearning(lessonId);

    if (!lesson) {
      return {
        statusCode: 404,
        success: false,
        message: "Lesson not found.",
      };
    }

    /*
  |--------------------------------------------------------------------------
  | Admin
  |--------------------------------------------------------------------------
  */

    if (user.role === "admin") {
      return {
        statusCode: 200,
        success: true,
        message: "Lesson fetched successfully.",
        lesson,
      };
    }

    /*
  |--------------------------------------------------------------------------
  | Teacher
  |--------------------------------------------------------------------------
  */

    if (
      user.role === "teacher" &&
      Number(lesson.teacherId) === Number(user.id)
    ) {
      return {
        statusCode: 200,
        success: true,
        message: "Lesson fetched successfully.",
        lesson,
      };
    }

    /*
  |--------------------------------------------------------------------------
  | Student
  |--------------------------------------------------------------------------
  */

    if (user.role === "student") {
      const finalPrice =
        Number(lesson.discountPrice) > 0
          ? Number(lesson.discountPrice)
          : Number(lesson.price);

      // Free Course
      if (finalPrice <= 0) {
        return {
          statusCode: 200,
          success: true,
          message: "Lesson fetched successfully.",
          lesson,
        };
      }

      // Paid Course → Approved Enrollment Required
      const enrollment = await EnrollmentModel.findStudentEnrollment(
        user.id,
        lesson.courseId,
      );

      if (enrollment && enrollment.status === "Approved") {
        return {
          statusCode: 200,
          success: true,
          message: "Lesson fetched successfully.",
          lesson,
        };
      }

      return {
        statusCode: 403,
        success: false,
        message: "You must purchase this course before accessing its lessons.",
      };
    }

    return {
      statusCode: 403,
      success: false,
      message: "Access denied.",
    };
  }
  /*
  |--------------------------------------------------------------------------
  | Update Lesson
  |--------------------------------------------------------------------------
  */

  static async updateLesson(user, lessonId, body) {
    const lesson = await LessonModel.findById(lessonId);

    if (!lesson) {
      return {
        statusCode: 404,
        success: false,
        message: "Lesson not found.",
      };
    }

    // Teacher Ownership
    if (user.role !== "admin" && Number(lesson.teacherId) !== Number(user.id)) {
      return {
        statusCode: 403,
        success: false,
        message: "You are not allowed to update this lesson.",
      };
    }

    // Check duplicate lesson order if changed
    if (
      body.lessonOrder &&
      Number(body.lessonOrder) !== Number(lesson.lessonOrder)
    ) {
      const existingOrder = await LessonModel.findByOrder(
        lesson.moduleId,
        body.lessonOrder,
      );

      if (existingOrder && existingOrder.id !== lesson.id) {
        return {
          statusCode: 400,
          success: false,
          message: "Lesson order already exists in this module.",
        };
      }
    }

    await LessonModel.update(lessonId, {
      title: body.title ?? lesson.title,
      description: body.description ?? lesson.description,
      videoProvider: body.videoProvider ?? lesson.videoProvider,
      videoUrl: body.videoUrl ?? lesson.videoUrl,
      duration: body.duration ?? lesson.duration,
      lessonOrder: body.lessonOrder ?? lesson.lessonOrder,
      isPreview:
        body.isPreview !== undefined ? body.isPreview : lesson.isPreview,
    });

    const updatedLesson = await LessonModel.findById(lessonId);

    return {
      statusCode: 200,
      success: true,
      message: "Lesson updated successfully.",
      lesson: updatedLesson,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Lesson
  |--------------------------------------------------------------------------
  */

  static async deleteLesson(user, lessonId) {
    const lesson = await LessonModel.findById(lessonId);

    if (!lesson) {
      return {
        statusCode: 404,
        success: false,
        message: "Lesson not found.",
      };
    }

    // Teacher Ownership
    if (user.role !== "admin" && Number(lesson.teacherId) !== Number(user.id)) {
      return {
        statusCode: 403,
        success: false,
        message: "You are not allowed to delete this lesson.",
      };
    }

    await LessonModel.delete(lessonId);

    return {
      statusCode: 200,
      success: true,
      message: "Lesson deleted successfully.",
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Read All Lessons (Admin)
  |--------------------------------------------------------------------------
  */

  static async readLessons() {
    const lessons = await LessonModel.findAll();

    return {
      statusCode: 200,
      success: true,
      message: "Lessons fetched successfully.",
      total: lessons.length,
      lessons,
    };
  }
  /*
  |--------------------------------------------------------------------------
  | Dashboard Counts
  |--------------------------------------------------------------------------
  */

  static async dashboardCounts() {
    const statistics = await LessonModel.dashboardCounts();

    return {
      statusCode: 200,
      success: true,
      message: "Lesson dashboard statistics fetched successfully.",
      statistics: {
        totalLessons: Number(statistics.totalLessons),
        previewLessons: Number(statistics.previewLessons),
        paidLessons: Number(statistics.paidLessons),
      },
    };
  }
}

module.exports = LessonService;
