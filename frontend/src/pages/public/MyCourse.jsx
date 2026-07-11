import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseBySlug } from "../../features/course/courseSlice";
import { getCourseModules } from "../../features/module/moduleSlice";
import { getModuleLessons, getLesson } from "../../features/lesson/lessonSlice";
import {
  FiChevronDown,
  FiPlayCircle,
  FiLoader,
  FiCheckCircle,
} from "react-icons/fi";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : "";
};

const ModuleAccordion = ({ module, onSelectLesson, activeLessonId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = async () => {
    if (!isOpen && lessons.length === 0) {
      setLoading(true);
      const result = await dispatch(getModuleLessons(module.id));
      if (result.payload?.lessons) setLessons(result.payload.lessons);
      setLoading(false);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-slate-800">
      <button
        onClick={handleToggle}
        className="w-full p-4 flex items-center justify-between font-medium text-slate-300 hover:bg-slate-800 transition-all"
      >
        <span className="text-sm truncate pr-2">{module.title}</span>
        {loading ? (
          <FiLoader className="animate-spin text-emerald-500" />
        ) : (
          <FiChevronDown
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {isOpen && (
        <div className="bg-slate-950 p-2 space-y-1">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className={`w-full flex items-center gap-3 text-sm py-3 px-4 rounded-lg transition-all ${
                activeLessonId === lesson.id
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <FiPlayCircle className="shrink-0" />
              <span className="truncate">{lesson.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const MyCourse = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { currentCourse } = useSelector((state) => state.course);
  const { courseModules } = useSelector((state) => state.module);
  const { currentLesson, loading: lessonLoading } = useSelector(
    (state) => state.lesson,
  );

  const [activeLessonId, setActiveLessonId] = useState(null);

  useEffect(() => {
    if (slug) {
      dispatch(getCourseBySlug(slug)).then((res) => {
        if (res.payload?.course) {
          dispatch(getCourseModules(res.payload.course.id));
        }
      });
    }
  }, [dispatch, slug]);

  // Auto-select first lesson
  useEffect(() => {
    if (courseModules?.length > 0 && !activeLessonId) {
      dispatch(getModuleLessons(courseModules[0].id)).then((res) => {
        if (res.payload?.lessons?.length > 0) {
          handleSelectLesson(res.payload.lessons[0].id);
        }
      });
    }
  }, [courseModules]);

  const handleSelectLesson = (lessonId) => {
    setActiveLessonId(lessonId);
    dispatch(getLesson(lessonId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* PROFESSIONAL DARK SIDEBAR */}
      <div className="w-80 h-full border-r border-slate-200 overflow-y-auto bg-slate-900 flex flex-col shadow-2xl">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-white font-bold text-lg leading-snug">
            {currentCourse?.title || "Course"}
          </h2>
          <p className="text-emerald-500 text-xs mt-2 font-semibold uppercase tracking-wider">
            Course Content
          </p>
        </div>
        <div className="flex-1">
          {courseModules?.map((m) => (
            <ModuleAccordion
              key={m.id}
              module={m}
              onSelectLesson={handleSelectLesson}
              activeLessonId={activeLessonId}
            />
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 h-full overflow-y-auto p-4 md:p-12">
        {lessonLoading ? (
          <div className="h-full flex items-center justify-center flex-col gap-4 text-emerald-600">
            <FiLoader className="animate-spin text-5xl" />
            <p className="font-semibold">Loading lesson content...</p>
          </div>
        ) : currentLesson ? (
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white border-4 border-slate-100">
              {currentLesson.videoProvider === "youtube" ? (
                <iframe
                  src={getYouTubeEmbedUrl(currentLesson.videoUrl)}
                  title="Lesson Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  key={currentLesson.id}
                  src={`http://localhost:5000/${currentLesson.videoUrl}`}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              )}
            </div>

            <div className="bg-white p-10 mt-8 rounded-3xl shadow-sm border border-slate-200">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {currentLesson.title}
              </h1>
              <div className="flex items-center gap-4 mt-6">
                <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase">
                  {currentLesson.duration}
                </span>
              </div>
              <div className="prose prose-slate mt-8 max-w-none text-slate-600 leading-relaxed text-lg">
                {currentLesson.description}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400">
            Select a lesson to begin.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourse;
