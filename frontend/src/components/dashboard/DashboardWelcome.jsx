import { useSelector } from "react-redux";
import { HiOutlineAcademicCap, HiOutlineSparkles } from "react-icons/hi";

const DashboardWelcome = () => {
  const { user } = useSelector((state) => state.auth);

  const getRoleText = () => {
    switch (user?.role) {
      case "admin":
        return "Administrator";
      case "teacher":
        return "Instructor";
      case "student":
        return "Student";
      default:
        return "User";
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";

    return "Good Evening";
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E3A5F] to-[#0F172A] p-8 lg:p-10 shadow-xl">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 h-60 w-60 rounded-full bg-[#10B981]/20 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="absolute right-20 top-10 h-32 w-32 rounded-full border border-white/10" />

      <div className="absolute bottom-10 right-40 h-20 w-20 rounded-full border border-white/10" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Left Side */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm mb-5">
            <HiOutlineSparkles className="text-[#10B981]" />

            <span className="text-sm text-white">
              Welcome to Masdar Skills Development
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            {getGreeting()},{" "}
            <span className="text-[#10B981]">{user?.fullName || "User"}</span>{" "}
            👋
          </h1>

          <p className="mt-4 text-slate-300 max-w-2xl leading-relaxed">
            Welcome back to your learning dashboard. Continue building
            professional skills, managing courses, and achieving your goals with
            Masdar Skills Development.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-xl bg-white/10 px-4 py-2 text-white text-sm backdrop-blur-sm">
              Role:{" "}
              <span className="font-semibold text-[#10B981]">
                {getRoleText()}
              </span>
            </div>

            <div className="rounded-xl bg-white/10 px-4 py-2 text-white text-sm backdrop-blur-sm">
              Status:{" "}
              <span className="font-semibold text-[#10B981]">Active</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center lg:justify-end">
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6 text-center min-w-[240px]">
            <img
              src={`http://localhost:5000/public/${user?.profileImage}`}
              alt={user?.fullName}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#10B981] mx-auto shadow-lg"
            />

            <h3 className="mt-4 text-xl font-bold text-white">
              {user?.fullName}
            </h3>

            <p className="text-slate-300 capitalize mt-1">{user?.role}</p>

            <div className="mt-5 flex items-center justify-center gap-2 text-[#10B981]">
              <HiOutlineAcademicCap size={22} />
              <span className="font-medium">Masdar Learning Portal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardWelcome;
