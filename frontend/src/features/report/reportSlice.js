import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/
const initialState = {
  overview: null,

  students: [],
  teachers: [],
  courses: [],
  enrollments: [],
  payments: [],

  enrollmentSummary: null,
  paymentSummary: null,

  loading: false,
  success: false,
  error: null,
  message: "",
};

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

// Overview Report
export const overviewReport = createAsyncThunk(
  "report/overviewReport",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/reports/overview");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch overview report.",
      );
    }
  },
);

// Student Report
export const studentReport = createAsyncThunk(
  "report/studentReport",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/reports/students");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch student report.",
      );
    }
  },
);

// Teacher Report
export const teacherReport = createAsyncThunk(
  "report/teacherReport",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/reports/teachers");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch teacher report.",
      );
    }
  },
);

// Course Report
export const courseReport = createAsyncThunk(
  "report/courseReport",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/reports/courses");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch course report.",
      );
    }
  },
);

// Enrollment Report
export const enrollmentReport = createAsyncThunk(
  "report/enrollmentReport",
  async (status = "", thunkAPI) => {
    try {
      const response = await api.get("/reports/enrollments", {
        params: status ? { status } : {},
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch enrollment report.",
      );
    }
  },
);

// Payment Report
export const paymentReport = createAsyncThunk(
  "report/paymentReport",
  async (status = "", thunkAPI) => {
    try {
      const response = await api.get("/reports/payments", {
        params: status ? { status } : {},
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch payment report.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Report Slice
|--------------------------------------------------------------------------
*/
const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    clearReportState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ==========================================
      // Overview Report
      // ==========================================
      .addCase(overviewReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(overviewReport.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "";
        state.overview = action.payload.overview || null;
      })
      .addCase(overviewReport.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // ==========================================
      // Student Report
      // ==========================================
      .addCase(studentReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(studentReport.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message || "";
        state.students = action.payload.students || [];
      })
      .addCase(studentReport.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // ==========================================
      // Teacher Report
      // ==========================================
      .addCase(teacherReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(teacherReport.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message || "";
        state.teachers = action.payload.teachers || [];
      })
      .addCase(teacherReport.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // ==========================================
      // Course Report
      // ==========================================
      .addCase(courseReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(courseReport.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message || "";
        state.courses = action.payload.courses || [];
      })
      .addCase(courseReport.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // ==========================================
      // Enrollment Report
      // ==========================================
      .addCase(enrollmentReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollmentReport.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message || "";
        state.enrollments = action.payload.enrollments || [];
        state.enrollmentSummary = action.payload.summary || null;
      })
      .addCase(enrollmentReport.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // ==========================================
      // Payment Report
      // ==========================================
      .addCase(paymentReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentReport.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message || "";
        state.payments = action.payload.payments || [];
        state.paymentSummary = action.payload.summary || null;
      })
      .addCase(paymentReport.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearReportState } = reportSlice.actions;

export default reportSlice.reducer;
