import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: heroProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: servicesProgress } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"],
  });

  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.5], [1, 0.8]);
  const heroY = useTransform(heroProgress, [0, 0.5], [0, -100]);

  const servicesY = useTransform(servicesProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -50]);
  const servicesOpacity = useTransform(servicesProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  return (
    <section id="about" className="relative bg-background overflow-hidden">
      {/* Hero Section - Large Statement */}
      <div 
        ref={containerRef}
        className="min-h-screen flex items-center justify-center px-6 py-32 relative"
      >
        <motion.div
          className="max-w-6xl mx-auto w-full"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground font-light tracking-wide"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              data-testid="text-about-greeting"
            >
              Ciao
            </motion.p>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight" data-testid="text-about-hero-title">
              <motion.span 
                className="block mb-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 }}
              >
                Aiuto i brand a prosperare
              </motion.span>
              <motion.span 
                className="block text-primary"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.5 }}
              >
                nel mondo digitale
              </motion.span>
            </h2>

            <motion.p
              className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              data-testid="text-about-hero-description"
            >
              Aiuto aziende di tutto il mondo con soluzioni su misura. Con ogni progetto, 
              porto il mio lavoro verso nuovi orizzonti, mettendo sempre la qualità al primo posto.
            </motion.p>

            <motion.p
              className="text-base md:text-lg text-muted-foreground/60 italic font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
              data-testid="text-about-tagline"
            >
              Always exploring...
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Decorative gradient blob */}
        <motion.div
          className="absolute top-1/4 -right-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Services Section */}
      <div 
        ref={servicesRef}
        className="min-h-screen flex items-center justify-center px-6 py-32 relative"
      >
        <motion.div
          className="max-w-7xl mx-auto w-full"
          style={{ y: servicesY, opacity: servicesOpacity }}
        >
          <motion.h3 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-24 tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            data-testid="text-services-heading"
          >
            Posso aiutarti con...
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {/* Service 1 - Design */}
            <ServiceCard
              number="01"
              title="Design"
              description="Con una solida esperienza nella progettazione di siti web, realizzo design digitali forti e user-friendly. (Dal 2024 solo in combinazione con lo sviluppo)"
              delay={0.1}
            />

            {/* Service 2 - Development */}
            <ServiceCard
              number="02"
              title="Development"
              description="Costruisco siti web scalabili da zero che si integrano perfettamente con il design. Il mio focus è su micro animazioni, transizioni e interazioni."
              delay={0.3}
            />

            {/* Service 3 - The Full Package */}
            <ServiceCard
              number="03"
              title="The Full Package"
              description="Un sito web completo dal concetto all'implementazione, questo è ciò che mi distingue. Il mio senso del design e le mie competenze di sviluppo creano progetti straordinari."
              delay={0.5}
              isSpecial
            />
          </div>
        </motion.div>
      </div>

      {/* Philosophy Section */}
      <div className="min-h-[80vh] flex items-center justify-center px-6 py-32 relative">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="inline-block mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="px-6 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <p className="text-sm font-medium text-primary tracking-wide" data-testid="text-philosophy-badge">
                La mia filosofia
              </p>
            </div>
          </motion.div>

          <motion.h4 
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-12 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            data-testid="text-philosophy-title"
          >
            Creo esperienze digitali che{" "}
            <span className="text-primary">coinvolgono</span> e{" "}
            <span className="text-accent">ispirano</span>
          </motion.h4>

          <motion.p
            className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            data-testid="text-philosophy-description"
          >
            Lavoro all'intersezione tra design e tecnologia, combinando estetica e funzionalità. 
            Con un focus su React, TypeScript e animazioni web moderne, trasformo idee in realtà 
            digitali che lasciano il segno.
          </motion.p>

          <motion.div
            className="mt-16 grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <StatCard value="5+" label="Anni di esperienza" />
            <StatCard value="50+" label="Progetti completati" />
            <StatCard value="100%" label="Dedicazione" />
          </motion.div>
        </motion.div>

        {/* Bottom gradient */}
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  );
};

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  delay: number;
  isSpecial?: boolean;
}

const ServiceCard = ({ number, title, description, delay, isSpecial }: ServiceCardProps) => {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className={`relative p-8 rounded-2xl border transition-all duration-500 ${
          isSpecial 
            ? "bg-gradient-to-br from-primary/5 via-accent/5 to-background border-primary/20" 
            : "bg-card/50 backdrop-blur-sm border-border/50"
        }`}
        whileHover={{ 
          y: -12, 
          scale: 1.02,
          boxShadow: isSpecial 
            ? "0 20px 40px -15px rgba(var(--primary-rgb, 147, 112, 219), 0.2)"
            : "0 20px 40px -15px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Number */}
        <motion.span 
          className="block text-sm text-muted-foreground font-mono mb-6 tracking-wider"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
          data-testid={`text-service-number-${number}`}
        >
          {number}
        </motion.span>

        {/* Title */}
        <h4 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors duration-300" data-testid={`text-service-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h4>

        {/* Description */}
        <p className="text-foreground/70 leading-relaxed font-light" data-testid={`text-service-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {description}
        </p>

        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-6 right-6 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
};

interface StatCardProps {
  value: string;
  label: string;
}

const StatCard = ({ value, label }: StatCardProps) => {
  return (
    <motion.div
      className="text-center"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <h5 className="text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight" data-testid={`text-stat-value-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        {value}
      </h5>
      <p className="text-sm md:text-base text-muted-foreground font-light" data-testid={`text-stat-label-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        {label}
      </p>
    </motion.div>
  );
};

export default About;
