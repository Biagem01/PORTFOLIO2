import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { HeroBadgesFocus, TwoWordFocus } from "./TrueFocus";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const FRAME_COUNT = 216;
const FRAME_PATH = (i: number) =>
  `/sequence/ezgif-frame-${String(i).padStart(3, "0")}.webp`;

// ─── BEATS B, C ───────────────────────────────────────────────────────────────
const BEATS = [
  {
    id: "b",
    start: 0.27,
    peak:  0.35,
    hold:  0.46,
    end:   0.54,
    align: "left" as const,
    eyebrow: "Every detail considered",
    line1: "ENGINEERED TO",
    line2: "PERFORM",
  },
  {
    id: "c",
    start: 0.57,
    peak:  0.64,
    hold:  0.80,
    end:   0.88,
    align: "right" as const,
    eyebrow: "React · TypeScript · Framer Motion",
    line1: "BUILT WITH",
    line2: "PURPOSE",
  },
];

// ─── BeatText — con TwoWordFocus e font corretti ──────────────────────────────
function BeatText({
  beat,
  scrollProgress,
}: {
  beat: (typeof BEATS)[0];
  scrollProgress: ReturnType<typeof useSpring>;
}) {
  const h2Ref = useRef<HTMLHeadingElement>(null);

  const opacity = useTransform(
    scrollProgress,
    [beat.start, beat.peak, beat.hold, beat.end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollProgress,
    [beat.start, beat.peak, beat.hold, beat.end],
    [52, 0, 0, -28]
  );
  const blurVal = useTransform(
    scrollProgress,
    [beat.start, beat.peak, beat.hold, beat.end],
    [12, 0, 0, 6]
  );
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`);
  const lineScale = useTransform(scrollProgress, [beat.start, beat.peak + 0.05], [0, 1]);

  const isRight = beat.align === "right";
  const containerAlign = isRight
    ? "items-end pr-8 md:pr-16 lg:pr-24"
    : "items-start pl-8 md:pl-16 lg:pl-24";

  const FONT_SIZE = "clamp(2rem, 6vw, 5rem)";

  return (
    <motion.div
      style={{ opacity, y, filter, position: "absolute", inset: 0, pointerEvents: "none", zIndex: 20 }}
      className={`flex flex-col justify-center ${containerAlign}`}
    >
      {/* Eyebrow */}
      <p
        className="font-button text-[7px] uppercase tracking-[0.65em] mb-5"
        style={{ color: "hsl(38 33% 57% / 0.35)" }}
      >
        {beat.eyebrow}
      </p>

      {/* Titolo con TwoWordFocus — font-white oro + font-orange arancione */}
      <h2
        ref={h2Ref}
        className="relative leading-[0.88]"
        style={{ fontSize: FONT_SIZE }}
      >
        <TwoWordFocus
          word0={beat.line1}
          word1={beat.line2}
          fontSize={FONT_SIZE}
          animationDuration={0.9}
          focusPause={3500}
          borderColor="rgb(235, 89, 57)"
          glowColor="rgba(235, 89, 57, 0.55)"
          blurAmount={4}
          frameAnchorRef={h2Ref}
        />
      </h2>

      {/* Accent line */}
      <motion.div
        style={{
          scaleX: lineScale,
          transformOrigin: isRight ? "right" : "left",
          width: 40,
          height: 1,
          backgroundColor: "hsl(11 80% 57% / 0.6)",
          marginTop: "1.25rem",
          alignSelf: isRight ? "flex-end" : "flex-start",
        }}
      />
    </motion.div>
  );
}

// ─── Loading screen ───────────────────────────────────────────────────────────
function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: 1, height: 56,
          backgroundColor: "hsl(11 80% 57% / 0.5)",
          marginBottom: "2rem",
          transformOrigin: "top",
        }}
      />
      <p
        className="font-button text-[7px] uppercase tracking-[0.7em] mb-8"
        style={{ color: "hsl(38 33% 57% / 0.3)" }}
      >
        biagio cubisino
      </p>
      <div style={{ width: 140, height: 1, backgroundColor: "hsl(38 33% 57% / 0.07)", position: "relative", overflow: "hidden" }}>
        <motion.div
          style={{
            position: "absolute", top: 0, left: 0,
            height: "100%",
            backgroundColor: "hsl(11 80% 57%)",
            width: `${progress}%`,
            transition: "width 0.12s linear",
          }}
        />
      </div>
      <p
        className="font-button text-[6px] uppercase tracking-[0.5em] tabular-nums mt-4"
        style={{ color: "hsl(38 33% 57% / 0.18)" }}
      >
        {Math.round(progress)}%
      </p>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const h1Ref      = useRef<HTMLHeadingElement>(null);
  const rafRef     = useRef<number | null>(null);
  useReducedMotion();

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded]             = useState(false);
  const [showScroll, setShowScroll]     = useState(true);

  // Tiene traccia se il sito è appena stato aperto (per animazione entrata)
  const [hasEntered, setHasEntered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.00005,
  });

  useEffect(() => {
    return smoothProgress.on("change", (v) => setShowScroll(v <= 0.05));
  }, [smoothProgress]);

  // ── Preload WebP
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(FRAME_COUNT).fill(null);
    let completed = 0;
    const checkDone = () => {
      completed++;
      setLoadProgress(Math.round((completed / FRAME_COUNT) * 100));
      if (completed === FRAME_COUNT) {
        imagesRef.current = images;
        setLoaded(true);
        // Piccolo delay per far finire l'animazione di uscita del loading screen
        setTimeout(() => setHasEntered(true), 700);
      }
    };
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const idx = i - 1;
      img.onload  = () => { images[idx] = img; checkDone(); };
      img.onerror = () => { console.warn(`Frame missing: ${FRAME_PATH(i)}`); checkDone(); };
      img.src = FRAME_PATH(i);
    }
  }, []);

  // ── Draw frame
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img    = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth  || 1920;
    const ih = img.naturalHeight || 1080;
    const isMobile = cw < 768;
    const scale    = isMobile ? (cw / iw) * 1.8 : Math.min(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;
    try {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    } catch (_) {
      // frame broken, skip silently
    }
  }, []);

  // ── Resize
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      if (imagesRef.current.length > 0) drawFrame(0);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  // ── Scroll → frame via rAF
  useEffect(() => {
    if (!loaded) return;
    return smoothProgress.on("change", (v) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const mapped = Math.min(v / 0.88, 1.0);
        const idx    = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(mapped * FRAME_COUNT)));
        drawFrame(idx);
      });
    });
  }, [loaded, smoothProgress, drawFrame]);

  // ── Primo frame
  useEffect(() => {
    if (!loaded) return;
    requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (canvas && canvas.width === 0) {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      drawFrame(0);
    });
  }, [loaded, drawFrame]);

  // ── Beat A transforms
  // opacity: parte da 1 (visibile subito), scompare tra 0.18 e 0.27
  const beatAOpacity = useTransform(
    smoothProgress,
    [0.0, 0.18, 0.27],
    [1,   1,    0]
  );
  const beatAY = useTransform(
    smoothProgress,
    [0.0, 0.18, 0.27],
    [0,   0,    -28]
  );
  const beatABlur = useTransform(
    smoothProgress,
    [0.0, 0.18, 0.27],
    [0,   0,    8]
  );
  const beatAFilter = useTransform(beatABlur, (v) => `blur(${v}px)`);

  // Divider scale — appare subito con animazione entrata
  const dividerScale = useTransform(smoothProgress, [0.0, 0.18, 0.27], [1, 1, 0]);

  // Fade to black verso About
  const fadeToBlack = useTransform(smoothProgress, [0.84, 1.0], [0, 1]);

  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          >
            <LoadingScreen progress={loadProgress} />
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={wrapperRef} style={{ height: "420vh", position: "relative" }}>
        <div
          style={{
            position: "sticky", top: 0,
            height: "100vh", width: "100%",
            overflow: "hidden",
            backgroundColor: "#000000",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />

          {/* Vignetta radiale */}
          <div
            style={{
              position: "absolute", inset: 0,
              background: `radial-gradient(ellipse 78% 78% at 50% 50%,
                transparent 48%,
                rgba(0,0,0,0.45) 70%,
                rgba(0,0,0,0.90) 100%)`,
              pointerEvents: "none", zIndex: 5,
            }}
          />

          {/* Gradient bottom seamless */}
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: "55%",
              background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.75) 55%, #000000 100%)",
              pointerEvents: "none", zIndex: 6,
            }}
          />

          {/* Fade out verso About */}
          <motion.div
            style={{
              position: "absolute", inset: 0,
              backgroundColor: "#000000",
              opacity: fadeToBlack,
              pointerEvents: "none", zIndex: 7,
            }}
          />

          {/* ── Beat A — visibile subito al caricamento ── */}
          <motion.div
            style={{
              opacity: beatAOpacity,
              y: beatAY,
              filter: beatAFilter,
              position: "absolute", inset: 0,
              pointerEvents: "none", zIndex: 20,
            }}
            className="flex flex-col items-center justify-center text-center"
          >
            {/* Eyebrow — entra dall'alto dopo il loading */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-button text-[7px] uppercase tracking-[0.7em] mb-7"
              style={{ color: "hsl(38 33% 57% / 0.35)" }}
            >
              biagio cubisino — portfolio
            </motion.p>

            {/* H1 — entra dal basso */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={hasEntered
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 20, filter: "blur(10px)" }
              }
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <h1
                ref={h1Ref}
                className="relative font-extrabold leading-[1] tracking-tight"
                style={{ fontSize: "clamp(2.4rem, 8.5vw, 6.5rem)" }}
              >
                <HeroBadgesFocus
                  word0="CRAFTING"
                  word1="MINIMAL"
                  word2="DIGITAL"
                  word3="PRODUCTS"
                  fontSize="clamp(2.4rem, 8.5vw, 6.5rem)"
                  animationDuration={0.9}
                  focusPause={3500}
                  borderColor="rgb(235, 89, 57)"
                  glowColor="rgba(235, 89, 57, 0.55)"
                  blurAmount={4}
                  frameAnchorRef={h1Ref}
                />
              </h1>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={hasEntered ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              style={{
                transformOrigin: "center",
                width: 36, height: 1,
                backgroundColor: "hsl(11 80% 57% / 0.6)",
                margin: "1.5rem auto",
              }}
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="font-button text-[7px] uppercase tracking-[0.5em]"
              style={{ color: "hsl(38 33% 57% / 0.35)" }}
            >
              Full Stack Developer & Visual Director
            </motion.p>
          </motion.div>

          {/* ── Beats B, C ── */}
          {BEATS.map((beat) => (
            <BeatText key={beat.id} beat={beat} scrollProgress={smoothProgress} />
          ))}

          {/* ── Scroll indicator ── */}
          <AnimatePresence>
            {showScroll && loaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
                style={{
                  position: "absolute",
                  bottom: "3rem",
                  left: 0, right: 0,
                  margin: "0 auto",
                  width: "fit-content",
                  zIndex: 30,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  pointerEvents: "none",
                }}
              >
                <p
                  className="font-button text-[6px] uppercase tracking-[0.7em]"
                  style={{ color: "hsl(38 33% 57% / 0.2)" }}
                >
                  Scroll
                </p>
                <motion.div
                  animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: 1, height: 44, backgroundColor: "hsl(11 80% 57%)", transformOrigin: "top" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          <motion.div
            style={{
              position: "absolute", bottom: 0, left: 0,
              height: 1,
              backgroundColor: "hsl(11 80% 57% / 0.4)",
              scaleX: smoothProgress,
              transformOrigin: "left",
              zIndex: 30, width: "100%",
            }}
          />
        </div>
      </div>
    </>
  );
}
