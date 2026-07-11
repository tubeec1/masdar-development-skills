import { useRef, useEffect, useState } from "react";
import {
  FiArrowRight,
  FiUserPlus,
  FiSearch,
  FiCreditCard,
  FiPlay,
} from "react-icons/fi";

// ─── Steps Data ───────────────────────────────────────────
const steps = [
  {
    id: 1,
    num: "01",
    icon: FiUserPlus,
    title: "Create Account",
    description:
      "Register as a student and create your learning profile in just a few minutes.",
    accent: "#3B82F6",
    lightBg: "#EFF6FF",
  },
  {
    id: 2,
    num: "02",
    icon: FiSearch,
    title: "Explore Courses",
    description:
      "Browse available categories and discover courses that match your interests and career goals.",
    accent: "#10B981",
    lightBg: "#ECFDF5",
  },
  {
    id: 3,
    num: "03",
    icon: FiCreditCard,
    title: "Enroll in a Course",
    description:
      "Choose your course, submit enrollment, and follow the payment instructions provided by the institute.",
    accent: "#F59E0B",
    lightBg: "#FFFBEB",
  },
  {
    id: 4,
    num: "04",
    icon: FiPlay,
    title: "Learn & Grow",
    description:
      "Access lessons, study materials, and track your learning progress anytime.",
    accent: "#8B5CF6",
    lightBg: "#F5F3FF",
  },
];

// ─── Animated counter hook ────────────────────────────────
const useInView = (ref) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
};

// ─── Section Badge ────────────────────────────────────────
const SectionBadge = ({ children }) => (
  <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5">
    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
    <span className="text-sm font-semibold text-[#10B981]">{children}</span>
  </div>
);

// ─── Step Card ────────────────────────────────────────────
const StepCard = ({ step, index, inView }) => {
  const { num, icon: Icon, title, description, accent, lightBg } = step;
  const isLast = index === steps.length - 1;

  return (
    <div
      className="relative flex flex-col items-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${index * 0.12}s, transform 0.55s ease ${index * 0.12}s`,
      }}
    >
      {/* Desktop connector line (not on last card) */}
      {!isLast && (
        <div
          className="hidden lg:block absolute top-[52px] left-[calc(50%+52px)] right-0 h-px z-0"
          style={{
            background: `linear-gradient(90deg, ${accent}55, #CBD5E122)`,
            width: "calc(100% - 52px)",
          }}
          aria-hidden="true"
        >
          {/* Arrow tip */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
            style={{ background: accent, opacity: 0.6 }}
          />
        </div>
      )}

      {/* Card */}
      <article
        className="group relative w-full bg-white rounded-2xl p-6 border border-gray-100 flex flex-col items-center text-center transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-transparent z-10 h-full"
        style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
        tabIndex={0}
        aria-label={`Step ${index + 1}: ${title}`}
      >
        {/* Hover border glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 2px ${accent}60` }}
        />

        {/* Outer glow ring on hover */}
        <div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none"
          style={{ background: `${accent}12` }}
        />

        {/* Step number badge */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-black text-white shadow-md tracking-widest"
          style={{
            background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
          }}
          aria-hidden="true"
        >
          {num}
        </div>

        {/* Icon container */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 mt-4 transition-transform duration-300 group-hover:scale-110 shadow-sm"
          style={{ background: lightBg }}
        >
          <Icon
            className="w-7 h-7"
            style={{ color: accent }}
            aria-hidden="true"
          />
        </div>

        {/* Title */}
        <h3 className="text-[#0F172A] font-bold text-base mb-2 leading-snug group-hover:text-[#0F172A] transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
          style={{
            background: `linear-gradient(90deg, ${accent}, transparent)`,
          }}
        />
      </article>
    </div>
  );
};

// ─── CTA Block ────────────────────────────────────────────
const CTABlock = () => (
  <div
    className="relative mt-16 rounded-3xl overflow-hidden"
    style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)" }}
  >
    {/* Decorative blobs inside CTA */}
    <div
      className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
      style={{ background: "#10B981", transform: "translate(30%, -30%)" }}
      aria-hidden="true"
    />
    <div
      className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
      style={{ background: "#3B82F6", transform: "translate(-30%, 30%)" }}
      aria-hidden="true"
    />

    <div className="relative px-6 py-12 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
      {/* Text */}
      <div className="max-w-lg">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug mb-2">
          Ready to Start Your{" "}
          <span style={{ color: "#10B981" }}>Learning Journey?</span>
        </h3>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Join Masdar Skills Development today and gain valuable skills from
          expert instructors.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
        <button
          className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-emerald-900/40 hover:-translate-y-0.5 active:scale-95"
          style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
        >
          Browse Courses
          <FiArrowRight
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>

        <button
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white border border-white/20 bg-white/8 backdrop-blur-sm transition-all duration-200 hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5 active:scale-95"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          Create Account
          <FiUserPlus className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
);

// ─── Main Section ─────────────────────────────────────────
const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 overflow-hidden bg-slate-50"
      aria-labelledby="how-it-works-heading"
    >
      {/* Decorative background blobs */}
      <div
        className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: "#10B981", transform: "translate(-50%, -50%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: "#0F172A", transform: "translate(35%, 35%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: "#3B82F6", transform: "translate(-35%, 35%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <header
          className="flex flex-col items-center text-center gap-4 mb-14"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <SectionBadge>How It Works</SectionBadge>

          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight tracking-tight max-w-2xl"
          >
            Start Learning in{" "}
            <span className="text-[#10B981]">4 Simple Steps</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-500 max-w-xl leading-relaxed">
            Join Masdar Skills Development and gain practical skills through a
            simple and effective learning process.
          </p>
        </header>

        {/* ── Steps Grid ── */}
        {/* Desktop: 4 columns with relative connectors; Mobile/Tablet: 1–2 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-stretch">
          {steps.map((step, i) => (
            <StepCard key={step.id} step={step} index={i} inView={inView} />
          ))}
        </div>

        {/* Mobile step connectors (vertical dashes) */}
        <div
          className="sm:hidden flex flex-col items-center -mt-4 mb-2 gap-0"
          aria-hidden="true"
        >
          {/* Already handled by card stacking — no connector needed */}
        </div>

        {/* ── CTA ── */}
        <CTABlock />
      </div>
    </section>
  );
};

export default HowItWorksSection;
