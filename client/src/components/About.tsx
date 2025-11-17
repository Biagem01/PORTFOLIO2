import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center bg-background px-6 py-20">
      <motion.div 
        className="max-w-4xl w-full mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-12">
          Chi sono
        </h2>
        <div className="space-y-6 text-lg md:text-xl text-foreground/80 font-light leading-relaxed">
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
    </section>
  );
};

export default About;
