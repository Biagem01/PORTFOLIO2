import { useEffect, useState } from "react";

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
    >
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "46px 46px",
            animation: "gridMove 18s linear infinite",
          }}
        />
      </div>

      {/* LOGO */}
      <div className="flex items-center justify-center select-none">
        <div
          className="w-32 h-32 flex items-center justify-center text-5xl font-extrabold tracking-wider"
          style={{
            color: "#f3f3f3",
            animation: "logoFloat 4s ease-in-out infinite",
          }}
        >
          BC
        </div>
      </div>

      {/* LOADING TEXT + PERCENT */}
      {!showStart && (
        <div className="mt-10 text-center space-y-2 uppercase tracking-widest">
          <p className="text-[13px] text-neutral-400">Loading…</p>
          <p className="text-[12px] text-neutral-500">{progress}%</p>
        </div>
      )}

      {/* START BUTTON */}
      {showStart && (
        <button
          onClick={handleStart}
          className="mt-12 px-8 py-3 border border-neutral-700 text-neutral-200 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
          style={{
            animation: "fadeIn 0.8s ease-out forwards",
          }}
        >
          Start
        </button>
      )}

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
