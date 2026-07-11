import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  selectAuth,
  resetStatus,
} from "../../features/auth/authSlice";
import toast, { Toaster } from "react-hot-toast";
import {
  HiCheckCircle,
  HiUser,
  HiMail,
  HiLockClosed,
  HiPhone,
} from "react-icons/hi";

const BENEFITS = [
  "Learn Practical Skills",
  "Expert Instructors",
  "Flexible Learning",
  "Certificates of Completion",
];

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector(selectAuth);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    country: "",
    nationality: "",
  });

  // Handle Redux state updates
  useEffect(() => {
    if (success) {
      toast.success(message || "Registration successful!");
      setTimeout(() => {
        dispatch(resetStatus());
        navigate("/signin");
      }, 2000);
    }
    if (error) {
      toast.error(message || "Registration failed");
      dispatch(resetStatus());
    }
  }, [success, error, message, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const { fullName, email, password, phone, gender, country, nationality } =
      formData;
    if (!fullName.trim()) return toast.error("Full name is required") && false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast.error("Valid email is required") && false;
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters") && false;
    if (!phone.trim()) return toast.error("Phone number is required") && false;
    if (!gender) return toast.error("Gender is required") && false;
    if (!country.trim()) return toast.error("Country is required") && false;
    if (!nationality.trim())
      return toast.error("Nationality is required") && false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(register(formData));
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 pt-32 pb-16">
      <Toaster position="top-right" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* ================= LEFT SIDE ================= */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-[#10B981]">
                Join Masdar Skills Development
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight">
              Start Your{" "}
              <span className="text-[#10B981]">Learning Journey</span> Today
            </h1>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#10B981] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#10B981] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <HiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#10B981] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Password
                </label>
                <div className="relative">
                  <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#10B981] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#10B981] outline-none transition-all"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Country & Nationality */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#10B981] outline-none transition-all"
                />
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  placeholder="Nationality"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#10B981] outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-semibold transition-all duration-300 disabled:opacity-70 hover:shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                }}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>

          {/* RIGHT SIDE (Benefits - Unchanged) */}
          {/* ... (Keep your existing Right Side JSX here) ... */}
          <div className="hidden lg:flex h-full">
            <div className="relative">
              <div className="bg-[#0F172A] rounded-3xl p-10 shadow-2xl text-white overflow-hidden h-full flex flex-col justify-center w-full">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#10B981]/20 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                    <span className="w-2 h-2 bg-[#10B981] rounded-full" />
                    <span className="text-sm">Student Benefits</span>
                  </div>

                  <h2 className="text-3xl font-bold mb-4">
                    Why Join Masdar Skills Development?
                  </h2>

                  <p className="text-slate-300 mb-8 leading-relaxed">
                    Build practical skills, learn from experts, and advance your
                    career with professional training programs.
                  </p>

                  <div className="space-y-4">
                    {BENEFITS.map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4"
                      >
                        <HiCheckCircle className="text-[#10B981] text-2xl flex-shrink-0" />

                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-10">
                    <div className="bg-white/5 rounded-2xl p-5 text-center">
                      <h3 className="text-3xl font-bold text-[#10B981]">
                        500+
                      </h3>
                      <p className="text-sm text-slate-300 mt-1">Students</p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-5 text-center">
                      <h3 className="text-3xl font-bold text-[#10B981]">50+</h3>
                      <p className="text-sm text-slate-300 mt-1">Courses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
