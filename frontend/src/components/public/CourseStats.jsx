import React from "react";
import {
  HiAcademicCap,
  HiUsers,
  HiBadgeCheck,
  HiCollection,
} from "react-icons/hi";

const stats = [
  {
    id: 1,
    icon: HiCollection,
    value: "50+",
    label: "Professional Courses",
  },
  {
    id: 2,
    icon: HiUsers,
    value: "500+",
    label: "Active Students",
  },
  {
    id: 3,
    icon: HiAcademicCap,
    value: "15+",
    label: "Expert Instructors",
  },
  {
    id: 4,
    icon: HiBadgeCheck,
    value: "95%",
    label: "Student Satisfaction",
  },
];

const CourseStats = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-[#10B981] text-sm font-semibold">
            Platform Statistics
          </span>

          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold text-[#0F172A]">
            Learn With Confidence
          </h2>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Thousands of students trust Masdar Skills Development to gain
            practical skills and advance their careers.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-100 rounded-3xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
                  <Icon className="text-3xl text-[#10B981]" />
                </div>

                <h3 className="text-3xl font-extrabold text-[#0F172A]">
                  {item.value}
                </h3>

                <p className="mt-2 text-slate-500 text-sm">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CourseStats;
