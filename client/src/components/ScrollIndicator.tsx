import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "viewallprojects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function ScrollIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      let currentIndex = 0;
      sections.forEach((section, index) => {
        const el = document.getElementById(section.id);
        if (!el) return;

        const top = el.offsetTop;
        if (scrollPosition >= top - windowHeight / 3) currentIndex = index;
      });

      setActiveIndex(currentIndex);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // layout constants (coerenti per calcolare il cursore)
  const itemH = 18; // altezza “visiva” del testo
  const gap = 16; // gap-4 = 16px
  const cursorH = 10; // pallino/linea
  const cursorOffsetY = 4; // centratura

  return (
    <nav
      className="fixed top-8 right-6 z-40 hidden md:flex flex-col gap-4 items-end"
      data-testid="scroll-indicator-nav"
      data-cursor="hide"
      aria-label="Section navigation"
    >
      {sections.map((section, index) => {
        const isActive = activeIndex === index;

        return (
          <motion.div
            key={section.id}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 6, filter: "blur(10px)" }}
            animate={{ opacity: isActive ? 1 : 0.55, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.02 + index * 0.03 }}
            className="relative"
          >
            <a
              href={`#${section.id}`}
              data-cursor="hide"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={[
                "group relative block select-none",
                "text-[0.6rem] md:text-[0.65rem] tracking-[0.35em] uppercase",
                // ⚠️ NON usare font-bold/font-semibold (nel tuo CSS diventano arancioni)
                "font-extrabold",
                "transition-opacity duration-300",
                isActive ? "opacity-100" : "opacity-80 hover:opacity-100",
              ].join(" ")}
              style={{
                color: isActive
                  ? "hsl(var(--scroll-indicator))"
                  : "hsl(var(--scroll-indicator) / 0.55)",
              }}
            >
              {/* micro slide come Minh */}
              <motion.span
                initial={false}
                whileHover={reduce ? undefined : { x: 6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="inline-block"
              >
                {section.label}
              </motion.span>

              {/* underline on hover */}
              <span className="pointer-events-none absolute left-0 -bottom-1 h-px w-full overflow-hidden">
                <span className="absolute inset-0 bg-[hsl(var(--scroll-indicator))]/15" />
                <span className="absolute inset-0 bg-[hsl(var(--scroll-indicator))] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </a>
          </motion.div>
        );
      })}

      {/* cursor (pallino/linea) a sinistra, animato */}
      <motion.div
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: 8,
          height: cursorH,
          backgroundColor: "hsl(var(--scroll-indicator))",
          right: "calc(100% + 10px)",
          boxShadow: "0 0 18px hsl(var(--scroll-indicator) / 0.35)",
        }}
        animate={{
          top: `${activeIndex * (itemH + gap) + cursorOffsetY}px`,
        }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 22,
        }}
      />
    </nav>
  );
}
