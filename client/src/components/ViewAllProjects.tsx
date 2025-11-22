import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

const ViewAllProjects = () => {
  return (
    <section className="relative bg-background">
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl"
        >
          <motion.p
            className="text-base md:text-lg text-muted-foreground mb-8 font-light tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            data-testid="text-view-all-projects-label"
          >
            Esplora di più
          </motion.p>

          <motion.h3
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-none font-grotesk"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            data-testid="text-view-all-projects-title"
          >
            Vuoi vedere
            <motion.span
              className="block text-primary"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.5 }}
            >
              tutti i progetti?
            </motion.span>
          </motion.h3>

          <motion.p
            className="text-lg md:text-xl text-foreground/60 mb-12 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            data-testid="text-view-all-projects-description"
          >
            Scopri la mia collezione completa di progetti, case study e studi personali.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/projects">
              <Button
                size="lg"
                className="group gap-2 cursor-pointer hover-elevate active-elevate-2 text-base px-8 py-6"
                data-testid="button-view-all-projects-main"
              >
                <span>Vedi tutti i progetti</span>
                <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ViewAllProjects;
