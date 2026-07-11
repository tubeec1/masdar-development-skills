import React from "react";
import CoursesHero from "../../components/public/CoursesHero";
import CoursesGrid from "../../components/public/CoursesGrid";
import CourseStats from "../../components/public/CourseStats";
import CourseCTASection from "../../components/public/CourseCTASection";

const Courses = () => {
  return (
    <div>
      <CoursesHero />
      <CoursesGrid />
      <CourseStats />

      <CourseCTASection />
    </div>
  );
};

export default Courses;
