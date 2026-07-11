import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLessons,
  getLessonDashboardCounts,
} from "../../../features/lesson/lessonSlice";
import { HiOutlinePlay, HiOutlineChartPie, HiOutlineTag } from "react-icons/hi";

export default function AdminLessonsPage() {
  const dispatch = useDispatch();
  const { lessons, dashboardStatistics, loading } = useSelector(
    (state) => state.lesson,
  );

  useEffect(() => {
    dispatch(getLessons());
    dispatch(getLessonDashboardCounts());
  }, [dispatch]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Lesson Administration
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Centralized management of all curriculum content.
        </p>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Lessons"
            count={dashboardStatistics?.totalLessons || 0}
            icon={<HiOutlinePlay />}
          />
          <StatCard
            title="Preview Lessons"
            count={dashboardStatistics?.previewLessons || 0}
            icon={<HiOutlineTag />}
          />
          <StatCard
            title="Paid Lessons"
            count={dashboardStatistics?.paidLessons || 0}
            icon={<HiOutlineChartPie />}
          />
        </div>
      </div>

      {/* Lesson List Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-700 font-bold border-b">
            <tr>
              <th className="p-4">Lesson Title</th>
              <th className="p-4">Module</th>
              <th className="p-4">Course</th>
              <th className="p-4 text-center">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-emerald-600">
                  Loading lessons...
                </td>
              </tr>
            ) : (
              lessons.map((lesson) => (
                <tr key={lesson.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-medium text-slate-900">
                    {lesson.title}
                  </td>
                  <td className="p-4 text-slate-600">{lesson.moduleTitle}</td>
                  <td className="p-4 text-slate-600">{lesson.courseTitle}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${lesson.isPreview ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                    >
                      {lesson.isPreview ? "Preview" : "Locked"}
                    </span>
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

// Helper Card Component
function StatCard({ title, count, icon }) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl flex items-center justify-between shadow-sm">
      <div>
        <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">
          {title}
        </p>
        <h2 className="text-3xl font-black text-slate-900">{count}</h2>
      </div>
      <div className="text-2xl text-emerald-600 bg-emerald-50 p-3 rounded-xl">
        {icon}
      </div>
    </div>
  );
}
