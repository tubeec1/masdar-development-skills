import { HiPlus } from "react-icons/hi";
import { useSelector } from "react-redux";

const CoursesHeader = ({ setOpenModal }) => {
  const { user } = useSelector((state) => state.auth);

  const canCreate = user?.role === "admin" || user?.role === "teacher";

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">
            Courses Management
          </h1>

          <p className="text-slate-500 mt-2">
            Create, manage and organize your learning courses.
          </p>
        </div>

        {canCreate && (
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-white font-semibold transition-all duration-200 shadow-sm"
          >
            <HiPlus className="text-lg" />
            Create Course
          </button>
        )}
      </div>
    </div>
  );
};

export default CoursesHeader;
