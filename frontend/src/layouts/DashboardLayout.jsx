import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user, token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    // If no token exists, force login
    if (!token && !localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, [token, navigate]);

  // Wait until user is loaded from token
  if (!user && (token || localStorage.getItem("token"))) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <div className="flex h-[calc(100vh-80px)]">
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
