import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ChevronDown } from "lucide-react";
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
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

      {/* Sezione finale con View All Projects */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Interested in seeing more?
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Check out all my projects and case studies
          </p>
          <Link href="/AllProjects">
          <Button size="lg" className="group gap-2 cursor-pointer">
            View All Projects
            <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        </motion.div>
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
          <div className="relative h-full flex items-center justify-start px-6 md:px-12 lg:px-20 py-20">
            <motion.div
              initial={{ opacity: 0, x: -100, y: 50, scale: 0.85, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{ opacity: cardOpacity }}
              className="max-w-md w-full backdrop-blur-xl bg-background/40 dark:bg-background/60 p-6 md:p-8 rounded-xl border border-border/20 shadow-2xl"
            >
              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider" data-testid={`text-subtitle-${index}`}>
                {project.subtitle}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-3 tracking-tight" data-testid={`text-title-${index}`}>
                {project.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground/90 leading-relaxed mb-5" data-testid={`text-description-${index}`}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="px-2.5 py-1 text-xs font-normal rounded-full backdrop-blur-sm bg-background/30 border-border/30" data-testid={`badge-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button 
                variant="outline" 
                className="group gap-2 px-4 py-2 bg-background/50 hover:bg-background/80 border-border/40 hover:border-foreground/20 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105" 
                data-testid={`button-view-project-${index}`}
              >
                <span className="text-sm font-semibold">View Project Details</span>
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
