import React from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Eye, Layers, Globe, Star } from "lucide-react";

export default function CourseTable({
  courses = [],
  loading,
  role = "teacher",
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleFeatured,
}) {
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status) {
      case "Published":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Draft":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Archived":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  if (loading) {
    return (
      <div className="w-full space-y-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-xs">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex gap-4 items-center animate-pulse py-2">
            <div className="w-12 h-9 bg-slate-100 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-slate-100 rounded w-1/3"></div>
              <div className="h-2 bg-slate-50 rounded w-1/4"></div>
            </div>
            <div className="w-16 h-6 bg-slate-50 rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-16 border border-slate-100 rounded-2xl bg-white shadow-xs">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          No structural course tracking instances found.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto border border-slate-100 rounded-2xl bg-white shadow-xs">
      <table className="w-full text-left text-xs border-collapse min-w-[900px]">
        <thead>
          <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
            <th className="p-4 pl-5">Course Structure</th>
            <th className="p-4">Category Directory</th>
            {role === "admin" && <th className="p-4">Assigned Instructor</th>}
            <th className="p-4">Pricing Matrix</th>
            <th className="p-4 text-center">Lifecycle Status</th>
            <th className="p-4 text-center">
              {role === "admin" ? "Featured State" : "Duration Vector"}
            </th>
            <th className="p-4 text-right pr-6">Central Pipeline Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 text-slate-600 font-semibold">
          {courses.map((course) => (
            <tr
              key={course._id || course.id}
              className="hover:bg-slate-50/20 transition-colors"
            >
              <td className="p-4 pl-5">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      course.thumbnail
                        ? `http://localhost:5000/${course.thumbnail}`
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt=""
                    className="w-12 h-9 rounded-lg object-cover border border-slate-200/80"
                  />
                  <div className="max-w-xs truncate">
                    <p className="font-bold text-slate-900 truncate">
                      {course.title}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-normal mt-0.5">
                      <Globe className="w-3 h-3" /> {course.language}
                    </span>
                  </div>
                </div>
              </td>

              <td className="p-4 text-slate-500 font-bold">
                {course.categoryId?.title || "General Matrix"}
              </td>

              {role === "admin" && (
                <td className="p-4 text-slate-700 font-medium">
                  {course.teacherId?.name || "System Faculty Member"}
                </td>
              )}

              <td className="p-4">
                <div className="flex flex-col">
                  <span className="text-slate-900 font-black">
                    ${course.price}
                  </span>
                  {course.discountPrice > 0 && (
                    <span className="text-[10px] text-rose-500 line-through font-normal">
                      ${course.discountPrice}
                    </span>
                  )}
                </div>
              </td>

              <td className="p-4 text-center">
                {role === "admin" ? (
                  <button
                    onClick={() =>
                      onToggleStatus(course._id || course.id, course.status)
                    }
                    className={`px-2.5 py-0.5 border rounded-full text-[9px] font-extrabold uppercase transition-all cursor-pointer ${getStatusStyle(course.status)}`}
                  >
                    {course.status}
                  </button>
                ) : (
                  <span
                    className={`px-2.5 py-0.5 border rounded-full text-[9px] font-extrabold uppercase ${getStatusStyle(course.status)}`}
                  >
                    {course.status}
                  </span>
                )}
              </td>

              <td className="p-4 text-center">
                {role === "admin" ? (
                  <button
                    onClick={() =>
                      onToggleFeatured(
                        course._id || course.id,
                        course.isFeatured,
                      )
                    }
                    className={`inline-flex items-center gap-1 px-2 py-0.5 border rounded-md text-[10px] font-bold cursor-pointer transition-all ${
                      course.isFeatured
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-slate-50 text-slate-400 border-slate-200"
                    }`}
                  >
                    <Star className="w-3 h-3 fill-current" />{" "}
                    {course.isFeatured ? "Yes" : "No"}
                  </button>
                ) : (
                  <span className="text-slate-400 font-medium text-[11px]">
                    {Math.floor((course.duration || 0) / 60)}m
                  </span>
                )}
              </td>

              <td className="p-4 text-right pr-6 whitespace-nowrap">
                <div className="inline-flex gap-1.5">
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/${role}/modules?courseId=${course._id || course.id}`,
                      )
                    }
                    className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg border border-transparent hover:border-purple-100 transition-all flex items-center gap-1 font-bold text-[10px] uppercase tracking-wider cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" /> Modules
                  </button>
                  {role === "teacher" && (
                    <>
                      <button
                        onClick={() => onEdit(course)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-lg cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(course._id || course.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
