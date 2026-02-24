import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../lib/constants';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<(HTMLElement | null)[]>([]);

  const featuredProjects = PROJECTS.slice(0, 3);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {

      projectRefs.current.forEach((project) => {
        if (!project) return;

        const video = project.querySelector('.project-media');
        const content = project.querySelector('.project-content');

        if (!video || !content) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        });

        tl.fromTo(
          video,
          { scale: 0.6, borderRadius: "2rem" },
          { scale: 1, borderRadius: "0rem", ease: "none" }
        );

        tl.fromTo(
          content,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, ease: "power2.out" },
          "<50%"
        );
      });

    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-black" data-cursor="hide">
      {featuredProjects.map((project, index) => (
        <section
          key={project.id}
          ref={el => projectRefs.current[index] = el}
          className="h-screen w-full flex items-center justify-center relative overflow-hidden"
        >
          <div className="project-media w-full h-full absolute inset-0 z-0 scale-50 origin-center overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              src={project.video}
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="project-content relative z-10 text-white text-center px-6">
            <span className="text-sm font-mono uppercase tracking-[0.3em] mb-4 block opacity-80">
              {project.category} — {project.year}
            </span>

            <h2 className="text-6xl md:text-8xl font-serif mb-8">
              {project.title}
            </h2>

            <Link
              href={`/project/${project.id}`}
              className="group relative flex items-center gap-4 mx-auto border border-white/30 px-10 py-5 rounded-full hover:bg-[hsl(var(--accent-orange))] hover:text-black transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 text-xs uppercase tracking-[0.2em]">
                View Project
              </span>
              <div className="absolute inset-0 bg-[hsl(var(--accent-orange))] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </Link>
          </div>

          <div className="absolute bottom-12 left-12 z-10 hidden md:block">
            <span className="text-white/50 font-mono text-xs">
              0{index + 1} / 0{featuredProjects.length}
            </span>
          </div>
        </section>
      ))}
    </div>
  );
};
