import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeacherCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  resetCourseState,
} from "../../../features/course/courseSlice";
import { getActiveCategories } from "../../../features/category/categorySlice";

const MyCourses = () => {
  const dispatch = useDispatch();
  const { teacherCourses, loading } = useSelector((state) => state.course);
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
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) data.append(key, formData[key]);
    });

    if (editingCourse) {
      dispatch(updateCourse({ id: editingCourse.id, courseData: data }));
    } else {
      dispatch(createCourse(data));
    }
    closeModal();
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setFormData({ ...course, thumbnail: null }); // Don't pre-fill file
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      dispatch(deleteCourse(id));
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
      status: "Draft",
      thumbnail: null,
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>
          <p className="text-gray-500">
            Manage your published and draft courses
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          + Create Course
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Level</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teacherCourses?.map((course) => (
              <tr key={course.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{course.title}</td>
                <td className="p-4 text-gray-600">{course.categoryName}</td>
                <td className="p-4 text-gray-600">{course.level}</td>
                <td className="p-4 text-gray-600">${course.price}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${course.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {course.status}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => openEditModal(course)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl w-full max-w-2xl grid grid-cols-2 gap-4 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="col-span-2 text-2xl font-bold">
              {editingCourse ? "Edit Course" : "Create New Course"}
            </h2>

            <select
              name="categoryId"
              onChange={handleInputChange}
              value={formData.categoryId}
              className="border p-2 rounded"
            >
              <option value="">Select Category</option>
              {activeCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
            <input
              name="title"
              placeholder="Title"
              onChange={handleInputChange}
              value={formData.title}
              className="border p-2 rounded"
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              onChange={handleInputChange}
              value={formData.price}
              className="border p-2 rounded"
            />
            <input
              name="discountPrice"
              type="number"
              placeholder="Discount"
              onChange={handleInputChange}
              value={formData.discountPrice}
              className="border p-2 rounded"
            />

            <select
              name="language"
              onChange={handleInputChange}
              value={formData.language}
              className="border p-2 rounded"
            >
              <option>English</option>
              <option>Somali</option>
            </select>
            <select
              name="level"
              onChange={handleInputChange}
              value={formData.level}
              className="border p-2 rounded"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            <input
              name="duration"
              placeholder="Duration (e.g. 10 Hours)"
              onChange={handleInputChange}
              value={formData.duration}
              className="border p-2 rounded"
            />

            <input
              name="introVideo"
              placeholder="Intro Video URL"
              onChange={handleInputChange}
              value={formData.introVideo}
              className="col-span-2 border p-2 rounded"
            />
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleInputChange}
              value={formData.description}
              className="col-span-2 border p-2 rounded"
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="col-span-2 border p-2 rounded"
            />

            <div className="col-span-2 flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
