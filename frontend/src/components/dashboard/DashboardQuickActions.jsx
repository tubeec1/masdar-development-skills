import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  HiOutlineBookOpen,
  HiOutlineCollection,
  HiOutlineUsers,
  HiOutlineAcademicCap,
  HiOutlinePlusCircle,
  HiOutlineUser,
} from "react-icons/hi";

const DashboardQuickActions = () => {
  const { user } = useSelector((state) => state.auth);

  const role = user?.role;

  const adminActions = [
    {
      title: "Create Course",
      icon: HiOutlinePlusCircle,
      link: "/dashboard/courses",
    },
    {
      title: "Manage Categories",
      icon: HiOutlineCollection,
      link: "/dashboard/categories",
    },
    {
      title: "Manage Users",
      icon: HiOutlineUsers,
      link: "/dashboard/users",
    },
    {
      title: "Manage Enrollments",
      icon: HiOutlineAcademicCap,
      link: "/dashboard/enrollments",
    },
  ];

  const teacherActions = [
    {
      title: "Create Course",
      icon: HiOutlinePlusCircle,
      link: "/dashboard/courses",
    },
    {
      title: "My Courses",
      icon: HiOutlineBookOpen,
      link: "/dashboard/courses",
    },
    {
      title: "My Profile",
      icon: HiOutlineUser,
      link: "/dashboard/profile",
    },
  ];

  const studentActions = [
    {
      title: "Browse Courses",
      icon: HiOutlineBookOpen,
      link: "/courses",
    },
    {
      title: "My Courses",
      icon: HiOutlineAcademicCap,
      link: "/dashboard/courses",
    },
    {
      title: "My Enrollments",
      icon: HiOutlineCollection,
      link: "/dashboard/enrollments",
    },
    {
      title: "My Profile",
      icon: HiOutlineUser,
      link: "/dashboard/profile",
    },
  ];

  let actions = [];

  if (role === "admin") {
    actions = adminActions;
  } else if (role === "teacher") {
    actions = teacherActions;
  } else {
    actions = studentActions;
  }

  return (
    <section>
      {/* Header */}
      <div className="mb-6">
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-[#10B981]">
          Quick Actions
        </span>

        <h2 className="mt-4 text-3xl font-bold text-[#0F172A]">
          Frequently Used Actions
        </h2>

        <p className="mt-2 text-slate-500">
          Access important features and manage your learning activities quickly.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.link}
              className="group bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5 group-hover:bg-[#10B981] transition">
                <Icon
                  size={28}
                  className="text-[#10B981] group-hover:text-white transition"
                />
              </div>

              <h3 className="text-lg font-bold text-[#0F172A]">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Click to access {action.title.toLowerCase()}.
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardQuickActions;
