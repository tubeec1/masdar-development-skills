import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser } from "../features/auth/authSlice";

const ProtectedRoute = ({ children, roles }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  // If unauthorized token state detected, force-kick back to Auth entry portal
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Gracefully handles loading gap while App.jsx verifies user token state
  if (!user?.role) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="animate-pulse tracking-wider text-xs text-slate-400 font-medium">
            Verifying Security Session...
          </p>
        </div>
      </div>
    );
  }

  // Strictly filter mismatched role permission attempts if restrictions are passed
  if (roles && !roles.includes(user.role)) {
    switch (user.role) {
      case "admin":
        return <Navigate to="/dashboard/admin" replace />;
      case "teacher":
        return <Navigate to="/dashboard/teacher" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
