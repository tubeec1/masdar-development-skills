import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherCourses } from "../../../features/course/courseSlice";
import { getCourseModules } from "../../../features/module/moduleSlice";
import {
  getModuleLessons,
  createLesson,
  updateLesson,
  deleteLesson,
  resetLessonState,
} from "../../../features/lesson/lessonSlice";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiPlayCircle,
  FiVideo,
} from "react-icons/fi";

const Lessons = () => {
  const dispatch = useDispatch();
  const { teacherCourses } = useSelector((state) => state.course);
  const { courseModules } = useSelector((state) => state.module);
  const { moduleLessons, loading } = useSelector((state) => state.lesson);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoProvider: "YouTube",
    videoUrl: "",
    duration: 0,
    lessonOrder: 1,
    isPreview: false,
  });

  useEffect(() => {
    dispatch(getTeacherCourses());
    return () => dispatch(resetLessonState());
  }, [dispatch]);

  const handleCourseChange = (id) => {
    setSelectedCourse(id);
    setSelectedModule("");
    dispatch(getCourseModules(id));
  };

  const handleModuleChange = (id) => {
    setSelectedModule(id);
    dispatch(getModuleLessons(id));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { ...formData, moduleId: selectedModule };
    try {
      if (editingLesson) {
        await dispatch(
          updateLesson({ id: editingLesson.id, lessonData: payload }),
        ).unwrap();
      } else {
        await dispatch(createLesson(payload)).unwrap();
      }
      dispatch(getModuleLessons(selectedModule));
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  const openModal = (lesson = null) => {
    if (lesson) {
      setEditingLesson(lesson);
      setFormData(lesson);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingLesson(null);
    setFormData({
      title: "",
      description: "",
      videoProvider: "YouTube",
      videoUrl: "",
      duration: 0,
      lessonOrder: 1,
      isPreview: false,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this lesson?")) {
      await dispatch(deleteLesson(id)).unwrap();
      dispatch(getModuleLessons(selectedModule));
    }
  };

  return (
    <div className="h-[100vh] bg-white p-6 flex flex-col overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-slate-900">
          Lesson Management
        </h1>
        <p className="text-xs text-slate-400 font-medium">
          Configure video content for your curriculum.
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <select
          onChange={(e) => handleCourseChange(e.target.value)}
          className="flex-1 p-3 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
        >
          <option value="">Select Course</option>
          {teacherCourses?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => handleModuleChange(e.target.value)}
          value={selectedModule}
          disabled={!selectedCourse}
          className="flex-1 p-3 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
        >
          <option value="">Select Module</option>
          {courseModules?.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title}
            </option>
          ))}
        </select>
      </div>

      {selectedModule && (
        <div className="flex-1 border border-slate-100 rounded-2xl bg-slate-50/50 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-black uppercase text-slate-700">
              Lessons
            </h2>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
            >
              <FiPlus /> Add Lesson
            </button>
          </div>

          <div className="space-y-3">
            {moduleLessons?.map((l) => (
              <div
                key={l.id}
                className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-2xl hover:border-emerald-200 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                    <FiPlayCircle />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      {l.title}
                    </p>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">
                      {l.videoProvider} • {l.duration} mins
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(l)}
                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(l.id)}
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <form
            onSubmit={handleSave}
            className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-black uppercase">
                {editingLesson ? "Edit Lesson" : "Create New Lesson"}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400"
              >
                <FiX />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                placeholder="Lesson Title"
                className="col-span-2 p-2.5 border rounded-xl text-xs"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <select
                className="p-2.5 border rounded-xl text-xs"
                value={formData.videoProvider}
                onChange={(e) =>
                  setFormData({ ...formData, videoProvider: e.target.value })
                }
              >
                {["YouTube", "Vimeo", "Bunny", "Cloudinary", "SelfHosted"].map(
                  (v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ),
                )}
              </select>
              <input
                type="number"
                placeholder="Duration (min)"
                className="p-2.5 border rounded-xl text-xs"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
              />
              <input
                required
                placeholder="Video URL"
                className="col-span-2 p-2.5 border rounded-xl text-xs"
                value={formData.videoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, videoUrl: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Order"
                className="p-2.5 border rounded-xl text-xs"
                value={formData.lessonOrder}
                onChange={(e) =>
                  setFormData({ ...formData, lessonOrder: e.target.value })
                }
              />
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 pl-2">
                <input
                  type="checkbox"
                  checked={formData.isPreview}
                  onChange={(e) =>
                    setFormData({ ...formData, isPreview: e.target.checked })
                  }
                />
                Allow Preview
              </label>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
            >
              {loading ? "Saving..." : "Commit Changes"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Lessons;
