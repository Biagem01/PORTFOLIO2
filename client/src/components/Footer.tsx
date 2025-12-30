import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "10%"]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.08, 0.5, 0.08]);
  const haloScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.08]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.35]);
  const underlineX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const ghostSkew = useTransform(scrollYProgress, [0, 1], [-6, 0]);
  const ghostBlur = useTransform(scrollYProgress, [0, 1], [16, 2]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.12, 0.28]);
  const tilt = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const cardLift = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const socialLinks = useMemo(
    () => [
      {
        name: "Email",
        icon: Mail,
        href: "mailto:tuaemail@example.com",
        label: "Email",
      },
      {
        name: "LinkedIn",
        icon: Linkedin,
        href: "https://linkedin.com/in/yourprofile",
        label: "LinkedIn",
      },
      {
        name: "GitHub",
        icon: Github,
        href: "https://github.com/yourprofile",
        label: "GitHub",
      },
    ],
    [],
  );

  return (
    <footer
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground"
    >
      <motion.div
        aria-hidden
        style={{ opacity: ghostOpacity, scale: haloScale }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          className="text-[28vw] md:text-[22vw] font-black leading-none tracking-tighter text-[hsl(var(--scroll-indicator))]/20 select-none"
          style={{ y, skewY: ghostSkew, filter: ghostBlur.to((v) => `blur(${v}px)`) }}
        >
          BC
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ opacity: glowOpacity }}
      >
        <div className="absolute inset-16 rounded-[50%] border border-[hsl(var(--scroll-indicator))]/15" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsla(var(--scroll-indicator)_/_12%),transparent_55%)]"
          style={{ scale: haloScale }}
        />
      </motion.div>

      <div className="pointer-events-none absolute left-4 sm:left-6 top-16 bottom-16 hidden lg:block">
        <div className="h-full w-px bg-border/30 overflow-hidden">
          <motion.div
            className="h-full w-full bg-[hsl(var(--scroll-indicator))] origin-top"
            style={{ scaleY: progressScale }}
          />
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 py-20 relative z-10">
        <motion.div
          style={{ y, opacity: textOpacity, rotate: tilt }}
          className="grid gap-16 lg:grid-cols-[1.1fr,0.9fr] items-end"
        >
          <div className="space-y-10">
            <div className="space-y-4">
              <motion.p
                className="uppercase text-xs md:text-sm tracking-[0.35em] text-muted-foreground"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                biagio cubisino — portfolio
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tight"
              >
                Ready when you are —
                <span className="block text-[hsl(var(--scroll-indicator))]">let&apos;s build something refined.</span>
              </motion.h2>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-full px-9 py-5 text-base font-semibold uppercase tracking-[0.22em] border border-[hsl(var(--scroll-indicator))]/70 bg-black text-[hsl(var(--scroll-indicator))] shadow-[0_16px_52px_-34px_rgba(235,89,57,0.9)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_28px_90px_-44px_rgba(235,89,57,0.95)] hover:text-black before:absolute before:inset-0 before:bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent,rgba(255,255,255,0.06))] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 after:absolute after:inset-0 after:translate-y-[110%] after:rounded-full after:bg-[hsl(var(--scroll-indicator))] after:transition-transform after:duration-500 after:ease-out hover:after:translate-y-0"
                asChild
              >
                <a
                  href="mailto:tuaemail@example.com"
                  data-testid="cta-email"
                  className="relative z-10"
                >
                  start a project
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group relative overflow-hidden rounded-full px-9 py-5 text-base font-semibold uppercase tracking-[0.22em] border border-border/70 bg-background/40 text-foreground/85 backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[hsl(var(--scroll-indicator))] hover:text-black hover:shadow-[0_20px_70px_-48px_rgba(235,89,57,0.92)] after:absolute after:inset-0 after:translate-y-[120%] after:rounded-full after:bg-[hsl(var(--scroll-indicator))] after:transition-transform after:duration-500 after:ease-out group-hover:after:translate-y-0"
                asChild
              >
                <a
                  href="#contact"
                  data-testid="cta-contact"
                  className="relative z-10"
                >
                  view contact
                </a>
              </Button>
            </div>

            <div className="relative h-px bg-border/40 overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-[hsl(var(--scroll-indicator))]"
                style={{ width: underlineX }}
              />
            </div>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ y: cardLift }}
              className="rounded-3xl border border-border/60 bg-background/70 backdrop-blur-lg p-8 shadow-[0_30px_70px_-48px_rgba(0,0,0,0.65)]"
            >
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Currently</span>
                <span className="font-semibold text-foreground">Available for freelance</span>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Contact</p>
                  <a
                    href="mailto:tuaemail@example.com"
                    className="group inline-flex items-center gap-2 text-lg font-semibold text-foreground hover:text-[hsl(var(--scroll-indicator))] transition-colors"
                  >
                    tuaemail@example.com
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>

                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Based in</p>
                  <p className="text-lg font-semibold text-foreground">Palermo, IT</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Button
                      key={link.name}
                      variant="outline"
                      size="sm"
                      className="group relative overflow-hidden gap-2 rounded-full border border-border/70 px-5 py-2.5 text-sm font-semibold text-foreground/85 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[hsl(var(--scroll-indicator))] hover:shadow-[0_16px_58px_-46px_rgba(235,89,57,0.9)] hover:text-black after:absolute after:inset-0 after:translate-y-full after:rounded-full after:bg-[hsl(var(--scroll-indicator))] after:transition-transform after:duration-500 after:ease-out group-hover:after:translate-y-0"
                      asChild
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-${link.name.toLowerCase()}`}
                        className="relative z-10 inline-flex items-center gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{link.label}</span>
                      </a>
                    </Button>
                  );
                })}
              </div>
            </motion.div>

            <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border/60 pt-6">
              <p className="text-foreground/80">© {currentYear} Biagio Cubisino</p>
              <p className="tracking-[0.26em] uppercase text-xs">Minimal portfolio</p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
