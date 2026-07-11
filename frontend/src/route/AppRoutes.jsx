import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

/* ================= PUBLIC PAGES ================= */
import HomePage from "../pages/public/Home";
import CoursesPage from "../pages/public/Courses";
import AboutPage from "../pages/public/About";
import ContactPage from "../pages/public/Contact";
import SigninPage from "../pages/public/Signin";
import SignupPage from "../pages/public/Signup";
import NotFoundPage from "../pages/public/NotFound";

/* ================= ADMIN PAGES ================= */
import AdminDashboardPage from "../pages/dashboard/admin/Dashboard";
import AdminUsersPage from "../pages/dashboard/admin/Users";
import AdminCategoriesPage from "../pages/dashboard/admin/Categories";
import AdminCoursesPage from "../pages/dashboard/admin/Courses";
import AdminModulesPage from "../pages/dashboard/admin/Modules";
import AdminLessonsPage from "../pages/dashboard/admin/Lessons";
import AdminEnrollmentsPage from "../pages/dashboard/admin/Enrollments";
import AdminPaymentsPage from "../pages/dashboard/admin/Payments";
import AdminReportsPage from "../pages/dashboard/admin/Reports";
import AdminProfilePage from "../pages/dashboard/admin/Profile";

/* ================= TEACHER PAGES ================= */
import TeacherDashboardPage from "../pages/dashboard/teacher/Dashboard";
import TeacherMyCoursesPage from "../pages/dashboard/teacher/MyCourses";
import TeacherModulesPage from "../pages/dashboard/teacher/Modules";
import TeacherLessonsPage from "../pages/dashboard/teacher/Lessons";
import TeacherStudentsPage from "../pages/dashboard/teacher/Students";
import TeacherProfilePage from "../pages/dashboard/teacher/Profile";
import CourseDetails from "../pages/public/CourseDetails";
import MyProfile from "../pages/public/MyProfile";
import MyEnrollments from "../pages/public/MyEnrollments";
import MyPayments from "../pages/public/MyPayments";
import MyCourses from "../pages/public/MyCourses";
import MyCourse from "../pages/public/MyCourse";
import CategoryDetails from "../pages/public/CategoryDetails";

/**
 * Dynamic Index Route Handler for /dashboard
 * Determines user role status instantly and maps users to their view targets
 */
const DashboardIndexRedirect = () => {
  const user = useSelector(selectUser);

  if (user?.role === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  }
  if (user?.role === "teacher") {
    return <Navigate to="/dashboard/teacher" replace />;
  }
  return <Navigate to="/" replace />;
};

const appRoutes = createBrowserRouter([
  /*
  |--------------------------------------------------------------------------
  | Public Layout Routes
  |--------------------------------------------------------------------------
  */
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "courses",
        element: <CoursesPage />,
      },
      {
        path: "course-details/:slug",
        element: <CourseDetails />,
      },
      {
        path: "/my-enrollments",
        element: <MyEnrollments />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "my-payments",
        element: <MyPayments />,
      },
      {
        path: "my-courses",
        element: <MyCourses />,
      },
      {
        path: "my-course/:slug",
        element: <MyCourse />,
      },
      {
        path: "categories/:slug",
        element: <CategoryDetails />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "signin",
        element: (
          <PublicRoute>
            <SigninPage />
          </PublicRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        ),
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | Dashboard Core Layout Routes
  |--------------------------------------------------------------------------
  */
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      // Handles native fallback layout access redirect matching to /dashboard
      {
        index: true,
        element: <DashboardIndexRedirect />,
      },

      /* ── ADMIN SUB-ROUTES ── */
      {
        path: "admin",
        children: [
          {
            index: true,
            element: <AdminDashboardPage />,
          },
          {
            path: "users",
            element: <AdminUsersPage />,
          },
          {
            path: "categories",
            element: <AdminCategoriesPage />,
          },
          {
            path: "courses",
            element: <AdminCoursesPage />,
          },

          {
            path: "modules",
            element: <AdminModulesPage />,
          },
          {
            path: "lessons",
            element: <AdminLessonsPage />,
          },
          {
            path: "enrollments",
            element: <AdminEnrollmentsPage />,
          },
          {
            path: "payments",
            element: <AdminPaymentsPage />,
          },
          {
            path: "reports",
            element: <AdminReportsPage />,
          },
          {
            path: "profile",
            element: <AdminProfilePage />,
          },
        ],
      },

      /* ── TEACHER SUB-ROUTES ── */
      {
        path: "teacher",
        children: [
          {
            index: true,
            element: <TeacherDashboardPage />,
          },
          {
            path: "my-courses",
            element: <TeacherMyCoursesPage />,
          },
          {
            path: "modules",
            element: <TeacherModulesPage />,
          },
          {
            path: "lessons",
            element: <TeacherLessonsPage />,
          },
          {
            path: "students",
            element: <TeacherStudentsPage />,
          },
          {
            path: "profile",
            element: <TeacherProfilePage />,
          },
        ],
      },
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | Global Catch-All Fallback
  |--------------------------------------------------------------------------
  */
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default appRoutes;
