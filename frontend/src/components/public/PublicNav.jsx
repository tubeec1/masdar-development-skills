import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import {
  MdDashboard,
  MdLogout,
  MdPerson,
  MdLibraryBooks,
  MdPayments,
  MdBookmark,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Contact", to: "/contact" },
];

const ProfileDropdown = ({ user, onClose, onLogout }) => {
  const role = user?.role;
  const isStudent = role === "student";

  const links = [
    ...(isStudent
      ? [
          { label: "My Courses", to: "/my-courses", icon: MdLibraryBooks },
          { label: "My Enrollments", to: "/my-enrollments", icon: MdBookmark },
          { label: "My Payments", to: "/my-payments", icon: MdPayments },
        ]
      : [{ label: "Dashboard", to: "/dashboard", icon: MdDashboard }]),
    { label: "My Profile", to: "/my-profile", icon: MdPerson },
  ];

  return (
    <div className="absolute right-0 top-[calc(100%+10px)] w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-dropdown">
      <div className="px-4 py-3.5 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-emerald-50">
        <p className="text-sm font-semibold text-[#0F172A] truncate">
          {user?.fullName}
        </p>
        <p className="text-xs text-[#6B7280] truncate">{user?.email}</p>
      </div>
      <div className="py-1.5">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#0F172A] hover:bg-emerald-50 hover:text-[#10B981] transition-colors"
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </NavLink>
        ))}
        <div className="mx-3 my-1 border-t border-gray-100" />
        <button
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          <MdLogout className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </div>
  );
};

const PublicNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    setMenuOpen(false);
    setProfileOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all ${scrolled ? "py-2 shadow-md" : "py-4 shadow-sm"}`}
    >
      <style>{`.animate-dropdown { animation: dropdownIn 0.18s ease-out forwards; } @keyframes dropdownIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-bold">
          Masdar <span className="text-[#10B981]">E-Learning</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? "text-[#10B981]" : "text-[#0F172A]"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-500"
              >
                <img
                  src={
                    user?.profileImage
                      ? `http://localhost:5000/${user.profileImage}`
                      : `https://ui-avatars.com/api/?name=${user?.fullName}`
                  }
                  alt="Profile"
                />
              </button>
              {profileOpen && (
                <ProfileDropdown
                  user={user}
                  onClose={() => setProfileOpen(false)}
                  onLogout={handleLogout}
                />
              )}
            </div>
          ) : (
            <>
              <NavLink
                to="/signin"
                className="px-4 py-2 text-sm border rounded-lg"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className="px-4 py-2 text-sm bg-[#10B981] text-white rounded-lg"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white overflow-hidden transition-all ${menuOpen ? "max-h-screen" : "max-h-0"}`}
      >
        <nav className="px-4 py-4 space-y-2">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className="block py-2"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          {isLoggedIn ? (
            <div className="pt-4 border-t">
              <p className="font-bold">{user.fullName}</p>
              <button onClick={handleLogout} className="text-red-500 py-2">
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex gap-2 pt-4">
              <NavLink
                to="/signin"
                className="flex-1 text-center py-2 border rounded-lg"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className="flex-1 text-center py-2 bg-[#10B981] text-white rounded-lg"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default PublicNav;
