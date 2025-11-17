
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
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
    <section id="projects" className="relative">
      {projects.map((project) => (
        <ProjectSection key={project.title} project={project} />
      ))}
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
}

const ProjectSection = ({ project }: ProjectSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Card compare subito all’inizio
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={ref} className="relative w-full h-screen">
      {/* Sfondo sticky */}
      <motion.div
        className="sticky top-0 w-full h-screen -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${project.image})`, backgroundSize: "cover", backgroundPosition: "center", }}
      />

      {/* Card sopra l’immagine */}
       <motion.div
        className="absolute inset-0 flex items-center justify-center px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }} // appare sia scroll giù che su
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-5xl w-full backdrop-blur-xl bg-background/80 dark:bg-background/80 p-10 rounded-xl border border-border/20">
          <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">
            {project.subtitle}
          </p>
          <h3 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            {project.title}
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-4 py-2 text-sm font-medium">
                {tag}
              </Badge>
            ))}
          </div>

          <Button size="lg" className="group gap-2 mt-6">
            View Project Details
            <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;