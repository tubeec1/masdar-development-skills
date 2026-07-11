import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getCategoryDashboard,
  createCategory,
  updateCategory,
  deleteCategory,
  changeCategoryStatus,
  clearCategory,
} from "../../../features/category/categorySlice";

import {
  HiOutlineFolderOpen,
  HiOutlineCollection,
  HiOutlineEyeOff,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineSearch,
  HiOutlineX,
  HiOutlineCamera,
} from "react-icons/hi";

export default function AdminCategoriesPage() {
  const dispatch = useDispatch();
  const { categories, dashboardStatistics, loading, error, message } =
    useSelector((state) => state.category);

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add" or "edit"
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Form Fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCategoryDashboard());
  }, [dispatch]);

  useEffect(() => {
    if (message || error) {
      const promptTimer = setTimeout(() => dispatch(clearCategory()), 4000);
      return () => clearTimeout(promptTimer);
    }
  }, [message, error, dispatch]);

  const openModal = (type, category = null) => {
    setModalType(type);
    if (type === "edit" && category) {
      setSelectedCategory(category);
      setName(category.name);
      setDescription(category.description || "");
      setImagePreview(
        category.image ? `http://localhost:5000/${category.image}` : "",
      );
    } else {
      setSelectedCategory(null);
      setName("");
      setDescription("");
      setImage(null);
      setImagePreview("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setName("");
    setDescription("");
    setImage(null);
    setImagePreview("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("categoryImage", image);

    if (modalType === "add") {
      dispatch(createCategory(formData)).then((res) => {
        if (!res.error) {
          closeModal();
          dispatch(getCategoryDashboard());
          dispatch(getCategories());
        }
      });
    } else {
      dispatch(updateCategory({ id: selectedCategory._id, formData })).then(
        (res) => {
          if (!res.error) {
            closeModal();
            dispatch(getCategoryDashboard());
            dispatch(getCategories());
          }
        },
      );
    }
  };

  const handleToggleStatus = (id, currentStatus) => {
    dispatch(changeCategoryStatus({ id, isActive: !currentStatus })).then(
      () => {
        dispatch(getCategoryDashboard());
        dispatch(getCategories());
      },
    );
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this category?",
      )
    ) {
      dispatch(deleteCategory(id)).then(() => {
        dispatch(getCategoryDashboard());
        dispatch(getCategories());
      });
    }
  };

  const filteredCollection = (categories || []).filter(
    (cat) =>
      cat.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toastClassNames = isModalOpen
    ? "fixed top-4 right-4 z-[60] w-72 shadow-xl animate-fadeIn"
    : "mb-4 w-full";

  return (
    <div className="h-[100vh] bg-white p-6 flex flex-col overflow-y-auto relative">
      {/* DIRECTORY TITLE LAYOUT BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            System Core Category Framework
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Control, register, and update active system business groupings
            across modules.
          </p>
        </div>
        <button
          onClick={() => openModal("add")}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
        >
          <HiOutlinePlus className="text-base" />
          Create New Category
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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
            <HiOutlineFolderOpen className="text-lg" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Total Categories
            </p>
            <p className="text-base font-black text-slate-800">
              {dashboardStatistics?.totalCategories || 0}
            </p>
          </div>
        </div>
        <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
            <HiOutlineCollection className="text-lg" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Active Indexes
            </p>
            <p className="text-base font-black text-slate-800">
              {dashboardStatistics?.activeCategories || 0}
            </p>
          </div>
        </div>
        <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-inner">
            <HiOutlineEyeOff className="text-lg" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Disabled Pools
            </p>
            <p className="text-base font-black text-slate-800">
              {dashboardStatistics?.inactiveCategories || 0}
            </p>
          </div>
        </div>
      </div>

      {/* FILTER SEARCH DIRECTORY CONSOLE */}
      <div className="flex flex-col sm:flex-row justify-end items-end border-b border-slate-200 gap-4 mb-4">
        <div className="relative w-full sm:w-64 mb-2">
          <HiOutlineSearch className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search categories by name matrices..."
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
                <th className="p-3 pl-5">Category Context</th>
                <th className="p-3">Description Field</th>
                <th className="p-3 text-center">Current Status</th>
                <th className="p-3 text-right pr-6">Data Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 font-semibold">
              {filteredCollection.map((category) => (
                <tr
                  key={category._id}
                  className="hover:bg-slate-50/30 transition-colors"
                >
                  <td className="p-3 pl-5 flex items-center gap-3">
                    <img
                      src={
                        category.image
                          ? `http://localhost:5000/${category.image}`
                          : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt=""
                      className="w-8 h-8 rounded-xl object-cover border border-slate-200 shadow-sm"
                      onError={(e) => {
                        e.target.src =
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                      }}
                    />
                    <span className="font-bold text-slate-900">
                      {category.name}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400 font-normal max-w-xs truncate">
                    {category.description || "—"}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() =>
                        handleToggleStatus(category._id, category.isActive)
                      }
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase transition-all border ${
                        category.isActive
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {category.isActive ? (
                        <>
                          <HiOutlineCheckCircle />
                          Active
                        </>
                      ) : (
                        <>
                          <HiOutlineXCircle />
                          Suspended
                        </>
                      )}
                    </button>
                  </td>
                  <td className="p-3 text-right pr-6 whitespace-nowrap">
                    <div className="inline-flex gap-1.5">
                      <button
                        onClick={() => openModal("edit", category)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-transparent hover:border-blue-100 transition-all"
                      >
                        <HiOutlinePencil className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-100 transition-all"
                      >
                        <HiOutlineTrash className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ACTION SYSTEM DIALOG OVERLAY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-slate-100 w-full max-w-lg rounded-2xl flex flex-col max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                {modalType === "add"
                  ? "Deploy System Category Instance"
                  : "Modify Category Record Matrices"}
              </h2>
              <button
                onClick={closeModal}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <HiOutlineX className="text-base" />
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4 overflow-y-auto text-xs font-semibold text-slate-500"
            >
              {/* COMPONENT STREAM PROFILE PICTURE UPDATER */}
              <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="relative group w-14 h-14 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                  <img
                    src={
                      imagePreview ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <label className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                    <HiOutlineCamera className="text-base" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <p className="text-xs text-slate-800 font-bold">
                    Category Frame Portrait
                  </p>
                  <p className="text-[10px] text-slate-400 font-normal">
                    Click thumbnail box to change graphic stream reference.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-1">
                  <label>Category Group Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`border border-slate-200 rounded-lg p-2 outline-none bg-slate-50/40 focus:border-${
                      modalType === "add" ? "emerald" : "blue"
                    }-600`}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Description Abstract Summary</label>
                  <textarea
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`border border-slate-200 rounded-lg p-2 outline-none bg-slate-50/40 resize-none focus:border-${
                      modalType === "add" ? "emerald" : "blue"
                    }-600`}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-slate-200 text-slate-400 rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-5 py-2 text-white rounded-xl flex items-center justify-center min-w-[110px] ${
                    modalType === "add"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : modalType === "add" ? (
                    "Commit Category"
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
}
