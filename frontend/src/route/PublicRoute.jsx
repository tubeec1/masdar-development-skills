import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUser,
  selectLoading,
} from "../features/auth/authSlice";

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);

  // 1. Prevent premature redirects while Redux is processing authentication states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 2. If already logged in, seamlessly bounce them away from public pages (like login/signup)
  if (isAuthenticated) {
    switch (user?.role) {
      case "admin":
        return <Navigate to="/dashboard/admin" replace />;
      case "teacher":
        return <Navigate to="/dashboard/teacher" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // 3. User is definitely unauthenticated, let them view the public page
  return children;
};

export default PublicRoute;
