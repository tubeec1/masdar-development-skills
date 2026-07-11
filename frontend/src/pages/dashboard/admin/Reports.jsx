import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  overviewReport,
  studentReport,
  teacherReport,
  courseReport,
  enrollmentReport,
  paymentReport,
} from "../../../features/report/reportSlice";
import {
  HiChartPie,
  HiUsers,
  HiAcademicCap,
  HiBookOpen,
  HiCurrencyDollar,
  HiClipboardList,
} from "react-icons/hi";

export default function Reports() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("overview");
  const report = useSelector((state) => state.report);

  useEffect(() => {
    const actions = {
      overview: overviewReport,
      students: studentReport,
      teachers: teacherReport,
      courses: courseReport,
      enrollments: enrollmentReport,
      payments: paymentReport,
    };
    dispatch(actions[activeTab]());
  }, [dispatch, activeTab]);

  const tabs = [
    { id: "overview", label: "Overview", icon: <HiChartPie /> },
    { id: "students", label: "Students", icon: <HiUsers /> },
    { id: "teachers", label: "Teachers", icon: <HiAcademicCap /> },
    { id: "courses", label: "Courses", icon: <HiBookOpen /> },
    { id: "enrollments", label: "Enrollments", icon: <HiClipboardList /> },
    { id: "payments", label: "Payments", icon: <HiCurrencyDollar /> },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-black text-slate-900 mb-6">
        System Reports
      </h1>
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-lg" : "bg-white text-slate-600 border border-slate-200"}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {report.loading ? (
          <div className="p-20 text-center text-slate-400 font-bold">
            Loading...
          </div>
        ) : (
          renderTable(activeTab, report)
        )}
      </div>
    </div>
  );
}

function renderTable(tab, data) {
  switch (tab) {
    case "overview":
      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-8">
          {data.overview &&
            Object.entries(data.overview.users).map(([k, v]) => (
              <div key={k} className="p-6 bg-slate-50 rounded-xl border">
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  {k}
                </p>
                <p className="text-2xl font-black">{v}</p>
              </div>
            ))}
        </div>
      );
    case "students":
      return (
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Courses</th>
              <th className="p-4">Approved</th>
              <th className="p-4">Pending</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.students.map((s) => (
              <tr key={s.id}>
                <td className="p-4 font-medium">{s.fullName}</td>
                <td className="p-4">{s.totalCourses}</td>
                <td className="p-4 text-emerald-600">{s.approvedCourses}</td>
                <td className="p-4 text-amber-600">{s.pendingCourses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "teachers":
      return (
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Total Courses</th>
              <th className="p-4">Students</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.teachers.map((t) => (
              <tr key={t.id}>
                <td className="p-4 font-medium">{t.fullName}</td>
                <td className="p-4">{t.totalCourses}</td>
                <td className="p-4">{t.totalStudents}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "courses":
      return (
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold">
            <tr>
              <th className="p-4">Course</th>
              <th className="p-4">Teacher</th>
              <th className="p-4">Students</th>
              <th className="p-4">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.courses.map((c) => (
              <tr key={c.id}>
                <td className="p-4 font-medium">{c.title}</td>
                <td className="p-4">{c.teacherName}</td>
                <td className="p-4">{c.totalStudents}</td>
                <td className="p-4">${c.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "enrollments":
      return (
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold">
            <tr>
              <th className="p-4">Student</th>
              <th className="p-4">Course</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.enrollments.map((e) => (
              <tr key={e.id}>
                <td className="p-4">{e.studentName}</td>
                <td className="p-4">{e.courseTitle}</td>
                <td className="p-4">{e.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "payments":
      return (
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold">
            <tr>
              <th className="p-4">Student</th>
              <th className="p-4">Course</th>
              <th className="p-4">Ref</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.payments.map((p) => (
              <tr key={p.id}>
                <td className="p-4">{p.studentName}</td>
                <td className="p-4">{p.courseTitle}</td>
                <td className="p-4 font-mono">{p.transactionReference}</td>
                <td className="p-4 font-bold">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    default:
      return null;
  }
}
