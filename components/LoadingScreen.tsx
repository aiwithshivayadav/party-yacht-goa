"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const duration = 2800;
    const steps = 80;
    const increment = 100 / steps;
    let current = 0;

    intervalRef.current = setInterval(() => {
      current += increment + Math.random() * 0.8;
      if (current >= 100) {
        current = 100;
        clearInterval(intervalRef.current!);
        setProgress(100);
        setTimeout(() => {
          setPhase("done");
          setTimeout(onComplete, 900);
        }, 400);
      } else {
        setProgress(Math.min(current, 99));
      }
    }, duration / steps);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === "loading" && (
        <motion.div
          className="loading-screen"
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-[#0a1628] to-[#020408]" />

          {/* Ambient glow */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
            style={{ background: "radial-gradient(circle, #c9a96e, transparent)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Logo */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Monogram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-8"
            >
              <div className="relative flex items-center justify-center w-20 h-20 mb-6">
                {/* Rotating ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-gold/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border border-gold/15"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                {/* PYG monogram */}
                <span
                  className="text-2xl font-heading text-gradient-gold relative z-10"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600, letterSpacing: "0.1em" }}
                >
                  PYG
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-center"
              >
                <div
                  className="text-xl text-white/90 tracking-[0.3em] uppercase mb-1"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                >
                  Party Yacht Goa
                </div>
                <div className="text-[10px] text-gold/60 tracking-[0.4em] uppercase">
                  Luxury Yacht Experiences
                </div>
              </motion.div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-48 flex flex-col items-center gap-3"
            >
              <div className="w-full h-px bg-white/10 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
                {/* shimmer */}
                <div className="absolute inset-0 shimmer opacity-50" />
              </div>
              <span className="text-[10px] text-gold/50 tracking-[0.3em] tabular-nums">
                {Math.round(progress).toString().padStart(3, "0")}%
              </span>
            </motion.div>
          </div>

          {/* Bottom tagline */}
          <motion.div
            className="absolute bottom-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1 }}
          >
            <p
              className="text-white/40 text-xs tracking-[0.4em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Luxury Beyond The Shore
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
