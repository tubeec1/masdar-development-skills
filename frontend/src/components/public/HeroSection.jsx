import { useState, useEffect } from "react";
import { HiPlay, HiCheckCircle, HiAcademicCap, HiStar } from "react-icons/hi";
import {
  MdVerified,
  MdSchool,
  MdMenuBook,
  MdPeople,
  MdThumbUp,
} from "react-icons/md";
import { FiArrowRight, FiChevronRight } from "react-icons/fi";

// ─── Data ────────────────────────────────────────────────
const STATS = [
  { icon: MdPeople, value: "1000+", label: "Students" },
  { icon: MdMenuBook, value: "100+", label: "Courses" },
  { icon: MdSchool, value: "20+", label: "Expert Teachers" },
  { icon: MdThumbUp, value: "95%", label: "Success Rate" },
];

const LESSONS = [
  { title: "UI/UX Fundamentals", done: true },
  { title: "React & Tailwind CSS", done: true },
  { title: "Backend with Node.js", done: false },
];

// ─── Sub-components ───────────────────────────────────────

const ProgressBar = ({ percent, color = "#10B981" }) => (
  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
    <div
      className="h-1.5 rounded-full transition-all duration-700"
      style={{ width: `${percent}%`, background: color }}
    />
  </div>
);

const StatCard = ({ icon: Icon, value, label }) => (
  <div className="flex flex-col items-center justify-center bg-white rounded-xl px-3 py-3 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <Icon className="w-5 h-5 mb-1" style={{ color: "#10B981" }} />
    <span className="text-lg font-bold text-[#0F172A] leading-tight">
      {value}
    </span>
    <span className="text-xs text-gray-400 font-medium">{label}</span>
  </div>
);

// ─── Dashboard Mockup Card ────────────────────────────────
const DashboardMockup = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setProgress(68), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto select-none">
      {/* Decorative blobs behind card */}
      <div
        className="absolute -top-8 -right-8 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "#10B981" }}
      />
      <div
        className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "#0F172A" }}
      />

      {/* Main dashboard card */}
      <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-5 space-y-4">
        {/* Header: student info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow"
                style={{
                  background: "linear-gradient(135deg, #0F172A, #1D4ED8)",
                }}
              >
                AH
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">
                Ahmed Hassan
              </p>
              <p className="text-xs text-gray-400">Full-Stack Developer Path</p>
            </div>
          </div>
          <MdVerified className="w-5 h-5 text-[#10B981]" />
        </div>

        {/* Progress section */}
        <div className="bg-gray-50 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-[#0F172A]">
              Course Progress
            </span>
            <span className="text-xs font-bold text-[#10B981]">
              {progress}%
            </span>
          </div>
          <ProgressBar percent={progress} />
          <p className="text-xs text-gray-400">12 of 18 modules completed</p>
        </div>

        {/* Lessons list */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Recent Lessons
          </p>
          {LESSONS.map(({ title, done }) => (
            <div key={title} className="flex items-center gap-2.5">
              <HiCheckCircle
                className={`w-4 h-4 flex-shrink-0 ${done ? "text-[#10B981]" : "text-gray-200"}`}
              />
              <span
                className={`text-sm ${done ? "text-[#0F172A] line-through opacity-50" : "text-[#0F172A] font-medium"}`}
              >
                {title}
              </span>
            </div>
          ))}
        </div>

        {/* Play video card */}
        <div
          className="flex items-center gap-3 rounded-xl p-3 cursor-pointer hover:opacity-90 transition-opacity duration-200"
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
          }}
          role="button"
          aria-label="Continue watching"
        >
          <div className="w-9 h-9 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0 shadow">
            <HiPlay className="w-4 h-4 text-white ml-0.5" />
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">
              Continue: Node.js APIs
            </p>
            <p className="text-gray-400 text-xs">Lesson 3 · 24 min left</p>
          </div>
          <FiChevronRight className="w-4 h-4 text-gray-400 ml-auto flex-shrink-0" />
        </div>
      </div>

      {/* Floating certificate badge */}
      <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-100 px-3 py-2 flex items-center gap-2 animate-bounce-slow">
        <HiAcademicCap className="w-5 h-5 text-yellow-400" />
        <div>
          <p className="text-xs font-bold text-[#0F172A]">Certificate</p>
          <p className="text-[10px] text-gray-400">Earned!</p>
        </div>
      </div>

      {/* Floating rating badge */}
      <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg border border-gray-100 px-3 py-2 flex items-center gap-1.5">
        {[...Array(5)].map((_, i) => (
          <HiStar key={i} className="w-3 h-3 text-yellow-400" />
        ))}
        <span className="text-xs font-bold text-[#0F172A] ml-0.5">5.0</span>
      </div>
    </div>
  );
};

// ─── Main Hero Component ──────────────────────────────────
const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-16"
      style={{
        background:
          "linear-gradient(135deg, #F8FAFF 0%, #F0FDF8 50%, #EFF6FF 100%)",
      }}
    >
      {/* Background decorative circles */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: "#10B981", transform: "translate(30%, -30%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-8 blur-[100px] pointer-events-none"
        style={{ background: "#0F172A", transform: "translate(-30%, 30%)" }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full opacity-5 blur-[80px] pointer-events-none"
        style={{ background: "#3B82F6" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── LEFT: Content ── */}
          <div className="flex flex-col items-start space-y-6 text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-green-100 rounded-full px-4 py-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-sm font-medium text-[#0F172A]">
                Trusted Skills Development Platform
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-[#0F172A] leading-tight tracking-tight">
              Build Job-Ready<span className="text-[#10B981]"> Skills</span> and
              <br className="hidden sm:block" /> Advance Your{" "}
              <span className="text-[#10B981]">Career</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl">
              Masdar Skills Development helps students and professionals gain
              real-world skills through expert-led courses, structured learning
              paths, and flexible online education.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-200 hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #10B981, #059669)",
                }}
              >
                Browse Courses
                <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-[#0F172A] bg-white border border-gray-200 shadow-sm transition-all duration-200 hover:border-[#0F172A] hover:shadow-md hover:-translate-y-0.5 active:scale-95">
                Become an Instructor
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-4 gap-3 w-full max-w-md pt-2">
              {STATS.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          {/* ── RIGHT: Dashboard Mockup ── */}
          <div className="flex justify-center lg:justify-end">
            <DashboardMockup />
          </div>
        </div>
      </div>

      {/* Bounce-slow keyframe */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
