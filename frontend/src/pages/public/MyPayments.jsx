import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readStudentPayments } from "../../features/payment/paymentSlice";

const MyPayments = () => {
  const dispatch = useDispatch();
  const { payments, loading } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(readStudentPayments());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Updated Header Design */}
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
            My Payments
          </div>
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">
            Track Your <span className="text-[#10B981]">Financial History</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Review all your submitted payments, transaction status, and history
            for your enrolled professional programs.
          </p>
        </header>

        {/* Loading and Data Display */}
        {loading ? (
          <div className="text-center py-20 text-slate-500">
            Loading your payment history...
          </div>
        ) : payments?.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl text-center border border-slate-200 shadow-sm">
            <p className="text-slate-500">No payment records found.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {payments?.map((payment) => (
              <div
                key={payment.id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:5000/${payment.courseThumbnail}`}
                    className="w-16 h-16 rounded-lg object-cover"
                    alt={payment.courseTitle}
                  />
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      {payment.courseTitle}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Method: {payment.paymentMethod}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Ref: {payment.transactionReference}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-slate-900">
                    ${payment.amount}
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      payment.status === "Pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {payment.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-2">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPayments;
