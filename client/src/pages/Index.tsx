import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="relative">
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <About />
      <Projects />
      <Contact />
    </div>
  );
};

export default Index;
