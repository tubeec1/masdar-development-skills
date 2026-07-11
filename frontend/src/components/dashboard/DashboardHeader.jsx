import { useEffect, useRef, useState } from "react";
import {
  HiChevronDown,
  HiMenu,
  HiOutlineLogout,
  HiOutlineUser,
} from "react-icons/hi";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const DashboardHeader = ({ setSidebarOpen }) => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");

    dispatch(logout());

    navigate("/signin");
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 h-20 bg-white border-b border-slate-200 shadow-sm">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center"
          >
            <HiMenu className="text-xl text-[#0F172A]" />
          </button>

          {/* Logo */}
          <h1 className="text-lg sm:text-xl font-extrabold text-[#0F172A]">
            Masdar <span className="text-[#10B981]">Skills Development</span>
          </h1>
        </div>

        {/* RIGHT */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-3"
          >
            <img
              src={`http://localhost:5000/public/${user?.profileImage}`}
              alt={user?.fullName}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border-2 border-[#10B981] shadow-md"
            />

            <div className="hidden md:block text-left">
              <h4 className="font-semibold text-[#0F172A] text-sm">
                {user?.fullName}
              </h4>

              <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
            </div>

            <HiChevronDown
              className={`text-slate-500 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              {/* User Info */}
              <div className="p-4 border-b border-slate-100">
                <h4 className="font-semibold text-[#0F172A]">
                  {user?.fullName}
                </h4>

                <p className="text-sm text-slate-500 truncate">{user?.email}</p>

                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-emerald-50 text-[#10B981] text-xs font-medium capitalize">
                  {user?.role}
                </span>
              </div>

              {/* Profile */}
              <Link
                to="/dashboard/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition"
              >
                <HiOutlineUser className="text-lg text-[#10B981]" />

                <span className="text-slate-700">Profile</span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-500 transition"
              >
                <HiOutlineLogout className="text-lg" />

                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
