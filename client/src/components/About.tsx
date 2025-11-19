import { motion } from "framer-motion";

const TextRevealScroll = ({
  text,
  className = "",
  delay = 0,
  speed = 0.01 // più veloce dell’hero
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) => {
  const characters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: delay,
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"      // 👈 si anima solo quando compare a schermo
      viewport={{ once: true, amount: 0.3 }} // 👈 solo la prima volta
    >
      {characters.map((char, i) => (
        <motion.span key={i} variants={child}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};




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
          <TextRevealScroll text="Chi sono" speed={0.01} />
        </h2>

        <div className="space-y-6 text-lg md:text-xl text-foreground/80 font-light leading-relaxed">
          <p>
            <TextRevealScroll
              text="Sono un developer e designer appassionato con esperienza nella creazione di prodotti digitali innovativi e user-centered."
              speed={0.02}
            />
          </p>

          <p>
            <TextRevealScroll
              text="Mi piace lavorare all'intersezione tra design e tecnologia, combinando estetica e funzionalità per creare esperienze memorabili."
              speed={0.02}
            />
          </p>

          <p>
            <TextRevealScroll
              text="Con un focus su React, TypeScript e animazioni web moderne, trasformo idee in realtà digitali che coinvolgono e ispirano."
              speed={0.02}
            />
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
