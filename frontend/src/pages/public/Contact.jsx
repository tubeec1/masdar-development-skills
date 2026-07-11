import {
  MdLocationOn,
  MdPhone,
  MdEmail,
  MdAccessTime,
  MdWhatsapp,
  MdCheckCircle,
  MdSend,
  MdSchool,
  MdPayments,
  MdVerified,
  MdMap,
} from "react-icons/md";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "Masdar Skills Development",
    email: "masdar@gmail.com",
    phone: "+252618994037",
    subject: " Inquiry about courses and enrollment",
    message:
      " Hello, I am interested in learning more about your courses and enrollment process. Please provide me with more information about the available courses, how to enroll, and any other relevant details. Thank you!",
  });

  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        "Browse courses and click the enroll button to submit your enrollment request.",
    },
    {
      question: "How do payments work?",
      answer:
        "Send payment to our EVC Plus number and share the screenshot through WhatsApp.",
    },
    {
      question: "Do I receive a certificate?",
      answer:
        "Yes. Students receive certificates after successfully completing courses.",
    },
    {
      question: "Can I learn on mobile?",
      answer: "Yes. The platform is fully responsive and works on all devices.",
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />

        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-flex px-4 py-2 rounded-full bg-emerald-50 text-[#10B981] font-semibold">
            Contact Masdar Skills Development
          </span>

          <h1 className="mt-6 text-5xl font-black text-[#0F172A] leading-tight">
            Let's Talk About Your{" "}
            <span className="text-[#10B981]">Learning Journey</span>
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-slate-600 text-lg">
            Have questions about courses, enrollment, payments, certificates, or
            training programs? Our team is ready to help.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 rounded-xl bg-[#10B981] text-white font-semibold">
              Browse Courses
            </button>

            <button className="px-6 py-3 rounded-xl border border-[#0F172A] text-[#0F172A] font-semibold">
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#10B981] font-semibold">Get In Touch</span>

            <h2 className="text-4xl font-bold text-[#0F172A] mt-3">
              Multiple Ways To Reach Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MdLocationOn,
                title: "Address",
                value: "Mogadishu, Somalia",
              },
              {
                icon: MdPhone,
                title: "Phone",
                value: "+252 61 8994037",
              },
              {
                icon: MdEmail,
                title: "Email",
                value: "info@masdarskills.com",
              },
              {
                icon: MdAccessTime,
                title: "Working Hours",
                value: "Sat - Thu | 8AM - 6PM",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg hover:border-[#10B981]"
              >
                <item.icon className="text-4xl text-[#10B981]" />
                <h3 className="font-bold text-[#0F172A] mt-4">{item.title}</h3>
                <p className="text-slate-500 mt-2">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + SUPPORT */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-6">
              Send Message
            </h3>

            <div className="space-y-4">
              <input
                placeholder="Full Name"
                className="w-full p-4 rounded-xl border"
              />

              <input
                placeholder="Email Address"
                className="w-full p-4 rounded-xl border"
              />

              <input
                placeholder="Phone Number"
                className="w-full p-4 rounded-xl border"
              />

              <input
                placeholder="Subject"
                className="w-full p-4 rounded-xl border"
              />

              <textarea
                rows="5"
                placeholder="Message"
                className="w-full p-4 rounded-xl border"
              />

              <button className="w-full bg-[#10B981] text-white py-4 rounded-xl font-semibold flex justify-center gap-2">
                <MdSend />
                Send Message
              </button>
            </div>
          </div>

          <div className="bg-[#0F172A] rounded-3xl p-8 text-white">
            <h3 className="text-3xl font-bold">We Respond Quickly</h3>

            <p className="mt-4 text-slate-300">
              Our support team is committed to helping students.
            </p>

            <div className="space-y-4 mt-8">
              {[
                "Fast Support",
                "Course Guidance",
                "Enrollment Assistance",
                "Payment Assistance",
              ].map((item) => (
                <div key={item} className="flex gap-3 items-center">
                  <MdCheckCircle className="text-[#10B981] text-xl" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-r from-[#10B981] to-green-600 rounded-3xl p-10 text-white text-center">
            <MdWhatsapp className="text-6xl mx-auto mb-4" />

            <h2 className="text-4xl font-bold">Need Immediate Assistance?</h2>

            <p className="mt-4">Contact us directly through WhatsApp.</p>

            <a
              href="https://wa.me/252618994037"
              className="inline-block mt-6 px-8 py-4 bg-white text-green-600 rounded-xl font-bold"
            >
              Chat On WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* PAYMENT PROCESS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-4xl font-bold text-[#0F172A] mb-12">
            How Course Payments Work
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Enroll In Course",
              "Send Payment To 618994037",
              "Send Screenshot Via WhatsApp",
              "Admin Verification & Access",
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <p className="mt-4 font-semibold text-[#0F172A]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-12 shadow-xl text-center">
            <MdMap className="text-6xl text-[#10B981] mx-auto" />

            <h2 className="text-3xl font-bold text-[#0F172A] mt-6">
              Our Location
            </h2>

            <p className="text-slate-600 mt-3">Masdar Skills Development</p>

            <p className="text-slate-600">Mogadishu, Somalia</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-[#0F172A] rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold">Ready To Start Learning?</h2>

            <p className="text-slate-300 mt-4">
              Browse our professional courses and start building practical
              skills today.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button className="px-6 py-3 rounded-xl bg-[#10B981] font-semibold">
                Browse Courses
              </button>

              <button className="px-6 py-3 rounded-xl bg-white text-[#0F172A] font-semibold">
                About Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
