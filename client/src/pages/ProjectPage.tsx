import { useEffect, useRef } from 'react';
import { Link, useRoute, useLocation } from 'wouter';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Cpu, Lightbulb, Target, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '../lib/constants';
import { MagneticWrapper } from "../components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

export const ProjectDetails = () => {
  const [match, params] = useRoute<{ id: string }>('/project/:id');
  const [, setLocation] = useLocation();

  // Hooks: sempre dichiarati in cima
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const id = params?.id ?? null;

  const projectIndex = PROJECTS.findIndex(p => p.id === id);
  const project = projectIndex !== -1 ? PROJECTS[projectIndex] : null;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
  if (!match || !id || !project) {
    setLocation('/projects');
    return;
  }

  window.scrollTo(0, 0);

  const ctx = gsap.context(() => {
    // Reveal sections
    containerRef.current
      ?.querySelectorAll('.reveal-section')
      .forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: "expo.out"
        });
      });

    // Gallery parallax
    containerRef.current
      ?.querySelectorAll('.gallery-item img')
      .forEach((img) => {
        gsap.to(img, {
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          },
          yPercent: 15,
          ease: "none"
        });
      });

    // Section line animation
    const line = containerRef.current?.querySelector('.section-title-line');
    if (line) {
      gsap.from(line, {
        scrollTrigger: {
          trigger: line,
          start: "top 90%",
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "expo.inOut"
      });
    }

    // 🔥 FIX DEFINITIVO TECH TAGS
   const techTags = containerRef.current?.querySelectorAll('.tech-tag');
const techContainer = containerRef.current?.querySelector('.tech-tags-container');

if (techTags && techContainer) {
  gsap.from(techTags, {
    scrollTrigger: {
      trigger: techContainer,
      start: "top 85%",
    },
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.8,
    ease: "power2.out",
    clearProps: "opacity,y",  // ✅ AGGIUNTO
  });
}
  }, containerRef);

  // 🔥 Importantissimo con AnimatePresence
  ScrollTrigger.refresh();

  return () => ctx.revert();
}, [match, id, project, setLocation]);

  // Se non c'è progetto o id, ritorno null (sicuro perché redirect già fatto)
  if (!project) return null;

  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        ref={containerRef} 
        className="bg-background selection:bg-primary selection:text-primary-foreground"
      >
        {/* Entry Curtain Animation */}
        <motion.div
  initial={{ scaleY: 1 }}
  animate={{ scaleY: 0 }}
  transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
  className="fixed inset-0 z-[110] origin-top pointer-events-none"
  style={{ backgroundColor: "rgb(235, 89, 57)" }}
/>

        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-end pb-20 lg:pb-32 px-6 lg:px-12">
          <motion.div 
            style={{ scale: videoScale, opacity: videoOpacity }}
            className="absolute inset-0 z-0"
          >
            <motion.div
              initial={{ scale: 1.3, borderRadius: "2rem" }}
              animate={{ scale: 1, borderRadius: "0rem" }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="w-full h-full overflow-hidden"
            >
              <motion.div
                initial={{ scale: 1.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="w-full h-full"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover grayscale-[0.3] brightness-[0.7]"
                  src={project.video}
                />
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20" 
            />
          </motion.div>

          <motion.div style={{ y: textY }} className="relative z-10 w-full max-w-[1400px] mx-auto">
            <Link 
              to="/projects" 
              className="group flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors mb-12"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to index</span>
            </Link>
            
            <h1 className="text-[12vw] md:text-[10vw] font-serif text-white leading-[0.8] tracking-tighter mb-12">
              {project.title.split(' ').map((word, i) => (
                <span key={i} className="block overflow-hidden pb-4 -mb-4">
                  <motion.span 
                    initial={{ y: "100%", rotate: 5 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 + i * 0.1 }}
                    className="block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-3">Role</span>
                <span className="text-sm text-white font-medium">{project.role}</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-3">Year</span>
                <span className="text-sm text-white font-medium">{project.year}</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="col-span-2"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-3">Services</span>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {project.services.map((s, i) => (
                    <span key={i} className="text-sm text-white font-medium">
                      {s}{i < project.services.length - 1 ? " \u2022" : ""}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Overview Section */}
        <section className="py-32 lg:py-48 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-4 reveal-section">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground whitespace-nowrap">The Brief</span>
                <div className="section-title-line w-full h-[1px] bg-border" />
              </div>
            </div>
            <div className="lg:col-span-8 reveal-section">
              <p className="text-3xl md:text-5xl font-serif leading-[1.1] text-balance">
                {project.about}
              </p>
            </div>
          </div>
        </section>

        {/* Challenge & Solution Section */}
        <section className="py-32 lg:py-48 px-6 lg:px-12 bg-secondary/50">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
              <div className="reveal-section">
                <div className="flex items-center gap-4 mb-12">
                  <Lightbulb className="text-primary" size={20} />
                  <h3 className="text-xs font-mono uppercase tracking-[0.3em] font-semibold">The Challenge</h3>
                </div>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
                  {project.challenge}
                </p>
              </div>
              <div className="reveal-section">
                <div className="flex items-center gap-4 mb-12">
                  <Target className="text-primary" size={20} />
                  <h3 className="text-xs font-mono uppercase tracking-[0.3em] font-semibold">The Solution</h3>
                </div>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-32 lg:py-48 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <div className=" mb-20">
            <div className="flex items-center gap-4 mb-12">
              <Cpu className="text-primary" size={20} />
              <h3 className="text-xs font-mono uppercase tracking-[0.3em] font-semibold">Technologies</h3>
            </div>
            <div className="tech-tags-container flex flex-wrap gap-4">
              {project.technologies.map((tech, i) => (
                <MagneticWrapper key={i}>
                  <div
                   className="tech-tag px-8 py-4 border border-border rounded-2xl text-lg font-medium transition-all duration-500 cursor-pointer hover:text-white"
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.backgroundColor = "rgb(235, 89, 57)";
                      el.style.borderColor = "rgb(235, 89, 57)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.backgroundColor = "transparent";
                      el.style.borderColor = "";
                    }}
                  >
                    {tech}
                  </div>
                </MagneticWrapper>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 reveal-section">
            <div className="md:col-span-1">
              <div className="flex items-center gap-4 mb-12">
                <CheckCircle2 className="text-primary" size={20} />
                <h3 className="text-xs font-mono uppercase tracking-[0.3em] font-semibold">Key Results</h3>
              </div>
            </div>
            <div className="md:col-span-2 space-y-8">
              {project.results.map((result, i) => (
                <div key={i} className="flex gap-6 items-start pb-8 border-b border-border last:border-0">
                  <span className="text-xs font-mono text-muted-foreground pt-1">0{i + 1}</span>
                  <p className="text-xl md:text-3xl font-serif">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="px-6 lg:px-12 py-32 lg:py-48 bg-secondary/30">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {project.extraMedia.map((url, i) => (
                <div 
                  key={i} 
                  className={`gallery-item relative aspect-[4/5] overflow-hidden rounded-3xl ${i === 1 ? 'lg:translate-y-24' : ''} ${i === 2 ? 'lg:-translate-y-24' : ''}`}
                >
                  <img 
                    src={url} 
                    alt={`${project.title} detail ${i + 1}`}
                    className="w-full h-full object-cover scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Highlight Section */}
<section className="py-32 lg:py-48 px-6 lg:px-12 bg-secondary/20 text-center">
  <div className="max-w-4xl mx-auto reveal-section">
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="text-4xl md:text-5xl font-serif leading-tight text-white mb-8"
    >
      "{project.highlight}"
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      className="text-xl md:text-2xl text-white/70 font-light max-w-2xl mx-auto"
    >
      {project.highlightDescription}
    </motion.p>
  </div>
</section>

        {/* Next Project Footer */}
<section
  className="relative py-32 lg:py-40 px-6 lg:px-12 text-center overflow-hidden"
  style={{ backgroundColor: "rgb(235, 89, 57)", color: "white" }}
>
  <div className="relative z-10 max-w-4xl mx-auto">
    <motion.span 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-[10px] font-mono uppercase tracking-[0.6em] opacity-40 mb-8 block"
    >
      Next Project
    </motion.span>

    <Link to={`/project/${nextProject.id}`} className="group inline-block">
      <h3 className="text-4xl md:text-5xl font-serif leading-tight mb-8 hover:opacity-70 transition-all duration-500 hover:scale-[1.02]">
        {nextProject.title}
      </h3>

      <div className="inline-flex items-center gap-4 text-sm font-mono uppercase tracking-[0.3em] group-hover:tracking-[0.5em] transition-all duration-500">
        <span>View Case Study</span>
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:scale-105">
          <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  </div>
</section>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetails