import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type LineRevealProps = {
  text: string;
  delay?: number;
  className?: string;
};

function LineReveal({ text, delay = 0, className = "" }: LineRevealProps) {
  const reduce = useReducedMotion();
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const yStart = "140%";

  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block will-change-transform"
        initial={
          reduce
            ? { opacity: 0 }
            : { y: yStart, opacity: 0, filter: "blur(12px)" }
        }
        animate={
          reduce
            ? { opacity: 1 }
            : { y: "0%", opacity: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 1.25, delay, ease }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

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

  return (
   <section
  id="hero"
  className="
    relative
    min-h-[100svh]
    flex items-center justify-center
    px-4 sm:px-6 md:px-10 lg:px-12
    pt-[max(5rem,env(safe-area-inset-top))]
    pb-[max(4.5rem,env(safe-area-inset-bottom))]
    overflow-x-clip
    overflow-y-visible
    isolate
  "
>
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="
          w-full
          max-w-[64rem]
          mx-auto
          text-center
        "
      >
        {/* NAME */}
        <motion.p
          className="
            uppercase
            text-[0.68rem] sm:text-[0.75rem] md:text-[0.85rem]
            tracking-[0.28em] sm:tracking-[0.35em]
            text-foreground/50
            mb-6 sm:mb-8
            font-light
          "
          initial={
            reduce ? { opacity: 1 } : { opacity: 0, y: 14, filter: "blur(10px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.0,
            delay: delays.name,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          biagio cubisino
        </motion.p>

        {/* HERO LINES */}
        <h1
          className="
            select-none text-center
            font-extrabold tracking-tight
            [text-wrap:balance]
            break-words
            leading-[1.02] sm:leading-[0.98] lg:leading-[0.95]
            text-[clamp(2.1rem,10vw,6.2rem)]
          "
          data-cursor="big"
        >
          <LineReveal
            text="CRAFTING"
            delay={delays.l1}
            className="text-[hsl(var(--scroll-indicator))]"
          />
          <LineReveal
            text="MODERN"
            delay={delays.l2}
            className="text-[hsl(var(--accent-orange))]"
          />
          <LineReveal
            text="DIGITAL"
            delay={delays.l3}
            className="text-[hsl(var(--scroll-indicator))]"
          />
          <LineReveal
            text="EXPERIENCES"
            delay={delays.l4}
            className="text-[hsl(var(--accent-orange))]"
          />
          <LineReveal
            text="DAILY"
            delay={delays.l5}
            className="text-[hsl(var(--scroll-indicator))]"
          />
        </h1>

        {/* SUBTEXT */}
        <motion.p
          className="
            mt-7 sm:mt-10
            mx-auto
            max-w-[40rem]
            font-light
            leading-relaxed
            text-center
            [text-wrap:balance]
            text-[hsl(var(--scroll-indicator))]
            text-[clamp(0.98rem,3.4vw,1.35rem)]
            px-1 sm:px-0
          "
          data-cursor="big"
          initial={
            reduce ? { opacity: 1 } : { opacity: 0, y: 16, filter: "blur(12px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.1,
            delay: delays.sub,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Metti qui la tua frase */}
        </motion.p>
      </motion.div>
    </section>
  );
}
