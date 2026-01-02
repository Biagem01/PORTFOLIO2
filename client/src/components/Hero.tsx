import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile.jpg";

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
    visible: () => ({
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
export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 md:px-12"
      
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl mx-auto text-center"
      >

        {/* YOUR NAME — stile Minh Pham */}
      <motion.p
        className="
          uppercase 
          text-[0.75rem] md:text-[0.85rem]
          tracking-[0.35em]
          text-foreground/50
          mb-8
          font-light
        "
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        
      >
        biagio cubisino
      </motion.p>
        {/* HERO VERTICALE */}
        <h1
          className="
            text-[3rem]
            md:text-[4.5rem]
            lg:text-[6rem]
            font-extrabold  
            leading-[1.05]
            tracking-tight
            select-none
            text-center
            
          "
          data-cursor="big"
        >
          {/* WORD 1 */}
          <span className="block text-[hsl(var(--scroll-indicator))]">
            <TextReveal text="CRAFTING" delay={0.15} />
          </span>

          {/* WORD 2 — ORANGE */}
          <span className="block" style={{ color: "#EB5939" }}>
            <TextReveal text="MODERN" delay={0.35} />
          </span>

          {/* WORD 3 */}
          <span className="block text-[hsl(var(--scroll-indicator))]">
            <TextReveal text="DIGITAL" delay={0.55} />
          </span>

          {/* WORD 4 — ORANGE */}
          <span className="block  text-[hsl(var(--accent-orange))]/80">
            <TextReveal text="EXPERIENCES" delay={0.75} />
          </span>

          {/* WORD 5 */}
          <span className="block text-[hsl(var(--scroll-indicator))]">
            <TextReveal text="DAILY" delay={0.95} />
          </span>
        </h1>

        {/* SUBTEXT — CENTRATO */}
        <p
          className="
            mt-10
            text-[1.15rem]
            md:text-[1.35rem]
            font-light
            leading-relaxed
            text-center
            text-[hsl(var(--scroll-indicator))]
            max-w-2xl mx-auto
          "
          data-cursor="big"
        >
          
        </p>
      </motion.div>
    </section>
  );
}