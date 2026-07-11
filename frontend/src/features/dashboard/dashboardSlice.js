import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const initialState = {
  adminStatistics: null,
  teacherStatistics: null,
  studentStatistics: null,
  loading: false,
  error: null,
};

/* Async Thunks */
export const getAdminDashboard = createAsyncThunk(
  "dashboard/getAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dashboard/admin");
      return response.data.statistics;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch admin dashboard.",
      );
    }
  },
);

export const getTeacherDashboard = createAsyncThunk(
  "dashboard/getTeacher",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dashboard/teacher");
      return response.data.statistics; // Returns the exact object needed
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch teacher dashboard.",
      );
    }
  },
);

export const getStudentDashboard = createAsyncThunk(
  "dashboard/getStudent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dashboard/student");
      return response.data.statistics;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch student dashboard.",
      );
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboard: (state) => {
      state.adminStatistics = null;
      state.teacherStatistics = null;
      state.studentStatistics = null;
      state.error = null;
    },
    resetDashboard: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Admin
      .addCase(getAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.adminStatistics = action.payload;
      })
      .addCase(getAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Teacher
      .addCase(getTeacherDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherStatistics = action.payload;
      })
      .addCase(getTeacherDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Student
      .addCase(getStudentDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.studentStatistics = action.payload;
      })
      .addCase(getStudentDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDashboard, resetDashboard } = dashboardSlice.actions;
export const selectAdminStats = (state) => state.dashboard.adminStatistics;
export const selectTeacherStats = (state) => state.dashboard.teacherStatistics;
export const selectStudentStats = (state) => state.dashboard.studentStatistics;
export default dashboardSlice.reducer;
