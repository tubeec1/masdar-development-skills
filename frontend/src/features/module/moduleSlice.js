import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {
  loading: false,
  success: false,
  error: null,
  message: null,

  modules: [],
  courseModules: [],
  currentModule: null,

  dashboardStatistics: {},
};

/*
|--------------------------------------------------------------------------
| Create Module
|--------------------------------------------------------------------------
*/

export const createModule = createAsyncThunk(
  "module/createModule",
  async (moduleData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/modules/create", moduleData);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to create module.",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Read All Modules (Admin)
|--------------------------------------------------------------------------
*/

export const getModules = createAsyncThunk(
  "module/getModules",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/modules/read");

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch modules.",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Read Modules By Course
|--------------------------------------------------------------------------
*/

export const getCourseModules = createAsyncThunk(
  "module/getCourseModules",
  async (courseId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/modules/course/${courseId}`);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch course modules.",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Update Module
|--------------------------------------------------------------------------
*/

export const updateModule = createAsyncThunk(
  "module/updateModule",
  async ({ id, moduleData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/modules/update/${id}`, moduleData);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to update module.",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Delete Module
|--------------------------------------------------------------------------
*/

export const deleteModule = createAsyncThunk(
  "module/deleteModule",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/modules/delete/${id}`);

      return {
        ...data,
        id,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to delete module.",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Module Dashboard Counts
|--------------------------------------------------------------------------
*/

export const getModuleDashboardCounts = createAsyncThunk(
  "module/getModuleDashboardCounts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/modules/dashboard-counts");

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch dashboard statistics.",
        },
      );
    }
  },
);
const moduleSlice = createSlice({
  name: "module",

  initialState,

  reducers: {
    resetModuleState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },

    clearCurrentModule: (state) => {
      state.currentModule = null;
    },
  },

  extraReducers: (builder) => {
    /*
    |--------------------------------------------------------------------------
    | Create Module
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(createModule.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })

      .addCase(createModule.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        if (action.payload.module) {
          state.modules.unshift(action.payload.module);
          state.courseModules.push(action.payload.module);
          state.currentModule = action.payload.module;
        }
      })

      .addCase(createModule.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message = action.payload?.message || "Failed to create module.";
      });
    /*
    |--------------------------------------------------------------------------
    | Read All Modules
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(getModules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getModules.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        state.modules = action.payload.modules || [];
      })

      .addCase(getModules.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message = action.payload?.message || "Failed to fetch modules.";
      });

    /*
    |--------------------------------------------------------------------------
    | Read Course Modules
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(getCourseModules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCourseModules.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        state.courseModules = action.payload.modules || [];
      })

      .addCase(getCourseModules.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message =
          action.payload?.message || "Failed to fetch course modules.";
      });
    /*
    |--------------------------------------------------------------------------
    | Update Module
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(updateModule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateModule.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        if (action.payload.module) {
          state.modules = state.modules.map((module) =>
            module.id === action.payload.module.id
              ? action.payload.module
              : module,
          );

          state.courseModules = state.courseModules.map((module) =>
            module.id === action.payload.module.id
              ? action.payload.module
              : module,
          );

          state.currentModule = action.payload.module;
        }
      })

      .addCase(updateModule.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message = action.payload?.message || "Failed to update module.";
      });

    /*
    |--------------------------------------------------------------------------
    | Delete Module
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(deleteModule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteModule.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        state.modules = state.modules.filter(
          (module) => module.id !== action.payload.id,
        );

        state.courseModules = state.courseModules.filter(
          (module) => module.id !== action.payload.id,
        );

        if (state.currentModule?.id === action.payload.id) {
          state.currentModule = null;
        }
      })

      .addCase(deleteModule.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message = action.payload?.message || "Failed to delete module.";
      });
    /*
    |--------------------------------------------------------------------------
    | Module Dashboard Counts
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(getModuleDashboardCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getModuleDashboardCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        state.dashboardStatistics = action.payload.statistics || {};
      })

      .addCase(getModuleDashboardCounts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message =
          action.payload?.message || "Failed to fetch dashboard statistics.";
      });
  },
});

export const { resetModuleState, clearCurrentModule } = moduleSlice.actions;

export default moduleSlice.reducer;
