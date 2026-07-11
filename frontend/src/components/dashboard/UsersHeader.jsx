import { HiOutlineUsers } from "react-icons/hi";

const UsersHeader = ({ totalUsers }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] flex items-center gap-3">
            <HiOutlineUsers className="text-[#10B981]" />
            Users Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage all registered users in the system.
          </p>
        </div>

        <div className="bg-emerald-50 px-5 py-3 rounded-2xl">
          <p className="text-sm text-slate-500">Total Users</p>

          <h3 className="text-2xl font-bold text-[#10B981]">{totalUsers}</h3>
        </div>
      </div>
    </div>
  );
};

export default UsersHeader;
