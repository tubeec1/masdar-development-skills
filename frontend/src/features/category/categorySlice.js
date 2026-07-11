import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/
const initialState = {
  categories: [],
  activeCategories: [],
  category: null,
  dashboardStatistics: null,
  loading: false,
  error: null,
};

/*
|--------------------------------------------------------------------------
| Public - Read Active Categories
|--------------------------------------------------------------------------
*/
export const getActiveCategories = createAsyncThunk(
  "category/getActiveCategories",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/categories");
      return response.data.categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch active categories.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Public - Read Category By Slug
|--------------------------------------------------------------------------
*/
export const getCategoryBySlug = createAsyncThunk(
  "category/getCategoryBySlug",
  async (slug, thunkAPI) => {
    try {
      const response = await api.get(`/categories/${slug}`);
      return response.data.category;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch category.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Admin - Read Categories
|--------------------------------------------------------------------------
*/
export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/categories/read");
      return response.data.categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Admin - Dashboard Counts
|--------------------------------------------------------------------------
*/
export const getCategoryDashboard = createAsyncThunk(
  "category/getCategoryDashboard",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/categories/dashboard-counts");
      return response.data.statistics;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch dashboard statistics.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Admin - Create Category
|--------------------------------------------------------------------------
*/
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (categoryData, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("title", categoryData.title);

      if (categoryData.description) {
        formData.append("description", categoryData.description);
      }
      if (categoryData.status) {
        formData.append("status", categoryData.status);
      }
      if (categoryData.image) {
        formData.append("image", categoryData.image);
      }

      const response = await api.post("/categories/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.category;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create category.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Admin - Update Category
|--------------------------------------------------------------------------
*/
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, categoryData }, thunkAPI) => {
    try {
      const formData = new FormData();
      if (categoryData.title !== undefined)
        formData.append("title", categoryData.title);
      if (categoryData.description !== undefined)
        formData.append("description", categoryData.description);
      if (categoryData.status !== undefined)
        formData.append("status", categoryData.status);
      if (categoryData.image) formData.append("image", categoryData.image);

      const response = await api.put(`/categories/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.category;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update category.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Admin - Delete Category
|--------------------------------------------------------------------------
*/
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/categories/delete/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete category.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Admin - Change Category Status
|--------------------------------------------------------------------------
*/
export const changeCategoryStatus = createAsyncThunk(
  "category/changeCategoryStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await api.patch(`/categories/status/${id}`, { status });
      return response.data.category;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to change category status.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Slice Definition
|--------------------------------------------------------------------------
*/
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearCategory(state) {
      state.category = null;
      state.error = null;
    },
    resetCategory() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Read Active Categories
      .addCase(getActiveCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getActiveCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.activeCategories = action.payload;
      })
      .addCase(getActiveCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Category By Slug
      .addCase(getCategoryBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategoryBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Read All Categories (Admin)
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Category Dashboard Summary Statistics
      .addCase(getCategoryDashboard.fulfilled, (state, action) => {
        state.dashboardStatistics = action.payload;
      })

      // Create Category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.unshift(action.payload);
        if (state.dashboardStatistics) {
          state.dashboardStatistics.totalCategories += 1;
          if (action.payload.status === "Active")
            state.dashboardStatistics.activeCategories += 1;
          else state.dashboardStatistics.inactiveCategories += 1;
        }
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (cat) => cat.id === action.payload.id,
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const deletedCat = state.categories.find(
          (cat) => cat.id === action.payload,
        );
        state.categories = state.categories.filter(
          (cat) => cat.id !== action.payload,
        );
        if (state.dashboardStatistics && deletedCat) {
          state.dashboardStatistics.totalCategories -= 1;
          if (deletedCat.status === "Active")
            state.dashboardStatistics.activeCategories -= 1;
          else state.dashboardStatistics.inactiveCategories -= 1;
        }
      })

      // Change Category Status
      .addCase(changeCategoryStatus.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (cat) => cat.id === action.payload.id,
        );
        if (index !== -1) {
          const originalStatus = state.categories[index].status;
          state.categories[index] = action.payload;

          if (
            state.dashboardStatistics &&
            originalStatus !== action.payload.status
          ) {
            if (action.payload.status === "Active") {
              state.dashboardStatistics.activeCategories += 1;
              state.dashboardStatistics.inactiveCategories -= 1;
            } else {
              state.dashboardStatistics.activeCategories -= 1;
              state.dashboardStatistics.inactiveCategories += 1;
            }
          }
        }
      });
  },
});

export const { clearCategory, resetCategory } = categorySlice.actions;
export default categorySlice.reducer;
