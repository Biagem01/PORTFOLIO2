import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import ViewAllProjects from "@/components/ViewAllProjects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative">
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <About />
      <Projects />
      <ViewAllProjects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
