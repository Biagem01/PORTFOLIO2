import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile.jpg";

// Text reveal animation component
const TextReveal = ({ 
  text, 
  className = "", 
  delay = 0 
}: { 
  text: string; 
  className?: string; 
  delay?: number;
}) => {
  const characters = text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.015,
        delayChildren: delay 
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span key={index} variants={child}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Hero = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Profile Image - positioned above text */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.1,
              type: "spring",
              bounce: 0.4
            }}
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-border shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 opacity-40 mix-blend-overlay" />
              <img 
                src={profileImage} 
                alt="Biagio - Developer" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Title with letter animation */}
            <h1 className="text-3xl md:text-4xl font-light leading-tight mb-8">
              <TextReveal text="Hi, I'm Biagio." delay={0.3} />
              <br />
              <TextReveal text="I design and build digital experiences." delay={0.6} />
            </h1>

            {/* Subtitle 1 with letter animation */}
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-4 leading-relaxed">
              <TextReveal 
                text="Developer with a passion for clean interfaces, smooth interactions and meaningful products." 
                delay={1.2} 
              />
            </p>

            {/* Subtitle 2 with letter animation */}
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              <TextReveal 
                text="Currently focused on crafting modern web apps and experimenting with AI-driven user experiences." 
                delay={2.0} 
              />
            </p>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.8 }}
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
