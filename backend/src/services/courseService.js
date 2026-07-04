const slugify = require("slugify");

const CourseModel = require("../models/courseModel");

class CourseService {
  /*
  |--------------------------------------------------------------------------
  | Create Course
  |--------------------------------------------------------------------------
  */

  static async createCourse(teacherId, body, file) {
    const {
      categoryId,
      title,
      description,
      introVideo,
      duration,
      language,
      level,
      price,
      discountPrice,
    } = body;

    // Generate Slug
    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Check Existing Title
    const existingTitle = await CourseModel.findByTitle(title);

    if (existingTitle) {
      return {
        statusCode: 400,
        success: false,
        message: "Course title already exists.",
      };
    }

    // Check Existing Slug
    const existingSlug = await CourseModel.findByCourseSlug(slug);

    if (existingSlug) {
      return {
        statusCode: 400,
        success: false,
        message: "Course slug already exists.",
      };
    }

    // Thumbnail
    const thumbnail = file ? `uploads/courseThumbnails/${file.filename}` : null;

    // Create Course
    const courseId = await CourseModel.create({
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
      status: "Draft",
    });

    const course = await CourseModel.findById(courseId);

    return {
      statusCode: 201,
      success: true,
      message: "Course created successfully.",
      course,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Read All Courses (Admin)
  |--------------------------------------------------------------------------
  */

  static async readCourses() {
    const courses = await CourseModel.findAll();

    return {
      statusCode: 200,
      success: true,
      message: "Courses fetched successfully.",
      total: courses.length,
      courses,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Read Published Courses
  |--------------------------------------------------------------------------
  */

  static async readPublishedCourses() {
    const courses = await CourseModel.findPublished();

    return {
      statusCode: 200,
      success: true,
      message: "Courses fetched successfully.",
      total: courses.length,
      courses,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Read Course By Slug
  |--------------------------------------------------------------------------
  */

  static async readCourseBySlug(slug) {
    const course = await CourseModel.findBySlug(slug);

    if (!course) {
      return {
        statusCode: 404,
        success: false,
        message: "Course not found.",
      };
    }

    return {
      statusCode: 200,
      success: true,
      message: "Course fetched successfully.",
      course,
    };
  }
  /*
  |--------------------------------------------------------------------------
  | Read Teacher Courses
  |--------------------------------------------------------------------------
  */

  static async readTeacherCourses(teacherId) {
    const courses = await CourseModel.findTeacherCourses(teacherId);

    return {
      statusCode: 200,
      success: true,
      message: "Teacher courses fetched successfully.",
      total: courses.length,
      courses,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Update Course
  |--------------------------------------------------------------------------
  */

  static async updateCourse(courseId, body, file) {
    const course = await CourseModel.findById(courseId);

    if (!course) {
      return {
        statusCode: 404,
        success: false,
        message: "Course not found.",
      };
    }

    // Generate Slug
    const slug = body.title
      ? slugify(body.title, {
          lower: true,
          strict: true,
          trim: true,
        })
      : course.slug;

    // Thumbnail
    let thumbnail = course.thumbnail;

    if (file) {
      thumbnail = `uploads/courseThumbnails/${file.filename}`;
    }

    await CourseModel.update(courseId, {
      categoryId: body.categoryId ?? course.categoryId,
      title: body.title ?? course.title,
      slug,
      description: body.description ?? course.description,
      thumbnail,
      introVideo: body.introVideo ?? course.introVideo,
      duration: body.duration ?? course.duration,
      language: body.language ?? course.language,
      level: body.level ?? course.level,
      price: body.price ?? course.price,
      discountPrice: body.discountPrice ?? course.discountPrice,
    });

    const updatedCourse = await CourseModel.findById(courseId);

    return {
      statusCode: 200,
      success: true,
      message: "Course updated successfully.",
      course: updatedCourse,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Course
  |--------------------------------------------------------------------------
  */

  static async deleteCourse(courseId) {
    const course = await CourseModel.findById(courseId);

    if (!course) {
      return {
        statusCode: 404,
        success: false,
        message: "Course not found.",
      };
    }

    await CourseModel.delete(courseId);

    return {
      statusCode: 200,
      success: true,
      message: "Course deleted successfully.",
    };
  }
  /*
  |--------------------------------------------------------------------------
  | Change Course Status
  |--------------------------------------------------------------------------
  */

  static async changeCourseStatus(courseId, status) {
    const course = await CourseModel.findById(courseId);

    if (!course) {
      return {
        statusCode: 404,
        success: false,
        message: "Course not found.",
      };
    }

    const allowedStatuses = ["Draft", "Published", "Archived"];

    if (!allowedStatuses.includes(status)) {
      return {
        statusCode: 400,
        success: false,
        message: "Invalid course status.",
      };
    }

    await CourseModel.updateStatus(courseId, status);

    const updatedCourse = await CourseModel.findById(courseId);

    return {
      statusCode: 200,
      success: true,
      message: `Course ${status.toLowerCase()} successfully.`,
      course: updatedCourse,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Dashboard Counts
  |--------------------------------------------------------------------------
  */

  static async dashboardCounts() {
    const statistics = await CourseModel.dashboardCounts();

    return {
      statusCode: 200,
      success: true,
      message: "Course dashboard statistics fetched successfully.",
      statistics: {
        totalCourses: Number(statistics.totalCourses),
        publishedCourses: Number(statistics.publishedCourses),
        draftCourses: Number(statistics.draftCourses),
        archivedCourses: Number(statistics.archivedCourses),
      },
    };
  }
}

module.exports = CourseService;
