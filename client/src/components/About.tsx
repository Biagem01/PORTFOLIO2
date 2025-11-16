import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section id="about" ref={ref} className="h-screen relative overflow-hidden flex items-center">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-4xl mx-auto px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
            Chi sono
          </h2>
          <div className="space-y-6 text-lg md:text-2xl text-foreground/80 font-light leading-relaxed">
            <p>
              Sono un developer e designer appassionato con esperienza nella creazione di 
              prodotti digitali innovativi e user-centered.
            </p>
            <p>
              Mi piace lavorare all'intersezione tra design e tecnologia, combinando 
              estetica e funzionalità per creare esperienze memorabili.
            </p>
            <p>
              Con un focus su React, TypeScript e animazioni web moderne, trasformo 
              idee in realtà digitali che coinvolgono e ispirano.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
