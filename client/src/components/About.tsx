import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import profileImage from "@/assets/profile.jpg";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for the hero text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  return (
    <section id="about" ref={containerRef} className="min-h-screen py-24 px-6 bg-background relative overflow-hidden">
      {/* Background gradient blob */}
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -200]),
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Hero Statement */}
        <motion.div
          className="mb-32 text-center"
          style={{ opacity, scale }}
        >
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            Helping brands thrive
            <br />
            <span className="text-primary">in the digital world</span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Mi occupo di creare soluzioni digitali su misura per aziende in tutto il mondo. 
            Con ogni progetto, spingo il mio lavoro verso nuovi orizzonti, mettendo sempre la qualità al primo posto.
          </motion.p>

          <motion.p
            className="text-sm md:text-base text-muted-foreground/60 mt-6 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Always exploring...
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-16 text-center">
            Come posso aiutarti...
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <motion.div
              className="group relative p-8 rounded-2xl border border-border bg-card hover:shadow-soft transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8 }}
            >
              <span className="text-sm text-muted-foreground font-mono mb-4 block">01</span>
              <h4 className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                Design
              </h4>
              <p className="text-foreground/70 leading-relaxed">
                Con una solida esperienza nella progettazione di siti web, realizzo design digitali forti e user-friendly che mettono l'utente al centro.
              </p>
            </motion.div>

            {/* Service 2 */}
            <motion.div
              className="group relative p-8 rounded-2xl border border-border bg-card hover:shadow-soft transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8 }}
            >
              <span className="text-sm text-muted-foreground font-mono mb-4 block">02</span>
              <h4 className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                Development
              </h4>
              <p className="text-foreground/70 leading-relaxed">
                Costruisco siti web scalabili da zero che si integrano perfettamente con il design. Il mio focus è su micro animazioni, transizioni e interazioni.
              </p>
            </motion.div>

            {/* Service 3 */}
            <motion.div
              className="group relative p-8 rounded-2xl border border-border bg-card hover:shadow-soft transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8 }}
            >
              <span className="text-sm text-muted-foreground font-mono mb-4 block">03</span>
              <h4 className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                The Full Package
              </h4>
              <p className="text-foreground/70 leading-relaxed">
                Un sito web completo dal concept all'implementazione, questo è ciò che mi distingue. Il mio senso del design e le mie competenze di sviluppo creano progetti straordinari.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* About Me Section with Image */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          {/* Image Column */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ y }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent opacity-50 mix-blend-overlay z-10" />
              <img
                src={profileImage}
                alt="About me"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Text Column */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-8">
              Chi sono
            </h3>

            <motion.p
              className="text-lg text-foreground/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Sono un developer e designer appassionato con esperienza nella creazione di prodotti digitali innovativi e user-centered.
            </motion.p>

            <motion.p
              className="text-lg text-foreground/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Mi piace lavorare all'intersezione tra design e tecnologia, combinando estetica e funzionalità per creare esperienze memorabili.
            </motion.p>

            <motion.p
              className="text-lg text-foreground/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Con un focus su React, TypeScript e animazioni web moderne, trasformo idee in realtà digitali che coinvolgono e ispirano.
            </motion.p>

            <motion.div
              className="pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="inline-block px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
                <p className="text-sm font-medium text-primary">
                  ✨ Sempre alla ricerca di nuove sfide
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
