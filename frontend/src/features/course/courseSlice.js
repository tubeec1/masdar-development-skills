import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/* ==========================================================================
   Initial State
   ========================================================================== */
const initialState = {
  courses: [],
  teacherCourses: [],
  publishedCourses: [],
  currentCourse: null,
  statistics: null,
  loading: false,
  success: false,
  error: null,
  message: null,
};

/* ==========================================================================
   Async Thunks
   ========================================================================== */

export const createCourse = createAsyncThunk(
  "course/createCourse",
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await api.post("/courses/create", courseData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create course." },
      );
    }
  },
);

export const getCourses = createAsyncThunk(
  "course/getCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/courses/read");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch courses." },
      );
    }
  },
);

export const getPublishedCourses = createAsyncThunk(
  "course/getPublishedCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/courses");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch published courses.",
        },
      );
    }
  },
);

export const getCourseBySlug = createAsyncThunk(
  "course/getCourseBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.get(`/courses/${slug}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch course." },
      );
    }
  },
);

export const getTeacherCourses = createAsyncThunk(
  "course/getTeacherCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/courses/my-courses");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch teacher courses." },
      );
    }
  },
);

export const updateCourse = createAsyncThunk(
  "course/updateCourse",
  async ({ id, courseData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/courses/update/${id}`, courseData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update course." },
      );
    }
  },
);

export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/courses/delete/${id}`);
      return { ...response.data, id };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to delete course." },
      );
    }
  },
);

// NEW: Change Course Status (Admin)
export const changeCourseStatus = createAsyncThunk(
  "course/changeCourseStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/courses/status/${id}`, { status });
      return { ...response.data, id, status };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update status." },
      );
    }
  },
);

// NEW: Dashboard Counts (Admin)
export const getDashboardCounts = createAsyncThunk(
  "course/getDashboardCounts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/courses/dashboard-counts");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch dashboard stats." },
      );
    }
  },
);

/* ==========================================================================
   Slice
   ========================================================================== */
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetCourseState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 1. Success Handlers (Specific Cases first)
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.courses;
      })
      .addCase(getPublishedCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.publishedCourses = action.payload.courses;
      })
      .addCase(getTeacherCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherCourses = action.payload.courses;
      })
      .addCase(getCourseBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourse = action.payload.course;
      })
      .addCase(getDashboardCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload.statistics;
      })
      // 2. Modification Handlers
      // Inside courseSlice.js -> extraReducers

      // After Create: Push the new course into the list
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Add the newly created course to the existing list
        state.teacherCourses.unshift(action.payload.course);
      })

      // After Update: Replace the old version with the updated one
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.teacherCourses.findIndex(
          (c) => c.id === action.payload.course.id,
        );
        if (index !== -1) {
          state.teacherCourses[index] = action.payload.course;
        }
      })

      // After Delete: Remove the course from the list
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherCourses = state.teacherCourses.filter(
          (c) => c.id !== action.payload.id,
        );
      })
      .addCase(changeCourseStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex(
          (c) => c.id === action.payload.id,
        );
        if (index !== -1) state.courses[index].status = action.payload.status;
      })

      // 3. Matchers (Must be at the END)
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload?.message;
        },
      );
  },
});

export const { resetCourseState } = courseSlice.actions;
export default courseSlice.reducer;
