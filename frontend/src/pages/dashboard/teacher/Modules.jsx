import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherCourses } from "../../../features/course/courseSlice";
import {
  getCourseModules,
  createModule,
  updateModule,
  deleteModule,
  resetModuleState,
} from "../../../features/module/moduleSlice";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiLayers } from "react-icons/fi";

const Modules = () => {
  const dispatch = useDispatch();
  const { teacherCourses } = useSelector((state) => state.course);
  const { courseModules, loading } = useSelector((state) => state.module);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    moduleOrder: 1,
  });

  useEffect(() => {
    dispatch(getTeacherCourses());
    return () => dispatch(resetModuleState());
  }, [dispatch]);

  const handleCourseChange = (e) => {
    const id = e.target.value;
    setSelectedCourse(id);
    if (id) dispatch(getCourseModules(id));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { ...formData, courseId: selectedCourse };

    try {
      if (editingModule) {
        await dispatch(
          updateModule({ id: editingModule.id, moduleData: payload }),
        ).unwrap();
      } else {
        await dispatch(createModule(payload)).unwrap();
      }
      dispatch(getCourseModules(selectedCourse));
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      alert(error.message || "Operation failed. Please check your input.");
    }
  };

  const openModal = (mod = null) => {
    if (mod) {
      setEditingModule(mod);
      setFormData({
        title: mod.title,
        description: mod.description,
        moduleOrder: mod.moduleOrder,
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingModule(null);
    setFormData({ title: "", description: "", moduleOrder: 1 });
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this module? This cannot be undone.",
      )
    ) {
      await dispatch(deleteModule(id)).unwrap();
      dispatch(getCourseModules(selectedCourse));
    }
  };

  return (
    <div className="h-[100vh] bg-white p-6 flex flex-col overflow-y-auto">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-slate-900">
          Module Management
        </h1>
        <p className="text-xs text-slate-400 font-medium">
          Organize your curriculum structure per course.
        </p>
      </div>

      {/* SELECT COURSE */}
      <select
        onChange={handleCourseChange}
        value={selectedCourse}
        className="w-full p-3 border border-slate-200 rounded-xl mb-6 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
      >
        <option value="">Select a Course to Manage Modules</option>
        {teacherCourses?.map((c) => (
          <option key={c.id} value={c.id}>
            {c.title}
          </option>
        ))}
      </select>

      {/* MODULE LIST */}
      {selectedCourse && (
        <div className="flex-1 border border-slate-100 rounded-2xl bg-slate-50/50 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-black uppercase text-slate-700">
              Modules
            </h2>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              <FiPlus /> Add New Module
            </button>
          </div>

          <div className="space-y-3">
            {courseModules?.map((mod) => (
              <div
                key={mod.id}
                className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-2xl hover:border-emerald-200 transition-all shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    #{mod.moduleOrder}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      {mod.title}
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      {mod.description || "No description provided."}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(mod)}
                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(mod.id)}
                    className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-black uppercase">
                {editingModule ? "Edit Module" : "Create Module"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400"
              >
                <FiX />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <input
                required
                placeholder="Module Title"
                className="w-full border p-2.5 rounded-xl text-xs"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                className="w-full border p-2.5 rounded-xl text-xs h-20"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Display Order"
                className="w-full border p-2.5 rounded-xl text-xs"
                value={formData.moduleOrder}
                onChange={(e) =>
                  setFormData({ ...formData, moduleOrder: e.target.value })
                }
              />
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
              >
                {loading ? "Saving..." : "Commit Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modules;
