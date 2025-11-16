import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowDown } from "lucide-react";

const Projects = () => {
  const [, setLocation] = useLocation();

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Piattaforma e-commerce completa con gestione prodotti, carrello avanzato, checkout sicuro e dashboard amministrativa per la gestione degli ordini.",
      tags: ["React", "TypeScript", "Stripe", "Tailwind CSS", "Node.js"],
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1920&h=1080&fit=crop",
      category: "Full Stack Development",
    },
    {
      title: "Dashboard Analytics",
      description: "Dashboard interattiva per visualizzazione e analisi dati real-time con grafici avanzati, filtri dinamici e possibilità di export in vari formati.",
      tags: ["Next.js", "Chart.js", "Tailwind", "API REST", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop",
      category: "Data Visualization",
    },
    {
      title: "Social Media App",
      description: "Applicazione social completa con feed personalizzato, sistema di messaggistica in tempo reale, notifiche push e gestione likes/commenti.",
      tags: ["React", "Firebase", "Framer Motion", "Tailwind", "WebSocket"],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&h=1080&fit=crop",
      category: "Mobile & Web App",
    },
  ];

  return (
    <section id="projects" className="relative">
      {/* Section Header */}
      <div className="min-h-screen flex flex-col justify-center items-center relative px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
            I Miei Progetti
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Una selezione dei progetti che ho progettato e sviluppato per persone reali
          </p>
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              Scorri per esplorare
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Projects */}
      {projects.map((project, index) => (
        <div
          key={project.title}
          className="min-h-screen flex items-center justify-center relative px-6 py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl w-full"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Project Image */}
              <motion.div
                className="relative group cursor-pointer order-2 md:order-1"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                data-testid={`project-image-${index}`}
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[16/10]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-lg">
                        View Details
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Project Info */}
              <div className="order-1 md:order-2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <p className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">
                    {project.category}
                  </p>
                  <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">
                    {project.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      ))}

      {/* View All Projects CTA */}
      <div className="min-h-[50vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Vuoi vedere di più?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Esplora la collezione completa dei miei progetti e scopri come trasformo idee in realtà digitali.
          </p>
          <motion.button
            onClick={() => setLocation("/projects")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-testid="button-view-all-projects"
          >
            Vedi tutti i progetti
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
