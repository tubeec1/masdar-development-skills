import { HiOutlinePhotograph, HiOutlineX } from "react-icons/hi";

const CreateCategoryModal = ({
  open,
  setOpen,
  formData,
  handleChange,
  handleFileChange,
  handleSubmit,
  loading,
  isEditMode,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-200 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">
              {isEditMode ? "Update Category" : "Create Category"}
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              {isEditMode
                ? "Update category information."
                : "Add a new category to organize courses."}
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
          >
            <HiOutlineX className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Category Name
            </label>

            <input
              type="text"
              name="name"
              value={formData?.name || ""}
              onChange={handleChange}
              placeholder="Programming"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData?.description || ""}
              onChange={handleChange}
              placeholder="Write category description..."
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-[#10B981] outline-none"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Thumbnail
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />

            {formData?.thumbnail && (
              <div className="mt-4">
                <div className="w-40 h-28 rounded-xl overflow-hidden border border-slate-200">
                  <img
                    src={URL.createObjectURL(formData.thumbnail)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {!formData?.thumbnail && (
              <div className="mt-4 flex items-center gap-2 text-slate-400 text-sm">
                <HiOutlinePhotograph />
                No image selected
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-5 border-t">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-[#10B981] text-white font-semibold hover:bg-emerald-600 transition disabled:opacity-50"
            >
              {loading
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                  ? "Update Category"
                  : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
