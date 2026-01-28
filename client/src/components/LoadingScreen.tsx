import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type LoadingScreenProps = {
  onComplete: () => void;
  durationMs?: number;
  holdMs?: number;
};

export default function LoadingScreen({
  onComplete,
  durationMs = 1800,
  holdMs = 120,
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

  const overlayVariants = useMemo(
    () => ({
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: {
        opacity: 0,
        transition: { duration: reduce ? 0.15 : 0.45, ease: [0.16, 1, 0.3, 1] as const },
      },
    }),
    [reduce]
  );

  const centerVariants = useMemo(
    () => ({
      initial: reduce ? { opacity: 1 } : { opacity: 0, y: 8 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: reduce ? 0.2 : 0.6, ease: [0.16, 1, 0.3, 1] as const },
      },
      exit: {
        opacity: 0,
        y: -8,
        transition: { duration: reduce ? 0.15 : 0.35, ease: [0.16, 1, 0.3, 1] as const },
      },
    }),
    [reduce]
  );

  const percentText = String(progress).padStart(2, "0");

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {open && (
        <motion.div
          className="
            fixed inset-0 z-[9999]
            bg-black text-white
            overflow-x-clip overflow-y-hidden
            [contain:layout_paint_size]
          "
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          role="dialog"
          aria-label="Loading"
          data-cursor="hide"
        >
          {/* Vignette soft (safe, niente animazioni) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/50" />

          {/* CENTER */}
          <motion.div
            className="
              absolute inset-0
              flex flex-col items-center justify-center
              select-none
              px-6
            "
            variants={centerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* LOGO RING */}
            <motion.div
              className="
                rounded-full border border-white/12
                flex items-center justify-center
                h-[88px] w-[88px]
                sm:h-[104px] sm:w-[104px]
                md:h-[120px] md:w-[120px]
                [transform:translateZ(0)]
              "
              animate={reduce ? undefined : { rotate: 360 }}
              transition={reduce ? undefined : { repeat: Infinity, duration: 10, ease: "linear" }}
            >
              <div className="text-center leading-none">
                <div className="text-[0.58rem] sm:text-[0.62rem] uppercase tracking-[0.35em] text-white/40">
                  Portfolio
                </div>
                <div className="mt-2 text-[1.55rem] sm:text-[1.75rem] md:text-[1.95rem] font-extrabold tracking-tight text-[hsl(var(--scroll-indicator))]">
                  BC
                </div>
                <div className="mt-2 text-[0.58rem] sm:text-[0.62rem] uppercase tracking-[0.30em] text-white/35">
                  Studio
                </div>
              </div>
            </motion.div>

            {/* START + % */}
            <div className="mt-10 flex items-baseline justify-center gap-3 sm:gap-4 flex-wrap">
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
