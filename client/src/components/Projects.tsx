import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useMotionTemplate,
} from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

/* -------------------------------------------
   PROJECT DATA
------------------------------------------- */
interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  year: string;
  category: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "Platform progettata e sviluppata per gestire prodotti, pagamenti e dashboard professionale.",
    tags: ["React", "TypeScript", "Stripe", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=1920&h=1080&fit=crop",
    year: "2024",
    category: "Web Development",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Dashboard real-time con data visualization, filtri avanzati e animazioni dinamiche.",
    tags: ["Next.js", "Chart.js", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop",
    year: "2024",
    category: "Data Visualization",
  },
  {
    title: "Social App",
    description:
      "App social completa con feed, gestione profili, chat in tempo reale e micro-animazioni.",
    tags: ["React", "Firebase", "Framer Motion"],
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&h=1080&fit=crop",
    year: "2023",
    category: "Mobile & Web",
  },
];

/* -------------------------------------------
   MAIN
------------------------------------------- */
export default function Projects() {
  const headerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start 80%", "end 20%"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.45], [0, 0.6, 1]);
  const titleBlur = useTransform(scrollYProgress, [0, 0.2, 0.45], [18, 10, 0]);
  const titleLift = useTransform(scrollYProgress, [0, 0.3, 0.7], [80, 30, 0]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.25, 0.7], [18, 10, 2]);
  const haloOpacity = useTransform(scrollYProgress, [0.1, 0.4, 1], [0, 0.4, 0.8]);
  const haloScale = useTransform(scrollYProgress, [0.1, 0.8], [0.75, 1.2]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.2, 0.55], [0.05, 0.2, 0]);

  const blurFilter = useMotionTemplate`blur(${titleBlur}px)`;
  const letterSpacingPx = useMotionTemplate`${letterSpacing}px`;

  return (
    <section id="projects" className="relative bg-background">
      {/* HEADER */}
      <div
        ref={headerRef}
        className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 md:pb-32 relative overflow-visible"
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end">
          {/* LEFT */}
          <div className="space-y-4">
            <motion.p
              className="text-xs md:text-sm uppercase tracking-[0.3em] text-foreground/50"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              data-cursor="big"
            >
              Selected Work
            </motion.p>

            <div className="relative">
              <motion.div
                style={{ opacity: haloOpacity, scale: haloScale }}
                className="pointer-events-none absolute inset-x-0 top-[-12px] h-28 md:h-36 rounded-full bg-[radial-gradient(circle_at_center,rgba(207,78,8,0.18),rgba(0,0,0,0))] blur-3xl"
              />

              <motion.h2
                data-cursor="big"
                style={{
                  opacity: titleOpacity,
                  filter: blurFilter,
                  y: titleLift,
                  letterSpacing: letterSpacingPx,
                }}
                className="relative text-[2.5rem] md:text-[3.75rem] lg:text-[4.75rem] font-extrabold tracking-tight leading-[1.05] text-[hsl(var(--scroll-indicator))] flex gap-4"
              >
                <span className="text-[hsl(var(--accent-orange))]/80">Featured</span>
                <span className="text-[hsl(var(--scroll-indicator))]">Projects</span>
              </motion.h2>

              <motion.span
                aria-hidden
                style={{ opacity: ghostOpacity, y: titleLift }}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-[3.5rem] md:text-[5rem] lg:text-[6rem] font-black tracking-[1.2rem] text-foreground/5 select-none"
              >
                FEATURED PROJECTS
              </motion.span>
            </div>
          </div>

          {/* RIGHT */}
          <motion.p
            className="text-sm md:text-base text-[hsl(var(--scroll-indicator))]/70 leading-relaxed font-light max-w-md md:ml-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            data-cursor="big"
          >
            Una selezione di progetti che rappresentano il mio approccio al
            design e allo sviluppo: pulito, funzionale, memorabile.
          </motion.p>
        </div>

        {/* DIVIDER LINE */}
        <motion.div
          className="h-px bg-[hsl(var(--scroll-indicator))]/20 mt-12 md:mt-16"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* FULLSCREEN PROJECT PANELS */}
      <div className="space-y-[5vh]">
        {projects.map((project, index) => (
          <ProjectPanel key={project.title} project={project} index={index} />
        ))}
      </div>

      {/* BOTTOM SPACING */}
      <div className="h-32" />
    </section>
  );
}

/* -------------------------------------------
   FULLSCREEN PROJECT PANEL
------------------------------------------- */
function ProjectPanel({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"],
  });

  // Animazioni basate sullo scroll
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.92, 1, 1, 0.92]);
  const imageX = useTransform(scrollYProgress, [0, 1], [120, 0]);

  // Mask reveal animation
  const maskPosition: MotionValue<string> = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["0%", "100%"]
  );

  // Content animations
  const titleY = useTransform(scrollYProgress, [0.1, 0.4], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.15, 0.45], [40, 0]);
  const descOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);

  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="h-[100vh] w-full relative flex items-center justify-center"
    >
      {/* CLICKABLE FULLSCREEN AREA */}
      <div
        className="absolute inset-0 cursor-pointer"
        data-cursor="view"
        onClick={() =>
          (window.location.href = `/project/${project.title
            .toLowerCase()
            .replace(/\s+/g, "-")}`)
        }
      >
        {/* IMAGE WITH MASK REVEAL */}
        <motion.div
          className="absolute inset-0 overflow-hidden will-change-transform"
          style={
            {
              "--pos": maskPosition,
              WebkitMaskImage:
                "linear-gradient(90deg, black 0%, black var(--pos), transparent calc(var(--pos) + 8%))",
              maskImage:
                "linear-gradient(90deg, black 0%, black var(--pos), transparent calc(var(--pos) + 8%))",
            } as React.CSSProperties
          }
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover will-change-transform"
            style={{ x: imageX }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* GRADIENT OVERLAYS */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--project-overlay))]/80 via-[hsl(var(--project-overlay))]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--project-overlay))]/60 via-transparent to-transparent" />
        </motion.div>

        {/* LIGHT BEAM EFFECT */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-transparent"
          style={{ opacity: 0.2, x: -150, rotate: -15 }}
        />
      </div>

      {/* PROJECT NUMBER - DECORATIVE */}
      <motion.span
        className="absolute top-1/2 -translate-y-1/2 right-8 md:right-16 text-[8rem] md:text-[14rem] lg:text-[18rem] font-extralight select-none pointer-events-none"
        style={{ 
          opacity: titleOpacity,
          WebkitTextStroke: '2px hsl(var(--accent-orange) / 0.6)',
          color: 'transparent',
          textShadow: '0 0 60px hsl(var(--accent-orange) / 0.3)'
        }}
      >
        {projectNumber}
      </motion.span>

      {/* CONTENT OVERLAY */}
      <motion.div
      
        className="absolute bottom-16 md:bottom-24 left-8 md:left-16 lg:left-24 z-20 max-w-2xl"
        style={{ opacity: titleOpacity, y: titleY }}
      >
        {/* CATEGORY & YEAR */}
        <motion.div
          className="flex items-center gap-4 mb-4"
          style={{ opacity: descOpacity, y: descY }}
        >
          <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[hsl(var(--accent-orange))]/80">
            {project.category}
          </span>
          <span className="w-8 h-px bg-[hsl(var(--scroll-indicator))]/40" />
          <span className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--scroll-indicator))]/60">
            {project.year}
          </span>
        </motion.div>

        {/* TITLE */}
        <h3
          className="
            text-4xl md:text-6xl lg:text-7xl 
            text-[hsl(var(--scroll-indicator))] tracking-tight 
            leading-[1.05]
            drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]
            font-extrabold
          "
          data-cursor="view"
        >
          {project.title}
        </h3>

        {/* DESCRIPTION */}
        <motion.p
          className="mt-5 text-base md:text-lg max-w-lg leading-relaxed text-[hsl(var(--scroll-indicator))]/80 font-light"
          style={{ opacity: descOpacity, y: descY }}
        >
          {project.description}
        </motion.p>

        {/* TAGS */}
        <motion.div
          className="flex flex-wrap mt-6 gap-2"
          style={{ opacity: descOpacity }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="
                px-4 py-2 
                text-xs 
                uppercase tracking-[0.15em]
                rounded-full 
                bg-white/5 
                border border-white/10 
                backdrop-blur-md 
                text-[hsl(var(--scroll-indicator))]/90
                font-medium
              "
            >
              {tag}
            </span>
          ))}
        </motion.div>

        
      </motion.div>
    </motion.div>
  );
}
