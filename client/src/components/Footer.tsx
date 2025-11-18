import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:your.email@example.com",
      label: "Email"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/yourprofile",
      label: "LinkedIn"
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/yourprofile",
      label: "GitHub"
    }
  ];

  return (
    <footer ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="w-full max-w-7xl mx-auto px-6 py-20 relative z-10">
        <motion.div
          style={{ y, opacity }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[12vw] md:text-[15vw] lg:text-[18vw] font-bold leading-none tracking-tighter mb-12"
            data-testid="text-portfolio-title"
          >
            PORTFOLIO
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Pronto a discutere il tuo prossimo progetto? Sono sempre aperto a nuove sfide e collaborazioni.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Button
                    key={link.name}
                    variant="outline"
                    size="lg"
                    className="gap-2 group"
                    asChild
                  >
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`link-${link.name.toLowerCase()}`}
                    >
                      <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span>{link.label}</span>
                    </a>
                  </Button>
                );
              })}
            </div>

            <div className="pt-12 border-t border-border mt-16">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Biagio Cubisino. Tutti i diritti riservati.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
