import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";

import userReducer from "../features/user/userSlice";
import categoryReducer from "../features/category/categorySlice";
import courseReducer from "../features/course/courseSlice";
import moduleReducer from "../features/module/moduleSlice";
import lessonReducer from "../features/lesson/lessonSlice";
import enrollmentReducer from "../features/enrollment/enrollmentSlice";
import paymentReducer from "../features/payment/paymentSlice";
import studentReducer from "../features/student/studentSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import reportReducer from "../features/report/reportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    user: userReducer,
    category: categoryReducer,
    course: courseReducer,
    module: moduleReducer,
    lesson: lessonReducer,
    enrollment: enrollmentReducer,
    payment: paymentReducer,
    student: studentReducer,
    dashboard: dashboardReducer,
    report: reportReducer,
  },

  devTools: import.meta.env.DEV,
});

export default store;
