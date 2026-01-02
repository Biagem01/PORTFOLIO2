import { motion } from "framer-motion";

// Servizi / skill macro
const services = [
  {
    title: "Frontend & UI",
    description:
      "Interfacce pulite, responsive e veloci con React, TypeScript e Tailwind CSS.",
  },
  {
    title: "Motion & Micro–interactions",
    description:
      "Animazioni morbide che guidano l’occhio e rendono l’esperienza più memorabile.",
  },
  {
    title: "Product Thinking",
    description:
      "Non solo UI: penso a flussi, gerarchie e obiettivi reali di chi usa il prodotto.",
  },
  {
    title: "Full–stack Basics",
    description:
      "APIs, Node.js ed integrazioni che rendono i progetti più completi e reali.",
  },
  {
    title: "Performance & UX",
    description:
      "Ottimizzo caricamenti, transizioni e struttura per un uso fluido su ogni device.",
  },
  {
    title: "Learning & Experiments",
    description:
      "Sempre a smanettare con nuove librerie, tecniche e tool per alzare il livello.",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-background px-6 md:px-10 lg:px-16 py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-[0.85fr,1.15fr] gap-12 lg:gap-20">

        {/* COLONNA SINISTRA — TITOLO STICKY */}
        <div className="md:sticky md:top-28 self-start space-y-6 md:space-y-8">

          {/* Label */}
          <motion.p
            className="
              text-xs md:text-sm 
              tracking-[0.25em] uppercase
              text-foreground/50
            "
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            data-cursor="big"
          >
            About me
          </motion.p>

          {/* HEADLINE — molto più pulita */}
          <motion.h2
            className="
              text-[2.2rem] md:text-[3rem] lg:text-[3.6rem]
              font-extrabold   leading-[1.15] tracking-tight
              text-[hsl(var(--scroll-indicator))]
              uppercase
            "
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            data-cursor="big"
          >
            I design and build{" "}
            <span className="text-[hsl(var(--accent-orange))]/80 ">
              digital experiences
            </span>{" "}
            that are clean, smooth and intentional.
          </motion.h2>

          
        </div>

        {/* COLONNA DESTRA — TESTO + WHAT I DO */}
        <div className="space-y-16 md:space-y-20 ">

          {/* BLOCCO TESTO */}
          <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.4 }}
  transition={{ duration: 0.7 }}
  className="space-y-5"
>
  <p
    className="
      text-xs md:text-sm
      text-[hsl(var(--scroll-indicator))]/70
      leading-relaxed 
      uppercase 
      font-light
    "
    data-cursor="big"
  >
    Sono uno sviluppatore front-end con attenzione al dettaglio.
    Mi piace costruire prodotti chiari, ordinati e piacevoli da usare.
  </p>

  <p
    className="
      text-xs md:text-sm
      text-[hsl(var(--scroll-indicator))]/70
      leading-relaxed 
      uppercase 
      font-light
    "
    data-cursor="big"
  >
    Quando progetto una pagina non penso solo a come{" "}
    <span className="font-medium uppercase text-[hsl(var(--accent-orange))]">
      appare
    </span>
    , ma anche a come{" "}
    <span className="font-medium uppercase text-[hsl(var(--accent-orange))]">
      si muove
    </span>
    : ritmo dello scroll, tempi delle animazioni, micro-feedback funzionali.
  </p>

  <p
    className="
      text-xs md:text-sm
      text-[hsl(var(--scroll-indicator))]/70
      leading-relaxed 
      uppercase 
      font-light
    "
    data-cursor="big"
  >
    Credo in layout{" "}
    <span className="font-medium uppercase text-[hsl(var(--accent-orange))]">
      semplici ma vivi
    </span>
    : niente elementi inutili, solo ciò che serve per comunicare un’esperienza pulita e coerente.
  </p>
</motion.div>


          {/* WHAT I DO */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="space-y-2">
              <p
                className="text-xs md:text-sm tracking-[0.25em] uppercase text-foreground/50"
                data-cursor="big"
              >
                What I do
              </p>

              <h3
                className="
                  text-[1.6rem] md:text-[2rem] lg:text-[2.5rem]
                  font_extrabold tracking-tight leading-tight
                  text-[hsl(var(--scroll-indicator))]
                "
                data-cursor="big"
              >
                A SMALL SET OF SKILLS TO{" "}
                <span className="text-[hsl(var(--accent-orange))]/80  ">
                MAKE THINGS FEEL GOOD.
                </span>
              </h3>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {services.map((service, index) => (
                <motion.article
                  key={service.title}
                  className="
                    group relative border border-border/50 rounded-xl
                    px-5 py-5 md:px-6 md:py-6
                    bg-background/60 backdrop-blur-sm overflow-hidden
                  "
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -6, scale: 1.015 }}
                  data-cursor="big"
                >
                  <div className="relative z-10 space-y-2.5">
                    <h4 className="text-base md:text-lg text-[hsl(var(--accent-orange))]/70 tracking-tight ">
                      {service.title}
                    </h4>
                    <p className="text-xs md:text-sm  text-[hsl(var(--scroll-indicator))]  leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
