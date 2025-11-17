import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center px-6">
      <motion.div
        className="max-w-5xl"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-light leading-tight mb-12"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Hi, I’m Biagio.<br />
          I design and build digital experiences.
        </motion.h1>

        {/* Subtitle 1 */}
        <motion.p
          className="text-xl md:text-2xl text-foreground/80 max-w-3xl mb-6 leading-relaxed"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          Developer with a passion for clean interfaces, smooth interactions
          and meaningful products.
        </motion.p>

        {/* Subtitle 2 */}
        <motion.p
          className="text-xl md:text-2xl text-foreground/70 max-w-3xl mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
        >
          Currently focused on crafting modern web apps and experimenting with
          AI-driven user experiences.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
        >
          <Button variant="outline" size="lg" onClick={() => scrollToSection("projects")}>
            Projects
          </Button>

          <Button variant="outline" size="lg" onClick={() => scrollToSection("about")}>
            About Me
          </Button>

          <Button asChild variant="outline" size="lg">
            <a href="/resume.pdf" target="_blank">Resume</a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
