import { FiArrowRight, FiBookOpen, FiAward, FiUsers } from "react-icons/fi";

const About = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        {/* Background Blurs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-[#10B981] text-sm font-semibold">
                About Masdar Skills Development
              </span>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-[#0F172A]">
                Empowering People Through{" "}
                <span className="text-[#10B981]">Practical Skills</span> &{" "}
                <span className="text-[#10B981]">Digital Education</span>
              </h1>

              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                Masdar Skills Development helps students and professionals gain
                valuable skills through high-quality online learning
                experiences, expert instructors, and career-focused training.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="px-6 py-3 rounded-xl bg-[#10B981] text-white font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-lg">
                  Browse Courses
                </button>

                <button className="px-6 py-3 rounded-xl bg-[#0F172A] text-white font-semibold hover:bg-[#1E3A5F] transition-all duration-300">
                  Contact Us
                </button>
              </div>
            </div>

            {/* Right Side Visual */}
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-100">
                <div className="bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] rounded-2xl p-6 text-white">
                  <h3 className="font-bold text-xl">Learning Dashboard</h3>

                  <p className="text-slate-300 mt-2">
                    Track your learning progress and complete courses.
                  </p>

                  <div className="mt-6 bg-white/10 rounded-xl p-4">
                    <div className="flex justify-between mb-2">
                      <span>React Development</span>
                      <span>80%</span>
                    </div>

                    <div className="w-full h-2 bg-white/20 rounded-full">
                      <div className="w-4/5 h-2 bg-[#10B981] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card 1 */}
              <div className="absolute -left-6 top-10 bg-white rounded-2xl p-4 shadow-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <FiBookOpen className="text-[#10B981] text-2xl" />
                  <div>
                    <p className="font-bold text-[#0F172A]">50+ Courses</p>
                    <p className="text-sm text-slate-500">Skill Development</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute -right-4 top-20 bg-white rounded-2xl p-4 shadow-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <FiUsers className="text-blue-500 text-2xl" />
                  <div>
                    <p className="font-bold text-[#0F172A]">500+ Students</p>
                    <p className="text-sm text-slate-500">Active Learners</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 3 */}
              <div className="absolute bottom-0 left-10 bg-white rounded-2xl p-4 shadow-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <FiAward className="text-yellow-500 text-2xl" />
                  <div>
                    <p className="font-bold text-[#0F172A]">Certificates</p>
                    <p className="text-sm text-slate-500">
                      Career Ready Skills
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Placeholder */}
            <div className="h-[450px] rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1E3A5F]" />

            {/* Content */}
            <div>
              <span className="text-[#10B981] font-semibold">Our Story</span>

              <h2 className="mt-3 text-4xl font-bold text-[#0F172A]">
                Building The Future Through Education
              </h2>

              <p className="mt-6 text-slate-600 leading-relaxed">
                Masdar Skills Development was established to provide affordable
                and practical education opportunities for students and
                professionals who want to improve their careers and digital
                skills.
              </p>

              <p className="mt-4 text-slate-600 leading-relaxed">
                Our mission is to bridge the gap between education and
                real-world industry needs by offering career-focused courses
                taught by experienced instructors.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-white p-4 rounded-2xl shadow-md text-center">
                  <h3 className="text-3xl font-bold text-[#10B981]">500+</h3>
                  <p className="text-sm text-slate-500">Students</p>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-md text-center">
                  <h3 className="text-3xl font-bold text-[#10B981]">50+</h3>
                  <p className="text-sm text-slate-500">Courses</p>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-md text-center">
                  <h3 className="text-3xl font-bold text-[#10B981]">15+</h3>
                  <p className="text-sm text-slate-500">Instructors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
