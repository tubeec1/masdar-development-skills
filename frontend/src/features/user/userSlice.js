import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api"; // Your configured axios instance

const initialState = {
  users: [],
  selectedUser: null,
  total: 0,
  students: [],
  teachers: [],
  admins: [],
  dashboardStatistics: null,
  loading: false,
  success: false,
  error: null,
  message: "",
};

/*
|--------------------------------------------------------------------------
| Async Thunks Ecosystem
|--------------------------------------------------------------------------
*/

export const readUsers = createAsyncThunk(
  "user/readUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/read");
      return response.data; // Expected: { success, total, users }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to read users directory." },
      );
    }
  },
);

export const readUserById = createAsyncThunk(
  "user/readUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/read/${id}`);
      return response.data; // Expected: { success, user }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch profile metadata.",
        },
      );
    }
  },
);

export const createTeacher = createAsyncThunk(
  "user/createTeacher",
  async (teacherData, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/create-teacher", teacherData);
      return response.data; // Expected: { success, teacher, message }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to build teacher account." },
      );
    }
  },
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      // Crucial: Must use multipart boundary headers since backend processes with multer middleware
      const response = await api.put(`/users/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data; // Expected: { success, user, message }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to execute record modifications.",
        },
      );
    }
  },
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/users/delete/${id}`);
      return { id, ...response.data }; // Append targeted ID to drop cleanly from UI states
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to eliminate profile record.",
        },
      );
    }
  },
);

export const changeUserStatus = createAsyncThunk(
  "user/changeUserStatus",
  async ({ id, isActive }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/users/status/${id}`, { isActive });
      return response.data; // Expected: { success, user, message }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to toggle status." },
      );
    }
  },
);

export const readStudents = createAsyncThunk(
  "user/readStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/students");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to collect students roster.",
        },
      );
    }
  },
);

export const readTeachers = createAsyncThunk(
  "user/readTeachers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/teachers");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to collect teachers roster.",
        },
      );
    }
  },
);

export const readAdmins = createAsyncThunk(
  "user/readAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/admins");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to collect administration roster.",
        },
      );
    }
  },
);

export const getDashboardCounts = createAsyncThunk(
  "user/getDashboardCounts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/dashboard-counts");
      return response.data; // Expected: { success, statistics }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to resolve dashboard statistics.",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Core Action Reducers Slice Configuration
|--------------------------------------------------------------------------
*/
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      /*
      |--------------------------------------------------------------------------
      | 1. Specific Case Handlers (Defined First)
      |--------------------------------------------------------------------------
      */
      // Read Operations
      .addCase(readUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users || [];
        state.total = action.payload.total || 0;
      })
      .addCase(readStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.students || [];
      })
      .addCase(readTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload.teachers || [];
      })
      .addCase(readAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload.admins || [];
      })
      // Dashboard Statistics Sync
      .addCase(getDashboardCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardStatistics = action.payload.statistics;
      })
      // Account Generation Mutations
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (action.payload.teacher) state.users.unshift(action.payload.teacher);
        state.message = action.payload.message;
      })
      // Profile Modification Integration Layer
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const completeRecord = action.payload.user;
        if (completeRecord) {
          const syncArray = (arr) =>
            arr.map((item) =>
              item.id === completeRecord.id ? completeRecord : item,
            );
          state.users = syncArray(state.users);
          state.teachers = syncArray(state.teachers);
          state.students = syncArray(state.students);
          state.admins = syncArray(state.admins);
        }
        state.message = action.payload.message;
      })
      // Account Termination Updates
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const targetId = action.payload.id;
        const filterArray = (arr) => arr.filter((item) => item.id !== targetId);
        state.users = filterArray(state.users);
        state.teachers = filterArray(state.teachers);
        state.students = filterArray(state.students);
        state.admins = filterArray(state.admins);
        state.message = action.payload.message;
      })
      // Binary Operational Toggle States Sync
      .addCase(changeUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        const changedRecord = action.payload.user;
        if (changedRecord) {
          const syncArray = (arr) =>
            arr.map((item) =>
              item.id === changedRecord.id ? changedRecord : item,
            );
          state.users = syncArray(state.users);
          state.teachers = syncArray(state.teachers);
          state.students = syncArray(state.students);
          state.admins = syncArray(state.admins);
        }
        state.message = action.payload.message;
      })

      /*
      |--------------------------------------------------------------------------
      | 2. Dynamic Matcher Handlers (Chained Last)
      |--------------------------------------------------------------------------
      */
      // Unified Loading Actions Matching
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      // Unified Error Actions Matching
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        },
      );
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
