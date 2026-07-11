import React from "react";
import HeroSection from "../../components/public/HeroSection";
import CategoriesSection from "../../components/public/CategoriesSection";
import FeaturedCoursesSection from "../../components/public/FeaturedCoursesSection";
import WhyChooseSection from "../../components/public/WhyChooseSection";
import HowItWorksSection from "../../components/public/HowItWorksSection";
import TestimonialsSection from "../../components/public/TestimonialsSection";
import FAQSection from "../../components/public/FAQSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <FeaturedCoursesSection />
      <WhyChooseSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
};

export default Home;
