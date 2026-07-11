import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login, selectLoading } from "../../features/auth/authSlice";
import {
  HiCheckCircle,
  HiMail,
  HiLockClosed,
  HiEye,
  HiEyeOff,
} from "react-icons/hi";

const BENEFITS = [
  "Access Your Courses",
  "Track Learning Progress",
  "Learn From Experts",
  "Earn Certificates",
];

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use global Redux loading state for the submit button spinner
  const loading = useSelector(selectLoading);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Dispatch the thunk using the credentials format expected by /auth/login
    const resultAction = await dispatch(
      login({
        email: formData.email,
        password: formData.password,
      }),
    );

    if (login.fulfilled.match(resultAction)) {
      toast.success(resultAction.payload?.message || "Login successful!");

      // Delay redirect slightly so the success toast is readable

      navigate("/");
    } else {
      // Safely access rejectWithValue payload object structure
      const errorMessage =
        resultAction.payload?.message ||
        "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 pt-32 pb-16">
      <Toaster position="top-right" />

      {/* Background Blur Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* LEFT SIDE: LOGIN FORM */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-[#10B981]">
                Welcome Back
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight">
              Continue Your{" "}
              <span className="text-[#10B981]">Learning Journey</span>
            </h1>

            <p className="mt-4 text-slate-500 leading-relaxed">
              Sign in to access your enrolled courses, learning materials, and
              certificates.
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email Input */}
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
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#10B981] focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Password
                </label>

                <div className="relative">
                  <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-200 focus:border-[#10B981] focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#10B981]"
                  >
                    {showPassword ? (
                      <HiEyeOff className="w-5 h-5" />
                    ) : (
                      <HiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#10B981] font-medium hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-semibold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg,#10B981,#059669)",
                }}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Signup Link */}
            <p className="text-center mt-6 text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-[#10B981] hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* RIGHT SIDE: MARKETING/INFO */}
          <div className="hidden lg:flex">
            <div className="bg-[#0F172A] rounded-3xl p-10 shadow-2xl text-white overflow-hidden h-full flex flex-col justify-center w-full relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#10B981]/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                  <span className="w-2 h-2 bg-[#10B981] rounded-full" />
                  <span className="text-sm">Student Portal</span>
                </div>

                <h2 className="text-3xl font-bold mb-4">
                  Welcome Back To Masdar Skills
                </h2>

                <p className="text-slate-300 mb-8 leading-relaxed">
                  Continue learning, improve your skills, and achieve your
                  career goals.
                </p>

                <div className="space-y-4">
                  {BENEFITS.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4"
                    >
                      <HiCheckCircle className="text-[#10B981] text-2xl" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-10">
                  <div className="bg-white/5 rounded-2xl p-5 text-center">
                    <h3 className="text-3xl font-bold text-[#10B981]">500+</h3>
                    <p className="text-sm text-slate-300">Students</p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-5 text-center">
                    <h3 className="text-3xl font-bold text-[#10B981]">50+</h3>
                    <p className="text-sm text-slate-300">Courses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END RIGHT */}
        </div>
      </div>
    </section>
  );
};

export default Signin;
