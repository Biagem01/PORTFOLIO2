import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";

// ─── Custom Types ─────────────────────────────────────────────────────────────
interface EducationItem {
  institution: string;
  year: string;
  title: string;
  description: string;
  details: string[];
  location: string;
}

interface SlideProps {
  item: EducationItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

// ─── Hook per rilevare mobile ─────────────────────────────────────────────────
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

// ─── Animated Year ────────────────────────────────────────────────────────────
const AnimatedYear = ({ year, isVisible }: { year: string; isVisible: boolean }) => {
  const [displayed, setDisplayed] = useState("0000");
  const hasAnimated = useRef(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isVisible) {
      // Cancella eventuale reset in corso
      if (resetTimer.current) clearTimeout(resetTimer.current);

      if (!hasAnimated.current) {
        hasAnimated.current = true;
        const target = parseInt(year, 10);
        const start = target - 5;
        let frame = 0;
        const totalFrames = 60;
        const tick = () => {
          frame++;
          const p = frame / totalFrames;
          const eased = 1 - Math.pow(1 - p, 4);
          setDisplayed(String(Math.round(start + (target - start) * eased)));
          if (frame < totalFrames) requestAnimationFrame(tick);
          else setDisplayed(year);
        };
        requestAnimationFrame(tick);
      }
    } else {
      // 🔥 FIX: reset hasAnimated con delay dopo che la slide è uscita
      // così la prossima volta che torna visibile ripartirà l'animazione
      resetTimer.current = setTimeout(() => {
        hasAnimated.current = false;
        setDisplayed("0000");
      }, 800);
    }

    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, [isVisible, year]);

  return (
    <div className="overflow-hidden h-[3rem] flex items-center">
      <motion.span
        key={displayed}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.1 }}
        className="text-2xl md:text-3xl font-mono font-medium text-white/40 tracking-tighter tabular-nums"
      >
        {displayed}
      </motion.span>
    </div>
  );
};

// ─── Alternating colored title ────────────────────────────────────────────────
const AlternatingTitle = ({ text }: { text: string }) => {
  const words = text.split(" ");
  const colors = [
    "text-[hsl(var(--accent-orange))]",
    "text-[hsl(var(--scroll-indicator))]",
  ];
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className={colors[i % 2]}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
};

// ─── Staggered detail ─────────────────────────────────────────────────────────
const StaggeredDetail = ({ detail, index, isVisible }: { detail: string; index: number; isVisible: boolean }) => (
  <motion.li
    initial={{ opacity: 0, y: 10 }}
    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
    transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="text-white/40 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium list-none flex items-center gap-3"
  >
    <span className="w-1 h-1 rounded-full bg-[hsl(var(--accent-orange))] flex-shrink-0" />
    {detail}
  </motion.li>
);

// ─── Ambient glow ─────────────────────────────────────────────────────────────
const AmbientGlow = ({ progress, total }: { progress: MotionValue<number>; total: number }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    return progress.on("change", (v) => setActiveIdx(Math.min(Math.floor(v * total), total - 1)));
  }, [progress, total]);

  return (
    <AnimatePresence>
      <motion.div
        key={activeIdx}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div
          className="absolute right-[-10%] top-[50%] -translate-y-1/2 w-[60%] h-[60%] rounded-full blur-[120px]"
          style={{ backgroundColor: "hsl(var(--accent-orange))", opacity: 0.03 }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Watermark year ───────────────────────────────────────────────────────────
const WatermarkYear = ({ items, progress }: { items: EducationItem[]; progress: MotionValue<number> }) => {
  const [activeYear, setActiveYear] = useState(items[0].year);

  useEffect(() => {
    return progress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * items.length), items.length - 1);
      setActiveYear(items[idx].year);
    });
  }, [progress, items]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={activeYear}
          initial={{ y: 100, opacity: 0, scale: 0.9, rotateX: 45 }}
          animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ y: -100, opacity: 0, scale: 1.1, rotateX: -45 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(5rem,20vw,20rem)] font-black tracking-tighter leading-none text-white/[0.02] select-none tabular-nums font-mono"
        >
          {activeYear}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

// ─── Pip indicator ────────────────────────────────────────────────────────────
const PipIndicator = ({ items, activeIndex }: { items: EducationItem[]; activeIndex: number }) => (
  <div className="flex flex-row md:flex-col gap-4 items-center">
    {items.map((_, i) => (
      <div key={i} className="relative flex items-center justify-center">
        <motion.div
          animate={{
            scale: i === activeIndex ? 1.5 : 1,
            opacity: i === activeIndex ? 1 : 0.3,
            backgroundColor: i === activeIndex
              ? "hsl(var(--accent-orange))"
              : "rgba(255,255,255,0.4)",
          }}
          className="w-1.5 h-1.5 rounded-full"
        />
        {i === activeIndex && (
          <motion.div
            layoutId="pip-glow"
            className="absolute inset-0 w-4 h-4 rounded-full bg-[hsl(var(--accent-orange))]/20 blur-sm -z-10"
          />
        )}
      </div>
    ))}
  </div>
);

// ─── Left panel — Desktop only ────────────────────────────────────────────────
const LeftPanel = ({
  items,
  progress,
  titleY,
  titleOpacity,
}: {
  items: EducationItem[];
  progress: MotionValue<number>;
  titleY: MotionValue<number>;
  titleOpacity: MotionValue<number>;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return progress.on("change", (v) => setActiveIndex(Math.min(Math.floor(v * items.length), items.length - 1)));
  }, [progress, items]);

  return (
    <div className="hidden md:flex col-span-4 items-center pl-20">
      <motion.div style={{ y: titleY, opacity: titleOpacity }} className="w-full flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-px bg-white/20" />
          <div className="text-[10px] font-mono tracking-[0.4em] text-white/30 uppercase">Selected Education</div>
        </div>

        <h2 className="text-6xl font-serif leading-[0.9] tracking-tight" data-cursor="big">
          <span className="text-white/40 italic">the</span>
          <br />
          <span className="text-[hsl(var(--accent-orange))] font-orange font-extrabold">Learning</span>
          <br />
          <span className="text-[hsl(var(--scroll-indicator))] font-extrabold">Path</span>
        </h2>

        <div className="flex flex-col gap-6 max-w-xs">
          <div className="h-px w-full bg-white/5" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase">Current Node</div>
              <p className="text-sm text-white/60 leading-relaxed font-button" data-cursor="big">
                {items[activeIndex].description}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[hsl(var(--accent-orange))]" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{items[activeIndex].location}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <PipIndicator items={items} activeIndex={activeIndex} />
      </motion.div>
    </div>
  );
};

// ─── Mobile header ────────────────────────────────────────────────────────────
const MobileHeader = ({
  items,
  progress,
}: {
  items: EducationItem[];
  progress: MotionValue<number>;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return progress.on("change", (v) => setActiveIndex(Math.min(Math.floor(v * items.length), items.length - 1)));
  }, [progress, items]);

  return (
    <div className="flex md:hidden flex-col gap-6 px-6 pt-12 pb-8 bg-black border-b border-white/[0.03] sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-[9px] font-mono tracking-[0.4em] text-white/30 uppercase">02 / Education</div>
          <h2 className="text-3xl font-serif font-medium tracking-tight">
            Learning <span className="text-[hsl(var(--accent-orange))] italic">Path</span>
          </h2>
        </div>
        <PipIndicator items={items} activeIndex={activeIndex} />
      </div>
    </div>
  );
};

// ─── Slide ────────────────────────────────────────────────────────────────────
const EducationSlide = ({ item, index, total, progress }: SlideProps) => {
  const start = index / total;
  const end = (index + 1) / total;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return progress.on("change", (v) => setIsVisible(v >= start && v < end));
  }, [progress, start, end]);

  const opacity   = useTransform(progress, [start - 0.1, start, end - 0.1, end], [0, 1, 1, 0]);
  const scale     = useTransform(progress, [start - 0.1, start, end - 0.1, end], [0.9, 1, 1, 0.9]);
  const rotateX   = useTransform(progress, [start - 0.1, start, end - 0.1, end], [20, 0, 0, -20]);
  const y         = useTransform(progress, [start, end], [60, -60]);
  const blur      = useTransform(progress, [start - 0.1, start, end - 0.1, end], [20, 0, 0, 20]);
  const blurStyle = useMotionTemplate`blur(${blur}px)`;

  const contentY = useTransform(progress, [start, start + 0.15], [40, 0]);
  const lineW    = useTransform(progress, [start + 0.05, start + 0.2], ["0%", "100%"]);
  const parallax = useTransform(progress, [start, end], [20, -20]);

  return (
    <motion.div
      style={{ opacity, scale, rotateX, y, filter: blurStyle, perspective: 1200 }}
      className={`absolute inset-0 flex items-center justify-center will-change-transform ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div className="w-full max-w-3xl px-6 md:px-12">
        <motion.div style={{ y: parallax }} className="flex flex-col gap-10">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 0.3, x: 0 } : { opacity: 0, x: -10 }}
                className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40"
              >
                Timeframe
              </motion.span>
              <AnimatedYear year={item.year} isVisible={isVisible} />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-end gap-1 mb-2"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">Location</span>
              <span className="text-xs font-mono text-[hsl(var(--accent-orange))]">{item.location}</span>
            </motion.div>
          </div>

          <motion.div style={{ y: contentY }} className="space-y-8">
            <div className="space-y-4">
              <motion.h3 className="text-4xl md:text-6xl font-orange tracking-tight leading-[0.95]" data-cursor="big">
                <AlternatingTitle text={item.institution} />
              </motion.h3>
              <div className="flex items-center gap-6">
                <div className="h-px flex-1 bg-white/10 relative overflow-hidden">
                  <motion.div
                    style={{ width: lineW }}
                    className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--accent-orange))] to-white/20"
                  />
                </div>
                <span className="text-sm md:text-lg font-serif italic text-white/80">{item.title}</span>
              </div>
            </div>

            <p className="text-white/50 text-sm leading-relaxed max-w-xl font-button">
              "{item.description}"
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 pt-4" data-cursor="hide">
              {item.details.map((d, i) => (
                <StaggeredDetail key={d} detail={d} index={i} isVisible={isVisible} />
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export const Education = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const educationItems: EducationItem[] = useMemo(() => [
    {
      institution: "University of Computer Science",
      year: "2023",
      title: "BSc in Computer Engineering",
      location: "San Francisco, CA",
      description: "Focused on modern web systems, scalable architectures and user-centered design principles. Graduated with honors in Computational Design.",
      details: ["Modern Web Architecture", "UI/UX Systems Thinking", "Cloud Infrastructure", "Scalable Systems"],
    },
    {
      institution: "Intensive Coding Program",
      year: "2023",
      title: "Full Stack Engineering",
      location: "New York, NY",
      description: "Production-level development with real-world projects using modern frontend and backend stacks. Specialized in React performance.",
      details: ["React Ecosystem", "Node.js Architecture", "Database Modeling", "DevOps Workflows"],
    },
    {
      institution: "Design & Arts Academy",
      year: "2024",
      title: "Visual Communications",
      location: "Remote",
      description: "Exploration of visual hierarchy, typography, and motion design to bridge the gap between engineering and art.",
      details: ["Motion Design", "Typography Systems", "Brand Identity", "Design Systems"],
    },
  ], []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 25, mass: 1 });

  const titleY       = useTransform(smoothProgress, [0, 1], [0, -40]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
      window.dispatchEvent(new Event("scroll"));
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="education"
      ref={containerRef}
      className="relative bg-black text-white"
      style={{ height: `${educationItems.length * (isMobile ? 150 : 200)}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-black">

        <WatermarkYear items={educationItems} progress={smoothProgress} />
        <AmbientGlow progress={smoothProgress} total={educationItems.length} />

        <div className="relative h-full w-full md:grid md:grid-cols-12 z-10">
          <MobileHeader items={educationItems} progress={smoothProgress} />
          <LeftPanel
            items={educationItems}
            progress={smoothProgress}
            titleY={titleY}
            titleOpacity={titleOpacity}
          />
          <div className="col-span-8 relative h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              {educationItems.map((item, index) => (
                <EducationSlide
                  key={item.institution}
                  item={item}
                  index={index}
                  total={educationItems.length}
                  progress={smoothProgress}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 right-10 flex items-center gap-6 z-20">
          <div className="text-[10px] font-mono text-white/20 tabular-nums">01</div>
          <div className="h-px flex-1 bg-white/5 relative overflow-hidden">
            <motion.div
              style={{ scaleX: smoothProgress, originX: 0 }}
              className="absolute inset-0 bg-[hsl(var(--accent-orange))]"
            />
          </div>
          <div className="text-[10px] font-mono text-white/20 tabular-nums">0{educationItems.length}</div>
        </div>

      </div>
    </section>
  );
};

export default Education;
