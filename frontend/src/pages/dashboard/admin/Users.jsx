import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  readUsers,
  readStudents,
  readTeachers,
  readAdmins,
  getDashboardCounts,
  createTeacher,
  updateUser,
  deleteUser,
  changeUserStatus,
  clearUserState,
} from "../../../features/user/userSlice";

import {
  HiOutlineUsers,
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineSearch,
  HiOutlineX,
  HiOutlineCamera,
} from "react-icons/hi";

const Users = () => {
  const dispatch = useDispatch();

  const {
    users,
    students,
    teachers,
    admins,
    dashboardStatistics,
    loading,
    error,
    message,
  } = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // File System State Tracking Storage
  const [imageFile, setImageFile] = useState(null);

  // Form Field Inits
  const [teacherForm, setTeacherForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "Male",
    nationality: "",
    country: "",
  });

  const [editForm, setEditForm] = useState({
    fullName: "",
    phone: "",
    password: "",
    gender: "Male",
    nationality: "",
    country: "",
    role: "student",
    bio: "",
  });

  useEffect(() => {
    dispatch(getDashboardCounts());
    loadActiveTabDirectory(activeTab);
  }, [dispatch, activeTab]);

  useEffect(() => {
    if (message || error) {
      const promptTimer = setTimeout(() => dispatch(clearUserState()), 4000);
      return () => clearTimeout(promptTimer);
    }
  }, [message, error, dispatch]);

  const loadActiveTabDirectory = (currentTab) => {
    if (currentTab === "all") dispatch(readUsers());
    if (currentTab === "teachers") dispatch(readTeachers());
    if (currentTab === "students") dispatch(readStudents());
    if (currentTab === "admins") dispatch(readAdmins());
  };

  const executeStatusMutation = (id, currentStatus) => {
    dispatch(changeUserStatus({ id, isActive: !currentStatus })).then(() => {
      dispatch(getDashboardCounts());
    });
  };

  const executeRemovalSequence = (id) => {
    if (
      window.confirm("Are you sure you want to permanently delete this user?")
    ) {
      dispatch(deleteUser(id)).then(() => {
        dispatch(getDashboardCounts());
      });
    }
  };

  const handleTeacherCreation = (e) => {
    e.preventDefault();
    dispatch(createTeacher(teacherForm)).then((res) => {
      if (!res.error) {
        setIsCreateModalOpen(false);
        setTeacherForm({
          fullName: "",
          email: "",
          password: "",
          phone: "",
          gender: "Male",
          nationality: "",
          country: "",
        });
        dispatch(getDashboardCounts());
        loadActiveTabDirectory(activeTab);
      }
    });
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setImageFile(null); // Reset file selection inputs
    setEditForm({
      fullName: user.fullName || "",
      phone: user.phone || "",
      password: "", // Kept blank safely to pass your backend check
      gender: user.gender || "Male",
      nationality: user.nationality || "",
      country: user.country || "",
      role: user.role || "student",
      bio: user.bio || "",
    });
    setIsEditModalOpen(true);
  };

  const handleUserUpdateMutation = (e) => {
    e.preventDefault();

    // Map fields using the standard FormData constructor
    const multiPartForm = new FormData();
    multiPartForm.append("fullName", editForm.fullName);
    multiPartForm.append("phone", editForm.phone);
    multiPartForm.append("gender", editForm.gender);
    multiPartForm.append("nationality", editForm.nationality);
    multiPartForm.append("country", editForm.country);
    multiPartForm.append("role", editForm.role);
    multiPartForm.append("bio", editForm.bio);

    // Conditionally send your modified password string safely
    if (editForm.password.trim() !== "") {
      multiPartForm.append("password", editForm.password);
    }

    // Attach raw file streams if available
    if (imageFile) {
      multiPartForm.append("profileImage", imageFile);
    }

    dispatch(updateUser({ id: selectedUser.id, formData: multiPartForm })).then(
      (res) => {
        if (!res.error) {
          setIsEditModalOpen(false);
          dispatch(getDashboardCounts());
          loadActiveTabDirectory(activeTab);
        }
      },
    );
  };

  const resolveTargetPool = () => {
    if (activeTab === "teachers") return teachers;
    if (activeTab === "students") return students;
    if (activeTab === "admins") return admins;
    return users;
  };

  const filteredCollection = resolveTargetPool().filter(
    (person) =>
      person.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Determine toast configuration based on whether any form modal is open
  const isAnyModalOpen = isCreateModalOpen || isEditModalOpen;
  const toastClassNames = isAnyModalOpen
    ? "fixed top-4 right-4 z-[60] w-72 shadow-xl animate-fadeIn"
    : "mb-4 w-full";

  return (
    <div className="h-[100vh] bg-white p-6 flex flex-col overflow-y-auto relative">
      {/* DIRECTORY TITLE LAYOUT BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            System Core User Profiles
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Control, register, and update active system accounts across modules.
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
        >
          <HiOutlinePlus className="text-base" /> Register New Teacher
        </button>
      </div>

      {/* FEEDBACK TOAST NOTIFICATION CONTAINER DISPLAY */}
      {(message || error) && (
        <div className={toastClassNames}>
          {message && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold rounded-xl shadow-sm">
              {message}
            </div>
          )}
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold rounded-xl shadow-sm">
              {typeof error === "string"
                ? error
                : error.message || "An error occurred."}
            </div>
          )}
        </div>
      )}

      {/* REPOSITORY DASHBOARD CARDS DISPLAY */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
            <HiOutlineUsers className="text-lg" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Total Framework Base
            </p>
            <p className="text-base font-black text-slate-800">
              {dashboardStatistics?.totalUsers || 0}
            </p>
          </div>
        </div>
        <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
            <HiOutlineUserGroup className="text-lg" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Students Roster
            </p>
            <p className="text-base font-black text-slate-800">
              {dashboardStatistics?.totalStudents || 0}
            </p>
          </div>
        </div>
        <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-inner">
            <HiOutlineUserGroup className="text-lg" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Teachers Roster
            </p>
            <p className="text-base font-black text-slate-800">
              {dashboardStatistics?.totalTeachers || 0}
            </p>
          </div>
        </div>
        <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-inner">
            <HiOutlineShieldCheck className="text-lg" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Active Instances
            </p>
            <p className="text-base font-black text-slate-800">
              {dashboardStatistics?.activeUsers || 0}
            </p>
          </div>
        </div>
      </div>

      {/* FILTER SEARCH DIRECTORY CONSOLE */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 gap-4 mb-4">
        <div className="flex gap-2">
          {["all", "teachers", "students", "admins"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold capitalize border-b-2 transition-all ${activeTab === tab ? "border-emerald-600 text-emerald-600 font-extrabold" : "border-transparent text-slate-400 hover:text-slate-600"}`}
            >
              {tab === "all" ? "All Accounts" : tab}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64 mb-2">
          <HiOutlineSearch className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search accounts by name or email query..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:border-emerald-600 transition-colors"
          />
        </div>
      </div>

      {/* RECORDS DATAGRID DATA TABLE */}
      <div className="flex-1 overflow-x-auto border border-slate-100 rounded-2xl bg-white shadow-sm">
        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="w-7 h-7 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredCollection.length === 0 ? (
          <div className="text-center py-20 text-xs font-bold text-slate-400 tracking-wide">
            No directory database index entities matched your filter query.
          </div>
        ) : (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold text-[10px]">
                <th className="p-3 pl-5">Identity Profile Record</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Assigned Role</th>
                <th className="p-3">Country Matrix</th>
                <th className="p-3 text-center">Current Status</th>
                <th className="p-3 text-right pr-6">Data Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 font-semibold">
              {filteredCollection.map((person) => (
                <tr
                  key={person.id}
                  className="hover:bg-slate-50/30 transition-colors"
                >
                  <td className="p-3 pl-5 flex items-center gap-3">
                    <img
                      src={
                        person.profileImage
                          ? `http://localhost:5000/${person.profileImage}`
                          : "http://localhost:5000/uploads/profileImages/default/male.png"
                      }
                      alt=""
                      className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm"
                      onError={(e) => {
                        e.target.src =
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                      }}
                    />
                    <span className="font-bold text-slate-900">
                      {person.fullName}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400 font-normal">
                    {person.email}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-lg text-[9px] font-extrabold uppercase border ${person.role === "admin" ? "bg-amber-50 border-amber-200 text-amber-700" : person.role === "teacher" ? "bg-purple-50 border-purple-200 text-purple-700" : "bg-blue-50 border-blue-200 text-blue-700"}`}
                    >
                      {person.role}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">
                    {person.country || "—"}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() =>
                        executeStatusMutation(person.id, person.isActive)
                      }
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase transition-all border ${person.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"}`}
                    >
                      {person.isActive ? (
                        <>
                          <HiOutlineCheckCircle /> Active
                        </>
                      ) : (
                        <>
                          <HiOutlineXCircle /> Suspended
                        </>
                      )}
                    </button>
                  </td>
                  <td className="p-3 text-right pr-6 whitespace-nowrap">
                    <div className="inline-flex gap-1.5">
                      <button
                        onClick={() => handleOpenEditModal(person)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-transparent hover:border-blue-100 transition-all"
                      >
                        <HiOutlinePencil className="text-sm" />
                      </button>
                      {person.role !== "admin" && (
                        <button
                          onClick={() => executeRemovalSequence(person.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-100 transition-all"
                        >
                          <HiOutlineTrash className="text-sm" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* CREATE TEACHER DIALOG OVERLAY MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-slate-100 w-full max-w-lg rounded-2xl flex flex-col max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Deploy System Teacher Instance
              </h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <HiOutlineX className="text-base" />
              </button>
            </div>
            <form
              onSubmit={handleTeacherCreation}
              className="p-6 space-y-4 overflow-y-auto text-xs font-semibold text-slate-500"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label>Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={teacherForm.fullName}
                    onChange={(e) =>
                      setTeacherForm({
                        ...teacherForm,
                        fullName: e.target.value,
                      })
                    }
                    className="border border-slate-200 rounded-lg p-2 outline-none focus:border-emerald-600 bg-slate-50/40"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Email Profile Anchor *</label>
                  <input
                    type="email"
                    required
                    value={teacherForm.email}
                    onChange={(e) =>
                      setTeacherForm({ ...teacherForm, email: e.target.value })
                    }
                    className="border border-slate-200 rounded-lg p-2 outline-none focus:border-emerald-600 bg-slate-50/40"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Assigned Password Key *</label>
                  <input
                    type="password"
                    required
                    value={teacherForm.password}
                    onChange={(e) =>
                      setTeacherForm({
                        ...teacherForm,
                        password: e.target.value,
                      })
                    }
                    className="border border-slate-200 rounded-lg p-2 outline-none focus:border-emerald-600 bg-slate-50/40"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Telephone Number</label>
                  <input
                    type="text"
                    value={teacherForm.phone}
                    onChange={(e) =>
                      setTeacherForm({ ...teacherForm, phone: e.target.value })
                    }
                    className="border border-slate-200 rounded-lg p-2 outline-none focus:border-emerald-600 bg-slate-50/40"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Gender Group Identifier</label>
                  <select
                    value={teacherForm.gender}
                    onChange={(e) =>
                      setTeacherForm({ ...teacherForm, gender: e.target.value })
                    }
                    className="border border-slate-200 bg-white rounded-lg p-2 outline-none focus:border-emerald-600"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label>Nationality</label>
                  <input
                    type="text"
                    value={teacherForm.nationality}
                    onChange={(e) =>
                      setTeacherForm({
                        ...teacherForm,
                        nationality: e.target.value,
                      })
                    }
                    className="border border-slate-200 rounded-lg p-2 outline-none focus:border-emerald-600 bg-slate-50/40"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Country Location</label>
                  <input
                    type="text"
                    value={teacherForm.country}
                    onChange={(e) =>
                      setTeacherForm({
                        ...teacherForm,
                        country: e.target.value,
                      })
                    }
                    className="border border-slate-200 rounded-lg p-2 outline-none focus:border-emerald-600 bg-slate-50/40"
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-400 rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center justify-center min-w-[110px]"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Commit Teacher"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT/MUTATE DATA PROFILE DIALOG OVERLAY MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-slate-100 w-full max-w-lg rounded-2xl flex flex-col max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Modify Profile Record Matrices
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <HiOutlineX className="text-base" />
              </button>
            </div>
            <form
              onSubmit={handleUserUpdateMutation}
              className="p-6 space-y-4 overflow-y-auto text-xs font-semibold text-slate-500"
            >
              {/* COMPONENT STREAM PROFILE PICTURE UPDATER */}
              <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="relative group w-14 h-14 rounded-full overflow-hidden border border-slate-200 bg-white shadow-sm">
                  <img
                    src={
                      imageFile
                        ? URL.createObjectURL(imageFile)
                        : selectedUser?.profileImage
                          ? `http://localhost:5000/${selectedUser.profileImage}`
                          : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <label className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                    <HiOutlineCamera className="text-base" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <p className="text-xs text-slate-800 font-bold">
                    Profile Frame Portrait
                  </p>
                  <p className="text-[10px] text-slate-400 font-normal">
                    Click thumbnail circle to change profile picture file.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label>Full System Name *</label>
                  <input
                    type="text"
                    required
                    value={editForm.fullName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, fullName: e.target.value })
                    }
                    className="border border-slate-200 rounded-lg p-2 outline-none focus:border-blue-600 bg-slate-50/40"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label>Assign System Access Role Privilege</label>
                  <select
                    value={editForm.role}
                    onChange={(e) =>
                      setEditForm({ ...editForm, role: e.target.value })
                    }
                    className="border border-slate-200 bg-white rounded-lg p-2 outline-none focus:border-blue-600"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label>
                    Alter Access Password{" "}
                    <span className="text-slate-400 font-normal">
                      (Leave entirely empty to preserve existing keys)
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={editForm.password}
                    onChange={(e) =>
                      setEditForm({ ...editForm, password: e.target.value })
                    }
                    className="border border-slate-200 rounded-lg p-2 outline-none focus:border-blue-600 bg-slate-50/40"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Contact Connection String</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone: e.target.value })
                    }
                    className="border border-slate-200 rounded-lg p-2 outline-none focus:border-blue-600 bg-slate-50/40"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Gender Group Identifier</label>
                  <select
                    value={editForm.gender}
                    onChange={(e) =>
                      setEditForm({ ...editForm, gender: e.target.value })
                    }
                    className="border border-slate-200 bg-white rounded-lg p-2 outline-none focus:border-blue-600"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label>Nationality</label>
                  <input
                    type="text"
                    value={editForm.nationality}
                    onChange={(e) =>
                      setEditForm({ ...editForm, nationality: e.target.value })
                    }
                    className="border border-slate-200 rounded-lg p-2 outline-none focus:border-blue-600 bg-slate-50/40"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Country Matrix Location</label>
                  <input
                    type="text"
                    value={editForm.country}
                    onChange={(e) =>
                      setEditForm({ ...editForm, country: e.target.value })
                    }
                    className="border border-slate-200 rounded-lg p-2 outline-none focus:border-blue-600 bg-slate-50/40"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label>Profile Biography Summary</label>
                  <textarea
                    rows="2"
                    value={editForm.bio}
                    onChange={(e) =>
                      setEditForm({ ...editForm, bio: e.target.value })
                    }
                    className="border border-slate-200 rounded-lg p-2 outline-none focus:border-blue-600 bg-slate-50/40 resize-none"
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-400 rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center min-w-[110px]"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Apply Alterations"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
