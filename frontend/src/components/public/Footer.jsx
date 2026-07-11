import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdLocationOn,
  MdPhone,
  MdEmail,
  MdAccessTime,
  MdSend,
} from "react-icons/md";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";

// ─── Data ─────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Contact Us", to: "/contact" },
  { label: "Sign In", to: "/signin" },
  { label: "Sign Up", to: "/signup" },
];

const CATEGORIES = [
  "Web Development",
  "Graphic Design",
  "Digital Marketing",
  "English Language",
  "Computer Skills",
  "Business Skills",
];

const SOCIALS = [
  {
    icon: FaFacebookF,
    label: "Facebook",
    href: "#",
    hoverColor: "hover:bg-blue-600",
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "#",
    hoverColor: "hover:bg-blue-500",
  },
  {
    icon: FaYoutube,
    label: "YouTube",
    href: "#",
    hoverColor: "hover:bg-red-600",
  },
  {
    icon: FaTelegram,
    label: "Telegram",
    href: "#",
    hoverColor: "hover:bg-sky-500",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "#",
    hoverColor: "hover:bg-green-500",
  },
];

const CONTACT_ITEMS = [
  {
    icon: MdLocationOn,
    label: "Address",
    lines: ["Mogadishu, Somalia"],
  },
  {
    icon: MdPhone,
    label: "Phone",
    lines: ["+252 XXXXXXXX"],
    href: "tel:+252XXXXXXXX",
  },
  {
    icon: MdEmail,
    label: "Email",
    lines: ["info@masdar.com"],
    href: "mailto:info@masdar.com",
  },
  {
    icon: MdAccessTime,
    label: "Hours",
    lines: ["Sat – Thu", "8:00 AM – 6:00 PM"],
  },
];

// ─── Logo Mark ────────────────────────────────────────────
const LogoMark = ({ size = 36 }) => (
  <div
    className="flex items-center justify-center rounded-lg flex-shrink-0"
    style={{
      width: size,
      height: size,
      background: "linear-gradient(135deg, #1E3A5F 0%, #0F172A 100%)",
      border: "1px solid rgba(16,185,129,0.3)",
    }}
  >
    <svg
      width={size * 0.55}
      height={size * 0.55}
      viewBox="0 0 20 20"
      fill="none"
    >
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
);

// ─── Newsletter Section ────────────────────────────────────
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-16">
      {/* Glassmorphism card */}
      <div
        className="rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/10"
        style={{
          background:
            "linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(16,185,129,0.12) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(16,185,129,0.15)",
        }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 mb-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#10B981" }}
              />
              <span className="text-xs font-semibold text-[#10B981] uppercase tracking-widest">
                Newsletter
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              Stay Updated With New Courses
            </h3>
            <p className="text-sm text-gray-400 mt-1 max-w-md">
              Subscribe to receive updates about new courses, skills training,
              and learning opportunities.
            </p>
          </div>

          {/* Form */}
          <div className="w-full lg:w-auto lg:min-w-[380px]">
            {submitted ? (
              <div className="flex items-center gap-3 bg-emerald-900/40 border border-emerald-500/30 rounded-xl px-5 py-3.5">
                <HiCheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                <p className="text-sm text-emerald-300 font-medium">
                  You're subscribed! Welcome aboard.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate>
                <div className="flex gap-2">
                  <div className="flex-1 min-w-0">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter your email address"
                      className={[
                        "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500",
                        "bg-white/8 border transition-all duration-200 outline-none",
                        "focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20",
                        error
                          ? "border-red-500/60"
                          : "border-white/15 hover:border-white/25",
                      ].join(" ")}
                      style={{ background: "rgba(255,255,255,0.07)" }}
                      aria-label="Email address"
                    />
                    {error && (
                      <p className="text-red-400 text-xs mt-1.5 pl-1">
                        {error}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-emerald-900/40 hover:-translate-y-0.5 active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, #10B981, #059669)",
                    }}
                  >
                    <MdSend className="w-4 h-4" />
                    <span className="hidden sm:inline">Subscribe</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Footer Column Heading ────────────────────────────────
const ColumnHeading = ({ children }) => (
  <h4 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
    <span
      className="inline-block w-1 h-4 rounded-full flex-shrink-0"
      style={{ background: "#10B981" }}
    />
    {children}
  </h4>
);

// ─── Main Footer ──────────────────────────────────────────
const Footer = () => {
  return (
    <footer aria-label="Site footer">
      {/* Newsletter floats above */}
      <Newsletter />

      {/* Dark footer body */}
      <div style={{ background: "#0F172A" }}>
        {/* Top padding clears the newsletter overlap */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* ── Col 1: Brand ── */}
            <div className="sm:col-span-2 lg:col-span-1 space-y-5">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <LogoMark size={38} />
                <span className="font-bold text-base text-white leading-tight tracking-tight">
                  Masdar <span style={{ color: "#10B981" }}>Skills</span>
                </span>
              </div>

              {/* Description */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#64748B" }}
              >
                Empowering students and professionals with practical skills
                through high-quality online education and expert-led courses.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2 flex-wrap">
                {SOCIALS.map(({ icon: Icon, label, href, hoverColor }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={[
                      "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200",
                      "bg-white/5 border border-white/10 text-gray-400",
                      "hover:text-white hover:border-transparent hover:-translate-y-0.5 hover:shadow-lg",
                      hoverColor,
                    ].join(" ")}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Col 2: Quick Links ── */}
            <div>
              <ColumnHeading>Quick Links</ColumnHeading>
              <ul className="space-y-2.5">
                {QUICK_LINKS.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="group flex items-center gap-2 text-sm transition-colors duration-200 hover:text-[#10B981]"
                      style={{ color: "#64748B" }}
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200 group-hover:w-2"
                        style={{ background: "#10B981", opacity: 0.5 }}
                      />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 3: Categories ── */}
            <div>
              <ColumnHeading>Popular Categories</ColumnHeading>
              <ul className="space-y-2.5">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <Link
                      to="/courses"
                      className="group flex items-center gap-2 text-sm transition-colors duration-200 hover:text-[#10B981]"
                      style={{ color: "#64748B" }}
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200 group-hover:w-2"
                        style={{ background: "#10B981", opacity: 0.5 }}
                      />
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 4: Contact ── */}
            <div>
              <ColumnHeading>Contact Us</ColumnHeading>
              <ul className="space-y-4">
                {CONTACT_ITEMS.map(({ icon: Icon, label, lines, href }) => (
                  <li key={label} className="flex items-start gap-3 group">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-200 group-hover:bg-[#10B981]/20"
                      style={{ background: "rgba(16,185,129,0.1)" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#10B981" }} />
                    </div>
                    <div>
                      {lines.map((line, i) =>
                        href && i === 0 ? (
                          <a
                            key={i}
                            href={href}
                            className="block text-sm transition-colors duration-200 hover:text-[#10B981]"
                            style={{ color: "#64748B" }}
                          >
                            {line}
                          </a>
                        ) : (
                          <p
                            key={i}
                            className="text-sm"
                            style={{ color: i === 0 ? "#94A3B8" : "#64748B" }}
                          >
                            {line}
                          </p>
                        ),
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Divider ── */}
          <div
            className="my-8 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            }}
          />

          {/* ── Bottom bar ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
              className="text-xs text-center sm:text-left"
              style={{ color: "#475569" }}
            >
              © {new Date().getFullYear()} Masdar Skills Development. All Rights
              Reserved.
            </p>

            <div className="flex items-center gap-1">
              {["Privacy Policy", "Terms & Conditions"].map((item, i) => (
                <span key={item} className="flex items-center gap-1">
                  {i > 0 && (
                    <span className="text-xs" style={{ color: "#334155" }}>
                      ·
                    </span>
                  )}
                  <Link
                    to={`/${item.toLowerCase().replace(/\s+&?\s*/g, "-")}`}
                    className="text-xs transition-colors duration-200 hover:text-[#10B981]"
                    style={{ color: "#475569" }}
                  >
                    {item}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
