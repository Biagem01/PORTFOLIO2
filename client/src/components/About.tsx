import { motion } from "framer-motion";
import FlowingMenu from "./FlowingMenu";

const skillItems = [
  { link: "#", text: "React" },
  { link: "#", text: "TypeScript" },
  { link: "#", text: "Tailwind CSS" },
  { link: "#", text: "Framer Motion" },
  { link: "#", text: "Node.js" },
  { link: "#", text: "Figma" },
  { link: "#", text: "GSAP" },
  { link: "#", text: "Next.js" },
];

const About = () => {
  const SCROLL_MAIN = "text-[hsl(var(--scroll-indicator))]";
  const LABEL_MUTED = "text-foreground/50";

  return (
    <section
      id="about"
      className="relative min-h-screen bg-black pt-24 md:pt-32 pb-6"
    >
      {/* TITOLO — centrato */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16 text-center space-y-6 mb-20 md:mb-28">
        <motion.p
          className={`text-xs md:text-sm tracking-[0.25em] uppercase ${LABEL_MUTED}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          data-cursor="big"
        >
          About me
        </motion.p>

        <motion.h2
          className={`
            text-[2.2rem] md:text-[3rem] lg:text-[3.6rem]
            font-extrabold leading-[1.15] tracking-tight
            uppercase ${SCROLL_MAIN} antialiased
          `}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          data-cursor="big"
        >
          I design and build{" "}
          <span className="text-[hsl(var(--accent-orange))] font-orange">
            digital experiences
          </span>{" "}
          that are clean, smooth and intentional.
        </motion.h2>
      </div>

      {/* FLOWING MENU — full width, flush */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 mb-8">
          <motion.p
            className={`text-xs md:text-sm tracking-[0.25em] uppercase ${LABEL_MUTED}`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            data-cursor="big"
          >
            Stack & Tools
          </motion.p>
        </div>

        <div style={{ height: "560px" }} data-cursor="hide">
          <FlowingMenu
            items={skillItems}
            speed={14} 
            textColor="hsl(var(--scroll-indicator))"
            bgColor="#000000"
            marqueeBgColor="hsl(var(--accent-orange))"
            marqueeTextColor="#000000"
            borderColor="transparent"
          />
        </div>
      </motion.div>

    </section>
  );
};

export default About;
