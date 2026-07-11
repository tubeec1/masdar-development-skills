import {
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineCheckCircle,
  HiOutlineUserAdd,
} from "react-icons/hi";

const activities = [
  {
    id: 1,
    title: "New Student Enrollment",
    description: "Ahmed enrolled in React Development Course",
    time: "5 minutes ago",
    icon: HiOutlineAcademicCap,
  },
  {
    id: 2,
    title: "Course Created",
    description: "Advanced JavaScript course was published",
    time: "1 hour ago",
    icon: HiOutlineBookOpen,
  },
  {
    id: 3,
    title: "Certificate Issued",
    description: "Student completed UI/UX Design course",
    time: "3 hours ago",
    icon: HiOutlineCheckCircle,
  },
  {
    id: 4,
    title: "New User Registered",
    description: "A new student account was created",
    time: "Today",
    icon: HiOutlineUserAdd,
  },
];

const DashboardRecentActivity = () => {
  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-sm font-medium text-[#10B981]">
            Activity Feed
          </span>

          <h2 className="text-2xl font-bold text-[#0F172A] mt-1">
            Recent Activity
          </h2>
        </div>

        <button className="text-sm font-medium text-[#10B981] hover:underline">
          View All
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div key={activity.id} className="flex gap-4 group">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition">
                  <Icon className="text-2xl text-[#10B981]" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 border-b border-slate-100 pb-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-[#0F172A]">
                      {activity.title}
                    </h3>

                    <p className="text-slate-500 text-sm mt-1">
                      {activity.description}
                    </p>
                  </div>

                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardRecentActivity;
