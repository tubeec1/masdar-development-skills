import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseBySlug } from "../../features/course/courseSlice";
import { getCourseModules } from "../../features/module/moduleSlice";
import { getModuleLessons } from "../../features/lesson/lessonSlice";
import {
  enrollStudent,
  readStudentCourses,
} from "../../features/enrollment/enrollmentSlice";
import toast, { Toaster } from "react-hot-toast";
import {
  FiClock,
  FiGlobe,
  FiAward,
  FiLock,
  FiChevronDown,
  FiPlayCircle,
  FiCheckCircle,
} from "react-icons/fi";

// Robust YouTube ID Parser
const getYouTubeID = (url) => {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const ModuleAccordion = ({ module, isEnrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lessons, setLessons] = useState([]);
  const dispatch = useDispatch();

  const handleToggle = async () => {
    if (!isOpen && lessons.length === 0) {
      const result = await dispatch(getModuleLessons(module.id));
      if (result.payload?.lessons) setLessons(result.payload.lessons);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-slate-200 rounded-xl mb-3 overflow-hidden bg-white">
      <button
        onClick={handleToggle}
        className="w-full p-4 flex items-center justify-between font-bold text-slate-800 hover:bg-slate-50 transition-colors"
      >
        <span className="text-left">{module.title}</span>
        <FiChevronDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="border-t border-slate-100 p-4 bg-slate-50 space-y-2">
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center gap-3 text-sm text-slate-600 py-1"
              >
                {isEnrolled ? (
                  <FiPlayCircle className="text-emerald-500 shrink-0" />
                ) : (
                  <FiLock className="text-slate-400 shrink-0" />
                )}
                <span>{lesson.title}</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 italic">
              No lessons available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const CourseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentCourse } = useSelector((state) => state.course);
  const { courseModules } = useSelector((state) => state.module);
  const { user } = useSelector((state) => state.auth);
  const { myCourses, loading: enrollLoading } = useSelector(
    (state) => state.enrollment,
  );

  const isEnrolled = myCourses?.some((c) => c.id === currentCourse?.id);

  useEffect(() => {
    if (slug) {
      dispatch(getCourseBySlug(slug)).then((res) => {
        if (res.payload?.course) {
          dispatch(getCourseModules(res.payload.course.id));
        }
      });
      if (user) {
        dispatch(readStudentCourses());
      }
    }
  }, [dispatch, slug, user]);

  const handleEnroll = () => {
    if (!user) return toast.error("Please log in to enroll!");

    if (isEnrolled) {
      toast.error("You are already enrolled. Redirecting...", {
        duration: 2000,
      });
      return setTimeout(() => navigate("/my-enrollments"), 2000);
    }

    dispatch(enrollStudent(currentCourse.id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Enrolled successfully! Redirecting...", {
          duration: 2000,
        });
        setTimeout(() => navigate("/my-enrollments"), 2000);
      } else {
        toast.error(res.payload || "Enrollment failed.");
      }
    });
  };

  if (!currentCourse)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  const youtubeID = getYouTubeID(currentCourse.introVideo);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            {currentCourse.title}
          </h1>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
              <img
                src={`http://localhost:5000/${currentCourse.teacherImage}`}
                className="w-8 h-8 rounded-full object-cover"
                alt="Teacher"
              />
              <span className="font-medium text-sm">
                {currentCourse.teacherName}
              </span>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
              {currentCourse.categoryName}
            </span>
          </div>

          <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
            {youtubeID ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeID}`}
                allowFullScreen
                title="Intro Video"
              />
            ) : (
              <video controls className="w-full h-full">
                <source
                  src={`http://localhost:5000/${currentCourse.introVideo}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-4">About this course</h2>
            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
              {currentCourse.description}
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
            {courseModules.map((m) => (
              <ModuleAccordion key={m.id} module={m} isEnrolled={isEnrolled} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
            <div className="text-4xl font-extrabold text-[#10B981]">
              {Number(currentCourse.price) > 0
                ? `$${currentCourse.price}`
                : "Free"}
            </div>

            {isEnrolled ? (
              <div className="w-full py-4 bg-emerald-50 text-emerald-700 rounded-xl font-bold flex items-center justify-center gap-2">
                <FiCheckCircle /> Already Enrolled
              </div>
            ) : (
              <button
                onClick={handleEnroll}
                disabled={enrollLoading}
                className="w-full py-4 bg-[#0F172A] text-white rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
              >
                {enrollLoading ? "Processing..." : "Enroll Now"}
              </button>
            )}

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3 text-slate-600">
                <FiClock className="text-[#10B981]" /> {currentCourse.duration}
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <FiGlobe className="text-[#10B981]" /> {currentCourse.language}
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <FiAward className="text-[#10B981]" /> {currentCourse.level}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
