import { Link } from "react-router-dom";
import { HiAcademicCap, HiClock, HiUser, HiArrowRight } from "react-icons/hi";

const CourseCard = ({ course }) => {
  return (
    <article className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <div className="relative overflow-hidden h-56">
        <img
          src={`http://localhost:5000/public/courses/${course.thumbnail}`}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute top-4 left-4">
          <span className="bg-[#10B981] text-white text-xs font-semibold px-3 py-1 rounded-full">
            {course.categoryName || "Course"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-[#0F172A] line-clamp-2 mb-3">
          {course.title}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-5">
          {course.description}
        </p>

        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <HiUser className="text-[#10B981]" />
            <span>
              {course.teacherName || course.instructor || "Instructor"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <HiClock className="text-[#10B981]" />
            <span>{course.duration || "Self Paced"}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <HiAcademicCap className="text-[#10B981]" />
            <span>Certificate Included</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-400">Course Fee</p>

            <h4 className="text-2xl font-extrabold text-[#10B981]">
              ${course.price || 0}
            </h4>
          </div>

          <Link
            to={`/courses/${course.id || course._id}`}
            className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300"
          >
            Details
            <HiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
