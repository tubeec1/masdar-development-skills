import { HiOutlineX } from "react-icons/hi";

const ViewUserModal = ({ open, setOpen, selectedUser }) => {
  if (!open || !selectedUser) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-[#0F172A]">User Details</h2>

          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
          >
            <HiOutlineX />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <img
              src={`http://localhost:5000/public/${selectedUser.profileImage}`}
              alt={selectedUser.fullName}
              className="w-28 h-28 rounded-full object-cover border-4 border-emerald-100"
            />

            <h3 className="mt-4 text-xl font-bold text-[#0F172A]">
              {selectedUser.fullName}
            </h3>

            <span className="mt-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
              {selectedUser.role}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-slate-500">Email</label>

              <p className="font-medium">{selectedUser.email}</p>
            </div>

            <div>
              <label className="text-sm text-slate-500">Gender</label>

              <p className="font-medium">{selectedUser.gender}</p>
            </div>

            <div>
              <label className="text-sm text-slate-500">Nationality</label>

              <p className="font-medium">{selectedUser.nationality}</p>
            </div>

            <div>
              <label className="text-sm text-slate-500">Country</label>

              <p className="font-medium">{selectedUser.country}</p>
            </div>

            <div>
              <label className="text-sm text-slate-500">Role</label>

              <p className="font-medium">{selectedUser.role}</p>
            </div>

            <div>
              <label className="text-sm text-slate-500">Status</label>

              <p className="font-medium">
                {selectedUser.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
