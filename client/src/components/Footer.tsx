import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    <footer className="relative bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Lavoriamo Insieme
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pronto a discutere il tuo prossimo progetto? Sono sempre aperto a nuove sfide e collaborazioni.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              © {currentYear} Made with <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" /> by Your Name
            </p>
            <p>
              Tutti i diritti riservati
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
