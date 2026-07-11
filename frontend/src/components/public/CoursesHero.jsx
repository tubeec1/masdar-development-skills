import { Link } from "react-router-dom";
import { HiAcademicCap, HiArrowRight } from "react-icons/hi";

const CoursesHero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Background Blurs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Shapes */}
      <div className="absolute top-24 right-20 w-20 h-20 rounded-3xl bg-emerald-100 rotate-12 opacity-40 hidden lg:block" />

      <div className="absolute bottom-24 left-16 w-14 h-14 rounded-full bg-blue-100 opacity-50 hidden lg:block" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />

            <span className="text-sm font-semibold text-[#10B981]">
              Explore Our Courses
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-tight">
            Build Your Future With{" "}
            <span className="text-[#10B981]">Practical Skills</span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Discover professional courses designed to help students and
            professionals gain practical knowledge, advance their careers, and
            achieve their learning goals.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold shadow-lg hover:-translate-y-1 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              }}
            >
              Browse Courses
              <HiArrowRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-slate-200 bg-white text-[#0F172A] font-semibold hover:border-[#10B981] hover:text-[#10B981] transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                value: "500+",
                label: "Students",
              },
              {
                value: "50+",
                label: "Courses",
              },
              {
                value: "15+",
                label: "Instructors",
              },
              {
                value: "95%",
                label: "Success Rate",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl border border-slate-100 shadow-md p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-2xl lg:text-3xl font-extrabold text-[#10B981]">
                  {item.value}
                </h3>

                <p className="mt-1 text-sm text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Bottom Feature */}
          <div className="mt-12 inline-flex items-center gap-3 bg-white border border-slate-100 shadow-md rounded-2xl px-5 py-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
              <HiAcademicCap className="text-[#10B981] text-2xl" />
            </div>

            <div className="text-left">
              <h4 className="font-bold text-[#0F172A]">
                Learn From Industry Experts
              </h4>

              <p className="text-sm text-slate-500">
                Practical, career-focused learning experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesHero;
