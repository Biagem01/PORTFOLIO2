import {
  motion,
  useScroll,
  useTransform,

  useMotionTemplate,
  useInView,
} from "framer-motion";
import { useEffect, useRef } from "react";

  MotionValue,
  useMotionTemplate,

  useInView,
} from "framer-motion";
import { useEffect, useRef } from "react";



import { ArrowUpRight } from "lucide-react";


/* -------------------------------------------
   PROJECT DATA
------------------------------------------- */
interface Project {
  title: string;
  description: string;
  tags: string[];
  video: string;

  poster: string;


  year: string;
  category: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "Platform progettata e sviluppata per gestire prodotti, pagamenti e dashboard professionale.",
    tags: ["React", "TypeScript", "Stripe", "Tailwind CSS"],

    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster:
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80",

    video: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",

    year: "2024",
    category: "Web Development",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Dashboard real-time con data visualization, filtri avanzati e animazioni dinamiche.",
    tags: ["Next.js", "Chart.js", "PostgreSQL"],

    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/beer.mp4",
    poster:
      "https://images.unsplash.com/photo-1521790945508-bf2a36314e85?auto=format&fit=crop&w=1600&q=80",

    video: "https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4",

    year: "2024",
    category: "Data Visualization",
  },
  {
    title: "Social App",
    description:
      "App social completa con feed, gestione profili, chat in tempo reale e micro-animazioni.",
    tags: ["React", "Firebase", "Framer Motion"],

    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",

    video: "https://storage.googleapis.com/coverr-main/mp4/Bridge.mp4",

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

  const letterSpacing = useTransform(scrollYProgress, [0, 0.25, 0.7], [16, 10, 4]);




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



                className="relative text-[2.5rem] md:text-[3.75rem] lg:text-[4.75rem] font-extrabold tracking-tight leading-[1.05] text-[hsl(var(--scroll-indicator))] flex gap-4 uppercase"
              >
                <span className="text-[hsl(var(--accent-orange))]/85">FEATURED</span>
                <span className="text-[hsl(var(--scroll-indicator))]">PROJECTS</span>


                className="relative text-[2.5rem] md:text-[3.75rem] lg:text-[4.75rem] font-extrabold tracking-tight leading-[1.05] text-[hsl(var(--scroll-indicator))] flex gap-4"
             
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
            className="text-sm md:text-base text-foreground/65 leading-relaxed font-normal max-w-md md:ml-auto"
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
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"],
  });

  const isInView = useInView(ref, { amount: 0.45, margin: "0px" });

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isInView]);

  // Animazioni basate sullo scroll
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0.9, 1, 0.95, 0.84]);
  const imageX = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const depthTilt = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -4]);
  const lift = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 18, 0, -28]);

  // Content animations
  const titleY = useTransform(scrollYProgress, [0.1, 0.4], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.15, 0.45], [40, 0]);
  const descOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);

  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, rotateX: depthTilt, y: lift }}
      className="h-[100vh] w-full relative flex items-center justify-center"
    >
      {/* CLICKABLE FULLSCREEN AREA */}
      <motion.button
        className="absolute inset-0 cursor-pointer"
        data-cursor="view"
        onClick={() => {
          const slug = project.title.toLowerCase().replace(/\s+/g, "-");
          window.location.href = `/project/${slug}`;
        }}
        style={{ border: "none", background: "transparent", padding: 0 }}
      >

        {/* VIDEO BACKDROP */}
        <motion.div className="absolute inset-0 overflow-hidden will-change-transform rounded-[32px] border border-white/10 bg-black">

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

          <motion.video
            ref={videoRef}
            src={project.video}
            className="w-full h-full object-cover will-change-transform"
            style={{ x: imageX }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture

            controls={false}
            poster={project.poster}

          />

          {/* GRADIENT OVERLAYS */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--project-overlay))]/85 via-[hsl(var(--project-overlay))]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--project-overlay))]/55 via-transparent to-transparent" />
        </motion.div>

        {/* LIGHT SHEEN */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/8 via-transparent to-transparent"
          style={{ opacity: 0.35, x: -120, rotate: -12 }}
        />
      </motion.button>

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
