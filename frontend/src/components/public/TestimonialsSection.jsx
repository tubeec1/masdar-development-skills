import {
  FaQuoteLeft,
  FaStar,
  FaUserGraduate,
  FaBookOpen,
  FaChalkboardTeacher,
  FaSmile,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { MdArrowForward } from "react-icons/md";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const testimonials = [
  {
    id: 1,
    studentName: "Ahmed Hassan",
    profession: "Frontend Developer",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face&auto=format",
    rating: 5,
    review:
      "The React and JavaScript courses helped me build real-world projects and secure my first developer position. The structured curriculum and hands-on projects made all the difference.",
  },
  {
    id: 2,
    studentName: "Amina Yusuf",
    profession: "Digital Marketer",
    profileImage:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop&crop=face&auto=format",
    rating: 5,
    review:
      "I gained practical marketing skills that helped me improve my business and attract more customers online. The course content was directly applicable from day one.",
  },
  {
    id: 3,
    studentName: "Mohamed Ali",
    profession: "Graphic Designer",
    profileImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face&auto=format",
    rating: 5,
    review:
      "The instructors explain concepts clearly and the lessons are easy to follow. Highly recommended for anyone looking to break into the design industry professionally.",
  },
  {
    id: 4,
    studentName: "Fatima Noor",
    profession: "English Learner",
    profileImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face&auto=format",
    rating: 5,
    review:
      "My communication skills improved significantly after taking the English language courses. The interactive lessons and patient instructors made learning enjoyable and effective.",
  },
];

const stats = [
  { id: 1, icon: FaUserGraduate, value: "500+", label: "Students Enrolled" },
  { id: 2, icon: FaBookOpen, value: "50+", label: "Courses Available" },
  {
    id: 3,
    icon: FaChalkboardTeacher,
    value: "15+",
    label: "Expert Instructors",
  },
  { id: 4, icon: FaSmile, value: "95%", label: "Student Satisfaction" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          className={i < rating ? "text-amber-400" : "text-slate-600"}
          size={14}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="group relative flex flex-col h-full bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/30 hover:border-emerald-500/50">
      {/* Green left-border accent on hover */}
      <div className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Decorative quote icon */}
      <div className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <FaQuoteLeft className="text-emerald-400" size={36} />
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Review text */}
      <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">
        "{testimonial.review}"
      </p>

      {/* Divider */}
      <div className="h-px bg-slate-700/60 mb-5" />

      {/* Student info */}
      <div className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <img
            src={testimonial.profileImage}
            alt={testimonial.studentName}
            className="w-11 h-11 rounded-full bg-slate-700 ring-2 ring-slate-600 group-hover:ring-emerald-500/50 transition-all duration-300 object-cover"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-800" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm leading-tight">
            {testimonial.studentName}
          </p>
          <span className="inline-block mt-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
            {testimonial.profession}
          </span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;
  return (
    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/40 transition-all duration-300 hover:bg-slate-800/80 group">
      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors duration-300">
        <Icon className="text-emerald-400" size={20} />
      </div>
      <div className="text-center">
        <p className="text-3xl font-extrabold text-white tracking-tight">
          {stat.value}
        </p>
        <p className="text-slate-400 text-sm mt-0.5">{stat.label}</p>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  return (
    <section
      className="relative w-full overflow-hidden py-20 lg:py-28"
      style={{
        background:
          "linear-gradient(180deg, #0F172A 0%, #0d1526 60%, #0F172A 100%)",
      }}
    >
      {/* ── Decorative Background Elements ── */}
      {/* Green blurred glow — left */}
      <div
        className="pointer-events-none absolute -left-40 top-1/3 w-80 h-80 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #10B981 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Green blurred glow — right */}
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 w-96 h-96 rounded-full opacity-8"
        style={{
          background: "radial-gradient(circle, #10B981 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Soft blue gradient shape — top right */}
      <div
        className="pointer-events-none absolute -top-24 right-0 w-[520px] h-[520px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #1E3A5F 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />
      {/* Subtle dot-grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #10B981 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-14 lg:mb-18">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-2 mb-5">
            <HiSparkles size={14} />
            Student Success Stories
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
            What Our{" "}
            <span className="text-emerald-400 relative">
              Students
              <span
                className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #10B981, transparent)",
                }}
              />
            </span>{" "}
            Say
          </h2>

          {/* Subtitle */}
          <p className="max-w-2xl text-slate-400 text-base sm:text-lg leading-relaxed">
            Hear from learners who have improved their skills, advanced their
            careers, and achieved their goals through Masdar Skills Development.
          </p>
        </div>

        {/* ── Testimonials Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>

        {/* ── Statistics Strip ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((s) => (
            <StatCard key={s.id} stat={s} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className="relative overflow-hidden rounded-3xl border border-slate-700/60 p-8 sm:p-12 text-center"
          style={{
            background:
              "linear-gradient(135deg, #1E3A5F 0%, #0F172A 50%, #0d2818 100%)",
          }}
        >
          {/* CTA background glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, #10B981 0%, transparent 60%)",
            }}
          />
          {/* CTA dot pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-2 mb-5">
              <HiSparkles size={14} />
              Your Journey Starts Here
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Become Our Next{" "}
              <span className="text-emerald-400">Success Story</span>
            </h3>

            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto mb-8">
              Join thousands of learners building valuable skills through Masdar
              Skills Development.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary Green CTA */}
              <button
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-900/40 active:scale-100"
                style={{
                  background: "linear-gradient(135deg, #10B981, #059669)",
                }}
              >
                Browse Courses
                <MdArrowForward
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              {/* Secondary Dark Blue CTA */}
              <button className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white border border-slate-600 bg-slate-800/70 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-700/70 hover:scale-105 active:scale-100">
                Create Account
                <MdArrowForward
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
