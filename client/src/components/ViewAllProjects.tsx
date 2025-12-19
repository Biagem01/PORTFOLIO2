import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

export default function ViewAllProjects() {
  return (
    <section className="relative bg-background overflow-hidden py-32">

      {/* LIGHT BEAM */}
      <motion.div
        className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent"
        initial={{ opacity: 0, x: -150 }}
        whileInView={{ opacity: 0.15, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center relative z-10">

        {/* LABEL */}
        <motion.p
          data-cursor="big"
          className="text-sm uppercase tracking-[0.3em] text-foreground/50"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Explore more
        </motion.p>

        {/* TITLE */}
        <motion.h3
          data-cursor="big"
          className="
            text-5xl md:text-7xl tracking-tight leading-[1.05] mt-6 
            text-[hsl(var(--scroll-indicator))] font-extrabold
          "
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          VUOI{" "}
          <span className="text-[hsl(var(--accent-orange))]/80">VEDERE</span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            TUTTI I {" "}
            <span className="text-[hsl(var(--accent-orange))]/80">
              PROGETTI
            </span>
            ?
          </motion.span>
        </motion.h3>

        {/* DESCRIPTION */}
        <motion.p
          data-cursor="big"
          className="text-sm md:text-base font-light text-foreground/50 max-w-2xl mt-8 leading-relaxed"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Immergiti nella mia collezione completa di progetti, casi studio 
          e concept personali sviluppati con passione.
        </motion.p>

        {/* BUTTON */}
{/* CTA BUTTON */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.7 }}
  className="relative mt-16"
  data-cursor="hide"
>
  <Link to="/projects">
    <motion.button
      data-cursor="small"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className="
        group relative overflow-hidden
        px-9 py-4
        rounded-full
        text-base font-medium tracking-wide
        text-black
        bg-[hsl(var(--accent-orange))]
        border border-white/10
        shadow-[0_0_18px_hsl(var(--accent-orange)/0.35)]
        transition-all duration-500
      "
    >
      {/* Glow soft */}
      <motion.span
        className="
          absolute inset-0 
          bg-[hsl(var(--accent-orange))]
          opacity-0 
          group-hover:opacity-15 
          blur-xl 
          transition-all duration-500
        "
      />

      {/* Testo */}
      <span className="relative z-10 flex font-extrabold items-center gap-2.5">
        VEDI TUTTI I PROGETTI
        <ArrowUpRight 
          className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
        />
      </span>
    </motion.button>
  </Link>

  {/* SOFT AURA più piccola */}
  <motion.div
    className="
      absolute -z-10 top-1/2 left-1/2 
      w-56 h-56
      -translate-x-1/2 -translate-y-1/2
      rounded-full 
      bg-[hsl(var(--accent-orange))/0.07] 
      blur-3xl
    "
    animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
  />
</motion.div>


      </div>
    </section>
  );
}
