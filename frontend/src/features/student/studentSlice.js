import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {
  courses: [],
  statistics: {},
  loading: false,
  actionLoading: false,
  success: false,
  error: null,
  message: null,
};

/*
|--------------------------------------------------------------------------
| Read My Courses
|--------------------------------------------------------------------------
*/

export const readMyCourses = createAsyncThunk(
  "student/readMyCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/students/my-courses");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Failed to fetch my courses.",
        },
      );
    }
  },
);
/*
|--------------------------------------------------------------------------
| Student Dashboard
|--------------------------------------------------------------------------
*/

export const dashboard = createAsyncThunk(
  "student/dashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/students/dashboard");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Failed to fetch student dashboard.",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Student Slice
|--------------------------------------------------------------------------
*/

const studentSlice = createSlice({
  name: "student",
  initialState,

  reducers: {
    clearStudentState: (state) => {
      state.loading = false;
      state.actionLoading = false;

      state.success = false;
      state.error = null;
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    /*
    |--------------------------------------------------------------------------
    | Read My Courses
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(readMyCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readMyCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;

        state.courses = action.payload.courses || [];
      })
      .addCase(readMyCourses.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message =
          action.payload?.message || "Failed to fetch my courses.";
      });

    /*
    |--------------------------------------------------------------------------
    | Student Dashboard
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(dashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;

        state.statistics = action.payload.statistics || {};
      })
      .addCase(dashboard.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message =
          action.payload?.message || "Failed to fetch student dashboard.";
      });
  },
});
/*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
*/

export const { clearStudentState } = studentSlice.actions;

export default studentSlice.reducer;
