import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Dribbble,
  Instagram,
  Youtube,
  Linkedin,
  Volume2,
  VolumeX,
} from "lucide-react";

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <motion.div
      className={className}
      initial={
        reduce ? { opacity: 1 } : { opacity: 0, y: 12, filter: "blur(12px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ✅ CONNECT ITEM con reveal “Hero-like”
 * - titolo: font-extrabold (stesso feel di CRAFTING/MODERN)
 * - NO font-bold/font-semibold (così non scatta la tua regola css che li colora arancio)
 * - subtitle appare SOLO in hover come su minhpham
 */
function ConnectItem({
  href,
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
  delay = 0,
}: {
  href: string;
  title: string;
  subtitle: string;
  titleClassName: string;
  subtitleClassName: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative py-3 md:py-3.5 border-b border-white/10 focus:outline-none"
      initial={
        reduce ? { opacity: 0 } : { y: "140%", opacity: 0, filter: "blur(12px)" }
      }
      whileInView={
        reduce ? { opacity: 1 } : { y: "0%", opacity: 1, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 1.05, delay, ease }}
    >
      <div className="flex items-center justify-between gap-4">
        <span className={titleClassName}>{title}</span>

        <span className="inline-flex items-center gap-2 text-[hsl(var(--scroll-indicator))]/55">
          <span className="relative h-px w-10 overflow-hidden">
            <span className="absolute inset-0 bg-[hsl(var(--scroll-indicator))]/15" />
            <span className="absolute inset-0 bg-[hsl(var(--accent-orange))] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
          </span>

          <ArrowUpRight className="h-4 w-4 text-[hsl(var(--scroll-indicator))]/45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--scroll-indicator))]/80" />
        </span>
      </div>

      {/* subtitle SOLO hover (come Minh) */}
      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        whileHover={reduce ? undefined : { height: 20, opacity: 1 }}
        transition={{ duration: 0.24, ease }}
      >
        <div className={`${subtitleClassName} pt-1.5`}>{subtitle}</div>
      </motion.div>
    </motion.a>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [soundOn, setSoundOn] = useState(false);
  const reduce = useReducedMotion();

  // ✅ label identico al NAME hero (ma con palette del sito)
  const HERO_LABEL =
    "uppercase text-[0.75rem] md:text-[0.85rem] tracking-[0.35em] font-light text-[hsl(var(--scroll-indicator))]/55";

  // ✅ titoli: “peso” come hero (CRAFTING/MODERN...)
  // ⚠️ NON usare font-bold/font-semibold (hai una regola CSS che li colora arancioni)
  const HERO_LINK_TITLE =
    "text-[1.05rem] md:text-[1.15rem] lg:text-[1.2rem] font-extrabold leading-[1.05] tracking-tight text-[hsl(var(--scroll-indicator))]";

  // ✅ subtitle leggero, come subtext hero
  const HERO_LINK_SUB =
    "text-[0.95rem] md:text-[1rem] font-light leading-relaxed tracking-tight text-[hsl(var(--scroll-indicator))]/55";

  const connect = useMemo(
    () => [
      { title: "Dribbble", subtitle: "Fake works", href: "https://dribbble.com/" },
      { title: "Youtube", subtitle: "Random tutorials", href: "https://www.youtube.com/" },
      { title: "Linkedin", subtitle: "Serious me", href: "https://www.linkedin.com/" },
      { title: "Instagram", subtitle: "Not Tiktok", href: "https://www.instagram.com/" },
      { title: "Facebook", subtitle: "Mostly dog stories", href: "https://www.facebook.com/" },
      { title: "Behance", subtitle: "The Jurassic Park", href: "https://www.behance.net/" },
    ],
    []
  );

  return (
    <footer
      id="footer"
      className="relative bg-black text-white overflow-hidden"
      data-cursor="hide"
    >
      {/* nero “unico” come Contact */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-black/35" />

      {/* grid leggerissima */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0),
              radial-gradient(circle at 23px 23px, rgba(255,255,255,0.06) 1px, transparent 0)
            `,
            backgroundSize: "48px 48px",
            animation: reduce ? "none" : "gridMove 24s linear infinite",
          }}
        />
      </div>

      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
          mixBlendMode: "overlay",
        }}
      />

      {/* ✅ SUPER COMPACT come Minh */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-10 md:pt-12 pb-8 md:pb-10">
        {/* label */}
        <FadeIn delay={0.02}>
          <p className={HERO_LABEL}>CONNECT</p>
        </FadeIn>

        {/* 3 + 3 grid */}
        <div className="mt-4 border-t border-white/10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10">
            {connect.map((c, i) => (
              <ConnectItem
                key={c.title}
                href={c.href}
                title={c.title}
                subtitle={c.subtitle}
                titleClassName={HERO_LINK_TITLE}
                subtitleClassName={HERO_LINK_SUB}
                delay={0.06 + i * 0.03}
              />
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-6 md:mt-7 border-t border-white/10 pt-5 md:pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <FadeIn delay={0.06}>
            <div className="flex items-center gap-4">
              <a
                href="https://dribbble.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--scroll-indicator))]/55 hover:text-[hsl(var(--scroll-indicator))]/90 transition"
                aria-label="Dribbble"
              >
                <Dribbble className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--scroll-indicator))]/55 hover:text-[hsl(var(--scroll-indicator))]/90 transition"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--scroll-indicator))]/55 hover:text-[hsl(var(--scroll-indicator))]/90 transition"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--scroll-indicator))]/55 hover:text-[hsl(var(--scroll-indicator))]/90 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-center justify-between md:justify-end gap-8">
              <div className={HERO_LABEL}>© {currentYear} BIAGIO CUBISINO</div>

              <button
                type="button"
                onClick={() => setSoundOn((s) => !s)}
                className="group inline-flex items-center gap-3 text-[hsl(var(--scroll-indicator))]/65 hover:text-[hsl(var(--scroll-indicator))] transition"
                aria-label={soundOn ? "Sound Off" : "Sound On"}
              >
                <span className={HERO_LABEL}>SOUND</span>
                <span className="uppercase tracking-[0.35em] text-[0.75rem] md:text-[0.85rem] font-light text-[hsl(var(--scroll-indicator))]/45 group-hover:text-[hsl(var(--accent-orange))] transition">
                  {soundOn ? "ON" : "OFF"}
                </span>
                {soundOn ? (
                  <Volume2 className="h-4 w-4 opacity-70" />
                ) : (
                  <VolumeX className="h-4 w-4 opacity-70" />
                )}
              </button>
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(40px,40px,0); }
        }
      `}</style>
    </footer>
  );
}
