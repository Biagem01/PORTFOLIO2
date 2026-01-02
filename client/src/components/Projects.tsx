import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
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
    poster:
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80",
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
    year: "2023",
    category: "Mobile & Web",
  },
];

/* -------------------------------------------
   MAIN
------------------------------------------- */
export default function Projects() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLElement | null>(null);

  // header anims
  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start 80%", "end 20%"],
  });

  const titleOpacity = useTransform(headerProgress, [0, 0.2, 0.45], [0, 0.6, 1]);
  const titleBlur = useTransform(headerProgress, [0, 0.2, 0.45], [18, 10, 0]);
  const titleLift = useTransform(headerProgress, [0, 0.3, 0.7], [80, 30, 0]);
  const letterSpacing = useTransform(headerProgress, [0, 0.25, 0.7], [16, 10, 4]);

  const haloOpacity = useTransform(headerProgress, [0.1, 0.4, 1], [0, 0.4, 0.8]);
  const haloScale = useTransform(headerProgress, [0.1, 0.8], [0.75, 1.2]);
  const ghostOpacity = useTransform(headerProgress, [0, 0.2, 0.55], [0.05, 0.2, 0]);

  const blurFilter = useMotionTemplate`blur(${titleBlur}px)`;
  const letterSpacingPx = useMotionTemplate`${letterSpacing}px`;

  // progress globale per le slide
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
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
                className="relative text-[2.5rem] md:text-[3.75rem] lg:text-[4.75rem] font-extrabold tracking-tight leading-[1.05] text-[hsl(var(--scroll-indicator))] flex gap-4 uppercase"
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
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          {projects.map((p, i) => (
            <WipeProjectSlide
              key={p.title}
              project={p}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </section>

      <div className="h-24" />
    </section>
  );
}

/* -------------------------------------------
   SINGLE SLIDE (stacked, overlap)
------------------------------------------- */
function WipeProjectSlide({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Smooth progress
  const smoothProgress = useSpring(progress, {
    stiffness: 140,
    damping: 30,
    mass: 0.9,
  });

  const start = index / total;
  const end = (index + 1) / total;
  const span = 1 / total;

  // 🔥 video "warm": prova a farlo partire subito (soprattutto per 01)
 useEffect(() => {
  const v = videoRef.current;
  if (!v || videoError) return;

  // forza il browser a iniziare buffering asap
  try {
    v.load();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.debug("video.load() blocked/failed:", err);
  }

  v.play().catch((err) => {
    // autoplay policy: può bloccare il play (ok, lo gestiamo)
    // eslint-disable-next-line no-console
    console.debug("video.play() blocked/failed:", err);
  });
}, [videoError]);

  // --------- TIMING WIPE ----------
  // 01: deve partire SUBITO (progress ~0), quindi anticipiamo l'entrata sotto 0
  // 02/03: rimangono come prima (perfette)
  const isFirst = index === 0;

  const inStart = isFirst ? -0.18 : start;
  const inEnd = isFirst ? start + span * 0.55 : start + span * 0.55;

  const outStart = start + span * 0.45;
  const outEnd = start + span;

  // opacity
  const wipeOpacity = useTransform(
    smoothProgress,
    [inStart, inEnd, outStart, outEnd],
    isFirst
      ? [0.55, 1, 1, 0] // ✅ 01 non è mai 0 quando arrivi
      : [0, 1, 1, 0]
  );

  // entrance from right
  const wipeX = useTransform(
    smoothProgress,
    [inStart, inEnd, outStart, outEnd],
    isFirst
      ? [320, 0, 0, -220] // 01 più “lontano” e visibile
      : [220, 0, 0, -220]
  );

  const wipeY = useTransform(
    smoothProgress,
    [inStart, inEnd, outStart, outEnd],
    [140, 0, 0, -140]
  );

  const wipeScale = useTransform(
    smoothProgress,
    [inStart, inEnd, outStart, outEnd],
    [1.1, 1.0, 1.0, 0.99]
  );

  // blur: 01 parte BLURRATO e si pulisce
  const blur = useTransform(
    smoothProgress,
    [inStart, isFirst ? start + span * 0.18 : inStart, outStart, outEnd],
    isFirst
      ? [14, 0, 0, 4] // ✅ blur forte all’inizio SOLO per 01
      : [0, 0, 0, 4]
  );
  const filter = useMotionTemplate`blur(${blur}px)`;

  // testo
  const textOpacity = useTransform(
    smoothProgress,
    [
      (isFirst ? start : inStart) + span * 0.22,
      (isFirst ? start : inStart) + span * 0.38,
      outStart - span * 0.04,
      outEnd - span * 0.01,
    ],
    [0, 1, 1, 0]
  );

  const textY = useTransform(
    smoothProgress,
    [(isFirst ? start : inStart) + span * 0.22, (isFirst ? start : inStart) + span * 0.38, outEnd],
    [18, 0, -10]
  );

  const projectNumber = useMemo(() => String(index + 1).padStart(2, "0"), [index]);

  const goToProject = () => {
    const slug = project.title.toLowerCase().replace(/\s+/g, "-");
    window.location.href = `/project/${slug}`;
  };

  return (
    <div className="absolute inset-0">
      {/* VIDEO LAYER */}
      <motion.div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          opacity: wipeOpacity,
          x: wipeX,
          y: wipeY,
          scale: wipeScale,
          filter,
          zIndex: index + 1,
          transform: "translateZ(0)",
        }}
      >
        {!videoError && (
          <video
            ref={videoRef}
            src={project.video}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            preload={isFirst ? "auto" : "metadata"}
            poster={project.poster} // (non è "immagine dietro": è solo fallback del tag video)
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoError(true)}
            // @ts-expect-error fetchpriority non tipizzato
            fetchpriority={isFirst ? "high" : "auto"}
            style={{
              opacity: videoReady ? 1 : 0,
              transition: "opacity 220ms ease-out",
              transform: "translateZ(0)",
            }}
          />
        )}

        {/* se il video non è ancora pronto, niente foto: solo look cinematic */}
        {(!videoReady || videoError) && (
          <div className="absolute inset-0 bg-black" />
        )}

        {/* overlays cinematic */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />
      </motion.div>

      {/* overlay click SOLO video */}
      <motion.button
        type="button"
        aria-label={`View details for ${project.title}`}
        className="absolute inset-0 z-[60] cursor-pointer"
        data-cursor="view"
        onClick={goToProject}
        style={{ border: "none", background: "transparent", padding: 0 }}
      />

      {/* BIG NUMBER */}
      <motion.span
        className="
          absolute right-6 md:right-14 top-10 md:top-14
          text-[6rem] md:text-[10rem] lg:text-[13rem]
          font-extralight select-none pointer-events-none
        "
        style={{
          opacity: textOpacity,
          color: "rgba(235, 89, 57, 0.42)",
          WebkitTextStroke: "2px rgba(235, 89, 57, 0.85)",
          textShadow: `
            0 0 35px rgba(235, 89, 57, 0.60),
            0 0 80px rgba(235, 89, 57, 0.28)
          `,
          zIndex: total + 10,
        }}
      >
        {projectNumber}
      </motion.span>

      {/* CONTENT RIGHT */}
      <motion.div
        className="absolute bottom-14 md:bottom-20 right-6 md:right-14 z-[80] max-w-2xl text-right pointer-events-auto"
        data-cursor="hide"
        style={{ opacity: textOpacity, y: textY }}
      >
        <div className="flex items-center justify-end gap-4 mb-4">
          <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[hsl(var(--accent-orange))]/85">
            {project.category}
          </span>
          <span className="w-8 h-px bg-white/30" />
          <span className="text-xs uppercase tracking-[0.2em] text-white/70">
            {project.year}
          </span>
        </div>

        <h3 className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] font-extrabold">
          {project.title}
        </h3>

        <p className="mt-5 text-base md:text-lg max-w-lg ml-auto leading-relaxed text-white/80 font-light">
          {project.description}
        </p>

        <div className="flex flex-wrap justify-end mt-6 gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 text-xs uppercase tracking-[0.15em] rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/90 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          className="mt-7 inline-flex items-center justify-end gap-2 text-sm font-semibold text-white/85 hover:text-white transition"
          onClick={goToProject}
        >
          View Project <ArrowUpRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
