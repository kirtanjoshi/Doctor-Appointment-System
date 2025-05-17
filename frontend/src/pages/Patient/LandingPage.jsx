import React from 'react'
import HeroSection from "../../components/Landing Page/Hero Section/HeroSection";
import HowItWorks from "../../components/Landing Page/How it works/HowItWorks";
import DoctorSpecialties from "../../components/Landing Page/Choose Doctors/DoctorSpecialties";
import AboutUsSection from "../../components/Landing Page/About us section/AboutUsSection";
import TestimonialsV1 from "../../components/Landing Page/Testimonial/TestimonialsV1";
import InputDesign from "../../components/Landing Page/Section/InputDesign";
import FooterSection from "../../components/Landing Page/Footer Section/FooterSection";
const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <DoctorSpecialties />
      <AboutUsSection />
      <TestimonialsV1 />
      <InputDesign />
      <FooterSection />
    </>
  );
}

export default LandingPage