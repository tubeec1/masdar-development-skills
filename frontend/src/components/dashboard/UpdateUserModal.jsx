import { HiOutlineX } from "react-icons/hi";

const UpdateUserModal = ({
  open,
  setOpen,
  formData,
  handleChange,
  handleSubmit,
  loading,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-[#0F172A]">Update User</h2>

          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
          >
            <HiOutlineX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="Male">Male</option>

                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Nationality
              </label>

              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Country</label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Role</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="admin">Admin</option>

                <option value="teacher">Teacher</option>

                <option value="student">Student</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Status</label>

              <select
                name="isActive"
                value={formData.isActive}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value={1}>Active</option>

                <option value={0}>Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-5 py-3 border rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-[#10B981] text-white font-semibold"
            >
              {loading ? "Updating..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
