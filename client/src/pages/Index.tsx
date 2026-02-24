import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import { Projects } from "@/components/Projects";
import SectionDivider from "@/components/SectionDivider";
import ViewAllProjects from "@/components/ViewAllProjects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingSocials from "@/components/FloatingSocials";

const Index = () => {
  const [location] = useLocation();

  return (
    <div className="relative">
      <Navbar />
      <FloatingSocials />
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>

      {/* Divider "Selected Works" tra About e Projects */}
      <SectionDivider />

      <div id="projects">
        <Projects />
      </div>
      <div id="viewallprojects">
        <ViewAllProjects />
      </div>
      <div id="education">
        <Education key={location} />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
