import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
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
    poster: "",
    year: "2024",
    category: "Web Development",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Dashboard real-time con data visualization, filtri avanzati e animazioni dinamiche.",
    tags: ["Next.js", "Chart.js", "PostgreSQL"],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/beer.mp4",
    poster: "",
    year: "2024",
    category: "Data Visualization",
  },
  {
    title: "Social App",
    description:
      "App social completa con feed, gestione profili, chat in tempo reale e micro-animazioni.",
    tags: ["React", "Firebase", "Framer Motion"],
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster: "",
    year: "2023",
    category: "Mobile & Web",
  },
];

/* -------------------------------------------
   HELPERS
------------------------------------------- */
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (t: number) => t * t * (3 - 2 * t);

/** progress locale 0..1 per una slide i-esima */
function getLocalProgress(p: number, index: number, total: number) {
  const span = 1 / total;
  const start = index / total;

  // preroll leggero per evitare "stacchi" al primo frame
  const pre = index === 0 ? span * 0.18 : span * 0.12;
  return clamp01((p - (start - pre)) / (span + pre));
}

/** rimappa t in una finestra [a..b] -> 0..1 */
function range01(t: number, a: number, b: number) {
  return clamp01((t - a) / (b - a));
}

/* -------------------------------------------
   DESCRIPTION ACCENT (italic + orange hits)
------------------------------------------- */
function AccentDescription({ text }: { text: string }) {
  const words = text.split(" ");

  const hot = new Set([
    "gestire",
    "prodotti,",
    "pagamenti,",
    "pagamenti",
    "dashboard",
    "real-time",
    "visualization,",
    "visualization",
    "filtri",
    "avanzati",
    "animazioni",
    "dinamiche.",
    "dinamiche",
    "chat",
    "tempo",
    "reale",
    "micro-animazioni.",
    "micro-animazioni",
    "profili,",
    "profili",
    "feed,",
    "feed",
  ]);

  return (
    <>
      {words.map((w, idx) => {
        const clean = w.replace(/[.,]/g, "");
        const isHot = hot.has(w) || hot.has(clean);

        return (
          <span
            key={`${w}-${idx}`}
            data-cursor="hide"
            className={
              isHot
                ? "text-[rgb(var(--hero-orange))] font-semibold"
                : "text-[rgb(var(--hero-gold))]/85 font-normal"
            }
          >
            {w}
            {idx < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </>
  );
}


/* -------------------------------------------
   MAIN
------------------------------------------- */
export default function Projects() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start 80%", "end 20%"],
  });

  const titleOpacity = useTransform(headerProgress, [0, 0.2, 0.45], [0, 0.6, 1]);
  const titleBlur = useTransform(headerProgress, [0, 0.2, 0.45], [18, 10, 0]);
  const titleLift = useTransform(headerProgress, [0, 0.3, 0.7], [80, 30, 0]);
  const letterSpacing = useTransform(headerProgress, [0, 0.25, 0.7], [10, 6, 2]);

  const haloOpacity = useTransform(headerProgress, [0.1, 0.4, 1], [0, 0.4, 0.8]);
  const haloScale = useTransform(headerProgress, [0.1, 0.8], [0.75, 1.2]);
  const ghostOpacity = useTransform(headerProgress, [0, 0.2, 0.55], [0.05, 0.2, 0]);

  const blurFilter = useMotionTemplate`blur(${titleBlur}px)`;
  const letterSpacingPx = useMotionTemplate`${letterSpacing}px`;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const smoothGlobal = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 1.25,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(smoothGlobal, "change", (p) => {
    const n = projects.length;
    const clamped = clamp01(p);
    const scaled = clamped * (n - 1);
    setActiveIndex(Math.round(scaled));
  });

  return (
    <section id="projects" className="relative bg-background">
      {/* HEADER */}
      <div
        ref={headerRef}
        className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 md:pb-32 relative overflow-visible"
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end">
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
                className="
                  relative
                  font-extrabold
                  uppercase
                  leading-[0.95]
                  tracking-tight
                  text-[hsl(var(--scroll-indicator))]
                  flex flex-wrap items-center justify-center
                  gap-x-3 gap-y-1
                  text-[clamp(2.15rem,10vw,4.75rem)]
                "
              >
                <span className="text-[hsl(var(--accent-orange))]/85">FEATURED</span>
                <span className="text-[hsl(var(--scroll-indicator))]">PROJECTS</span>
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
        </div>

        <motion.div
          className="h-px bg-[hsl(var(--scroll-indicator))]/20 mt-12 md:mt-16"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* SCROLL AREA */}
      <section
        ref={wrapperRef}
        className="relative"
        style={{ height: `${projects.length * 260}vh` }}
      >
        <div 
          className="sticky top-0 h-screen w-full overflow-hidden bg-black"
          style={{ contain: "layout style paint" }}
        >
          {projects.map((p, i) => (
            <ProjectPlayReelSlide
              key={p.title}
              project={p}
              index={i}
              total={projects.length}
              progress={smoothGlobal}
              activeIndex={activeIndex}
            />
          ))}
        </div>
      </section>

      <div className="h-24" />
    </section>
  );
}

/* -------------------------------------------
   PLAY REEL SLIDE
------------------------------------------- */
function ProjectPlayReelSlide({
  project,
  index,
  total,
  progress,
  activeIndex,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  activeIndex: number;
}) {
  const vref = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  const localRaw = useTransform(progress, (p) => getLocalProgress(p, index, total));
  const local = useTransform(localRaw, (t) => smoothstep(t));

  const appearT = useTransform(local, (t) => smoothstep(range01(t, 0.0, 0.12)));
  const growT = useTransform(local, (t) => smoothstep(range01(t, 0.12, 0.72)));
  const exitT = useTransform(local, (t) => smoothstep(range01(t, 0.84, 1.0)));

  const slideOpacity = useTransform(
    [appearT, exitT] as const,
    ([a, e]: [number, number]) => {
      if (!ready) return 0;
      return a * (1 - e);
    }
  );

  const widthVw = useTransform(growT, (t) => lerp(58, 100, t));
  const heightVh = useTransform(growT, (t) => lerp(42, 100, t));
  const radiusPx = useTransform(growT, (t) => lerp(28, 0, t));
  const shadowOpacity = useTransform(growT, (t) => lerp(0.65, 0.0, t));

  const w = useTransform(widthVw, (v) => `${v}vw`);
  const h = useTransform(heightVh, (v) => `${v}vh`);
  const r = useTransform(radiusPx, (v) => `${v}px`);

  const panX = useTransform(growT, (t) => lerp(14, 0, t));
  const panY = useTransform(growT, (t) => lerp(18, 0, t));
  const zoom = useTransform(growT, (t) => lerp(1.04, 1.0, t));

  const grade = useTransform(growT, (t) => {
    const sat = 1 + 0.18 * (1 - t);
    const cont = 1 + 0.08 * (1 - t);
    const bright = 1 - 0.05 * (1 - t);
    return `saturate(${sat}) contrast(${cont}) brightness(${bright})`;
  });

  const sweepOpacity = useTransform(growT, (t) => 0.18 * (1 - t));
  const sweepX = useTransform(growT, (t) => `${-30 + 160 * t}%`);

  const textOpacity = useTransform(local, (t) => {
    const on = smoothstep(range01(t, 0.18, 0.36));
    const off = 1 - smoothstep(range01(t, 0.86, 1.0));
    return on * off;
  });

  const textY = useTransform(growT, (t) => lerp(12, 0, t));
  const textBlur = useTransform(growT, (t) => lerp(10, 0, t));
  const textFilter = useMotionTemplate`blur(${textBlur}px)`;

  const boxShadow = useMotionTemplate`0 30px 120px rgba(0,0,0,${shadowOpacity})`;

  const projectNumber = useMemo(() => String(index + 1).padStart(2, "0"), [index]);

  const goToProject = () => {
    const slug = project.title.toLowerCase().replace(/\s+/g, "-");
    window.location.href = `/project/${slug}`;
  };

  useEffect(() => {
    const v = vref.current;
    if (!v) return;

    const shouldBeHot = Math.abs(index - activeIndex) <= 1;
    if (shouldBeHot) {
      if (v.preload !== "auto") v.preload = "auto";
      v.play().catch(() => undefined);
    } else {
      if (!v.paused) v.pause();
      if (v.preload !== "metadata") v.preload = "metadata";
    }
  }, [activeIndex, index]);

  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    v.preload = index === 0 ? "auto" : "metadata";
    v.play().catch(() => undefined);
  }, [index]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        opacity: slideOpacity,
        pointerEvents: activeIndex === index ? "auto" : "none",
        zIndex: activeIndex === index ? 20 : 0,
      }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 z-[10] overflow-hidden"
        style={{
          width: w,
          height: h,
          borderRadius: r,
          x: "-50%",
          y: "-50%",
          boxShadow,
          transform: "translateZ(0)",
          willChange: "width, height, border-radius",
        }}
      >
        <motion.button
          type="button"
          aria-label={`View details for ${project.title}`}
          onClick={goToProject}
          data-cursor="view"
          className="absolute inset-0 cursor-pointer"
          style={{
            border: "none",
            background: "transparent",
            padding: 0,
            zIndex: 99999,
            pointerEvents: "auto",
          }}
        />

        <motion.video
          ref={vref}
          src={project.video}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload={index === 0 ? "auto" : "metadata"}
          onCanPlay={() => setReady(true)}
          style={{
            filter: grade,
            x: panX,
            y: panY,
            scale: zoom,
            transform: "translateZ(0)",
            willChange: "transform, filter",
          }}
        />

        <motion.div
          className="absolute inset-[-25%] rotate-[-18deg] pointer-events-none"
          style={{
            opacity: sweepOpacity,
            left: sweepX,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(235,89,57,0.45) 45%, rgba(255,255,255,0) 75%)",
            mixBlendMode: "screen",
            filter: "blur(10px)",
            transform: "translateZ(0)",
          }}
        />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/55 via-transparent to-transparent" />
        <div className="absolute inset-0 pointer-events-none bg-black/10" />

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
            mixBlendMode: "overlay",
          }}
        />

        {/* TEXT OVERLAY */}
        <motion.div
          data-cursor="hide"
          className="absolute inset-0 z-[70] pointer-events-none"
          style={{ opacity: textOpacity }}
        >
          {/* NUMBER */}
          <motion.span
            data-cursor="hide"
            className="absolute right-6 md:right-10 top-6 md:top-10 text-[4.25rem] md:text-[7rem] lg:text-[9rem] font-extralight select-none pointer-events-none"
            style={{
              opacity: textOpacity,
              color: "rgba(235, 89, 57, 0.32)",
              WebkitTextStroke: "2px rgba(235, 89, 57, 0.78)",
              textShadow:
                "0 0 35px rgba(235, 89, 57, 0.55), 0 0 80px rgba(235, 89, 57, 0.18)",
            }}
          >
            {projectNumber}
          </motion.span>

          {/* DETAILS */}
          <motion.div
            data-cursor="hide"
            className="absolute bottom-7 md:bottom-10 right-6 md:right-10 max-w-2xl text-right"
            style={{ y: textY, filter: textFilter }}
          >
            {/* META */}
            <div className="flex items-center justify-end gap-4 mb-3 pointer-events-none">
              <span className="text-xs uppercase tracking-[0.22em] font-black text-[rgb(var(--hero-orange))]">
                {project.category}
              </span>
              <span className="w-8 h-px bg-[rgb(var(--hero-gold))]/25" />
              <span className="text-xs uppercase tracking-[0.22em] font-light text-[rgb(var(--hero-gold))]/70">
                {project.year}
              </span>
            </div>

            {/* TITLE */}
            <h3
              className="
                font-black tracking-tight [text-wrap:balance]
                leading-[1.02] sm:leading-[0.98] lg:leading-[0.95]
                text-[clamp(2.1rem,8.5vw,4.75rem)]
                text-[rgb(var(--hero-gold))]
                pointer-events-none
              "
            >
              {project.title}
            </h3>

            {/* DESCRIPTION */}
            <div className="mt-4 ml-auto max-w-[34rem] pointer-events-none">
              <div className="mb-3 flex justify-end">
                <span className="h-px w-14 bg-[rgb(var(--hero-orange))]/65 shadow-[0_0_22px_rgba(235,89,57,0.30)]" />
              </div>

              <div
                className="
                  inline-block rounded-2xl
                  border border-[rgb(var(--hero-gold))]/14
                  bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(0,0,0,0.18))]
                  backdrop-blur-md px-5 py-4
                  shadow-[0_22px_70px_rgba(0,0,0,0.55)]
                "
              >
                <p
                  className="
                    text-right
                    text-sm md:text-[0.95rem] lg:text-base
                    leading-[1.65] tracking-wide
                    font-normal
                    text-[rgb(var(--hero-gold))]/80
                    [text-shadow:0_10px_26px_rgba(0,0,0,0.55)]
                  "
                >
                  <AccentDescription text={project.description} />
                </p>

                <div className="mt-3 flex justify-end items-center gap-3">
                  <span className="h-px w-16 bg-[rgb(var(--hero-gold))]/14" />
                  <span className="h-[6px] w-[6px] rounded-full bg-[rgb(var(--hero-orange))]/75 shadow-[0_0_18px_rgba(235,89,57,0.35)]" />
                </div>
              </div>
            </div>

            {/* TAGS */}
            <div className="flex flex-wrap justify-end mt-5 gap-2 pointer-events-none"
            data-cursor="hide"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    px-3.5 py-2
                    text-[0.68rem] uppercase tracking-[0.15em]
                    rounded-full
                    border border-[rgb(var(--hero-gold))]/22
                    bg-white/5
                    text-[rgb(var(--hero-gold))]/90
                    font-medium
                  "
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={goToProject}
              data-cursor="hide"
              className="mt-6 inline-flex items-center gap-2 pointer-events-auto"
            >
              <span className="relative">
                View Project
                <span className="absolute left-0 -bottom-1 h-px w-full bg-[rgb(var(--hero-orange))]/45" />
              </span>
              <ArrowUpRight className="w-4 h-4 text-[rgb(var(--hero-orange))]" />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
