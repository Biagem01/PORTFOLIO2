import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180, mass: 0.3 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const [variant, setVariant] = useState<
    "default" | "small" | "big" | "hidden" | "view" | "details"
  >("default");

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;

      // 👉 Pagina dettagli: cursore SEMPRE arancione senza testo
      if (target.closest("[data-cursor='details']")) {
        setVariant("details");
        return;
      }

      if (target.closest("[data-cursor='hide']")) {
        setVariant("hidden");
      } else if (target.closest("[data-cursor='small']")) {
        setVariant("small");
      } else if (target.closest("[data-cursor='view']")) {
        setVariant("view");
      } else if (target.closest("[data-cursor='big']")) {
        setVariant("big");
      } else {
        setVariant("default");
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const isDetails = variant === "details";

  return (
    <motion.div
      className="
        pointer-events-none 
        fixed top-0 left-0 z-[999999]
        flex items-center justify-center
        font-semibold uppercase tracking-widest
      "
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%"
      }}
      animate={{
        width:
          variant === "view" ? 170 :
          variant === "small" ? 22 :
          variant === "big" ? 250 :
          38,
        height:
          variant === "view" ? 170 :
          variant === "small" ? 22 :
          variant === "big" ? 250 :
          38,

        opacity: variant === "hidden" ? 0 : 1,

        borderRadius: "999px",

       // 👉 Colore brand aggiornato
        backgroundColor: "rgb(235, 89, 57)",

        // 👉 SE siamo nella pagina dettagli → NO blend mode
        // 👉 Altrimenti, effetto figo di difference
        mixBlendMode: isDetails ? "normal" : variant === "view" ? "normal" : "difference",
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 26,
      }}
    >
      {/* Testo solo nella home → view details */}
      {variant === "view" && !isDetails && (
        <span className="pointer-events-none text-[14px] text-black">
          VIEW DETAILS
        </span>
      )}
    </motion.div>
  );
}
