import {
  MdVerified,
  MdMenuBook,
  MdSchedule,
  MdWorkspacePremium,
  MdAttachMoney,
  MdAllInclusive,
} from "react-icons/md";

// ─── Feature Data ─────────────────────────────────────────
const features = [
  {
    id: 1,
    icon: MdVerified,
    title: "Expert Instructors",
    description:
      "Learn from industry professionals with years of real-world experience in their fields.",
    accent: "#3B82F6",
    lightBg: "#EFF6FF",
  },
  {
    id: 2,
    icon: MdMenuBook,
    title: "Practical Skills Training",
    description:
      "Every course focuses on hands-on, job-ready skills you can apply immediately in your career.",
    accent: "#10B981",
    lightBg: "#ECFDF5",
  },
  {
    id: 3,
    icon: MdSchedule,
    title: "Flexible Learning",
    description:
      "Study at your own pace, on your own schedule from any device, anywhere.",
    accent: "#F59E0B",
    lightBg: "#FFFBEB",
  },
  {
    id: 4,
    icon: MdWorkspacePremium,
    title: "Certificate of Completion",
    description:
      "Earn a recognized certificate upon course completion to boost your professional profile.",
    accent: "#8B5CF6",
    lightBg: "#F5F3FF",
  },
  {
    id: 5,
    icon: MdAttachMoney,
    title: "Affordable Courses",
    description:
      "Access high-quality education at affordable prices designed for everyone.",
    accent: "#EC4899",
    lightBg: "#FDF2F8",
  },
  {
    id: 6,
    icon: MdAllInclusive,
    title: "Lifetime Access",
    description:
      "Once enrolled, you own the course forever and can revisit lessons anytime.",
    accent: "#EF4444",
    lightBg: "#FEF2F2",
  },
];
// ─── Feature Card ─────────────────────────────────────────
const FeatureCard = ({ feature, index }) => {
  const { icon: Icon, title, description, accent, lightBg } = feature;

  return (
    <article
      className="group relative bg-white rounded-2xl p-6 border border-gray-100 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:border-transparent cursor-default"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
      tabIndex={0}
      aria-label={title}
    >
      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 2px ${accent}55` }}
      />

      {/* Top row: icon + number */}
      <div className="flex items-start justify-between mb-4">
        {/* Icon badge */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ background: lightBg }}
        >
          <Icon
            className="w-6 h-6"
            style={{ color: accent }}
            aria-hidden="true"
          />
        </div>

        {/* Step number */}
        <span
          className="text-3xl font-black opacity-[0.06] select-none group-hover:opacity-[0.12] transition-opacity duration-300"
          style={{ color: accent }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Text content */}
      <h3 className="text-[#0F172A] font-bold text-base mb-2 leading-snug group-hover:text-[#0F172A] transition-colors duration-200">
        {title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      />
    </article>
  );
};

// ─── Section Badge ────────────────────────────────────────
const SectionBadge = ({ children }) => (
  <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5">
    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
    <span className="text-sm font-semibold text-[#10B981]">{children}</span>
  </div>
);

// ─── Central Visual Strip ─────────────────────────────────
const CenterStrip = () => (
  <div
    className="hidden lg:flex flex-col items-center justify-center gap-3 py-4"
    aria-hidden="true"
  >
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl"
      style={{ background: "linear-gradient(135deg, #0F172A, #1E3A5F)" }}
    >
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2L3 6V10C3 13.866 6.13 17.396 10 18C13.87 17.396 17 13.866 17 10V6L10 2Z"
          fill="#10B981"
          opacity="0.9"
        />
        <path
          d="M7.5 10L9.5 12L13 8.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="rounded-full"
        style={{
          width: i % 3 === 0 ? 6 : 4,
          height: i % 3 === 0 ? 6 : 4,
          background: i % 3 === 0 ? "#10B981" : "#CBD5E1",
          opacity: 1 - i * 0.1,
        }}
      />
    ))}
  </div>
);

// ─── Main Section ─────────────────────────────────────────
const WhyChooseSection = () => {
  const leftFeatures = features.slice(0, 3);
  const rightFeatures = features.slice(3, 6);

  return (
    <section
      className="relative py-20 sm:py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #F8FAFC 0%, #F0FDF4 50%, #EFF6FF 100%)",
      }}
      aria-labelledby="why-choose-heading"
    >
      {/* Background blobs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{ background: "#10B981", transform: "translate(35%, -35%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{ background: "#0F172A", transform: "translate(-35%, 35%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <header className="flex flex-col items-center text-center gap-4 mb-14">
          <SectionBadge>Why Choose Us</SectionBadge>

          <h2
            id="why-choose-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight tracking-tight max-w-3xl"
          >
            Why Choose <span className="text-[#10B981]">Masdar</span> Skills
            Development?
          </h2>

          <p className="text-base sm:text-lg text-gray-500 max-w-xl leading-relaxed">
            We help students and professionals gain practical skills through
            high-quality online education.
          </p>
        </header>

        {/* ── Desktop: 3-column layout with center logo strip ── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-start">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {leftFeatures.map((f, i) => (
              <FeatureCard key={f.id} feature={f} index={i} />
            ))}
          </div>

          {/* Center decorative strip */}
          <CenterStrip />

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {rightFeatures.map((f, i) => (
              <FeatureCard key={f.id} feature={f} index={i + 3} />
            ))}
          </div>
        </div>

        {/* ── Mobile / Tablet: standard responsive grid ── */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.id} feature={f} index={i} />
          ))}
        </div>

        {/* ── Bottom stats strip ── */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "500+", label: "Students Enrolled" },
            { value: "50+", label: "Expert-Led Courses" },
            { value: "15+", label: "Top Instructors" },
            { value: "95%", label: "Satisfaction Rate" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center bg-white rounded-2xl py-5 px-3 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <span
                className="text-2xl sm:text-3xl font-extrabold"
                style={{ color: "#10B981" }}
              >
                {value}
              </span>
              <span className="text-xs sm:text-sm text-gray-400 font-medium mt-1 text-center">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
