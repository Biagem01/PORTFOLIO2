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

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "8%"]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.12, 0.4, 0.12]);
  const haloScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 1, 0.4]);
  const underlineX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
    []
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
          style={{ y }}
        >
          BC
        </motion.div>
      </motion.div>

      <div className="w-full max-w-6xl mx-auto px-6 py-20 relative z-10">
        <motion.div
          style={{ y, opacity: textOpacity }}
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
                className="rounded-full px-7 py-6 text-base font-semibold border border-foreground bg-black text-[hsl(var(--scroll-indicator))] transition-all hover:bg-[hsl(var(--scroll-indicator))] hover:text-black hover:border-[hsl(var(--scroll-indicator))]"
                asChild
              >
                <a href="mailto:tuaemail@example.com" data-testid="cta-email">
                  start a project
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-7 py-6 text-base font-semibold border border-foreground/60 text-foreground transition-all hover:border-[hsl(var(--scroll-indicator))] hover:text-[hsl(var(--scroll-indicator))] hover:bg-black/60"
                asChild
              >
                <a href="#contact" data-testid="cta-contact">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="rounded-3xl border border-border/60 bg-background/60 backdrop-blur-sm p-8 shadow-sm"
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
                      className="gap-2 rounded-full border border-border/70 text-foreground transition-all hover:border-[hsl(var(--scroll-indicator))] hover:bg-[hsl(var(--scroll-indicator))] hover:text-black"
                      asChild
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-${link.name.toLowerCase()}`}
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
