import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDashboard } from "../../../features/dashboard/dashboardSlice";
import {
  HiOutlineUsers,
  HiOutlineCollection,
  HiOutlineBookOpen,
  HiOutlineFolderOpen,
  HiOutlineAcademicCap,
  HiOutlineCash,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
} from "react-icons/hi";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    adminStatistics: stats,
    loading,
    error,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getAdminDashboard());
  }, [dispatch]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400">
        Loading Analytics...
      </div>
    );
  if (error)
    return (
      <div className="p-10 text-rose-600 font-bold text-center">{error}</div>
    );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900">System Dashboard</h1>
        <p className="text-slate-400 text-sm">
          Overview of system health, platform metrics, and financial status.
        </p>
      </div>

      {/* Primary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats?.users?.total}
          icon={<HiOutlineUsers />}
          color="blue"
        >
          <div className="grid grid-cols-3 gap-2 text-center border-t pt-3 mt-3 text-[10px] font-bold uppercase text-slate-400">
            <div>
              Admins
              <p className="text-slate-700">{stats?.users?.admins || 0}</p>
            </div>
            <div>
              Teachers
              <p className="text-slate-700">{stats?.users?.teachers || 0}</p>
            </div>
            <div>
              Students
              <p className="text-emerald-600">{stats?.users?.students || 0}</p>
            </div>
          </div>
        </StatCard>

        <StatCard
          title="Active Courses"
          value={stats?.courses?.total}
          icon={<HiOutlineBookOpen />}
          color="emerald"
        >
          <div className="grid grid-cols-4 gap-1 text-center border-t pt-3 mt-3 text-[9px] font-bold uppercase text-slate-400">
            <div>
              Pub
              <p className="text-emerald-600">
                {stats?.courses?.published || 0}
              </p>
            </div>
            <div>
              Draft
              <p className="text-amber-500">{stats?.courses?.draft || 0}</p>
            </div>
            <div>
              Free<p className="text-slate-600">{stats?.courses?.free || 0}</p>
            </div>
            <div>
              Paid<p className="text-blue-600">{stats?.courses?.paid || 0}</p>
            </div>
          </div>
        </StatCard>

        <StatCard
          title="Total Enrollments"
          value={stats?.enrollments?.total}
          icon={<HiOutlineAcademicCap />}
          color="purple"
        >
          <div className="grid grid-cols-3 gap-2 text-center border-t pt-3 mt-3 text-[10px] font-bold uppercase text-slate-400">
            <div>
              Approved
              <p className="text-emerald-600">
                {stats?.enrollments?.approved || 0}
              </p>
            </div>
            <div>
              Pending
              <p className="text-amber-500">
                {stats?.enrollments?.pending || 0}
              </p>
            </div>
            <div>
              Rejected
              <p className="text-rose-500">
                {stats?.enrollments?.rejected || 0}
              </p>
            </div>
          </div>
        </StatCard>
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SmallCard
          title="Lessons"
          value={stats?.lessons?.total}
          icon={<HiOutlineDocumentText />}
        />
        <SmallCard
          title="Modules"
          value={stats?.modules?.total}
          icon={<HiOutlineFolderOpen />}
        />
        <SmallCard
          title="Categories"
          value={stats?.categories?.total}
          icon={<HiOutlineCollection />}
        />

        {/* Payments Summary Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm col-span-1 lg:row-span-2">
          <p className="text-[10px] font-bold uppercase text-slate-400 mb-4">
            Payment Status
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-bold text-emerald-600">
              <span className="flex items-center gap-2">
                <HiOutlineCheckCircle /> Verified
              </span>{" "}
              <span>{stats?.payments?.verified || 0}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold text-amber-500">
              <span className="flex items-center gap-2">
                <HiOutlineClock /> Pending
              </span>{" "}
              <span>{stats?.payments?.pending || 0}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold text-rose-500">
              <span className="flex items-center gap-2">
                <HiOutlineXCircle /> Rejected
              </span>{" "}
              <span>{stats?.payments?.rejected || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fixed StatCard for dynamic color classes
const StatCard = ({ title, value, icon, color, children }) => {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
            {title}
          </p>
          <h3 className="text-3xl font-black mt-1">{value || 0}</h3>
        </div>
        <div className={`p-3 rounded-xl ${colorMap[color]}`}>{icon}</div>
      </div>
      {children}
    </div>
  );
};

const SmallCard = ({ title, value, icon }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
    <div className="text-slate-400 text-xl">{icon}</div>
    <div>
      <p className="text-[10px] font-bold uppercase text-slate-400">{title}</p>
      <p className="text-lg font-black">{value || 0}</p>
    </div>
  </div>
);

export default Dashboard;
