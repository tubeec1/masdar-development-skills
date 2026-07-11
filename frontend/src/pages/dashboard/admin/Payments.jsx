import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  readPayments,
  verifyPayment,
  rejectPayment,
  dashboardCounts,
} from "../../../features/payment/paymentSlice";
import { HiCheck, HiX, HiEye, HiCurrencyDollar } from "react-icons/hi";

export default function AdminPaymentsPage() {
  const dispatch = useDispatch();
  const { payments, statistics, actionLoading, loading } = useSelector(
    (state) => state.payment,
  );

  useEffect(() => {
    dispatch(readPayments());
    dispatch(dashboardCounts());
  }, [dispatch]);

  const handleAction = async (id, action) => {
    if (action === "verify") await dispatch(verifyPayment(id));
    else await dispatch(rejectPayment(id));

    // Refresh data
    dispatch(readPayments());
    dispatch(dashboardCounts());
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Payment Center</h1>
          <p className="text-slate-500">
            Manage student transactions and verify enrollments.
          </p>
        </div>
        <div className="flex gap-4">
          <StatCard
            label="Pending"
            count={statistics?.pendingPayments}
            color="text-amber-600"
          />
          <StatCard
            label="Verified"
            count={statistics?.verifiedPayments}
            color="text-emerald-600"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-400">
            <tr className="uppercase text-[10px] tracking-wider font-bold">
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Reference</th>
              <th className="p-4 text-left">Method</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="font-semibold text-slate-800">
                    {p.studentName}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {p.studentEmail}
                  </div>
                </td>
                <td className="p-4 font-medium text-slate-600">
                  {p.courseTitle}
                </td>
                <td className="p-4 text-slate-500 font-mono text-xs">
                  {p.transactionReference}
                </td>
                <td className="p-4 text-slate-500">{p.paymentMethod}</td>
                <td className="p-4 text-right flex gap-2 justify-end">
                  {p.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleAction(p.id, "verify")}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                      >
                        <HiCheck size={18} />
                      </button>
                      <button
                        onClick={() => handleAction(p.id, "reject")}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                      >
                        <HiX size={18} />
                      </button>
                    </>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${p.status === "Verified" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}
                    >
                      {p.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, count, color }) {
  return (
    <div className="bg-white px-6 py-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
      <div className="text-slate-400">
        <HiCurrencyDollar size={24} />
      </div>
      <div>
        <div className="text-[10px] uppercase font-bold text-slate-400">
          {label}
        </div>
        <div className={`text-xl font-black ${color}`}>{count || 0}</div>
      </div>
    </div>
  );
}
