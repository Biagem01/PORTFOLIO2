import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ChevronDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      subtitle: "From Idea to MVP",
      description:
        "Piattaforma e-commerce completa con gestione prodotti, carrello avanzato, checkout sicuro e dashboard amministrativa.",
      tags: ["React", "TypeScript", "Stripe", "Tailwind CSS", "Node.js"],
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=1920&h=1080&fit=crop",
    },
    {
      title: "Dashboard Analytics",
      subtitle: "Innovation & Design",
      description:
        "Dashboard interattiva per visualizzazione e analisi dati real-time con grafici avanzati e filtri dinamici.",
      tags: ["Next.js", "Chart.js", "Tailwind", "API REST", "PostgreSQL"],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop",
    },
    {
      title: "Social Media App",
      subtitle: "Full UX Design Process",
      description:
        "Applicazione social completa con feed personalizzato, messaggistica in tempo reale e notifiche push.",
      tags: ["React", "Firebase", "Framer Motion", "Tailwind", "WebSocket"],
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&h=1080&fit=crop",
    },
  ];

  return (
    <section id="projects" className="relative bg-background">
      {/* Sezione introduttiva "My Projects" */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl"
        >
          <motion.p 
            className="text-base md:text-lg text-muted-foreground mb-6 font-light tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Portfolio
          </motion.p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-none">
            My Projects
          </h2>
          <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed font-light">
            Una collezione di progetti selezionati che ho progettato e sviluppato per persone reali.
          </p>
        </motion.div>

        {/* Indicatore di scroll con animazione più fluida */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute bottom-12 flex flex-col items-center gap-3"
        >
          <span className="text-sm text-muted-foreground font-light tracking-wide">Scroll per esplorare</span>
          <motion.div
            animate={{ 
              y: [0, 12, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              ease: "easeInOut" 
            }}
          >
            <ChevronDown className="h-6 w-6 text-muted-foreground" data-testid="icon-scroll-indicator" />
          </motion.div>
        </motion.div>
      </div>

      {/* Container per progetti con scroll corretto */}
      <div className="relative">
        {projects.map((project, index) => (
          <ProjectSection 
            key={project.title} 
            project={project} 
            index={index}
            totalProjects={projects.length}
          />
        ))}
      </div>
    </section>
  );
};

interface ProjectSectionProps {
  project: {
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    image: string;
  };
  index: number;
  totalProjects: number;
}

const ProjectSection = ({ project, index }: ProjectSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Effetto parallasse per lo sfondo - PIÙ ACCENTUATO
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.2, 1.4]);

  // Opacità della card che sfuma più gradualmente
  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [1, 1, 0.6]
  );

  // Scala della card durante lo scroll
  const cardScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1, 0.95]
  );

  // Rotazione leggera della card
  const cardRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -2]
  );

  // Border radius che aumenta durante lo scroll
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 24]
  );

  // Blur effect che aumenta
  const blur = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [0, 0, 4]
  );

  // Animazione della card in entrata
  const cardY = useTransform(cardProgress, [0, 0.4, 0.8], [100, 0, -50]);

  return (
    <div 
      ref={ref} 
      className="h-screen relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="relative h-full w-full"
          style={{ 
            borderRadius,
          }}
        >
          {/* Sfondo con parallasse PIÙ ACCENTUATO */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${project.image})`,
              y: backgroundY,
              scale: backgroundScale,
            }}
          >
            {/* Overlay scuro graduale per migliorare leggibilità */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.5], [0.4, 0.7]),
              }}
            />
            
            {/* Gradient overlay dal basso */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
          </motion.div>

          {/* Contenuto del progetto - CARD MIGLIORATA */}
          <div className="relative h-full flex items-center justify-start px-6 md:px-12 lg:px-20 py-20">
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, x: -150, scale: 0.7, filter: "blur(40px)", rotateY: -30 }}
              whileInView={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)", rotateY: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ 
                duration: 1.6, 
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ 
                opacity: cardOpacity,
                scale: cardScale,
                rotateZ: cardRotate,
                y: cardY,
                filter: `blur(${blur}px)`,
              }}
              className="max-w-lg w-full relative group perspective"
            >
              {/* Glow effect dietro la card - PIÙ VISIBILE */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Card principale - PIÙ VISIBILE */}
              <div className="relative backdrop-blur-3xl bg-gradient-to-br from-background/60 via-background/50 to-background/40 p-8 md:p-10 rounded-2xl border border-white/20 shadow-2xl overflow-hidden group-hover:shadow-3xl transition-shadow duration-500">
                {/* Gradient decorativo interno */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
                
                {/* Contenuto */}
                <div className="relative z-10">
                  {/* Subtitle con animazione */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <p className="text-xs font-medium text-primary mb-4 uppercase tracking-widest flex items-center gap-2" data-testid={`text-subtitle-${index}`}>
                      <span className="inline-block w-8 h-px bg-primary/50"></span>
                      {project.subtitle}
                    </p>
                  </motion.div>

                  {/* Title */}
                  <motion.h3 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 tracking-tight bg-gradient-to-br from-foreground via-foreground to-foreground/80 bg-clip-text" 
                    data-testid={`text-title-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {project.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p 
                    className="text-base md:text-lg text-foreground/80 leading-relaxed mb-8 font-light" 
                    data-testid={`text-description-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Tags */}
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {project.tags.map((tag, tagIndex) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.3, delay: 0.5 + tagIndex * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <Badge 
                          variant="outline" 
                          className="px-4 py-1.5 text-xs font-medium rounded-full backdrop-blur-sm bg-background/20 border-white/20 hover:bg-background/30 hover:border-white/30 transition-all duration-300" 
                          data-testid={`badge-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Button 
                      variant="default" 
                      className="group gap-3 px-6 py-6 bg-foreground/90 hover:bg-foreground text-background border-0 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 rounded-xl" 
                      data-testid={`button-view-project-${index}`}
                    >
                      <span className="text-sm font-semibold tracking-wide">Vedi Dettagli Progetto</span>
                      <motion.div
                        animate={{ 
                          x: [0, 4, 0],
                          y: [0, -4, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/5 to-transparent rounded-tl-2xl" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
