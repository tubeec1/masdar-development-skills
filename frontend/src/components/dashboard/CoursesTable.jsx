import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import toast from "react-hot-toast";

const CoursesTable = () => {
  const { user, token } = useSelector((state) => state.auth);

  const role = user?.role;

  const canManage = role === "admin" || role === "teacher";

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCourses = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/courses/read");

      const data = await response.json();

      if (response.ok && data.success) {
        setCourses(data.courses || []);
      } else {
        toast.error(data.message || "Failed to load courses");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || "Course deleted successfully");

        setCourses((prev) =>
          prev.filter((course) => (course.id || course._id) !== id),
        );
      } else {
        toast.error(data.message || "Failed to delete course");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0F172A]">
          {role === "admin"
            ? "All Courses"
            : role === "teacher"
              ? "My Courses"
              : "Available Courses"}
        </h2>

        <p className="text-slate-500 mt-1">
          Manage and track course information.
        </p>
      </div>

      {loading ? (
        <div className="p-10 text-center text-slate-500">
          Loading courses...
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Course
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Category
                  </th>

                  {role !== "teacher" && (
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Teacher
                    </th>
                  )}

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Students
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Duration
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Level
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Price
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Status
                  </th>

                  {canManage && (
                    <th className="text-center px-6 py-4 text-sm font-semibold text-slate-600">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {courses.map((course) => (
                  <tr
                    key={course.id || course._id}
                    className="border-t border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={`http://localhost:5000/public/courses/${course.thumbnail}`}
                          alt={course.title}
                          className="w-16 h-16 rounded-xl object-cover"
                        />

                        <div>
                          <h3 className="font-semibold text-[#0F172A]">
                            {course.title}
                          </h3>

                          <p className="text-sm text-slate-500">
                            Course ID #{course.id || course._id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {course.categoryName}
                    </td>

                    {role !== "teacher" && (
                      <td className="px-6 py-4 text-slate-600">
                        {course.teacherName}
                      </td>
                    )}

                    <td className="px-6 py-4 text-slate-600">
                      {course.totalStudents}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {course.duration}
                    </td>

                    <td className="px-6 py-4 text-slate-600">{course.level}</td>

                    <td className="px-6 py-4 font-semibold text-[#10B981]">
                      ${course.price}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          course.status?.toLowerCase() === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>

                    {canManage && (
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                          >
                            <HiOutlineEye className="mx-auto text-lg" />
                          </button>

                          <button
                            type="button"
                            className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
                          >
                            <HiOutlinePencil className="mx-auto text-lg" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(course.id || course._id)
                            }
                            className="w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                          >
                            <HiOutlineTrash className="mx-auto text-lg" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}

                {courses.length === 0 && (
                  <tr>
                    <td
                      colSpan={canManage ? 9 : 8}
                      className="text-center py-10 text-slate-500"
                    >
                      No courses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <p className="text-sm text-slate-500">
              Showing {courses.length} courses
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesTable;
