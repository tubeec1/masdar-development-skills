import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPublishedCourses } from "../../features/course/courseSlice";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { MdLanguage, MdSignalCellularAlt } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";

const LEVEL_STYLES = {
  Beginner: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100",
  },
  Intermediate: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-100",
  },
  Advanced: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-100",
  },
  "All Levels": {
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-200",
  },
};

const TeacherAvatar = ({ name, image }) => {
  const initials = (name || "IN")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold overflow-hidden bg-slate-800">
      {image ? (
        <img
          src={`http://localhost:5000/${image}`}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
};

const CourseCard = ({ course }) => {
  const levelStyle = LEVEL_STYLES[course.level] || LEVEL_STYLES["All Levels"];

  return (
    <Link
      to={`/course-details/${course.slug}`}
      className="flex items-center gap-1 text-sm font-bold text-[#10B981] hover:underline"
    >
      <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-[200px] overflow-hidden">
          <img
            src={`http://localhost:5000/${course.thumbnail}`}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold text-white bg-[#10B981] shadow-lg">
              {course.categoryName}
            </span>
          </div>
        </div>

        <div className="flex flex-col p-5 gap-3 flex-1">
          <h3 className="font-bold text-lg text-slate-900 leading-tight line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 flex-1">
            {course.description}
          </p>

          <div className="flex items-center gap-2 pt-2">
            <TeacherAvatar
              name={course.teacherName}
              image={course.teacherImage}
            />
            <span className="text-xs font-medium text-slate-700">
              {course.teacherName}
            </span>
          </div>

          <div className="border-t border-gray-100 my-2" />

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                <MdLanguage size={14} /> {course.language}
              </span>
              <span
                className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${levelStyle.text} ${levelStyle.bg}`}
              >
                <MdSignalCellularAlt size={12} /> {course.level}
              </span>
            </div>

            <Link
              to={`/course-details/${course.slug}`}
              className="flex items-center gap-1 text-sm font-bold text-[#10B981] hover:underline"
            >
              View <FiArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </article>
    </Link>
  );
};

const FeaturedCoursesSection = () => {
  const dispatch = useDispatch();
  const { publishedCourses, loading } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getPublishedCourses());
  }, [dispatch]);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
            Featured Courses
          </div>
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">
            Start Your{" "}
            <span className="text-[#10B981]">Professional Journey</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Choose from our expert-led programs designed to help you succeed in
            your career.
          </p>
        </header>

        {loading ? (
          <div className="text-center py-20 font-medium text-slate-400">
            Loading courses...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedCourses?.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-[#0F172A] text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto">
            View All Courses <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
