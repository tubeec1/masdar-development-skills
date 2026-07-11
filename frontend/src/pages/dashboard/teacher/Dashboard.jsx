import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeacherDashboard,
  selectTeacherStats,
} from "../../../features/dashboard/dashboardSlice";
import {
  HiOutlineBookOpen,
  HiOutlineFolderOpen,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineCash,
} from "react-icons/hi";

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  const stats = useSelector(selectTeacherStats);
  const { loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getTeacherDashboard());
  }, [dispatch]);

  // Log to debug why data might show 0
  useEffect(() => {
    if (stats) console.log("Teacher Stats Loaded:", stats);
  }, [stats]);

  if (loading)
    return (
      <div className="p-10 text-center font-bold text-slate-400">
        Loading Dashboard...
      </div>
    );
  if (error)
    return (
      <div className="p-10 text-rose-600 text-center font-bold">{error}</div>
    );

  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
    amber: "bg-amber-50 text-amber-600",
  };

  const metrics = [
    {
      title: "Total Courses",
      val: stats?.totalCourses,
      icon: <HiOutlineBookOpen />,
      color: "blue",
    },
    {
      title: "Total Modules",
      val: stats?.totalModules,
      icon: <HiOutlineFolderOpen />,
      color: "emerald",
    },
    {
      title: "Total Lessons",
      val: stats?.totalLessons,
      icon: <HiOutlineDocumentText />,
      color: "purple",
    },
    {
      title: "Total Students",
      val: stats?.totalStudents,
      icon: <HiOutlineUserGroup />,
      color: "amber",
    },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-black text-slate-900 mb-6">
        Instructor Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-start"
          >
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-400">
                {item.title}
              </p>
              <h2 className="text-3xl font-black text-slate-900 mt-1">
                {item.val ?? 0}
              </h2>
            </div>
            <div className={`p-3 rounded-xl ${colorMap[item.color]}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 p-8 rounded-2xl text-white max-w-sm">
        <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">
          Pending Earnings
        </p>
        <h2 className="text-4xl font-black">${stats?.pendingPayments ?? 0}</h2>
      </div>
    </div>
  );
};

export default TeacherDashboard;
