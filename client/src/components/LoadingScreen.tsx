import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useAnimation,
  useMotionValue,
  Variants,
  Transition,
} from "framer-motion";

// ─── CircularText ────────────────────────────────────────────────────────────

const getRotationTransition = (duration: number, from: number, loop = true) => ({
  from,
  to: from + 360,
  ease: "linear" as const,
  duration,
  type: "tween" as const,
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: { type: "spring" as const, damping: 20, stiffness: 300 },
});

type OnHover = "speedUp" | "slowDown" | "pause" | "goBonkers" | false;

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: OnHover;
  className?: string;
}

const CIRCULAR_COLORS = [
  "hsl(var(--scroll-indicator))",
  "hsl(var(--accent-orange))",
];

// PORT → arancione, FOLIO → scroll-indicator, BIAGIO → arancione, CUBISINO → scroll-indicator
const CIRCULAR_SEGMENTS: { text: string; colorIdx: number }[] = [
  { text: "PORT", colorIdx: 1 },
  { text: "FOLIO", colorIdx: 0 },
  { text: "*", colorIdx: 1 },
  { text: "BIAGIO", colorIdx: 1 },
  { text: "*", colorIdx: 0 },
  { text: "CUBISINO", colorIdx: 0 },
  { text: "*", colorIdx: 1 },
];

const CIRCULAR_FULL_TEXT = CIRCULAR_SEGMENTS.map((s) => s.text).join("");
const CIRCULAR_COLOR_MAP: string[] = [];
for (const seg of CIRCULAR_SEGMENTS) {
  for (let i = 0; i < seg.text.length; i++) {
    CIRCULAR_COLOR_MAP.push(CIRCULAR_COLORS[seg.colorIdx]);
  }
}

function CircularText({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
}: CircularTextProps) {
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, text, onHover, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;
    let transitionConfig;
    let scaleVal = 1;
    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case "pause":
        transitionConfig = {
          rotate: { type: "spring" as const, damping: 20, stiffness: 300 },
          scale: { type: "spring" as const, damping: 20, stiffness: 300 },
        };
        break;
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }
    controls.start({ rotate: start + 360, scale: scaleVal, transition: transitionConfig });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  };

  return (
    <motion.div
      className={className}
      style={{
        rotate: rotation,
        margin: "0 auto",
        borderRadius: "50%",
        width: 200,
        height: 200,
        position: "relative",
        fontWeight: 900,
        textAlign: "center",
        cursor: "pointer",
        transformOrigin: "50% 50%",
      }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {(() => {
        const letters = Array.from(CIRCULAR_FULL_TEXT);
        return letters.map((letter, i) => {
          const rotationDeg = (360 / letters.length) * i;
          const factor = Math.PI / letters.length;
          const x = factor * i;
          const y = factor * i;
          const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;
          const color = CIRCULAR_COLOR_MAP[i] ?? CIRCULAR_COLORS[0];

          return (
            <span
              key={i}
              style={{
                transform,
                WebkitTransform: transform,
                position: "absolute",
                display: "inline-block",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                fontSize: 13,
                letterSpacing: "0.08em",
                transition: "all 0.5s cubic-bezier(0,0,0,1)",
                color,
              }}
            >
              {letter}
            </span>
          );
        });
      })()}
    </motion.div>
  );
}

// ─── LoadingScreen ────────────────────────────────────────────────────────────

type LoadingScreenProps = {
  onComplete: () => void;
  durationMs?: number;
  holdMs?: number;
};

export default function LoadingScreen({
  onComplete,
  durationMs = 5000,
  holdMs = 500,
}: LoadingScreenProps) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(true);

  const holdTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (holdTimerRef.current) window.clearTimeout(holdTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    if (reduce) {
      setProgress(100);
      holdTimerRef.current = window.setTimeout(() => setOpen(false), 60);
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      const eased = easeOutCubic(t);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        holdTimerRef.current = window.setTimeout(() => setOpen(false), holdMs);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (holdTimerRef.current) window.clearTimeout(holdTimerRef.current);
    };
  }, [durationMs, holdMs, reduce, open]);

  // Variants
  const overlayVariants: Variants = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: reduce ? 0.15 : 0.45, ease: "easeInOut" } },
  };

  const logoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" } as Transition,
    },
  };

  const progressVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut", delay: 0.8 } as Transition,
    },
  };

  const centerVariants: Variants = {
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.6 } },
    exit: { opacity: 0, y: -8, transition: { duration: reduce ? 0.15 : 0.35 } },
  };

  const percentText = String(progress).padStart(2, "0");

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black text-white overflow-x-clip overflow-y-hidden [contain:layout_paint_size]"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          role="dialog"
          aria-label="Loading"
          data-cursor="hide"
        >
          {/* Vignette soft */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/50" />

          {/* CENTER */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center select-none px-6"
            variants={centerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* LOGO + CIRCULAR TEXT */}
            <motion.div
              className="relative flex items-center justify-center [transform:translateZ(0)]"
              style={{ width: 200, height: 200 }}
              variants={logoVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Circular rotating text */}
              {!reduce && (
                <div className="absolute inset-0">
                  <CircularText
                    text={CIRCULAR_FULL_TEXT}
                    onHover="speedUp"
                    spinDuration={20}
                  />
                </div>
              )}

              {/* Logo centrato */}
              <motion.img
                src="/logo/favicon.png"
                alt="Logo"
                className="relative z-10 h-[100px] w-[100px] sm:h-[140px] sm:w-[140px] object-contain pointer-events-none select-none"
              />
            </motion.div>

            {/* LINEA DI CARICAMENTO + % */}
            <motion.div
              className="mt-14 flex items-baseline justify-center gap-3 sm:gap-4 flex-wrap"
              variants={progressVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="uppercase tracking-[0.30em] text-[0.8rem] sm:text-[0.88rem] text-white/85">
                Start
              </span>

              <span className="uppercase tracking-[0.30em] text-[0.72rem] sm:text-[0.82rem] text-white/55 tabular-nums">
                {percentText}%
              </span>

              <span className="relative -top-[2px] h-px w-14 sm:w-16 md:w-20 overflow-hidden">
                <span className="absolute inset-0 bg-white/20" />
                <span
                  className="absolute inset-0 bg-[hsl(var(--scroll-indicator))]"
                  style={{
                    transform: `translateX(${progress >= 100 ? "0%" : "-100%"})`,
                    transition: "transform 380ms ease",
                  }}
                />
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
