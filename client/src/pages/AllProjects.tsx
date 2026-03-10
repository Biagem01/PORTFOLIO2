import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { PROJECTS } from '../lib/constants';
import Footer from '../components/Footer';
import { HeroParallax } from '../components/HeroParallax';
import { MorphingSvgFilters } from '@/components/MorphingLine';
import { TwoWordFocus } from '@/components/TrueFocus';

function Counter({ to, duration = 1.4 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(to / (duration * 60));
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(id); }
      else setCount(start);
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [to, duration]);
  return <>{count}</>;
}

function Marquee() {
  const items = ["Video Production", "Motion Design", "Direction", "Cinematography", "Post\u2011Production", "Color Grading"];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid hsl(38 33% 57% / 0.08)", borderBottom: "1px solid hsl(38 33% 57% / 0.08)", padding: "14px 0", marginBottom: 0 }}>
      <motion.div
        style={{ display: "flex", gap: 64, width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "hsl(38 33% 57%)", opacity: 0.3, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ color: "hsl(11 80% 57%)", opacity: 0.6 }}>✶</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ProjectListItem({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 98%", "start 60%"] });
  const opacity    = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x          = useTransform(scrollYProgress, [0, 1], [-32, 0]);
  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const mx = useSpring(0, { stiffness: 300, damping: 30 });
  const my = useSpring(0, { stiffness: 300, damping: 30 });

  const videoTop  = useTransform(my, [-0.5, 0.5], ["40%", "60%"]);
  const videoLeft = useTransform(mx, [-0.5, 0.5], ["60%", "70%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = linkRef.current!.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.li ref={ref} data-cursor="hide" style={{ opacity, x, position: "relative" }}>
      <motion.div style={{ scaleX: lineScaleX, transformOrigin: "left", position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "hsl(38 33% 57% / 0.12)" }} />

      <motion.a
        ref={linkRef}
        href={`/project/${project.id}`}
        onClick={() => sessionStorage.setItem('project_back', '/projects')}
        initial="initial" whileHover="whileHover"
        onMouseMove={handleMouseMove}
        className="group"
        style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "32px 0", textDecoration: "none" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32, position: "relative", zIndex: 10 }}>
          <div style={{ position: "relative", minWidth: "2.2rem" }}>
            <AnimatePresence mode="popLayout">
              <motion.span key="num"
                variants={{ initial: { opacity: 1 }, whileHover: { opacity: 0 } }}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "hsl(38 33% 57%)", opacity: 0.2, letterSpacing: "0.1em" }}>
                {String(index + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>

          <div>
            <motion.span
              variants={{ initial: { x: 0 }, whileHover: { x: -12 } }}
              transition={{ type: "spring", staggerChildren: 0.04, delayChildren: 0.1 }}
              style={{ display: "block", fontFamily: "'Riking', sans-serif", fontWeight: 900, fontSize: "clamp(1.3rem, 3.5vw, 2.1rem)", lineHeight: 1, color: "hsl(38 33% 72%)", position: "relative", zIndex: 10 }}
            >
              {project.title.split("").map((l, i) => (
                <motion.span key={i}
                  variants={{ initial: { x: 0, color: "hsl(38 33% 72%)" }, whileHover: { x: 12, color: "hsl(11 80% 57%)" } }}
                  transition={{ type: "spring" }}
                  style={{ display: "inline-block" }}>
                  {l === " " ? "\u00A0" : l}
                </motion.span>
              ))}
            </motion.span>
            <span style={{ display: "block", marginTop: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "hsl(38 33% 57%)", opacity: 0.35 }}>
              {project.category}
            </span>
          </div>
        </div>

        <motion.video src={project.video} autoPlay muted loop playsInline
          style={{ position: "absolute", top: videoTop, left: videoLeft, translateX: "-50%", translateY: "-50%", width: 256, height: 160, borderRadius: 12, objectFit: "cover", zIndex: 0, pointerEvents: "none" }}
          variants={{ initial: { scale: 0, rotate: "-12.5deg", opacity: 0 }, whileHover: { scale: 1, rotate: "12.5deg", opacity: 1 } }}
          transition={{ type: "spring" }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20, position: "relative", zIndex: 10 }}>
          <motion.span variants={{ initial: { opacity: 0.25, x: 6 }, whileHover: { opacity: 1, x: 0 } }} transition={{ duration: 0.25 }}
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "hsl(38 33% 57%)", letterSpacing: "0.15em" }}>
            {project.year}
          </motion.span>

          <motion.div variants={{ initial: { x: "25%", opacity: 0 }, whileHover: { x: "0%", opacity: 1 } }} transition={{ type: "spring" }}
            style={{ width: 38, height: 38, borderRadius: "50%", background: "hsl(11 80% 57%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 10.5L10.5 2.5M10.5 2.5H5.5M10.5 2.5V7.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>
      </motion.a>
    </motion.li>
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });
  return <motion.div style={{ scaleX, transformOrigin: "left", position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "hsl(11 80% 57%)", zIndex: 9998 }} />;
}

const AllProjects = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [overlayDone, setOverlayDone] = useState(false);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const listTitleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    gsap.set('body', { overflow: 'hidden' });
    const tl = gsap.timeline();
    tl.to(overlayRef.current, { y: '-100%', duration: 1.1, ease: 'power4.inOut' });
    tl.call(() => {
      gsap.set('body', { overflow: 'auto', clearProps: 'overflow' });
      window.scrollTo(0, 0);
      setOverlayDone(true);
    });
    return () => { tl.kill(); gsap.set('body', { overflow: 'auto', clearProps: 'all' }); };
  }, []);

  const headline = (
    <div>
      <MorphingSvgFilters />
      <motion.p
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "hsl(38 33% 57%)", opacity: 0.45, marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}
      >
        <span style={{ display: "inline-block", width: 28, height: 1, background: "hsl(11 80% 57%)", opacity: 0.6 }} />
        Biagio Cubisino — Portfolio
      </motion.p>

      <div style={{ overflow: "hidden" }}>
        <motion.div initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ delay: 1.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          <h1 ref={heroTitleRef} className="relative" style={{ lineHeight: 0.88, margin: 0 }} data-cursor="big">
            <TwoWordFocus
              word0="Selected" word1="Works."
              fontSize="clamp(2.2rem, 6.4vw, 5.2rem)"
              animationDuration={0.9} focusPause={2800}
              borderColor="rgb(235, 89, 57)" glowColor="rgba(235, 89, 57, 0.55)"
              blurAmount={4} frameAnchorRef={heroTitleRef}
            />
          </h1>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.15em", color: "hsl(38 33% 57%)", opacity: 0.4, marginTop: 28, maxWidth: 340, lineHeight: 1.7 }}
      >
        A curated collection of projects spanning video production, motion design, and visual direction.
      </motion.p>
    </div>
  );

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'relative', zIndex: 10, background: "#000000", minHeight: "100vh" }}>
        <ScrollProgressBar />
        <div ref={overlayRef} className="fixed inset-0 z-[9999]" style={{ background: "hsl(11 80% 57%)" }} />

        <motion.div className="fixed left-6 top-8 z-50 lg:left-12"
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6, duration: 0.5 }}>
          <Link to="/" className="group flex items-center gap-2"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "hsl(38 33% 57%)", opacity: 0.4, transition: "opacity 0.3s", textDecoration: "none" }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.4")}
            data-cursor="hide">
            <ArrowLeft size={12} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Back
          </Link>
        </motion.div>

        <HeroParallax projects={PROJECTS} headline={headline} />
        <Marquee />

        <div style={{ background: "#000000" }}>
          <div style={{ padding: "40px 48px 32px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", borderBottom: "1px solid hsl(38 33% 57% / 0.06)" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <span style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: "hsl(38 33% 57%)", opacity: 0.3, marginBottom: 12 }}>Full archive</span>
              <h2 ref={listTitleRef} className="relative" style={{ lineHeight: 1, margin: 0 }} data-cursor="big">
                <TwoWordFocus
                  word0="All" word1="Works."
                  fontSize="clamp(1.3rem, 3.2vw, 2.4rem)"
                  animationDuration={0.9} focusPause={2800}
                  borderColor="rgb(235, 89, 57)" glowColor="rgba(235, 89, 57, 0.55)"
                  blurAmount={4} frameAnchorRef={listTitleRef}
                />
              </h2>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(2rem, 5vw, 4rem)", color: "hsl(11 80% 57%)", lineHeight: 1, opacity: 0.25 }}><Counter to={PROJECTS.length} /></div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "hsl(38 33% 57%)", opacity: 0.25 }}>works</span>
            </motion.div>
          </div>

          <ul style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px 120px", listStyle: "none" }}>
            {PROJECTS.map((project, index) => (
              <ProjectListItem key={project.id} project={project} index={index} />
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllProjects;
