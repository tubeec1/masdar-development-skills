import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryBySlug,
  clearCategory,
} from "../../features/category/categorySlice";
import { FiLoader, FiBookOpen } from "react-icons/fi"; // Check if you are using 'react-icons/hi' or 'react-icons/fi'

// If you specifically want HiBookOpen, ensure it is imported from react-icons/hi
import { HiBookOpen } from "react-icons/hi";

const CategoryDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  // Select the specific category from the slice
  const { category, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    // Fetch category when slug changes
    dispatch(getCategoryBySlug(slug));

    // Cleanup: clear category when leaving the page
    return () => {
      dispatch(clearCategory());
    };
  }, [dispatch, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiLoader className="text-4xl text-[#10B981] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        {error}
      </div>
    );
  }

  if (!category) return null;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="relative rounded-3xl overflow-hidden bg-[#0F172A] text-white shadow-xl h-80 flex items-center">
          <img
            src={`http://localhost:5000/${category.image}`}
            alt={category.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative z-10 p-12">
            <div className="flex items-center gap-2 text-[#10B981] font-semibold mb-3">
              <HiBookOpen />
              <span>CATEGORY</span>
            </div>
            <h1 className="text-5xl font-extrabold mb-4">{category.title}</h1>
            <p className="text-slate-300 text-lg max-w-2xl">
              {category.description}
            </p>
          </div>
        </div>

        {/* Courses Section (Ready for implementation) */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Courses in {category.title}
          </h2>
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center shadow-sm">
            <p className="text-slate-500">
              There are currently no courses listed under this category. Check
              back soon for updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
