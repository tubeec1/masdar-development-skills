import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourses,
  changeCourseStatus,
  deleteCourse,
  getDashboardCounts,
  resetCourseState,
} from "../../../features/course/courseSlice";

import {
  HiOutlineBookOpen,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineSearch,
  HiOutlineX,
} from "react-icons/hi";

export default function AdminCoursesPage() {
  const dispatch = useDispatch();
  const { courses, statistics, loading, error, message } = useSelector(
    (state) => state.course,
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getDashboardCounts());
  }, [dispatch]);

  // Handle status toggle
  const handleToggleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === "Published" ? "Draft" : "Published";
    dispatch(changeCourseStatus({ id, status: nextStatus })).then(() => {
      dispatch(getDashboardCounts());
      dispatch(getCourses());
    });
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to permanently delete this course?")
    ) {
      dispatch(deleteCourse(id)).then(() => {
        dispatch(getDashboardCounts());
        dispatch(getCourses());
      });
    }
  };

  const filteredCourses = (courses || []).filter(
    (c) =>
      c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.teacherName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="h-[100vh] bg-white p-6 flex flex-col overflow-y-auto relative">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            System Course Framework
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Manage and monitor platform-wide educational content.
          </p>
        </div>
      </div>

      {/* DASHBOARD STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Courses", val: statistics?.totalCourses },
          { label: "Published", val: statistics?.publishedCourses },
          { label: "Drafts", val: statistics?.draftCourses },
          { label: "Archived", val: statistics?.archivedCourses },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-slate-50/70 border border-slate-100 p-4 rounded-xl flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <HiOutlineBookOpen className="text-lg" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">
                {stat.label}
              </p>
              <p className="text-base font-black text-slate-800">
                {stat.val || 0}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH BAR */}
      <div className="flex justify-end border-b border-slate-200 gap-4 mb-4 pb-4">
        <div className="relative w-full sm:w-64">
          <HiOutlineSearch className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="flex-1 overflow-x-auto border border-slate-100 rounded-2xl bg-white shadow-sm">
        {loading ? (
          <div className="py-20 text-center text-xs font-bold text-slate-400">
            Loading courses...
          </div>
        ) : (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase font-bold text-[10px]">
                <th className="p-3 pl-5">Course Title</th>
                <th className="p-3">Instructor</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 font-semibold">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/30">
                  <td className="p-3 pl-5 font-bold text-slate-900">
                    {course.title}
                  </td>
                  <td className="p-3 text-slate-400 font-normal">
                    {course.teacherName}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() =>
                        handleToggleStatus(course.id, course.status)
                      }
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${
                        course.status === "Published"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-slate-50 text-slate-400 border-slate-200"
                      }`}
                    >
                      {course.status === "Published" ? (
                        <HiOutlineCheckCircle />
                      ) : (
                        <HiOutlineXCircle />
                      )}
                      {course.status}
                    </button>
                  </td>
                  <td className="p-3 text-right pr-6">
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                    >
                      <HiOutlineTrash className="text-sm" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
