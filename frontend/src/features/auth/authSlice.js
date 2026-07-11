import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/api";

/*
|--------------------------------------------------------------------------
| Local Storage Helpers
|--------------------------------------------------------------------------
*/
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  token: token || null,
  user: user ? JSON.parse(user) : null,
  isAuthenticated: !!token,
  loading: false,
  success: false,
  error: false,
  message: "",
  errors: null,
};

/*
|--------------------------------------------------------------------------
| Async Thunks (Register, Login, GetProfile, UpdateProfile, Logout)
|--------------------------------------------------------------------------
*/
export const register = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/register", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Registration failed." },
      );
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", credentials);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed." },
      );
    }
  },
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/auth/profile");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch profile." },
      );
    }
  },
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put("/auth/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update profile." },
      );
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return true;
});

/*
|--------------------------------------------------------------------------
| Auth Slice Definition
|--------------------------------------------------------------------------
*/
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
    clearErrors: (state) => {
      state.errors = null;
      state.error = false;
    },
    resetStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
      state.errors = null;
    },
    logoutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
      state.errors = null;
    },
    // New action to handle boot/token verification safely
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.message = "";
        state.errors = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message || "Registration failed.";
        state.errors = action.payload?.errors || null;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.message = "";
        state.errors = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message || "Login failed.";
        state.errors = action.payload?.errors || null;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message || "Failed to fetch profile.";
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message || "Profile update failed.";
        state.errors = action.payload?.errors || null;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.success = false;
        state.error = false;
        state.message = "";
        state.errors = null;
      });
  },
});

export const {
  clearMessage,
  clearErrors,
  resetStatus,
  logoutUser,
  setCredentials,
} = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectLoading = (state) => state.auth.loading;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
