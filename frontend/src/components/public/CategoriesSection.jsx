import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight, FiLoader } from "react-icons/fi";
import { HiBookOpen } from "react-icons/hi";
import { getActiveCategories } from "../../features/category/categorySlice";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const { title, description, image, slug } = category;

  return (
    <article
      onClick={() => navigate(`/categories/${slug}`)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
    >
      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 border-2 border-[#10B981]" />

      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={`http://localhost:5000/${image}`}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
          <HiBookOpen className="w-4 h-4 text-[#10B981]" />
          <span className="text-xs font-semibold text-[#0F172A]">Category</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
          {description || "No description provided."}
        </p>
        <div className="flex items-center justify-between mt-5">
          <span className="text-xs text-slate-400 font-medium">
            Professional Skill
          </span>
          <span className="flex items-center gap-1 text-sm font-semibold text-[#10B981] group-hover:gap-2 transition-all">
            Explore <FiArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </article>
  );
};

const CategoriesSection = () => {
  const dispatch = useDispatch();
  const { activeCategories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getActiveCategories());
  }, [dispatch]);

  return (
    <section className="relative py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0F172A]">
            Explore <span className="text-[#10B981]">Skills</span> Categories
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto">
            Browse our professional programs designed to help you build modern
            digital expertise.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <FiLoader className="text-4xl text-[#10B981] animate-spin" />
          </div>
        ) : activeCategories?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800">
              No Categories Found
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
