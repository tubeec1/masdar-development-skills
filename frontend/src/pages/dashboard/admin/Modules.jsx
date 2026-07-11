import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getModules,
  getModuleDashboardCounts,
} from "../../../features/module/moduleSlice";
import { HiOutlineLibrary, HiOutlineChartBar } from "react-icons/hi";

export default function AdminModulesPage() {
  const dispatch = useDispatch();
  const { modules, dashboardStatistics, loading } = useSelector(
    (state) => state.module,
  );

  useEffect(() => {
    dispatch(getModules());
    dispatch(getModuleDashboardCounts());
  }, [dispatch]);

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header & Stats */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Module Administration
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Overview of all course modules across the platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-emerald-800 text-xs font-bold uppercase">
                Total Modules
              </p>
              <h2 className="text-3xl font-black text-emerald-900">
                {dashboardStatistics?.totalModules || 0}
              </h2>
            </div>
            <HiOutlineChartBar className="text-4xl text-emerald-600 opacity-50" />
          </div>
        </div>
      </div>

      {/* Modules Table */}
      <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 font-bold">
            <tr>
              <th className="p-4">Module Title</th>
              <th className="p-4">Parent Course</th>
              <th className="p-4">Instructor</th>
              <th className="p-4">Order</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-400">
                  Loading system modules...
                </td>
              </tr>
            ) : (
              modules.map((mod) => (
                <tr key={mod.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-semibold text-slate-900">
                    {mod.title}
                  </td>
                  <td className="p-4 text-slate-600">{mod.courseTitle}</td>
                  <td className="p-4 text-slate-600">{mod.teacherName}</td>
                  <td className="p-4">
                    <span className="bg-slate-100 px-2 py-1 rounded-lg font-bold text-slate-700">
                      {mod.moduleOrder}
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
