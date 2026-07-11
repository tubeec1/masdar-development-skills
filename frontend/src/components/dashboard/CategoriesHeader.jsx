import { HiPlus } from "react-icons/hi";

const CategoriesHeader = ({ setOpenModal, resetForm }) => {
  const handleCreate = () => {
    resetForm();
    setOpenModal(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">
            Categories Management
          </h1>

          <p className="text-slate-500 mt-2">
            Organize your learning content using categories.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-white font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <HiPlus className="text-lg" />
          Create Category
        </button>
      </div>
    </div>
  );
};

export default CategoriesHeader;
