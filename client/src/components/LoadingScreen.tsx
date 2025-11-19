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
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.5, delay: progress >= 100 ? 0.3 : 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ pointerEvents: progress >= 100 ? "none" : "auto" }}
    >
      <motion.div
        className="absolute inset-0 bg-black dark:bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 - (progress / 100) }}
        transition={{ duration: 0.2, ease: "linear" }}
      />

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        transition={{ duration: 0.2, ease: "linear" }}
        style={{ originX: 0 }}
        className="absolute inset-0 bg-background"
      />

      <div className="relative w-full max-w-2xl px-8 z-10">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl md:text-8xl font-bold mb-4"
              style={{
                color: progress < 50 ? 'white' : 'hsl(var(--foreground))'
              }}
            >
              {progress}
              <span 
                style={{
                  color: progress < 50 ? 'rgba(255, 255, 255, 0.5)' : 'hsl(var(--muted-foreground))'
                }}
              >
                %
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg tracking-wider"
              style={{
                color: progress < 50 ? 'rgba(255, 255, 255, 0.7)' : 'hsl(var(--muted-foreground))'
              }}
            >
              LOADING
            </motion.p>
          </div>

          <div 
            className="w-full h-1 rounded-full overflow-hidden"
            style={{
              backgroundColor: progress < 50 ? 'rgba(255, 255, 255, 0.2)' : 'hsl(var(--muted))'
            }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: progress < 50 
                  ? 'linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))' 
                  : 'linear-gradient(to right, hsl(var(--foreground)), hsl(var(--primary)))'
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
