import { Mail, Linkedin, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { MagneticWrapper } from "@/components/Magnetic";

/* ---------------- TYPES ---------------- */

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type Field = {
  label: string;
  name: keyof ContactFormData;
  type: string;
  placeholder: string;
};

/* ---------------- COMPONENT ---------------- */

export const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- SCROLL ---------------- */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 1 });

  const opacity = useTransform(smoothProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);
  const scale   = useTransform(smoothProgress, [0, 0.12, 0.88, 1], [0.94, 1, 1, 0.94]);
  const leftY   = useTransform(smoothProgress, [0, 1], [60, -60]);
  const rightY  = useTransform(smoothProgress, [0, 1], [100, -40]);
  const barScaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  const titleWords = ["Let's", "create", "something", "extraordinary."];

  /* ---------------- FIELDS ---------------- */

  const fields: Field[] = [
    { label: "Name",  name: "name",  type: "text",  placeholder: "Your name" },
    { label: "Email", name: "email", type: "email", placeholder: "Your professional email" },
  ];

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1400));
      toast.success("Message sent!", { description: "I'll get back to you as soon as possible." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong", { description: "Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- JSX ---------------- */

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-24 lg:py-48 px-6 bg-black text-white overflow-hidden"
    >
      {/* Progress bar */}
      <div className="absolute bottom-8 left-6 right-6 flex items-center gap-4 z-20 opacity-30">
        <div className="text-[9px] font-mono text-white/40 tabular-nums">03</div>
        <div className="h-px flex-1 bg-white/5 relative overflow-hidden">
          <motion.div
            style={{ scaleX: barScaleX, originX: 0 }}
            className="absolute inset-0 bg-[hsl(var(--accent-orange))]"
          />
        </div>
        <div className="text-[9px] font-mono text-white/40 tabular-nums">END</div>
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">

          {/* ────── LEFT COLUMN ────── */}
          <motion.div style={{ y: leftY }} className="space-y-16">
            <div className="space-y-8">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono uppercase tracking-[0.2em]"
              >
                <span className="w-1 h-1 rounded-full bg-[hsl(var(--accent-orange))] animate-pulse" />
                Open for new collaborations
              </motion.div>

              {/* Title */}
              <div className="space-y-1" data-cursor="big">
                {titleWords.map((word, i) => (
                  <div key={i} className="overflow-hidden">
                    <motion.h2
                      initial={{ y: "110%", rotate: 3 }}
                      whileInView={{ y: 0, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className={`tracking-tighter leading-[0.95] ${
                        word === "something"
                          ? "text-4xl md:text-5xl lg:text-6xl text-white/30 italic font-serif font-medium"
                          : word === "extraordinary."
                            ? "text-4xl md:text-5xl lg:text-6xl text-[hsl(var(--accent-orange))] font-orange font-extrabold"
                            : "text-4xl md:text-5xl lg:text-6xl text-[hsl(var(--scroll-indicator))] font-extrabold"
                      }`}
                    >
                      {word}
                    </motion.h2>
                  </div>
                ))}
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-white/50 max-w-md leading-relaxed font-light"
                data-cursor="big"
              >
                Whether you have a specific project in mind or just want to say hello,
                I'm always open to new opportunities and interesting conversations.
              </motion.p>
            </div>

            <div className="space-y-8 pt-4">

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-px w-full bg-white/8 origin-left"
              />

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3"
                data-cursor="hide"
              >
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30">Contact Details</span>
                <MagneticWrapper>
                  <a
                    href="mailto:biagio.99cubisino@gmail.com"
                    className="group relative flex items-center gap-2 text-base md:text-lg italic font-serif font-medium text-white/50 hover:text-[hsl(var(--accent-orange))] transition-colors duration-500"
                  >
                    <span>biagio.99cubisino@gmail.com</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </MagneticWrapper>
              </motion.div>

            </div>
          </motion.div>

          {/* ────── RIGHT COLUMN: Logo + Form ────── */}
          <motion.div
            style={{ y: rightY }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-6 -z-10 rounded-[48px] bg-[hsl(var(--accent-orange))]/5 blur-2xl opacity-50" />

            {/* Logo — sopra al form, centrato */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center mb-8"
              data-cursor="medium"
            >
              <MagneticWrapper>
                <img
                  src="/logo/favicon.png"
                  alt="Logo"
                  data-cursor="medium"
                  className="w-40 h-40 md:w-48 md:h-48 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </MagneticWrapper>
            </motion.div>

            {/* Form */}
            <div className="p-8 md:p-12 rounded-3xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="space-y-8">

                  <div className="grid md:grid-cols-2 gap-8">
                    {fields.map((field, i) => (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.35 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-2"
                      >
                        <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          value={formData[field.name]}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          placeholder={field.placeholder}
                          required
                          className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white/80
                            focus:border-[hsl(var(--accent-orange))] outline-none transition-colors duration-300 placeholder:text-white/20"
                        />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-2"
                  >
                    <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      required
                      rows={4}
                      className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white/80
                        focus:border-[hsl(var(--accent-orange))] outline-none transition-colors duration-300 resize-none placeholder:text-white/20"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="pt-2"
                  >
                    <MagneticWrapper>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative inline-flex items-center gap-3
                          bg-[hsl(var(--accent-orange))] text-black
                          px-8 py-4 rounded-full overflow-hidden
                          text-xs font-medium tracking-[0.1em] uppercase
                          shadow-[0_0_20px_hsl(var(--accent-orange)/0.3)]
                          transition-all duration-300
                          hover:shadow-[0_0_36px_hsl(var(--accent-orange)/0.55)]
                          disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out bg-gradient-to-r from-white/0 via-white/25 to-white/0 rotate-12" />

                        <AnimatePresence mode="wait">
                          <motion.span
                            key={isSubmitting ? "sending" : "send"}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10 font-medium tracking-tight"
                          >
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </motion.span>
                        </AnimatePresence>

                        <div className="relative z-10 w-5 h-5 flex items-center justify-center overflow-hidden">
                          <ArrowRight className="w-full h-full transition-transform duration-300 group-hover:translate-x-full" />
                          <ArrowRight className="absolute w-full h-full -translate-x-full transition-transform duration-300 group-hover:translate-x-0" />
                        </div>
                      </button>
                    </MagneticWrapper>
                  </motion.div>

                </form>
            </div>

            <div className="absolute -inset-4 -z-10 rounded-[40px] border border-white/5 opacity-50 blur-xl" />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
