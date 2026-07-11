import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeacherCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../../features/course/courseSlice";
import { getActiveCategories } from "../../../features/category/categorySlice";
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlineCamera,
} from "react-icons/hi";

const MyCourses = () => {
  const dispatch = useDispatch();
  const { teacherCourses } = useSelector((state) => state.course);
  const { activeCategories } = useSelector((state) => state.category);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    description: "",
    introVideo: "",
    duration: "",
    language: "English",
    level: "Beginner",
    price: "",
    discountPrice: "",
    thumbnail: null,
  });

  useEffect(() => {
    dispatch(getTeacherCourses());
    dispatch(getActiveCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Explicitly appending fields to ensure backend compatibility
    data.append("categoryId", formData.categoryId);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("introVideo", formData.introVideo);
    data.append("duration", formData.duration);
    data.append("language", formData.language);
    data.append("level", formData.level);
    data.append("price", formData.price);
    data.append("discountPrice", formData.discountPrice);

    if (formData.thumbnail) {
      data.append("thumbnail", formData.thumbnail);
    }

    if (editingCourse) {
      await dispatch(
        updateCourse({ id: editingCourse.id, courseData: data }),
      ).unwrap();
    } else {
      await dispatch(createCourse(data)).unwrap();
    }
    dispatch(getTeacherCourses());
    closeModal();
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setFormData({ ...course, thumbnail: null });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await dispatch(deleteCourse(id)).unwrap();
      dispatch(getTeacherCourses());
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
    setFormData({
      categoryId: "",
      title: "",
      description: "",
      introVideo: "",
      duration: "",
      language: "English",
      level: "Beginner",
      price: "",
      discountPrice: "",
      thumbnail: null,
    });
  };

  return (
    <div className="h-[100vh] bg-white p-6 flex flex-col overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">My Courses</h1>
          <p className="text-xs text-slate-400 font-medium">
            Manage your published and draft courses.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
        >
          <HiOutlinePlus /> Create New Course
        </button>
      </div>

      <div className="flex-1 border border-slate-100 rounded-2xl bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50 border-b text-slate-400 uppercase font-bold text-[10px]">
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Level</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {teacherCourses?.map((course) => (
              <tr key={course.id} className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-900">{course.title}</td>
                <td className="p-4 text-slate-600">{course.categoryName}</td>
                <td className="p-4 text-slate-600">{course.level}</td>
                <td className="p-4 font-bold text-slate-900">
                  ${course.price}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${course.status === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                  >
                    {course.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => openEditModal(course)}
                    className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg mr-2"
                  >
                    <HiOutlinePencil />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg"
                  >
                    <HiOutlineTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-black uppercase">
                {editingCourse ? "Edit Course" : "Create New Course"}
              </h2>
              <button onClick={closeModal}>
                <HiOutlineX />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                name="title"
                placeholder="Course Title"
                onChange={handleInputChange}
                value={formData.title}
                className="col-span-2 p-2.5 border rounded-xl text-xs"
              />
              <select
                required
                name="categoryId"
                onChange={handleInputChange}
                value={formData.categoryId}
                className="p-2.5 border rounded-xl text-xs"
              >
                <option value="">Select Category</option>
                {activeCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
              <select
                required
                name="level"
                onChange={handleInputChange}
                value={formData.level}
                className="p-2.5 border rounded-xl text-xs"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <input
                required
                name="price"
                type="number"
                placeholder="Price"
                onChange={handleInputChange}
                value={formData.price}
                className="p-2.5 border rounded-xl text-xs"
              />
              <input
                required
                name="discountPrice"
                type="number"
                placeholder="Discount"
                onChange={handleInputChange}
                value={formData.discountPrice}
                className="p-2.5 border rounded-xl text-xs"
              />
              <input
                required
                name="duration"
                placeholder="Duration (e.g. 10 Hours)"
                onChange={handleInputChange}
                value={formData.duration}
                className="p-2.5 border rounded-xl text-xs"
              />
              <input
                required
                name="introVideo"
                placeholder="Intro Video URL"
                onChange={handleInputChange}
                value={formData.introVideo}
                className="p-2.5 border rounded-xl text-xs"
              />
              <textarea
                required
                name="description"
                placeholder="Description"
                onChange={handleInputChange}
                value={formData.description}
                className="col-span-2 p-2.5 border rounded-xl text-xs h-20"
              />
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 mb-1">
                  Thumbnail
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full text-xs border p-2 rounded-xl"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Commit Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
