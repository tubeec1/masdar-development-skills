import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  readEnrollments,
  dashboardCounts,
} from "../../../features/enrollment/enrollmentSlice";
import {
  HiOutlineUsers,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
} from "react-icons/hi";

export default function AdminEnrollmentsPage() {
  const dispatch = useDispatch();
  const { enrollments, statistics, loading } = useSelector(
    (state) => state.enrollment,
  );

  useEffect(() => {
    dispatch(readEnrollments());
    dispatch(dashboardCounts());
  }, [dispatch]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-extrabold text-slate-900">
        Enrollment Overview
      </h1>
      <p className="text-sm text-slate-500 mb-6">
        Monitoring student registration and system-wide growth.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total"
          count={statistics?.totalEnrollments}
          color="text-slate-600"
        />
        <StatCard
          title="Approved"
          count={statistics?.approvedEnrollments}
          color="text-emerald-600"
        />
        <StatCard
          title="Pending"
          count={statistics?.pendingEnrollments}
          color="text-amber-600"
        />
        <StatCard
          title="Rejected/Cancelled"
          count={
            statistics?.rejectedEnrollments + statistics?.cancelledEnrollments
          }
          color="text-rose-600"
        />
      </div>

      {/* Enrollment Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px]">
            <tr>
              <th className="p-4">Student</th>
              <th className="p-4">Course</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="4" className="p-8 text-center">
                  Loading enrollments...
                </td>
              </tr>
            ) : (
              enrollments.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="font-semibold">{e.studentName}</div>
                    <div className="text-slate-400 text-[10px]">
                      {e.studentEmail}
                    </div>
                  </td>
                  <td className="p-4 font-medium">{e.courseTitle}</td>
                  <td className="p-4 text-slate-600">
                    {new Date(e.enrolledAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={e.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, count, color }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <p className="text-[10px] uppercase font-bold text-slate-400">{title}</p>
      <h3 className={`text-2xl font-black ${color}`}>{count || 0}</h3>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Approved: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
    Rejected: "bg-rose-100 text-rose-700",
    Cancelled: "bg-slate-100 text-slate-600",
  };
  return (
    <span
      className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${styles[status]}`}
    >
      {status}
    </span>
  );
}
