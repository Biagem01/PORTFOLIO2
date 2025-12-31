import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [showStart, setShowStart] = useState(false);

  /* -----------------------------
      PROGRESS BAR → 0 → 100
  ----------------------------- */
  useEffect(() => {
    let current = 0;
    const duration = 2000;
    const steps = 100;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current++;
      setProgress(current);

      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => setShowStart(true), 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  /* -----------------------------
      CLICK → EXIT LOADER
  ----------------------------- */
  const handleStart = () => {
    const fade = document.getElementById("loader-wrapper");
    if (fade) fade.classList.add("loader-fade-out");

    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <div
      id="loader-wrapper"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white overflow-hidden transition-opacity duration-700"
      data-cursor="hide"
    >
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0),
              radial-gradient(circle at 23px 23px, rgba(255,255,255,0.06) 1px, transparent 0)
            `,
            backgroundSize: "48px 48px",
            animation: "gridMove 24s linear infinite",
          }}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-10 select-none" data-cursor="hide">
        <div className="relative">
          {/* Rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="w-44 h-44 rounded-full border border-white/12"
          />



          {/* Inner circle */}
          <div className="absolute inset-3 rounded-full bg-black flex items-center justify-center border border-white/12">
            <div className="text-center">
              <p className="uppercase text-[0.62rem] tracking-[0.5em] text-white/40">
                Portfolio
              </p>
              <p className="text-[1.65rem] md:text-[2rem] font-extrabold tracking-tight text-[hsl(var(--scroll-indicator))]">
                BC
              </p>
              <p className="text-[0.62rem] tracking-[0.35em] text-white/35 uppercase">
                Studio
              </p>
            </div>
          </div>

          {/* Progress arc */}
          <svg
            className="absolute inset-0 w-44 h-44"
            viewBox="0 0 120 120"
            role="img"
            aria-label="Loading progress"
          >
            <circle
              cx="60"
              cy="60"
              r="52"
              className="fill-none stroke-white/12"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="52"
              className="fill-none stroke-[hsl(var(--scroll-indicator))]"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="326"
              strokeDashoffset={326 - (326 * progress) / 100}
              animate={{ strokeDashoffset: 326 - (326 * progress) / 100 }}
              transition={{ ease: "easeOut", duration: 0.35 }}
            />
          </svg>
        </div>

        {/* LOADING TEXT + PERCENT */}
        {!showStart && (
          <div className="text-center space-y-2 uppercase tracking-[0.35em]">
            <p className="text-[13px] text-white/60">Loading</p>
            <p className="text-[12px] text-white/40">{progress}%</p>
          </div>
        )}

        {/* START BUTTON */}
        {showStart && (
          <motion.button
            onClick={handleStart}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="px-10 py-3 rounded-full border border-[hsl(var(--scroll-indicator))] bg-black text-[hsl(var(--scroll-indicator))] text-sm tracking-[0.3em] uppercase hover:bg-[hsl(var(--scroll-indicator))] hover:text-black transition-all duration-250"
          >
            Start
          </motion.button>
        )}
      </div>



          {/* Inner circle */}
          <div className="absolute inset-3 rounded-full bg-black flex items-center justify-center border border-white/12">
            <div className="text-center">
              <p className="uppercase text-[0.62rem] tracking-[0.5em] text-white/40">
                Portfolio
              </p>
              <p className="text-[1.65rem] md:text-[2rem] font-extrabold tracking-tight text-[hsl(var(--scroll-indicator))]">
                BC
              </p>
              <p className="text-[0.62rem] tracking-[0.35em] text-white/35 uppercase">
                Studio
              </p>
            </div>
          </div>



          {/* Inner circle */}
          <div className="absolute inset-3 rounded-full bg-black flex items-center justify-center border border-white/12">
            <div className="text-center">
              <p className="uppercase text-[0.62rem] tracking-[0.5em] text-white/40">
                Portfolio
              </p>
              <p className="text-[1.65rem] md:text-[2rem] font-extrabold tracking-tight text-[hsl(var(--scroll-indicator))]">
                BC
              </p>
              <p className="text-[0.62rem] tracking-[0.35em] text-white/35 uppercase">
                Studio
              </p>
            </div>
          </div>

          {/* Progress arc */}
          <svg
            className="absolute inset-0 w-44 h-44"
            viewBox="0 0 120 120"
            role="img"
            aria-label="Loading progress"
          >
            <circle
              cx="60"
              cy="60"
              r="52"
              className="fill-none stroke-white/12"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="52"
              className="fill-none stroke-[hsl(var(--scroll-indicator))]"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="326"
              strokeDashoffset={326 - (326 * progress) / 100}
              animate={{ strokeDashoffset: 326 - (326 * progress) / 100 }}
              transition={{ ease: "easeOut", duration: 0.35 }}
            />
          </svg>

        </div>

        {/* LOADING TEXT + PERCENT */}
        {!showStart && (
          <div className="text-center space-y-2 uppercase tracking-[0.35em]">
            <p className="text-[13px] text-white/60">Loading</p>
            <p className="text-[12px] text-white/40">{progress}%</p>
          </div>
        )}

        {/* START BUTTON */}
        {showStart && (
          <motion.button
            onClick={handleStart}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="px-10 py-3 rounded-full border border-[hsl(var(--scroll-indicator))] bg-black text-[hsl(var(--scroll-indicator))] text-sm tracking-[0.3em] uppercase hover:bg-[hsl(var(--scroll-indicator))] hover:text-black transition-all duration-250"
          >
            Start
          </motion.button>
        )}
      </div>


     
        </div>
      

     {/* LOADING TEXT + PERCENT */}
        {!showStart && (
          <div className="text-center space-y-2 uppercase tracking-[0.35em]">
            <p className="text-[13px] text-white/60">Loading</p>
            <p className="text-[12px] text-white/40">{progress}%</p>
          </div>
        )}

        {/* START BUTTON */}
        {showStart && (
          <motion.button
            onClick={handleStart}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="px-10 py-3 rounded-full border border-[hsl(var(--scroll-indicator))] bg-black text-[hsl(var(--scroll-indicator))] text-sm tracking-[0.3em] uppercase hover:bg-[hsl(var(--scroll-indicator))] hover:text-black transition-all duration-250"
          >
            Start
          </motion.button>
        )}
      </div>




      {/* ANIMATIONS */}
      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0,0); }
          100% { transform: translate(40px,40px); }
        }

        @keyframes logoFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .loader-fade-out {
          opacity: 0 !important;
        }
      `}</style>
    </div>
  );
}
