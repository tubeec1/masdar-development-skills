import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Camera } from "lucide-react";

export default function CourseFormModal({
  isOpen,
  onClose,
  onSubmit,
  categories = [],
  activeCourse = null,
  loading,
}) {
  const [thumbPreview, setThumbPreview] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoryId: "",
      title: "",
      description: "",
      language: "English",
      price: "",
      discountPrice: 0,
      introVideo: "",
      status: "Draft",
    },
  });

  // Safe reset routine utilizing comprehensive optional chaining fields
  useEffect(() => {
    if (isOpen) {
      if (activeCourse) {
        reset({
          categoryId:
            activeCourse?.categoryId?._id || activeCourse?.categoryId || "",
          title: activeCourse?.title || "",
          description: activeCourse?.description || "",
          language: activeCourse?.language || "English",
          price: activeCourse?.price || "",
          discountPrice: activeCourse?.discountPrice || 0,
          introVideo: activeCourse?.introVideo || "",
          status: activeCourse?.status || "Draft",
        });
        setThumbPreview(
          activeCourse?.thumbnail
            ? `http://localhost:5000/${activeCourse.thumbnail}`
            : "",
        );
      } else {
        reset({
          categoryId: "",
          title: "",
          description: "",
          language: "English",
          price: "",
          discountPrice: 0,
          introVideo: "",
          status: "Draft",
        });
        setThumbPreview("");
      }
    }
  }, [activeCourse, reset, isOpen]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("thumbnail", file);
      setThumbPreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("categoryId", data.categoryId);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("language", data.language);
    formData.append("price", data.price);
    formData.append("discountPrice", data.discountPrice);
    formData.append("introVideo", data.introVideo);
    formData.append("status", data.status);

    if (data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white border border-slate-100 w-full max-w-2xl rounded-2xl flex flex-col max-h-[90vh] overflow-hidden shadow-2xl animate-scaleUp">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 shrink-0">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            {activeCourse
              ? "Modify Course Meta Architecture"
              : "Deploy New Course Module Profile"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6 space-y-4 overflow-y-auto text-xs font-semibold text-slate-500"
        >
          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="relative group w-20 h-14 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm shrink-0">
              <img
                src={
                  thumbPreview ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt=""
                className="w-full h-full object-cover"
              />
              <label className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <p className="text-xs text-slate-800 font-bold">
                Course Portal Thumbnail
              </p>
              <p className="text-[10px] text-slate-400 font-normal">
                Upload binary image frame formats to map on dashboard lists.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-slate-600">Course Index Title *</label>
              <input
                type="text"
                {...register("title", {
                  required: "Title property vector mandatory",
                })}
                className="border border-slate-200 rounded-lg p-2 outline-none bg-slate-50/40 focus:border-emerald-600 font-medium text-slate-800"
              />
              {errors.title && (
                <span className="text-[10px] text-rose-500 font-normal">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-slate-600">
                Core Directory Category Index *
              </label>
              <select
                {...register("categoryId", {
                  required: "Mapping structural category is mandatory",
                })}
                className="border border-slate-200 rounded-lg p-2 outline-none bg-slate-50/40 focus:border-emerald-600 font-semibold text-slate-700 cursor-pointer"
              >
                <option value="">Choose category directory matrix...</option>
                {categories &&
                  categories.map((cat) => (
                    <option key={cat._id || cat.id} value={cat._id || cat.id}>
                      {cat.title}
                    </option>
                  ))}
              </select>
              {errors.categoryId && (
                <span className="text-[10px] text-rose-500 font-normal">
                  {errors.categoryId.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-slate-600">
                System Audio/Text Language *
              </label>
              <input
                type="text"
                {...register("language", {
                  required: "Language parameter definition requirement",
                })}
                className="border border-slate-200 rounded-lg p-2 outline-none bg-slate-50/40 focus:border-emerald-600 font-medium text-slate-800"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-slate-600">
                Deployment Lifecycle Status *
              </label>
              <select
                {...register("status")}
                className="border border-slate-200 rounded-lg p-2 outline-none bg-slate-50/40 focus:border-emerald-600 font-semibold text-slate-700 cursor-pointer"
              >
                <option value="Draft">Draft Mode</option>
                <option value="Published">Published Deploy</option>
                <option value="Archived">Archived State</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-slate-600">Standard Base Fee ($) *</label>
              <input
                type="number"
                step="0.01"
                {...register("price", {
                  required: "Base metric cost limit bound is required",
                  min: 0,
                })}
                className="border border-slate-200 rounded-lg p-2 outline-none bg-slate-50/40 focus:border-emerald-600 font-medium text-slate-800"
              />
              {errors.price && (
                <span className="text-[10px] text-rose-500 font-normal">
                  {errors.price.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-slate-600">
                Discount Pricing Fee Pool ($)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("discountPrice", { min: 0 })}
                className="border border-slate-200 rounded-lg p-2 outline-none bg-slate-50/40 focus:border-emerald-600 font-medium text-slate-800"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-slate-600">
              Intro Video Media Stream URL Endpoint *
            </label>
            <input
              type="url"
              {...register("introVideo", {
                required: "Media stream locator pointer route missing",
              })}
              placeholder="https://streaming-bucket.com/video.mp4"
              className="w-full border border-slate-200 rounded-lg p-2 outline-none bg-slate-50/40 focus:border-emerald-600 font-medium text-slate-800"
            />
            {errors.introVideo && (
              <span className="text-[10px] text-rose-500 font-normal">
                {errors.introVideo.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-slate-600">
              Course Syllabus Summary Abstract Framework
            </label>
            <textarea
              rows="3"
              {...register("description")}
              className="border border-slate-200 rounded-lg p-2 outline-none bg-slate-50/40 resize-none focus:border-emerald-600 font-medium text-slate-800"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-400 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel Transaction
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center justify-center min-w-[120px] shadow-sm cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : activeCourse ? (
                "Apply Updates"
              ) : (
                "Deploy Asset"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
