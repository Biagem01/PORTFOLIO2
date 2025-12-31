import {
  motion,
  Variants,
  Transition,
  Easing,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRef } from "react";

interface EducationItem {
  institution: string;
  date: string;
  title: string;
  description: string;
  details: string[];
}

const Education = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.45], [0, 0.6, 1]);
  const titleBlur = useTransform(scrollYProgress, [0, 0.2, 0.45], [18, 10, 0]);
  const titleLift = useTransform(scrollYProgress, [0, 0.3, 0.7], [80, 30, 0]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.25, 0.7], [18, 10, 2]);
  const haloOpacity = useTransform(scrollYProgress, [0.1, 0.4, 1], [0, 0.4, 0.8]);
  const haloScale = useTransform(scrollYProgress, [0.1, 0.8], [0.75, 1.2]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.2, 0.55], [0.05, 0.2, 0]);

  const blurFilter = useMotionTemplate`blur(${titleBlur}px)`;
  const letterSpacingPx = useMotionTemplate`${letterSpacing}px`;

  const educationItems: EducationItem[] = [
    {
      institution: "Università degli Studi",
      date: "2020 - 2023",
      title: "Laurea in Ingegneria Informatica",
      description:
        "Specializzazione in sviluppo web e applicazioni mobile. Progetti finali focalizzati su architetture moderne e user experience, cloud computing e scalabilità.",
      details: [
        "Web Development e Modern Architecture",
        "Mobile App Development",
        "UI/UX Design Principles",
        "Cloud Computing & Scalability",
      ],
    },
    {
      institution: "Bootcamp Coding Intensivo",
      date: "2023",
      title: "Full Stack Development",
      description:
        "Corso accelerato su tecnologie moderne per lo sviluppo full stack. Progetti real-world con React, Node.js, PostgreSQL e deployment in produzione.",
      details: [
        "React & Modern Frontend",
        "Node.js Backend Development",
        "PostgreSQL Database Design",
        "Deployment & DevOps",
      ],
    },
    {
      institution: "Online Course",
      date: "2024",
      title: "Advanced TypeScript & React",
      description:
        "Approfondimento su TypeScript avanzato, pattern di React moderni, performance optimization e testing strategies per applicazioni scalabili.",
      details: [
        "TypeScript Advanced Patterns",
        "React Performance Optimization",
        "Testing & Quality Assurance",
        "Architecture Best Practices",
      ],
    },
  ];

  // Easing corretto per TypeScript
  const cubicEase: Easing = [0.42, 0, 0.58, 1];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 } as Transition,
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: cubicEase } as Transition,
    },
  };

  return (
    <section
      id="education"
      ref={containerRef}
      className="relative bg-background min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-20"
    >

      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-start gap-12 md:gap-20 lg:gap-32">


      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-start gap-12 md:gap-20 lg:gap-32">


      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-start gap-12 md:gap-20 lg:gap-32">

       <div className="max-w-6xl w-full flex flex-col lg:flex-row items-start gap-12 md:gap-20 lg:gap-32">


        <div className="lg:hidden w-full relative">
          <motion.div
            style={{ opacity: haloOpacity, scale: haloScale }}
            className="pointer-events-none absolute inset-x-1/2 top-[-8px] h-28 w-[22rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(207,78,8,0.18),rgba(0,0,0,0))] blur-3xl"
          />

          <motion.h2
            data-cursor="big"
            style={{
              opacity: titleOpacity,
              filter: blurFilter,
              y: titleLift,
              letterSpacing: letterSpacingPx,
            }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-[hsl(var(--scroll-indicator))] flex gap-3"
          >
            <span className="text-[hsl(var(--scroll-indicator))]">My</span>
            <span className="text-[hsl(var(--accent-orange))]/80">Education</span>
          </motion.h2>

          <motion.span
            aria-hidden
            style={{ opacity: ghostOpacity, y: titleLift }}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-5xl font-black tracking-[0.8rem] text-foreground/5 select-none"
          >
            MY EDUCATION
          </motion.span>
        </div>
        {/* Left side - MY EDUCATION sticky */}
        <motion.div

          initial={{ opacity: 0, x: -40 }}


          initial={{ opacity: 0, x: -40 }}


          initial={{ opacity: 0, x: -40 }}

  initial={{ opacity: 0, x: -40 }}



          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: cubicEase }}
          className="hidden lg:flex items-start flex-shrink-0 h-full sticky top-20 relative"
        >
          <motion.div
            style={{ opacity: haloOpacity, scale: haloScale }}
            className="pointer-events-none absolute -left-6 top-[-24px] h-40 w-[20rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(207,78,8,0.18),rgba(0,0,0,0))] blur-3xl"
          />

          <motion.h2
            data-cursor="big"
            style={{
              opacity: titleOpacity,
              filter: blurFilter,
              y: titleLift,
              letterSpacing: letterSpacingPx,
              writingMode: "horizontal-tb",
              marginRight: "2rem",
            }}
            className="
              text-2xl md:text-3xl 
              tracking-wider uppercase 
              flex flex-row gap-2
              font-extrabold
            "
          >
            <span className="text-[hsl(var(--scroll-indicator))]">MY</span>

            <span className="text-[hsl(var(--accent-orange))]/80">EDUCATION</span>
          </motion.h2>

          <motion.span
            aria-hidden
            style={{ opacity: ghostOpacity, y: titleLift }}
            className="absolute left-[-10px] top-1/2 -translate-y-1/2 text-4xl font-black tracking-[1rem] text-foreground/5 select-none rotate-90 origin-left"
          >
            MY EDUCATION
          </motion.span>
        </motion.div>

        {/* Right side - Education timeline */}
        <motion.div
          className="flex-1 space-y-12 md:space-y-16 text-[hsl(var(--scroll-indicator))]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {educationItems.map((item, index) => (
            <motion.div
              key={item.institution}
              variants={itemVariants}
              className="relative pb-12 md:pb-16 border-b border-border/50 last:border-b-0 last:pb-0 group"
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.2,
                  ease: cubicEase,
                }}
                className="absolute left-0 top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary border-2 border-background "
                style={{
                  boxShadow: "0 0 0 3px hsl(var(--background))",
                  marginLeft: "-8px",
                  marginTop: "8px",
                }}
              />

              {/* Content */}
              <div className="pl-6 md:pl-8 ">
                {/* Institution & Date */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.2,
                    ease: cubicEase,
                  }}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 mb-3 text-[hsl(var(--scroll-indicator))]"
                >
                  <h3
                  data-cursor="big"
                    className="text-lg md:text-xl  font-semibold"
                    data-testid={`text-education-institution-${index}`}
                  >
                    {item.institution}
                  </h3>
                  <span
                    className="text-sm md:text-base text-muted-foreground font-light whitespace-nowrap"
                    data-testid={`text-education-date-${index}`}
                  >
                    {item.date}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h4
                data-cursor="big"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.35 + index * 0.2,
                    ease: cubicEase,
                  }}
                  className="text-base md:text-lg text-primary font-semibold mb-3 "
                  data-testid={`text-education-title-${index}`}
                >
                  {item.title}
                </motion.h4>

                {/* Description */}
                <motion.p
                data-cursor="big"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.2,
                    ease: cubicEase,
                  }}
                  className="text-sm md:text-base text-foreground/50 mb-4 font-light leading-relaxed"
                  data-testid={`text-education-description-${index}`}
                >
                  {item.description}
                </motion.p>

                {/* Details list */}
                <motion.ul
                data-cursor="big"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.45 + index * 0.2,
                    ease: cubicEase,
                  }}
                  className="space-y-2"
                >
                  {item.details.map((detail, detailIndex) => (
                    <motion.li
                    data-cursor="big"
                      key={detail}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + index * 0.2 + detailIndex * 0.08,
                        ease: cubicEase,
                      }}
                      className="text-xs md:text-sm text-foreground/60 flex items-start gap-2 font-light"
                      data-testid={`text-education-detail-${index}-${detailIndex}`}
                    >
                      <span className="inline-block w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {detail}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;



