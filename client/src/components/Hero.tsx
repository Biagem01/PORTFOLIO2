import { motion, useReducedMotion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

type LineRevealProps = {
  text: string;
  delay?: number;
  className?: string;
  yScroll?: MotionValue<number>;
  opacityScroll?: MotionValue<number>;
  blurScroll?: MotionValue<string>;
};

function LineReveal({
  text,
  delay = 0,
  className = "",
  yScroll,
  opacityScroll,
  blurScroll,
}: LineRevealProps) {
  const reduce = useReducedMotion();

  return (
    <span className="block overflow-hidden perspective-1000">
      <motion.span
        className={`block will-change-transform ${className}`}
        initial={
          reduce
            ? { opacity: 0 }
            : { y: "100%", opacity: 0, rotateX: 45, filter: "blur(12px)" }
        }
        animate={
          reduce
            ? { opacity: 1 }
            : { y: "0%", opacity: 1, rotateX: 0, filter: "blur(0px)" }
        }
        transition={{
          duration: 1.2,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          y: yScroll,
          opacity: opacityScroll,
          filter: blurScroll,
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const [showVideo, setShowVideo] = useState(false);

  const delays = useMemo(() => {
    const base = 0.35;
    const step = 0.18;
    return {
      name: 0.18,
      l1: base + step * 0,
      l2: base + step * 1,
      l3: base + step * 2,
      l4: base + step * 3,
      l5: base + step * 4,
      sub: base + step * 4 + 0.25,
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const { scrollY } = useScroll();

  // Video parallasse
  const videoY = useTransform(scrollY, [0, 500], [0, 50]);
  const videoScale = useTransform(scrollY, [0, 500], [1, 1.05]);
  const videoOpacity = useTransform(scrollY, [0, 500], [1, 0.85]);

  // Scroll offset: l'animazione inizia dopo che scrolli almeno 300px
const scrollStart = 100;
const scrollEnd = scrollStart + 1000; // range dell'animazione

const yTransforms = [
  useTransform(scrollY, [scrollStart, scrollEnd], [0, -150]),
  useTransform(scrollY, [scrollStart, scrollEnd], [0, -160]),
  useTransform(scrollY, [scrollStart, scrollEnd], [0, -170]),
  useTransform(scrollY, [scrollStart, scrollEnd], [0, -180]),
  useTransform(scrollY, [scrollStart, scrollEnd], [0, -190]),
];

const opacityTransforms = [
  useTransform(scrollY, [scrollStart, scrollStart + 600], [1, 0.6]),
  useTransform(scrollY, [scrollStart, scrollStart + 600], [1, 0.55]),
  useTransform(scrollY, [scrollStart, scrollStart + 600], [1, 0.5]),
  useTransform(scrollY, [scrollStart, scrollStart + 600], [1, 0.45]),
  useTransform(scrollY, [scrollStart, scrollStart + 600], [1, 0.4]),
];

const blurTransforms = [
  useTransform(scrollY, [scrollStart, scrollStart + 600], ["blur(0px)", "blur(10px)"]),
  useTransform(scrollY, [scrollStart, scrollStart + 600], ["blur(0px)", "blur(12px)"]),
  useTransform(scrollY, [scrollStart, scrollStart + 600], ["blur(0px)", "blur(14px)"]),
  useTransform(scrollY, [scrollStart, scrollStart + 600], ["blur(0px)", "blur(16px)"]),
  useTransform(scrollY, [scrollStart, scrollStart + 600], ["blur(0px)", "blur(18px)"]),
];
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-12 pt-[max(5rem,env(safe-area-inset-top))] pb-[max(4.5rem,env(safe-area-inset-bottom))] overflow-hidden isolate"
    >
      {/* ================= VIDEO BACKGROUND ================= */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: videoY, scale: videoScale, opacity: videoOpacity }}
      >
        <video
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            showVideo ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/uomo-deserto.webm" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      </motion.div>

      {/* ================= HERO TEXT ================= */}
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[64rem] mx-auto text-center relative z-10 will-change-transform"
      >
        <motion.p
          className="uppercase text-[0.68rem] sm:text-[0.75rem] md:text-[0.85rem] tracking-[0.28em] sm:tracking-[0.35em] text-foreground/60 mb-6 sm:mb-8 font-orange"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.0, delay: delays.name, ease: [0.16, 1, 0.3, 1] }}
        >
          biagio cubisino
        </motion.p>

        <h1
          className="select-none text-center font-extrabold tracking-tight [text-wrap:balance] break-words leading-[1.02] sm:leading-[0.98] lg:leading-[0.95] text-[clamp(2.1rem,10vw,6.2rem)]"
          data-cursor="big"
        >
          <LineReveal
            text="CRAFTING"
            delay={delays.l1}
            className="text-[hsl(var(--scroll-indicator))] font-white"
            yScroll={yTransforms[0]}
            opacityScroll={opacityTransforms[0]}
            blurScroll={blurTransforms[0]}
          />
          <LineReveal
            text="MODERN"
            delay={delays.l2}
            className="text-[hsl(var(--accent-orange))] font-orange"
            yScroll={yTransforms[1]}
            opacityScroll={opacityTransforms[1]}
            blurScroll={blurTransforms[1]}
          />
          <LineReveal
            text="DIGITAL"
            delay={delays.l3}
            className="text-[hsl(var(--scroll-indicator))] font-white"
            yScroll={yTransforms[2]}
            opacityScroll={opacityTransforms[2]}
            blurScroll={blurTransforms[2]}
          />
          <LineReveal
            text="EXPERIENCES"
            delay={delays.l4}
            className="text-[hsl(var(--accent-orange))] font-orange"
            yScroll={yTransforms[3]}
            opacityScroll={opacityTransforms[3]}
            blurScroll={blurTransforms[3]}
          />
          <LineReveal
            text="DAILY"
            delay={delays.l5}
            className="text-[hsl(var(--scroll-indicator))]"
            yScroll={yTransforms[4]}
            opacityScroll={opacityTransforms[4]}
            blurScroll={blurTransforms[4]}
          />
        </h1>

        <motion.p
          className="mt-7 sm:mt-10 mx-auto max-w-[40rem] font-light leading-relaxed text-center text-[hsl(var(--scroll-indicator))] text-[clamp(0.98rem,3.4vw,1.35rem)]"
          data-cursor="big"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: delays.sub, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* tua frase */}
        </motion.p>
      </motion.div>
    </section>
  );
}
