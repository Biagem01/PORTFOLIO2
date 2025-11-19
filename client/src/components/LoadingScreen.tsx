import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3500;
    const steps = 100;
    const interval = duration / steps;

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const numStripes = 12;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      style={{ pointerEvents: progress >= 100 ? "none" : "auto" }}
    >
      {/* Strisce orizzontali che si riempiono da sinistra a destra con delay */}
      <div className="absolute inset-0 flex flex-col">
        {Array.from({ length: numStripes }).map((_, index) => {
          const delayFactor = index * 0.06;
          const animationProgress = Math.max(0, Math.min(1, (progress - delayFactor * 100) / 35));

          return (
            <motion.div
              key={index}
              className="flex-1 bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: animationProgress }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ originX: 0 }}
            />
          );
        })}
      </div>

      {/* Contenuto - Testo che passa da bianco a nero */}
      <div className="relative w-full max-w-2xl px-8 z-10">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold mb-3 tracking-tight"
            >
              <motion.span
                animate={{
                  color: progress < 45 ? "#ffffff" : "#000000",
                }}
                transition={{ duration: 0.3 }}
              >
                Biagio Cubisino
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm tracking-[0.25em] font-light"
            >
              <motion.span
                animate={{
                  color: progress < 45 ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.4)",
                }}
                transition={{ duration: 0.3 }}
              >
                {progress}%
              </motion.span>
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
