import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; // Centralized API client service

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/
const initialState = {
  enrollments: [],
  enrollment: null,

  myCourses: [],
  myEnrollment: null,

  teacherStudents: [],

  statistics: null,

  loading: false,
  success: false,
  error: null,
  message: "",
};

/*
|--------------------------------------------------------------------------
| Student Thunks
|--------------------------------------------------------------------------
*/

export const enrollStudent = createAsyncThunk(
  "enrollment/enrollStudent",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/enrollments/enroll/${courseId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to enroll in course.",
      );
    }
  },
);

export const readStudentCourses = createAsyncThunk(
  "enrollment/readStudentCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/enrollments/my-courses");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch enrolled courses.",
      );
    }
  },
);

export const readStudentEnrollment = createAsyncThunk(
  "enrollment/readStudentEnrollment",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/enrollments/my-course/${courseId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch enrollment details.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Teacher Thunks
|--------------------------------------------------------------------------
*/

export const readTeacherStudents = createAsyncThunk(
  "enrollment/readTeacherStudents",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/enrollments/course/${courseId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch course students.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Admin Thunks
|--------------------------------------------------------------------------
*/

export const readEnrollments = createAsyncThunk(
  "enrollment/readEnrollments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/enrollments/read");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch enrollments.",
      );
    }
  },
);

export const changeEnrollmentStatus = createAsyncThunk(
  "enrollment/changeEnrollmentStatus",
  async ({ id, status, paymentId = null }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/enrollments/status/${id}`, {
        status,
        paymentId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change enrollment status.",
      );
    }
  },
);

export const dashboardCounts = createAsyncThunk(
  "enrollment/dashboardCounts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/enrollments/dashboard-counts");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch dashboard statistics.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Enrollment Slice
|--------------------------------------------------------------------------
*/
const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    clearEnrollment: (state) => {
      state.enrollment = null;
    },
    clearEnrollments: (state) => {
      state.enrollments = [];
    },
    clearTeacherStudents: (state) => {
      state.teacherStudents = [];
    },
    clearMyCourses: (state) => {
      state.myCourses = [];
    },
    clearMyEnrollment: (state) => {
      state.myEnrollment = null;
    },
    clearEnrollmentMessage: (state) => {
      state.message = "";
      state.error = null;
      state.success = false;
    },
    resetEnrollmentState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Enroll Student
      .addCase(enrollStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(enrollStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.enrollment = action.payload.enrollment;
      })
      .addCase(enrollStudent.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // Read Student Courses
      .addCase(readStudentCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readStudentCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.myCourses = action.payload.courses;
        state.message = action.payload.message;
      })
      .addCase(readStudentCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Read Student Enrollment
      .addCase(readStudentEnrollment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readStudentEnrollment.fulfilled, (state, action) => {
        state.loading = false;
        state.myEnrollment = action.payload.enrollment;
        state.message = action.payload.message;
      })
      .addCase(readStudentEnrollment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Read Teacher Students
      .addCase(readTeacherStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readTeacherStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherStudents = action.payload.students;
        state.message = action.payload.message;
      })
      .addCase(readTeacherStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Read All Enrollments
      .addCase(readEnrollments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readEnrollments.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload.enrollments;
        state.message = action.payload.message;
      })
      .addCase(readEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change Enrollment Status
      .addCase(changeEnrollmentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(changeEnrollmentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.enrollment = action.payload.enrollment;
      })
      .addCase(changeEnrollmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // Dashboard Counts
      .addCase(dashboardCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dashboardCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload.statistics;
        state.message = action.payload.message;
      })
      .addCase(dashboardCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/*
|--------------------------------------------------------------------------
| Actions & Reducer Exports
|--------------------------------------------------------------------------
*/
export const {
  clearEnrollment,
  clearEnrollments,
  clearTeacherStudents,
  clearMyCourses,
  clearMyEnrollment,
  clearEnrollmentMessage,
  resetEnrollmentState,
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
