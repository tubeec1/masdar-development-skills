import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { readMyCourses } from "../../features/student/studentSlice";

const MyCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, loading } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(readMyCourses());
  }, [dispatch]);

  if (loading)
    return <div className="p-20 text-center">Loading your courses...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
            My Courses
          </div>
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">
            Continue Your <span className="text-[#10B981]">Journey</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Your enrolled courses are ready for you. Access your curriculum,
            review your module progress, and keep building your expertise.
          </p>
        </header>

        {courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border">
            <p className="text-slate-500">
              You are not enrolled in any courses yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col"
              >
                <img
                  src={`http://localhost:5000/${course.thumbnail}`}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex-1">
                  <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    {course.categoryName}
                  </p>
                  <button
                    onClick={() => navigate(`/my-course/${course.slug}`)}
                    className="w-full py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Watch Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
