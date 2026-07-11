import { useState } from "react";
import { FiPlus, FiMinus, FiMessageCircle } from "react-icons/fi";
import { HiQuestionMarkCircle } from "react-icons/hi";

const faqs = [
  {
    id: 1,
    question: "How do I enroll in a course?",
    answer:
      "Browse available courses, select your preferred course, and click the enroll button to submit your enrollment request.",
  },
  {
    id: 2,
    question: "How does payment verification work?",
    answer:
      "After enrollment, payment instructions will be displayed. Students send the course fee to the institute's EVC Plus number and then share the payment screenshot through WhatsApp. An administrator verifies the payment and approves access to the course.",
  },
  {
    id: 3,
    question: "Can I access courses on my phone?",
    answer:
      "Yes. The platform is fully responsive and works on smartphones, tablets, laptops, and desktop computers.",
  },
  {
    id: 4,
    question: "Will I receive a certificate after completing a course?",
    answer:
      "Yes. Students who successfully complete their courses can receive a certificate of completion.",
  },
  {
    id: 5,
    question: "Can I learn at my own pace?",
    answer:
      "Yes. Students can access their enrolled courses and study according to their own schedule.",
  },
  {
    id: 6,
    question: "What types of courses are available?",
    answer:
      "The platform offers courses in Web Development, Graphic Design, Digital Marketing, English Language, Computer Skills, Business Skills, and other professional skill-development areas.",
  },
  {
    id: 7,
    question: "How do I contact support?",
    answer:
      "Students can contact the institute through phone, email, WhatsApp, or the contact page available on the website.",
  },
  {
    id: 8,
    question: "Do I need previous experience before joining a course?",
    answer:
      "No. Many courses are designed for beginners, while others are suitable for intermediate and advanced learners.",
  },
];

const FAQItem = ({ faq, activeId, setActiveId }) => {
  const isOpen = activeId === faq.id;

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-[#10B981] shadow-lg shadow-emerald-100"
          : "border-gray-100 hover:border-emerald-200 hover:shadow-md"
      }`}
    >
      <button
        onClick={() => setActiveId(isOpen ? null : faq.id)}
        className="w-full flex items-center justify-between text-left p-5"
      >
        <h3
          className={`font-semibold text-sm sm:text-base pr-4 transition-colors ${
            isOpen ? "text-[#10B981]" : "text-[#0F172A]"
          }`}
        >
          {faq.question}
        </h3>

        <div
          className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
            isOpen ? "bg-[#10B981] text-white" : "bg-slate-100 text-slate-500"
          }`}
        >
          {isOpen ? <FiMinus size={18} /> : <FiPlus size={18} />}
        </div>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-5 pb-5">
          <div className="h-px bg-slate-100 mb-4" />
          <p className="text-sm leading-relaxed text-slate-500">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [activeId, setActiveId] = useState(1);

  const leftColumn = faqs.slice(0, 4);
  const rightColumn = faqs.slice(4, 8);

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden bg-slate-50">
      {/* Decorative Background */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: "#10B981" }}
      />

      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: "#1E3A5F" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2 mb-5">
            <HiQuestionMarkCircle className="text-[#10B981]" />
            <span className="text-sm font-semibold text-[#10B981]">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight">
            Got Questions? We've Got{" "}
            <span className="text-[#10B981]">Answers</span>
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-slate-500 text-base sm:text-lg leading-relaxed">
            Find answers to the most common questions about courses, enrollment,
            payments, certificates, and learning on Masdar Skills Development.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-5">
            {leftColumn.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            ))}
          </div>

          <div className="space-y-5">
            {rightColumn.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="mt-16">
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
            }}
          >
            <div className="p-8 sm:p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6">
                <FiMessageCircle className="text-white text-3xl" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Still Have Questions?
              </h3>

              <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                Our team is ready to help you start your learning journey.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-7 py-3 rounded-xl bg-[#10B981] text-white font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/30">
                  Contact Us
                </button>

                <button className="px-7 py-3 rounded-xl bg-white text-[#0F172A] font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  Browse Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
