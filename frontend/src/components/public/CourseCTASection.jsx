import React from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

const CourseCTASection = () => {
  return (
    <section className="relative py-20 overflow-hidden mb-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E3A5F] to-[#0F172A]" />

      {/* Green Blur */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#10B981]/20 rounded-full blur-3xl" />

      {/* Blue Blur */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      {/* Floating Shapes */}
      <div className="absolute top-20 right-20 w-24 h-24 border border-white/10 rounded-full" />
      <div className="absolute bottom-20 left-20 w-16 h-16 border border-white/10 rotate-45" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
            <span className="text-[#10B981] text-sm font-semibold">
              Start Learning Today
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Build Skills That
            <span className="text-[#10B981]"> Advance Your Career</span>
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-3xl mx-auto text-slate-300 text-lg leading-relaxed">
            Join hundreds of students learning practical skills through
            professional courses designed to help you succeed in today's
            competitive job market.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-3xl font-bold text-[#10B981]">500+</h3>
              <p className="text-slate-300 text-sm mt-1">Students</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-3xl font-bold text-[#10B981]">50+</h3>
              <p className="text-slate-300 text-sm mt-1">Courses</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-3xl font-bold text-[#10B981]">15+</h3>
              <p className="text-slate-300 text-sm mt-1">Instructors</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-3xl font-bold text-[#10B981]">95%</h3>
              <p className="text-slate-300 text-sm mt-1">Success Rate</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#10B981] text-white font-semibold hover:bg-emerald-600 hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              Browse Courses
              <HiArrowRight className="text-lg" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCTASection;
