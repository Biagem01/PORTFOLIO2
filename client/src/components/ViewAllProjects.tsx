import { motion } from "framer-motion";
import { Link } from "wouter";
import styled from "styled-components";

const StyledWrapper = styled.div`
  .cssbuttons-io-button {
    background: hsl(11, 80%, 57%);
    color: #000;
    font-family: 'JetBrains Mono', monospace;
    padding: 0.35em;
    padding-left: 1.2em;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border-radius: 0.9em;
    border: none;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1.6em -0.6em hsl(11, 80%, 35%);
    overflow: hidden;
    position: relative;
    height: 2.8em;
    padding-right: 3.3em;
    cursor: pointer;
    transition: background 0.4s, color 0.4s, box-shadow 0.4s;
  }

  .cssbuttons-io-button:hover {
    background: #000;
    color: #000;
    box-shadow: 0 0 24px hsl(11, 80%, 57%, 0.25);
  }

  /* Quadrato — nero a riposo */
  .cssbuttons-io-button .icon {
    background: #000;
    margin-left: 1em;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.2em;
    width: 2.2em;
    border-radius: 0.7em;
    box-shadow: 0.1em 0.1em 0.6em 0.2em hsl(11, 80%, 25%);
    right: 0.3em;
    transition: all 0.3s;
  }

  /* Quadrato — nero anche all'hover, si espande */
  .cssbuttons-io-button:hover .icon {
    width: calc(100% - 0.6em);
    background: #000;
  }

  /* Freccia — arancione a riposo */
  .cssbuttons-io-button .icon svg {
    width: 1.1em;
    transition: transform 0.3s;
    color: hsl(11, 80%, 57%);
  }

  /* Freccia — arancione anche all'hover */
  .cssbuttons-io-button:hover .icon svg {
    transform: translateX(0.1em);
    color: hsl(11, 80%, 57%);
  }

  .cssbuttons-io-button:active .icon {
    transform: scale(0.95);
  }
`;

export default function ViewAllProjects() {
  return (
    <section className="relative bg-black overflow-hidden py-32">

      <motion.div
        className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent"
        initial={{ opacity: 0, x: -150 }}
        whileInView={{ opacity: 0.15, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center relative z-10">

        <motion.p
          data-cursor="big"
          className="text-sm uppercase tracking-[0.3em] text-foreground/50"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Explore more
        </motion.p>

        <motion.h3
          data-cursor="big"
          className="text-5xl md:text-7xl tracking-tight leading-[1.05] mt-6 text-[hsl(var(--scroll-indicator))] font-extrabold"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          VUOI{" "}
          <span className="text-[hsl(var(--accent-orange))] font-orange">VEDERE</span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            TUTTI I{" "}
            <span className="text-[hsl(var(--accent-orange))] font-orange">PROGETTI</span>
            ?
          </motion.span>
        </motion.h3>

        <motion.p
          data-cursor="big"
          className="text-sm md:text-base font-light text-foreground/50 max-w-2xl mt-8 leading-relaxed font-button"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Immergiti nella mia collezione completa di progetti, casi studio
          e concept personali sviluppati con passione.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mt-16"
          data-cursor="hide"
        >
          <Link
            to="/projects"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
              if (window.history.scrollRestoration) {
                window.history.scrollRestoration = "manual";
              }
            }}
          >
            <StyledWrapper>
              <button className="cssbuttons-io-button">
                VEDI TUTTI I PROGETTI
                <div className="icon">
                  <svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </button>
            </StyledWrapper>
          </Link>

          <motion.div
            className="absolute -z-10 top-1/2 left-1/2 w-56 h-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "hsl(11 80% 57% / 0.08)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

      </div>
    </section>
  );
}
