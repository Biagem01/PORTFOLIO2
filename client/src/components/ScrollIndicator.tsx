import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "viewallprojects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function ScrollIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Find which section is currently in viewport
      let currentIndex = 0;

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const elementTop = element.offsetTop;
          if (scrollPosition >= elementTop - windowHeight / 3) {
            currentIndex = index;
          }
        }
      });

      setActiveIndex(currentIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-8 right-6 z-40 hidden md:flex flex-col gap-4 items-end"
      data-testid="scroll-indicator-nav"
      data-cursor="hide"  // 👈 CURSORE ARANCIONE SPARISCE QUI
    >
      {sections.map((section, index) => (
        <motion.div
        
          key={section.id}
          initial={{ opacity: 0.4 }}
          animate={{ 
            opacity: activeIndex === index ? 1 : 0.35,
          }}
          transition={{ duration: 0.4 }}
          className="cursor-pointer font-display text-xs tracking-widest"
        >
        <a
  href={`#${section.id}`}
  data-cursor="hide"
  onClick={(e) => {
    e.preventDefault();
    const element = document.getElementById(section.id);
    element?.scrollIntoView({ behavior: "smooth" });
  }}

  className={`
    transition-all duration-300 font-medium relative block
    ${activeIndex === index ? "font-semibold opacity-100" : "opacity-80 hover:opacity-100"}
  `}

  style={{
    color:
      activeIndex === index
        ? "hsl(var(--scroll-indicator))"
        : "hsl(var(--foreground) / 0.55)",   // 🔥 molto più visibile
  }}
>
  <motion.span
    initial={false}
    whileHover={{ x: 6 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="inline-block font-extrabold"
  >
    {section.label}
  </motion.span>

  <motion.div
    className="absolute left-0 -bottom-1 h-[1px] bg-[hsl(var(--scroll-indicator))]"
    initial={{ width: 0 }}
    whileHover={{ width: "100%" }}
    transition={{ duration: 0.25, ease: "easeOut" }}
  />
</a>


        </motion.div>
      ))}

      {/* Animated line indicator - minimalist */}
      <motion.div
        className="absolute w-1.5 rounded-full"
        style={{
          height: "18px",
          backgroundColor: "hsl(var(--scroll-indicator))",
          right: "calc(100% + 8px)",
        }}
        animate={{
          top: `${activeIndex * (18 + 16)}px`,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
      />
    </div>
  );
}
