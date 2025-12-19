import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRoute } from "wouter";

const projectsData = {
  "e-commerce-platform": {
    title: "E-Commerce Platform",
    subtitle: "End-to-end shopping experience",
    description:
      "Una piattaforma completa con gestione prodotti, carrello, checkout, pagamenti e dashboard admin.",
    cover:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=1920&h=1080&fit=crop",
    tech: ["React", "TypeScript", "Stripe", "Tailwind", "Node.js"],
    screenshots: [
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=1800",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800",
    ],
  },

  "analytics-dashboard": {
    title: "Analytics Dashboard",
    subtitle: "Real-time insights & visualizations",
    description:
      "Dashboard real-time con data visualization dinamica, filtri avanzati e animazioni fluide.",
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop",
    tech: ["Next.js", "PostgreSQL", "Chart.js", "Framer Motion"],
    screenshots: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1800",
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=1800",
    ],
  },
} as const;

type Slug = keyof typeof projectsData;

export default function ProjectPage() {
  // 👉 TIPIZZAZIONE CORRETTA: ora params NON è mai 'never' e NON dà errori
  const [match, params] = useRoute<{ slug: Slug }>("/project/:slug");

  // Hooks devono stare SEMPRE qui, non dopo return
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -200]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Se non c'è match oppure slug non valido → pagina not found
  if (!match || !params || !(params.slug in projectsData)) {
    return <div className="text-white p-10">Project not found</div>;
  }

  const data = projectsData[params.slug];

  return (
    <div className="min-h-screen bg-black text-white" >

        {/* BACK BUTTON — stile Minh Pham */}
<motion.button
  onClick={() => (window.location.href = "/projects")}
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
  className="
    fixed top-10 left-10 z-50 
    text-white text-sm tracking-wider uppercase
    hover:text-white/70 transition-colors
  "
  data-cursor="hide"
>
  <span className="relative inline-block" >
    ← Back
    <motion.span
      className="absolute left-0 -bottom-1 h-[1px] bg-white w-full"
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    />
  </span>
</motion.button>


      {/* HERO */}
      <motion.div
        className="relative w-full h-[95vh] overflow-hidden"
        style={{ opacity: heroOpacity, y: heroY }}
        data-cursor="details"
      >
        <motion.img
          src={data.cover}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          data-cursor="details"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <motion.div
          className="absolute bottom-24 left-16 max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          
        >
          <h1 className="text-5xl font-bold mb-4">{data.title}</h1>
          <p className="text-xl text-neutral-300">{data.subtitle}</p>
        </motion.div>
      </motion.div>

      {/* DESCRIZIONE */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <motion.p
          className="text-lg text-neutral-300 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          data-cursor="big"
        >
          {data.description}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {data.tech.map((t) => (
            <span
              key={t}
              className="px-4 py-1.5 text-sm rounded-full bg-white/10 border border-white/20 backdrop-blur-md"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </section>

      {/* SCREENSHOTS */}
      <section className="space-y-32 py-20">
        {data.screenshots.map((shot, i) => (
          <motion.div
            key={i}
            className="max-w-6xl mx-auto px-6"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src={shot}
              className="rounded-2xl w-full shadow-[0_0_50px_rgba(255,255,255,0.15)]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
            />
          </motion.div>
        ))}
      </section>

      <div className="py-32 text-center text-neutral-500 tracking-widest">
        — END OF PROJECT —
      </div>
    </div>
  );
}
