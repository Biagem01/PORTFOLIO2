import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const AllProjects = () => {
  const [, setLocation] = useLocation();

  const allProjects = [
    {
      title: "E-Commerce Platform",
      description: "Piattaforma e-commerce completa con gestione prodotti, carrello avanzato, checkout sicuro e dashboard amministrativa.",
      tags: ["React", "TypeScript", "Stripe", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      github: "#",
      demo: "#",
    },
    {
      title: "Dashboard Analytics",
      description: "Dashboard interattiva per visualizzazione dati con grafici avanzati, filtri dinamici e export in vari formati.",
      tags: ["Next.js", "Chart.js", "Tailwind", "API REST"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      github: "#",
      demo: "#",
    },
    {
      title: "Social Media App",
      description: "Applicazione social con feed personalizzato, chat in tempo reale, notifiche push e sistema di like/commenti.",
      tags: ["React", "Firebase", "Framer Motion", "Tailwind"],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
      github: "#",
      demo: "#",
    },
    {
      title: "Task Management System",
      description: "Sistema di gestione task con board Kanban, assegnazioni, deadline e tracking del progresso in tempo reale.",
      tags: ["React", "Redux", "Node.js", "MongoDB"],
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
      github: "#",
      demo: "#",
    },
    {
      title: "Weather Forecast App",
      description: "App meteo con previsioni dettagliate, mappe interattive, alert meteorologici e grafici personalizzati.",
      tags: ["React", "OpenWeather API", "Leaflet", "TypeScript"],
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
      github: "#",
      demo: "#",
    },
    {
      title: "Blog Platform",
      description: "Piattaforma blog con editor rich-text, sistema di categorie/tag, commenti e SEO ottimizzato.",
      tags: ["Next.js", "MDX", "Prisma", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
      github: "#",
      demo: "#",
    },
    {
      title: "Fitness Tracker",
      description: "App per tracking allenamenti, statistiche personali, piani di allenamento personalizzati e grafici di progresso.",
      tags: ["React Native", "Expo", "Firebase", "Chart.js"],
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop",
      github: "#",
      demo: "#",
    },
    {
      title: "Real Estate Platform",
      description: "Piattaforma immobiliare con ricerca avanzata, filtri multipli, virtual tour e sistema di prenotazione visite.",
      tags: ["Next.js", "Google Maps API", "Prisma", "Tailwind"],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      github: "#",
      demo: "#",
    },
    {
      title: "Music Player",
      description: "Player musicale con playlist personalizzate, visualizzazioni audio, lyrics sync e integrazioni streaming.",
      tags: ["React", "Web Audio API", "Spotify API", "Framer Motion"],
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
      github: "#",
      demo: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-8 group"
            data-testid="button-back-home"
          >
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Torna alla home
          </Button>

          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Tutti i Progetti
          </h1>
          <p className="text-xl text-muted-foreground mb-16 max-w-3xl">
            Una collezione completa di tutti i progetti che ho realizzato, dalle applicazioni web 
            alle mobile app, passando per dashboard e piattaforme complesse.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-[var(--shadow-soft)] h-full flex flex-col">
                <div className="relative overflow-hidden aspect-video">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a
                      href={project.github}
                      className="p-3 bg-primary rounded-full hover:bg-primary/90 transition-colors"
                      onClick={(e) => e.preventDefault()}
                      data-testid={`link-github-${index}`}
                    >
                      <Github className="h-6 w-6 text-primary-foreground" />
                    </a>
                    <a
                      href={project.demo}
                      className="p-3 bg-accent rounded-full hover:bg-accent/90 transition-colors"
                      onClick={(e) => e.preventDefault()}
                      data-testid={`link-demo-${index}`}
                    >
                      <ExternalLink className="h-6 w-6 text-accent-foreground" />
                    </a>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-display font-bold mb-3" data-testid={`text-title-${index}`}>{project.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
