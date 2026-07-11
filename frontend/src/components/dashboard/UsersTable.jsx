import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import toast from "react-hot-toast";

const UsersTable = ({ onView, onEdit }) => {
  const { token, user } = useSelector((state) => state.auth);

  const role = user?.role;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/users/read", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setUsers(data.users || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        getUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  const handleStatusChange = async (userData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/update/${userData.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: userData.fullName,
            email: userData.email,
            gender: userData.gender,
            nationality: userData.nationality,
            country: userData.country,
            role: userData.role,
            isActive: userData.isActive ? 0 : 1,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success("User status updated");
        getUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Status update failed");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 text-center">
        Loading users...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0F172A]">System Users</h2>

        <p className="text-slate-500 mt-1">Manage registered users.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                User
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Gender
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Nationality
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Country
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Role
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Status
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Created
              </th>

              <th className="text-center px-6 py-4 text-sm font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((userItem) => (
              <tr
                key={userItem.id}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:5000/public/${userItem.profileImage}`}
                      alt={userItem.fullName}
                      className="w-14 h-14 rounded-full object-cover border"
                    />

                    <div>
                      <h3 className="font-semibold text-[#0F172A]">
                        {userItem.fullName}
                      </h3>

                      <p className="text-sm text-slate-500">{userItem.email}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-slate-600">{userItem.gender}</td>

                <td className="px-6 py-4 text-slate-600">
                  {userItem.nationality}
                </td>

                <td className="px-6 py-4 text-slate-600">{userItem.country}</td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                    {userItem.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => handleStatusChange(userItem)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      userItem.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {userItem.isActive ? "Active" : "Inactive"}
                  </button>
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {new Date(userItem.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView(userItem)}
                      className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      <HiOutlineEye className="mx-auto text-lg" />
                    </button>

                    <button
                      onClick={() => onEdit(userItem)}
                      className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                    >
                      <HiOutlinePencil className="mx-auto text-lg" />
                    </button>

                    {role === "admin" && (
                      <button
                        onClick={() => handleDelete(userItem.id)}
                        className="w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <HiOutlineTrash className="mx-auto text-lg" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-10 text-slate-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <p className="text-sm text-slate-500">Showing {users.length} users</p>
      </div>
    </div>
  );
};

export default UsersTable;
