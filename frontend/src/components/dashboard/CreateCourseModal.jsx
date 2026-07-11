import { HiOutlineX } from "react-icons/hi";

const CreateCourseModal = ({
  open,
  setOpen,
  formData,
  handleChange,
  handleFileChange,
  handleSubmit,
  categories = [],
  loading,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">
              Create New Course
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Fill all required course information below.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
          >
            <HiOutlineX className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-medium">Category</label>

              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
                required
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option
                    key={category.id || category._id}
                    value={category.id || category._id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Course Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ultimate React Course"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Slug</label>

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="ultimate-react-course"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Duration</label>

              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="8 Weeks"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Language</label>

              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                placeholder="English"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Level</label>

              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
                required
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Price ($)
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="99"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Total Students
              </label>

              <input
                type="number"
                name="totalStudents"
                value={formData.totalStudents}
                onChange={handleChange}
                placeholder="500"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Intro Video URL
            </label>

            <input
              type="text"
              name="introVideo"
              value={formData.introVideo}
              onChange={handleChange}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#10B981] outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Course Thumbnail
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Description
            </label>

            <textarea
              rows="6"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write detailed course description..."
              className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-[#10B981] outline-none"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-5 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-[#10B981] text-white font-semibold hover:bg-emerald-600 transition disabled:opacity-70"
            >
              {loading ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseModal;
