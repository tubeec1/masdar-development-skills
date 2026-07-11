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

  lessons: [],
  moduleLessons: [],
  currentLesson: null,

  dashboardStatistics: {},
};

/*
|--------------------------------------------------------------------------
| Create Lesson
|--------------------------------------------------------------------------
*/

export const createLesson = createAsyncThunk(
  "lesson/createLesson",
  async (lessonData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/lessons/create", lessonData);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to create lesson.",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Read All Lessons (Admin)
|--------------------------------------------------------------------------
*/

export const getLessons = createAsyncThunk(
  "lesson/getLessons",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/lessons/read");

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch lessons.",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Read Lessons By Module
|--------------------------------------------------------------------------
*/

export const getModuleLessons = createAsyncThunk(
  "lesson/getModuleLessons",
  async (moduleId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/lessons/module/${moduleId}`);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch module lessons.",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Read Single Lesson
|--------------------------------------------------------------------------
*/

export const getLesson = createAsyncThunk(
  "lesson/getLesson",
  async (lessonId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/lessons/read/${lessonId}`);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch lesson.",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Update Lesson
|--------------------------------------------------------------------------
*/

export const updateLesson = createAsyncThunk(
  "lesson/updateLesson",
  async ({ id, lessonData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/lessons/update/${id}`, lessonData);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to update lesson.",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Delete Lesson
|--------------------------------------------------------------------------
*/

export const deleteLesson = createAsyncThunk(
  "lesson/deleteLesson",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/lessons/delete/${id}`);

      return {
        ...data,
        id,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to delete lesson.",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Lesson Dashboard Counts
|--------------------------------------------------------------------------
*/

export const getLessonDashboardCounts = createAsyncThunk(
  "lesson/getLessonDashboardCounts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/lessons/dashboard-counts");

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
const lessonSlice = createSlice({
  name: "lesson",

  initialState,

  reducers: {
    resetLessonState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },

    clearCurrentLesson: (state) => {
      state.currentLesson = null;
    },
  },

  extraReducers: (builder) => {
    /*
    |--------------------------------------------------------------------------
    | Create Lesson
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(createLesson.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })

      .addCase(createLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        if (action.payload.lesson) {
          state.lessons.unshift(action.payload.lesson);
          state.moduleLessons.push(action.payload.lesson);
          state.currentLesson = action.payload.lesson;
        }
      })

      .addCase(createLesson.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message = action.payload?.message || "Failed to create lesson.";
      });
    /*
    |--------------------------------------------------------------------------
    | Read All Lessons
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(getLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        state.lessons = action.payload.lessons || [];
      })

      .addCase(getLessons.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message = action.payload?.message || "Failed to fetch lessons.";
      });

    /*
    |--------------------------------------------------------------------------
    | Read Lessons By Module
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(getModuleLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getModuleLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        state.moduleLessons = action.payload.lessons || [];
      })

      .addCase(getModuleLessons.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message =
          action.payload?.message || "Failed to fetch module lessons.";
      });

    /*
    |--------------------------------------------------------------------------
    | Read Single Lesson
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(getLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        state.currentLesson = action.payload.lesson;
      })

      .addCase(getLesson.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message = action.payload?.message || "Failed to fetch lesson.";
      });
    /*
    |--------------------------------------------------------------------------
    | Update Lesson
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(updateLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        const updatedLesson = action.payload.lesson;

        state.lessons = state.lessons.map((lesson) =>
          lesson.id === updatedLesson.id ? updatedLesson : lesson,
        );

        state.moduleLessons = state.moduleLessons.map((lesson) =>
          lesson.id === updatedLesson.id ? updatedLesson : lesson,
        );

        state.currentLesson = updatedLesson;
      })

      .addCase(updateLesson.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message = action.payload?.message || "Failed to update lesson.";
      });

    /*
    |--------------------------------------------------------------------------
    | Delete Lesson
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(deleteLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        state.lessons = state.lessons.filter(
          (lesson) => lesson.id !== action.payload.id,
        );

        state.moduleLessons = state.moduleLessons.filter(
          (lesson) => lesson.id !== action.payload.id,
        );

        if (state.currentLesson?.id === action.payload.id) {
          state.currentLesson = null;
        }
      })

      .addCase(deleteLesson.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message = action.payload?.message || "Failed to delete lesson.";
      });
    /*
    |--------------------------------------------------------------------------
    | Lesson Dashboard Counts
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(getLessonDashboardCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getLessonDashboardCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        state.dashboardStatistics = action.payload.statistics || {};
      })

      .addCase(getLessonDashboardCounts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message =
          action.payload?.message ||
          "Failed to fetch lesson dashboard statistics.";
      });
  },
});

export const { resetLessonState, clearCurrentLesson } = lessonSlice.actions;

export default lessonSlice.reducer;
