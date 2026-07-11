import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logoutUser } from "../../features/auth/authSlice";

import {
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineCollection,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineX,
  HiOutlineFolderOpen,
  HiOutlineCash,
  HiOutlineChartBar,
  HiOutlineLogout,
  HiOutlineGlobeAlt,
  HiOutlineSearch,
} from "react-icons/hi";

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const role = user?.role;
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Admin menu mapping
  const adminMenus = [
    { name: "Dashboard", path: "/dashboard/admin", icon: HiOutlineHome },
    { name: "Users", path: "/dashboard/admin/users", icon: HiOutlineUsers },
    {
      name: "Categories",
      path: "/dashboard/admin/categories",
      icon: HiOutlineCollection,
    },
    {
      name: "Courses",
      path: "/dashboard/admin/courses",
      icon: HiOutlineBookOpen,
    },
    {
      name: "Modules",
      path: "/dashboard/admin/modules",
      icon: HiOutlineFolderOpen,
    },
    {
      name: "Lessons",
      path: "/dashboard/admin/lessons",
      icon: HiOutlineAcademicCap,
    },
    {
      name: "Enrollments",
      path: "/dashboard/admin/enrollments",
      icon: HiOutlineUsers,
    },
    {
      name: "Payments",
      path: "/dashboard/admin/payments",
      icon: HiOutlineCash,
    },
    {
      name: "Reports",
      path: "/dashboard/admin/reports",
      icon: HiOutlineChartBar,
    },
    { name: "Profile", path: "/dashboard/admin/profile", icon: HiOutlineUser },
  ];

  // Teacher menu mapping
  const teacherMenus = [
    { name: "Dashboard", path: "/dashboard/teacher", icon: HiOutlineHome },
    {
      name: "My Courses",
      path: "/dashboard/teacher/my-courses",
      icon: HiOutlineBookOpen,
    },
    {
      name: "Modules",
      path: "/dashboard/teacher/modules",
      icon: HiOutlineCollection,
    },
    {
      name: "Lessons",
      path: "/dashboard/teacher/lessons",
      icon: HiOutlineAcademicCap,
    },
    // {
    //   name: "Students",
    //   path: "/dashboard/teacher/students",
    //   icon: HiOutlineUsers,
    // },
    {
      name: "Profile",
      path: "/dashboard/teacher/profile",
      icon: HiOutlineUser,
    },
  ];

  // Fallback / Student Menus
  const studentMenus = [
    { name: "Dashboard", path: "/dashboard", icon: HiOutlineHome },
    { name: "Profile", path: "/dashboard/profile", icon: HiOutlineUser },
  ];

  let menus =
    role === "admin"
      ? adminMenus
      : role === "teacher"
        ? teacherMenus
        : studentMenus;

  // Filter menus dynamically if the user types in the search bar
  const filteredMenus = menus.filter((menu) =>
    menu.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Layout */}
      <aside
        className={`
          fixed lg:static
          top-20 left-0
          z-50
          w-72
          h-[100vh]
          bg-[#0F172A]
          border-r border-slate-800/60
          text-white
          transition-transform
          duration-300
          ease-in-out
          flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Mobile Close Header */}
        <div className="lg:hidden flex justify-end p-4 bg-[#0F172A] shrink-0">
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <HiOutlineX className="text-xl" />
          </button>
        </div>

        {/* SECTION 1: USER PROFILE CARD */}
        <div className="px-6 py-6 border-b border-slate-800/80 shrink-0 bg-[#0F172A]">
          <div className="flex flex-col items-center text-center">
            <div className="relative group">
              <img
                src={
                  user?.profileImage
                    ? `http://localhost:5000/${user.profileImage}`
                    : "https://via.placeholder.com/150"
                }
                crossOrigin="anonymous"
                alt={user?.fullName || "User profile"}
                className="w-20 h-20 rounded-full object-cover border-4 border-[#10B981] shadow-xl transition-transform duration-300 group-hover:scale-105 bg-slate-800"
                onError={(e) => {
                  e.target.removeAttribute("crossOrigin");
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || "U")}&background=10B981&color=fff`;
                }}
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0F172A] rounded-full" />
            </div>

            <h3 className="mt-4 font-semibold text-base tracking-wide max-w-full truncate px-2">
              {user?.fullName || "User Account"}
            </h3>

            <p className="text-xs font-medium text-emerald-400 mt-0.5 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              {role || "Student"}
            </p>
          </div>
        </div>

        {/* MODERN SEARCH BAR INTEGRATION */}
        <div className="px-4 pt-4 pb-2 shrink-0 bg-[#0F172A]">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <HiOutlineSearch className="h-4 w-4 text-slate-400 group-focus-within:text-[#10B981] transition-colors duration-200" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Quick navigation search..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800/40 hover:bg-slate-800/60 focus:bg-slate-900 border border-slate-700/50 focus:border-[#10B981] text-slate-200 placeholder-slate-400 rounded-xl text-xs outline-none transition-all duration-200 focus:ring-4 focus:ring-emerald-500/5"
            />
          </div>
        </div>

        {/* SECTION 2: SCROLLABLE CORE CONTAINER */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
          <nav className="space-y-1.5">
            {filteredMenus.map((menu) => {
              const Icon = menu.icon;
              return (
                <NavLink
                  key={menu.name}
                  to={menu.path}
                  end
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 group ${
                      isActive
                        ? "bg-[#10B981] text-white shadow-lg shadow-emerald-900/20 font-semibold"
                        : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                    }`
                  }
                >
                  <Icon className="text-xl transition-transform duration-200 group-hover:scale-110" />
                  <span>{menu.name}</span>
                </NavLink>
              );
            })}

            {filteredMenus.length === 0 && (
              <p className="text-xs text-slate-500 text-center py-4">
                No matching menu items found.
              </p>
            )}
          </nav>

          {role !== "admin" && (
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-[#10B981]/10 to-[#059669]/5 border border-emerald-500/10">
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#10B981]">
                Masdar Skills
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Learn practical skills and build your future with professional
                courses.
              </p>
            </div>
          )}
        </div>

        {/* SECTION 3: FIXED UTILITY CONTROL BAR AT THE BOTTOM */}
        <div className="p-4 border-t border-slate-800/80 bg-[#0B1222] shrink-0 space-y-2">
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3.5 px-4 py-2.5 w-full rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800/60 hover:text-white transition-all duration-150"
          >
            <HiOutlineGlobeAlt className="text-xl text-slate-400" />
            <span>Back to Home</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 px-4 py-2.5 w-full rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-150"
          >
            <HiOutlineLogout className="text-xl" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 9999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </>
  );
};

export default DashboardSidebar;
