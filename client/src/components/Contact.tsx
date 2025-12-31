import { Mail, Linkedin } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

const Contact = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 👉 RIFERIMENTO ALL’INTERA SEZIONE
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // 👉 SCROLL SU TUTTA LA SEZIONE
  const { scrollYProgress } = useScroll({
    target: sectionRef,

    offset: ["start 80%", "end 20%"],


    offset: ["start 80%", "end 20%"],


    offset: ["start 80%", "end 20%"],

     offset: ["start 80%", "end 20%"],


  });

  // 👉 Linea che cresce fino al 100% dell'altezza reale
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.45], [0, 0.6, 1]);
  const titleBlur = useTransform(scrollYProgress, [0, 0.2, 0.45], [18, 10, 0]);
  const titleLift = useTransform(scrollYProgress, [0, 0.3, 0.7], [80, 30, 0]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.25, 0.7], [18, 10, 2]);
  const haloOpacity = useTransform(scrollYProgress, [0.1, 0.4, 1], [0, 0.4, 0.8]);
  const haloScale = useTransform(scrollYProgress, [0.1, 0.8], [0.75, 1.2]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.2, 0.55], [0.05, 0.2, 0]);

  const blurFilter = useMotionTemplate`blur(${titleBlur}px)`;
  const letterSpacingPx = useMotionTemplate`${letterSpacing}px`;


  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.45], [0, 0.6, 1]);
  const titleBlur = useTransform(scrollYProgress, [0, 0.2, 0.45], [18, 10, 0]);
  const titleLift = useTransform(scrollYProgress, [0, 0.3, 0.7], [80, 30, 0]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.25, 0.7], [18, 10, 2]);
  const haloOpacity = useTransform(scrollYProgress, [0.1, 0.4, 1], [0, 0.4, 0.8]);
  const haloScale = useTransform(scrollYProgress, [0.1, 0.8], [0.75, 1.2]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.2, 0.55], [0.05, 0.2, 0]);


  const blurFilter = useMotionTemplate`blur(${titleBlur}px)`;
  const letterSpacingPx = useMotionTemplate`${letterSpacing}px`;

const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.45], [0, 0.6, 1]);
  const titleBlur = useTransform(scrollYProgress, [0, 0.2, 0.45], [18, 10, 0]);
  const titleLift = useTransform(scrollYProgress, [0, 0.3, 0.7], [80, 30, 0]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.25, 0.7], [18, 10, 2]);
  const underlineScale = useTransform(scrollYProgress, [0.35, 0.7], [0, 1]);
  const haloOpacity = useTransform(scrollYProgress, [0.1, 0.4, 1], [0, 0.4, 0.8]);
  const haloScale = useTransform(scrollYProgress, [0.1, 0.8], [0.75, 1.2]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.2, 0.55], [0.05, 0.2, 0]);

  

  const blurFilter = useMotionTemplate`blur(${titleBlur}px)`;
  const letterSpacingPx = useMotionTemplate`${letterSpacing}px`;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((res) => setTimeout(res, 1500));

    toast({
      title: "Messaggio inviato!",
      description: "Ti risponderò al più presto.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6 bg-black text-white overflow-visible"
    >



      <div className="max-w-7xl mx-auto relative">

        {/* ⭐ LINEA ANIMATA (assoluta, parte sotto il titolo) */}
        {/* ⭐ LINEA ANIMATA COMPLETA */}
        <motion.div



      <div className="max-w-7xl mx-auto relative">

        {/* ⭐ LINEA ANIMATA (assoluta, parte sotto il titolo) */}
        {/* ⭐ LINEA ANIMATA COMPLETA */}
        <motion.div

       <div className="max-w-7xl mx-auto relative">

        {/* ⭐ LINEA ANIMATA (assoluta, parte sotto il titolo) */}
        {/* ⭐ LINEA ANIMATA COMPLETA */}
   <motion.div



          style={{
            scaleY: lineScale,
            originY: "top",
            opacity: 1,
            height: "calc(100% - 230px)", // parte sotto il titolo 🔥
          }}
          className="
            absolute
            left-1/2 
            top-[230px]       /* → regola qui se vuoi più su o più giù */
            -translate-x-1/2
            w-[3px]
            rounded-full
            bg-gradient-to-b
            from-[rgba(207,78,8,1)]
            via-[rgba(207,78,8,0.55)]
            to-[rgba(207,78,8,0)]
            shadow-[0_0_20px_rgba(207,78,8,0.9)]
            pointer-events-none
          "
        />

        {/* ===== TITLE ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-24 relative"
          data-cursor="big"
        >
          <motion.div
            style={{ opacity: haloOpacity, scale: haloScale }}
            className="pointer-events-none absolute inset-x-1/2 top-4 h-48 w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(207,78,8,0.18),rgba(0,0,0,0))] blur-3xl"
          />


          <motion.h2
            style={{
              opacity: titleOpacity,
              filter: blurFilter,
              y: titleLift,
              letterSpacing: letterSpacingPx,
            }}
            className="
              relative
              text-[3rem]
              md:text-[4.5rem]
              lg:text-[6rem]
              font-extrabold
              leading-[1.05]
              tracking-tight
              text-[hsl(var(--scroll-indicator))]
              flex items-center justify-center gap-6
            "
          >
            <span className="text-[hsl(var(--accent-orange))]/80">GET</span>


            <span className="text-[hsl(var(--scroll-indicator))]">IN</span>

            <span className="text-[hsl(var(--accent-orange))]/80">TOUCH</span>
          </motion.h2>




            <span className="text-[hsl(var(--scroll-indicator))]">IN</span>

            <span className="text-[hsl(var(--accent-orange))]/80">TOUCH</span>
          </motion.h2>

          <motion.span
            style={{ opacity: ghostOpacity, y: titleLift }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[6.25rem] md:text-[7.5rem] lg:text-[9rem] font-black tracking-[1.2rem] text-white/5 select-none"
            aria-hidden
          >
            GET IN TOUCH
          </motion.span>


            <span className="text-[hsl(var(--scroll-indicator))]">IN</span>

            <span className="text-[hsl(var(--accent-orange))]/80">TOUCH</span>
          </motion.h2>


          <motion.span
            style={{ opacity: ghostOpacity, y: titleLift }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[6.25rem] md:text-[7.5rem] lg:text-[9rem] font-black tracking-[1.2rem] text-white/5 select-none"
            aria-hidden
          >
            GET IN TOUCH
          </motion.span>



          <motion.div
            style={{ opacity: haloOpacity, scale: haloScale }}
            className="pointer-events-none absolute inset-x-1/2 top-4 h-48 w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(207,78,8,0.18),rgba(0,0,0,0))] blur-3xl"
          />

          <motion.h2
            style={{
              opacity: titleOpacity,
              filter: blurFilter,
              y: titleLift,
              letterSpacing: letterSpacingPx,
            }}
            className="
              relative
              text-[3rem]
              md:text-[4.5rem]
              lg:text-[6rem]
              font-extrabold
              leading-[1.05]
              tracking-tight
              text-[hsl(var(--scroll-indicator))]
              flex items-center justify-center gap-6
            "
          >
            <span className="text-[hsl(var(--accent-orange))]/80">GET</span>

            <span className="text-[hsl(var(--scroll-indicator))]">IN</span>




           <span className="text-[hsl(var(--accent-orange))]/80">TOUCH</span>
          </motion.h2>

          <motion.span
            style={{ opacity: ghostOpacity, y: titleLift }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[6.25rem] md:text-[7.5rem] lg:text-[9rem] font-black tracking-[1.2rem] text-white/5 select-none"
            aria-hidden
          >
            GET IN TOUCH
          </motion.span>
          <p className="text-lg font-light text-white/50 max-w-3xl mx-auto mt-6">
            Se vuoi parlare di un progetto, una collaborazione o un'idea —
            sono sempre disponibile.
          </p>
        </motion.div>

        {/* ===== GRID CONTENT ===== */}
        <div className="grid md:grid-cols-2 gap-20 items-start mt-32"
        data-cursor="hide"
        >

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-10"
          >
            <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <span className="text-4xl  text-[hsl(var(--accent-orange))]/80">
                BC
              </span>
            </div>

            <motion.a
              href="mailto:tuaemail@example.com"
              whileHover={{ x: 6 }}
              className="flex items-center gap-4 p-5 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 group"
            >
              <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20">
                <Mail className="h-6 w-6 text-[hsl(var(--accent-orange))]" />
              </div>
              <div>
                <p className="text-sm text-white/50">Email</p>
                <p className="font-medium">tuaemail@example.com</p>
              </div>
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/tuoprofilo"
              target="_blank"
              whileHover={{ x: 6 }}
              className="flex items-center gap-4 p-5 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 group"
            >
              <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20">
                <Linkedin className="h-6 w-6 text-[hsl(var(--accent-orange))]" />
              </div>
              <div>
                <p className="text-sm text-white/50">LinkedIn</p>
                <p className="font-medium">linkedin.com/in/tuoprofilo</p>
              </div>
            </motion.a>

            <p className="text-white/40 text-sm pt-6 max-w-sm">
              Preferisci una call o un preventivo personalizzato?
              Rispondo sempre entro 24h.
            </p>
          </motion.div>

          {/* RIGHT SIDE - FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="space-y-2">
                <label className="text-sm text-white/70">Nome</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-3 rounded-xl bg-black border border-white/20 focus:border-[hsl(var(--accent-orange))] focus:ring-2 text-white outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/70">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-3 rounded-xl bg-black border border-white/20 focus:border-[hsl(var(--accent-orange))] focus:ring-2 text-white outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/70">Messaggio</label>
                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-3 rounded-xl bg-black border border-white/20 focus:border-[hsl(var(--accent-orange))] focus:ring-2 text-white outline-none resize-none"
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-5 rounded-xl bg-[hsl(var(--accent-orange))] text-black font-semibold tracking-wide"
              >
                {isSubmitting ? "Invio…" : "Invia il Messaggio"}
              </motion.button>

            </form>
          </motion.div>
        </div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-32 pt-12 border-t border-white/10 text-center text-white/40"
        >
          © 2024 BC Portfolio — Built with passion.
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
