import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {
  payments: [],
  payment: null,
  statistics: null,

  loading: false,
  actionLoading: false,

  success: false,
  error: null,
  message: null,
};

/*
|--------------------------------------------------------------------------
| Create Payment
|--------------------------------------------------------------------------
*/

export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/payments/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Failed to create payment.",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Read Student Payments
|--------------------------------------------------------------------------
*/

export const readStudentPayments = createAsyncThunk(
  "payment/readStudentPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/payments/my-payments");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Failed to fetch student payments.",
        },
      );
    }
  },
);
/*
|--------------------------------------------------------------------------
| Read Payment
|--------------------------------------------------------------------------
*/

export const readPayment = createAsyncThunk(
  "payment/readPayment",
  async (paymentId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/payments/read/${paymentId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Failed to fetch payment.",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Read All Payments (Admin)
|--------------------------------------------------------------------------
*/

export const readPayments = createAsyncThunk(
  "payment/readPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/payments/read");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Failed to fetch payments.",
        },
      );
    }
  },
);
/*
|--------------------------------------------------------------------------
| Verify Payment
|--------------------------------------------------------------------------
*/

export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/payments/verify/${paymentId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Failed to verify payment.",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Reject Payment
|--------------------------------------------------------------------------
*/

export const rejectPayment = createAsyncThunk(
  "payment/rejectPayment",
  async (paymentId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/payments/reject/${paymentId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Failed to reject payment.",
        },
      );
    }
  },
);
/*
|--------------------------------------------------------------------------
| Dashboard Counts
|--------------------------------------------------------------------------
*/

export const dashboardCounts = createAsyncThunk(
  "payment/dashboardCounts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/payments/dashboard-counts");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Failed to fetch payment dashboard statistics.",
        },
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Payment Slice
|--------------------------------------------------------------------------
*/

const paymentSlice = createSlice({
  name: "payment",
  initialState,

  reducers: {
    clearPaymentState: (state) => {
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
    | Create Payment
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(createPayment.pending, (state) => {
        state.actionLoading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;

        state.payment = action.payload.payment;

        if (action.payload.payment) {
          state.payments.unshift(action.payload.payment);
        }
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.actionLoading = false;
        state.success = false;
        state.error = action.payload;
        state.message = action.payload?.message || "Failed to create payment.";
      });

    /*
    |--------------------------------------------------------------------------
    | Read Student Payments
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(readStudentPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readStudentPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;

        state.payments = action.payload.payments || [];
      })
      .addCase(readStudentPayments.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message =
          action.payload?.message || "Failed to fetch student payments.";
      });

    /*
    |--------------------------------------------------------------------------
    | Read Payment
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(readPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;

        state.payment = action.payload.payment;
      })
      .addCase(readPayment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message = action.payload?.message || "Failed to fetch payment.";
      });
    /*
    |--------------------------------------------------------------------------
    | Read All Payments
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(readPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;

        state.payments = action.payload.payments || [];
      })
      .addCase(readPayments.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message = action.payload?.message || "Failed to fetch payments.";
      });

    /*
    |--------------------------------------------------------------------------
    | Verify Payment
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(verifyPayment.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;

        state.payment = action.payload.payment;

        state.payments = state.payments.map((payment) =>
          payment.id === action.payload.payment.id
            ? action.payload.payment
            : payment,
        );
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.actionLoading = false;
        state.success = false;
        state.error = action.payload;
        state.message = action.payload?.message || "Failed to verify payment.";
      });

    /*
    |--------------------------------------------------------------------------
    | Reject Payment
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(rejectPayment.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(rejectPayment.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;

        state.payment = action.payload.payment;

        state.payments = state.payments.map((payment) =>
          payment.id === action.payload.payment.id
            ? action.payload.payment
            : payment,
        );
      })
      .addCase(rejectPayment.rejected, (state, action) => {
        state.actionLoading = false;
        state.success = false;
        state.error = action.payload;
        state.message = action.payload?.message || "Failed to reject payment.";
      });

    /*
    |--------------------------------------------------------------------------
    | Dashboard Counts
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(dashboardCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dashboardCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;

        state.statistics = action.payload.statistics;
      })
      .addCase(dashboardCounts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message =
          action.payload?.message ||
          "Failed to fetch payment dashboard statistics.";
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;

export default paymentSlice.reducer;
