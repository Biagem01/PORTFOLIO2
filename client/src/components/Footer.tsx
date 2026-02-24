import { MagneticWrapper } from './Magnetic';
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="bg-black py-16 px-6 lg:px-12 border-t border-foreground/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">

        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Signature */}
          <MagneticWrapper>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative px-4 py-2 cursor-pointer flex flex-col items-center md:items-start"
              data-cursor="hide"
            >
              {/* Nome */}
              <span className="relative z-10 text-2xl font-serif tracking-tight transition-colors duration-500 group-hover:text-white">
                Biagio Cubisino
              </span>

              {/* Ruolo */}
              <span className="relative z-10 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground/60 mt-1 transition-colors duration-500 group-hover:text-white">
                Full Stack Developer
              </span>

              {/* Sfondo animato */}
              <div className="absolute inset-0 bg-[#EB5939] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom rounded-sm" />
            </motion.div>
          </MagneticWrapper>

          {/* Social */}
          <div className="flex gap-6">
            {['LinkedIn', 'Twitter', 'Dribbble', 'Instagram'].map((social, i) => (
              <MagneticWrapper key={social}>
                <motion.a
                  href="#"
                  data-cursor="hide"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="group relative px-4 py-2"
                >
                  <span className="relative z-10 text-[10px] font-mono uppercase tracking-[0.3em] transition-colors duration-500 group-hover:text-white">
                    {social}
                  </span>
                  <div className="absolute inset-0 bg-[#EB5939] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom rounded-sm" />
                </motion.a>
              </MagneticWrapper>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/50">
          <span>© {new Date().getFullYear()} Biagio Cubisino</span>

          <div className="flex gap-8">
            <a href="#" className="hover:text-foreground transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors duration-300">
              Terms
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;