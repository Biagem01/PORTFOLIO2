import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            My Projects
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Here is a collection of selected projects that I designed and built for real people.
          </p>
        </motion.div>

        {/* Indicatore di scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
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

const ProjectSection = ({ project, index, totalProjects }: ProjectSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Effetto parallasse per lo sfondo - più pronunciato
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Opacità della card che sfuma leggermente
  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [1, 1, 0.8]
  );

  // Border radius che aumenta leggermente durante lo scroll
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 16]
  );

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
          {/* Sfondo con parallasse - rimane a dimensione piena */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${project.image})`,
              y: backgroundY,
              scale: 1.1,
            }}
          >
            {/* Overlay scuro per migliorare leggibilità */}
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          {/* Contenuto del progetto */}
          <div className="relative h-full flex items-center justify-center px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ opacity: cardOpacity }}
              className="max-w-5xl w-full backdrop-blur-xl bg-background/90 dark:bg-background/90 p-8 md:p-12 rounded-2xl border border-border/30 shadow-2xl"
            >
              <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider" data-testid={`text-subtitle-${index}`}>
                {project.subtitle}
              </p>
              <h3 className="text-4xl md:text-6xl font-bold leading-tight mb-6" data-testid={`text-title-${index}`}>
                {project.title}
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-6" data-testid={`text-description-${index}`}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-4 py-2 text-sm font-medium" data-testid={`badge-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button size="lg" className="group gap-2" data-testid={`button-view-project-${index}`}>
                View Project Details
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
