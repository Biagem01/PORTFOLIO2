import { Link } from "wouter";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { PROJECTS } from "../lib/constants";
import { InlineTrueFocus } from "@/components/TrueFocus";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });

export const Projects = () => {
  const container = useRef<HTMLDivElement>(null);
  const cardRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const featuredProjects = PROJECTS.slice(0, 3);
  const PAUSE_VH = 0.45;

  useEffect(() => {
    videoRefs.current.forEach((el) => {
      if (!el) return;
      el.style.willChange = "transform";
      el.style.backfaceVisibility = "hidden";
      el.style.transform = "translateZ(0)";
    });
    cardRefs.current.forEach((el) => {
      if (!el) return;
      const content = el.querySelector(".project-content") as HTMLElement | null;
      if (content) {
        content.style.willChange = "opacity, transform";
        content.style.backfaceVisibility = "hidden";
      }
    });
  }, []);

  useGSAP(
    () => {
      const cards  = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const videos = videoRefs.current.filter(Boolean) as HTMLDivElement[];
      const total  = cards.length;
      if (!total) return;

      gsap.set(videos[0], { yPercent: 0, scale: 1, rotation: 0, force3D: true });
      for (let i = 1; i < total; i++) {
        gsap.set(videos[i], { yPercent: 100, scale: 1, rotation: 0, force3D: true });
      }

      cards.forEach((card, i) => {
        const content = card.querySelector(".project-content");
        gsap.set(content, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40, force3D: true });
        card.style.pointerEvents = i === 0 ? "auto" : "none";
      });

      const totalScrollHeight = window.innerHeight * (PAUSE_VH + (total - 1));

      let lastActiveIndex = 0;
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: `+=${totalScrollHeight}`,
          pin: true,
          scrub: 0.4,
          pinSpacing: true,
          onUpdate: (self) => {
            const pauseRatio = (PAUSE_VH * window.innerHeight) / totalScrollHeight;
            const adjustedProgress = Math.max(0, (self.progress - pauseRatio) / (1 - pauseRatio));
            const activeIndex = Math.round(adjustedProgress * (total - 1));
            if (activeIndex !== lastActiveIndex) {
              lastActiveIndex = activeIndex;
              cards.forEach((card, i) => {
                card.style.pointerEvents = i === activeIndex ? "auto" : "none";
              });
            }
          },
        },
      });

      scrollTimeline.to({}, { duration: PAUSE_VH });

      for (let i = 0; i < total - 1; i++) {
        const pos = PAUSE_VH + i;

        scrollTimeline.to(
          videos[i],
          { scale: 0.75, rotation: 4, duration: 1, ease: "none", force3D: true },
          pos,
        );

        const currentContent = cards[i].querySelector(".project-content");
        scrollTimeline.to(
          currentContent,
          { opacity: 0, y: -30, duration: 0.4, ease: "power2.in", force3D: true },
          pos,
        );

        scrollTimeline.to(
          videos[i + 1],
          { yPercent: 0, duration: 1, ease: "none", force3D: true },
          pos,
        );

        const nextContent = cards[i + 1].querySelector(".project-content");
        scrollTimeline.to(
          nextContent,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", force3D: true },
          pos + 0.5,
        );
      }

      const ro = new ResizeObserver(() => ScrollTrigger.refresh());
      if (container.current) ro.observe(container.current);
      return () => { ro.disconnect(); };
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="relative bg-black"
      data-cursor="hide"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {featuredProjects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => { cardRefs.current[index] = el; }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* ── VIDEO CARD ── */}
            <div
              ref={(el) => { videoRefs.current[index] = el; }}
              className="absolute inset-x-6 inset-y-6 md:inset-x-12 md:inset-y-10 origin-top overflow-hidden rounded-2xl"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
                src={project.video}
                preload="auto"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            </div>

            {/* ── CONTENUTO ── */}
            <div className="project-content relative z-10 flex flex-col items-center text-center px-6 select-none">

              {/* counter */}
              <span className="mb-5 font-button text-[0.6rem] uppercase tracking-[0.35em] text-white/35">
                0{index + 1} / 0{featuredProjects.length}
              </span>

              {/* categoria + anno */}
              <span className="mb-4 font-button text-[0.65rem] uppercase tracking-[0.28em] text-[hsl(var(--accent-orange))]">
                {project.category} — {project.year}
              </span>

              {/* ── TITOLO con InlineTrueFocus ── */}
              <h2
                className="mb-4 leading-[0.92]"
                style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
              >
                <InlineTrueFocus
                  words={project.title.split(" ")}
                  fontSize="clamp(2.8rem, 7vw, 5.5rem)"
                  animationDuration={0.9}
                  focusPause={3000}
                  borderColor="rgb(235, 89, 57)"
                  glowColor="rgba(235, 89, 57, 0.5)"
                  blurAmount={4}
                />
              </h2>

              {/* role */}
              <p
                className="mb-10 text-white/45 font-role"
                style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)" }}
              >
                {project.role}
              </p>

              {/* CTA — salva "/" come origine prima di navigare */}
              <Link
                to={`/project/${project.id}`}
                onClick={() => {
                  sessionStorage.setItem('project_back', '/');
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
                style={{ pointerEvents: "auto" }}
              >
                <button
                  className={cn(
                    "group relative overflow-hidden rounded-full cursor-pointer",
                    "border border-white/25 px-10 py-4",
                    "transition-all duration-500",
                    "hover:border-[hsl(var(--accent-orange))]",
                    "hover:shadow-[0_0_32px_hsl(11,80%,57%,0.25)]",
                  )}
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-[hsl(var(--accent-orange))] transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-black font-button text-[0.65rem] uppercase tracking-[0.22em] text-white">
                    View Project
                  </span>
                </button>
              </Link>
            </div>

            {/* ── COUNTER BASSO SX ── */}
            <div className="absolute bottom-12 left-14 z-10 hidden md:flex items-center gap-3">
              <div className="h-px w-8 bg-white/20" />
              <span className="font-button text-[0.6rem] uppercase tracking-[0.3em] text-white/25">
                {project.category}
              </span>
            </div>

            {/* ── ANNO BASSO DX ── */}
            <div className="absolute bottom-12 right-14 z-10 hidden md:block">
              <span className="font-button text-[0.6rem] uppercase tracking-[0.3em] text-white/25">
                {project.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
