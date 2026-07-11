import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readStudentCourses } from "../../features/enrollment/enrollmentSlice";
import {
  createPayment,
  clearPaymentState,
} from "../../features/payment/paymentSlice";
import toast, { Toaster } from "react-hot-toast";

const PAYMENT_METHODS = [
  "EVC Plus",
  "Zaad",
  "Sahal",
  "Premier Wallet",
  "Edahab",
  "Bank Transfer",
];

const MyEnrollments = () => {
  const dispatch = useDispatch();
  const { myCourses, loading } = useSelector((state) => state.enrollment);
  const { actionLoading, success, message } = useSelector(
    (state) => state.payment,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [payments, setPayments] = useState([]);
  const [paymentData, setPaymentData] = useState({
    phoneNumber: "",
    transactionReference: "",
    paymentMethod: PAYMENT_METHODS[0],
    paymentScreenshot: null,
  });

  useEffect(() => {
    dispatch(readStudentCourses());

    const fetchPayments = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/payments/my-payments",
        );
        const data = await res.json();
        if (data.success) {
          setPayments(data.payments);
        }
      } catch (error) {
        console.error("Failed to fetch payments", error);
      }
    };
    fetchPayments();
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(message || "Payment submitted successfully!");
      setIsModalOpen(false);
      setPaymentData({
        phoneNumber: "",
        transactionReference: "",
        paymentMethod: PAYMENT_METHODS[0],
        paymentScreenshot: null,
      });
      dispatch(clearPaymentState());
      dispatch(readStudentCourses());
    }
  }, [success, message, dispatch]);

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseId", selectedCourse.courseId);
    formData.append("phoneNumber", paymentData.phoneNumber);
    formData.append("transactionReference", paymentData.transactionReference);
    formData.append("paymentMethod", paymentData.paymentMethod);
    formData.append("paymentScreenshot", paymentData.paymentScreenshot);

    dispatch(createPayment(formData));
  };

  if (loading)
    return <div className="p-20 text-center">Loading enrollments...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-6">
      <Toaster />
      <div className="max-w-5xl mx-auto">
        {/* Updated Header Design */}
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
            My Enrollments
          </div>
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">
            Manage Your{" "}
            <span className="text-[#10B981]">Enrolled Programs</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            View your current enrollments and complete payments to gain full
            access to your expert-led professional courses.
          </p>
        </header>

        <div className="grid gap-6">
          {myCourses?.map((enrollment) => {
            const hasExistingPayment = payments.some(
              (p) => p.courseId === enrollment.courseId,
            );

            return (
              <div
                key={enrollment.id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:5000/${enrollment.courseThumbnail}`}
                    className="w-20 h-20 rounded-lg object-cover"
                    alt=""
                  />
                  <div>
                    <h3 className="font-bold text-lg">
                      {enrollment.courseTitle}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Status:
                      <span
                        className={`ml-2 font-semibold ${
                          enrollment.status === "Pending"
                            ? "text-amber-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {enrollment.status}
                      </span>
                    </p>
                  </div>
                </div>

                {enrollment.status === "Pending" && !hasExistingPayment && (
                  <button
                    onClick={() => {
                      setSelectedCourse(enrollment);
                      setIsModalOpen(true);
                    }}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleSubmitPayment}
            className="bg-white p-8 rounded-2xl w-full max-w-md space-y-4"
          >
            <h2 className="text-xl font-bold">Complete Payment</h2>
            <p className="text-sm text-slate-500">
              Course: {selectedCourse?.courseTitle}
            </p>

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-3 border rounded-lg"
              onChange={(e) =>
                setPaymentData({ ...paymentData, phoneNumber: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Transaction Reference"
              className="w-full p-3 border rounded-lg"
              onChange={(e) =>
                setPaymentData({
                  ...paymentData,
                  transactionReference: e.target.value,
                })
              }
              required
            />

            <select
              className="w-full p-3 border rounded-lg"
              onChange={(e) =>
                setPaymentData({
                  ...paymentData,
                  paymentMethod: e.target.value,
                })
              }
            >
              {PAYMENT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>

            <div className="space-y-1">
              <label className="text-sm font-medium">Upload Screenshot</label>
              <input
                type="file"
                className="w-full p-2 border rounded-lg"
                onChange={(e) =>
                  setPaymentData({
                    ...paymentData,
                    paymentScreenshot: e.target.files[0],
                  })
                }
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 p-3 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={actionLoading}
                className="flex-1 p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
              >
                {actionLoading ? "Processing..." : "Submit Payment"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyEnrollments;
