import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { PROJECTS } from '../lib/constants';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const AllProjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLElement | null)[]>([]);

  /* 🎬 PAGE ENTER ANIMATION */
  useLayoutEffect(() => {
    // Disabilita la scroll restoration del browser
    window.history.scrollRestoration = "manual";

    // 🔥 Forza scroll TOP immediatamente
    window.scrollTo(0, 0);

    // Pulisci eventuali ScrollTrigger precedenti (residui dalla home)
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    ScrollTrigger.clearScrollMemory();

    if (!containerRef.current) return;

    gsap.set("body", { overflow: "hidden" });

    const introTl = gsap.timeline();

    introTl.to(overlayRef.current, {
      y: "-100%",
      duration: 1.1,
      ease: "power4.inOut",
    });

    introTl.from(
      headerRef.current?.children || [],
      {
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
      },
      "-=0.6"
    );

    introTl.from(
      projectRefs.current[0],
      {
        scale: 1.15,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=0.8"
    );

    introTl.call(() => {
      gsap.set("body", { overflow: "auto" });

      // 🔥 Doppio scroll reset al termine animazione
      window.scrollTo(0, 0);

      ScrollTrigger.refresh(true);
    });

    return () => {
      introTl.kill();
      // 🔥 FIX: Ripristina body e pulisci tutto al dismount
      gsap.set("body", { overflow: "auto", clearProps: "all" });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.clearScrollMemory();
    };
  }, []);

  /* 🎬 SCROLLTRIGGER ANIMATIONS */
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {

      projectRefs.current.forEach((project) => {
        if (!project) return;

        const videoContainer = project.querySelector('.project-media');
        const content = project.querySelector('.project-content');
        const video = project.querySelector('video');

        if (!videoContainer || !content || !video) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: "top top",
            end: "+=150%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        tl.fromTo(
          videoContainer,
          { scale: 0.6, borderRadius: "2rem" },
          { scale: 1, borderRadius: "0rem", duration: 1 }
        );

        tl.fromTo(
          content,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.6"
        );

        tl.to(video, { scale: 1.1, duration: 1.5 }, 0);
      });

    }, containerRef);

    return () => {
      // 🔥 FIX: Cleanup completo al dismount per non interferire con la home
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.set("body", { overflow: "auto", clearProps: "all" });
      ScrollTrigger.clearScrollMemory();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-background pt-32 relative">

      <div
        ref={overlayRef}
        className="fixed inset-0 bg-[hsl(var(--accent-orange))] z-[9999]"
      />

      {/* 🔥 STICKY BACK HOME BUTTON */}
      <div className="fixed top-8 left-6 lg:left-12 z-50">
        <Link
          to="/"
          className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity hover:text-[hsl(var(--accent-orange))]"
          data-cursor="hide"
          onClick={() => {
            // 🔥 FIX: Pulisci GSAP prima di tornare alla home
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            gsap.set("body", { overflow: "auto", clearProps: "all" });
            ScrollTrigger.clearScrollMemory();
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back Home
        </Link>
      </div>

      <div
        ref={headerRef}
        className="px-6 lg:px-12 mb-20 flex justify-between items-end"
      >
        <div>
          <h1 className="text-6xl md:text-9xl font-serif leading-none tracking-tighter" data-cursor="big">
            <span className="text-[hsl(var(--scroll-indicator))]">
              Selected
            </span>
            <br />
            <span className="text-[hsl(var(--accent-orange))]" data-cursor="big">
              Works
            </span>
          </h1>
        </div>

        <div className="max-w-xs text-right hidden md:block">
          <p className="text-sm font-mono uppercase tracking-widest opacity-40 leading-relaxed" data-cursor="big">
            A comprehensive archive of design and development projects spanning the last 5 years.
          </p>
        </div>
      </div>

      {PROJECTS.map((project, index) => (
        <section
          key={project.id}
          ref={el => projectRefs.current[index] = el}
          className="h-screen w-full flex items-center justify-center relative overflow-hidden"
          data-cursor="hide"
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
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="project-content relative z-10 text-white text-center max-w-4xl px-6">
            <span className="text-sm font-mono uppercase tracking-[0.3em] block opacity-80 mb-4">
              {project.category} — {project.year}
            </span>

            <h2 className="text-5xl md:text-8xl mb-6 leading-tight">
              {project.title}
            </h2>

            <p className="opacity-70 mb-10 max-w-2xl mx-auto text-[12px]">
              {project.description}
            </p>

            <Link
              href={`/project/${project.id}`}
              className="group relative flex items-center gap-4 mx-auto border border-white/30 px-10 py-5 rounded-full hover:bg-[hsl(var(--accent-orange))] hover:text-black transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 text-xs uppercase tracking-[0.2em]">
                Explore Case Study
              </span>
              <div className="absolute inset-0 bg-[hsl(var(--accent-orange))] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </Link>
          </div>
        </section>
      ))}
      <Footer />
    </div>
  );
};

export default AllProjects;
