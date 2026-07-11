import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getCategoryDashboard,
  createCategory,
  updateCategory,
  deleteCategory,
  changeCategoryStatus,
} from "../../../features/category/categorySlice";

import {
  HiOutlineFolderOpen,
  HiOutlineCollection,
  HiOutlineEyeOff,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineSearch,
  HiOutlineX,
  HiOutlineCamera,
} from "react-icons/hi";

export default function AdminCategoriesPage() {
  const dispatch = useDispatch();
  const { categories, dashboardStatistics, loading } = useSelector(
    (state) => state.category,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCategoryDashboard());
  }, [dispatch]);

  const openModal = (type, category = null) => {
    setModalType(type);
    if (type === "edit" && category) {
      setSelectedCategory(category);
      setTitle(category.title);
      setDescription(category.description || "");
      setImagePreview(
        category.image ? `http://localhost:5000/${category.image}` : "",
      );
    } else {
      setSelectedCategory(null);
      setTitle("");
      setDescription("");
      setImage(null);
      setImagePreview("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "add") {
        await dispatch(
          createCategory({ title, description, image, status: "Active" }),
        ).unwrap();
      } else {
        await dispatch(
          updateCategory({
            id: selectedCategory.id,
            categoryData: { title, description, image },
          }),
        ).unwrap();
      }
      dispatch(getCategoryDashboard());
      dispatch(getCategories());
      closeModal();
    } catch (err) {
      console.error("Operation failed:", err);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    await dispatch(changeCategoryStatus({ id, status: newStatus })).unwrap();
    dispatch(getCategoryDashboard());
    dispatch(getCategories());
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this category?",
      )
    ) {
      await dispatch(deleteCategory(id)).unwrap();
      dispatch(getCategoryDashboard());
      dispatch(getCategories());
    }
  };

  const filteredCollection = (categories || []).filter((cat) =>
    cat.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="h-[100vh] bg-white p-6 flex flex-col overflow-y-auto relative">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            System Core Categories
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Manage and oversee category architecture.
          </p>
        </div>
        <button
          onClick={() => openModal("add")}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
        >
          <HiOutlinePlus className="text-base" /> Create New Category
        </button>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Total Category Base",
            val: dashboardStatistics?.totalCategories,
            icon: HiOutlineFolderOpen,
            color: "blue",
          },
          {
            label: "Active Categories",
            val: dashboardStatistics?.activeCategories,
            icon: HiOutlineCollection,
            color: "emerald",
          },
          {
            label: "Inactive Instances",
            val: dashboardStatistics?.inactiveCategories,
            icon: HiOutlineEyeOff,
            color: "rose",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-slate-50/70 border border-slate-100 p-4 rounded-xl flex items-center gap-4"
          >
            <div
              className={`w-10 h-10 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center shadow-inner`}
            >
              <stat.icon className="text-lg" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                {stat.label}
              </p>
              <p className="text-base font-black text-slate-800">
                {stat.val || 0}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FILTER SEARCH CONSOLE */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-4">
        <div className="relative w-full sm:w-64">
          <HiOutlineSearch className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 text-xs rounded-xl outline-none focus:border-emerald-600 transition-colors"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 overflow-x-auto border border-slate-100 rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold text-[10px]">
              <th className="p-3 pl-5">Category Title</th>
              <th className="p-3">Current Status</th>
              <th className="p-3 text-right pr-6">Data Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-slate-600 font-semibold">
            {filteredCollection.map((cat) => (
              <tr
                key={cat.id}
                className="hover:bg-slate-50/30 transition-colors"
              >
                <td className="p-3 pl-5 font-bold text-slate-900">
                  {cat.title}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleToggleStatus(cat.id, cat.status)}
                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${cat.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"}`}
                  >
                    {cat.status}
                  </button>
                </td>
                <td className="p-3 text-right pr-6">
                  <div className="inline-flex gap-1.5">
                    <button
                      onClick={() => openModal("edit", cat)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <HiOutlinePencil />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                    >
                      <HiOutlineTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-slate-100 w-full max-w-lg rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                {modalType === "add"
                  ? "Deploy New Category"
                  : "Modify Category"}
              </h2>
              <button onClick={closeModal}>
                <HiOutlineX />
              </button>
            </div>

            {/* Image Upload Area */}
            <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl mb-4">
              <div className="relative group w-14 h-14 rounded-full overflow-hidden border border-slate-200 bg-white">
                <img
                  src={
                    imagePreview ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <label className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 cursor-pointer">
                  <HiOutlineCamera />
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400">
                  Category Title
                </label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg mt-1"
                />
              </div>
            </div>

            <div className="pt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Commit Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
