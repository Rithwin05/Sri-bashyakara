import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/ibi0q5ov_Sbj_logo.jpeg";

export default function IntroSequence({ onComplete }) {
  const [phase, setPhase] = useState(() =>
    typeof window !== "undefined" && sessionStorage.getItem("sbj-intro-seen") ? 3 : 0
  );

  useEffect(() => {
    if (phase === 3) {
      onComplete?.();
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2400);
    const t3 = setTimeout(() => setPhase(3), 4400);
    const t4 = setTimeout(() => {
      sessionStorage.setItem("sbj-intro-seen", "1");
      onComplete?.();
    }, 5400);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          data-testid="intro-sequence"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* radial gold glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: phase >= 1 ? 0.5 : 0, scale: phase >= 1 ? 1.2 : 0.4 }}
            transition={{ duration: 2.4, ease: "easeOut" }}
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, rgba(201,151,58,0.18) 0%, transparent 55%)",
            }}
          />
          {/* particles */}
          <div className="particle-layer">
            {Array.from({ length: 60 }).map((_, i) => (
              <span
                key={i}
                className="dust"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `-${Math.random() * 18}s`,
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  "--dur": `${14 + Math.random() * 12}s`,
                  "--drift": `${(Math.random() - 0.5) * 60}px`,
                }}
              />
            ))}
          </div>

          {/* SBJ emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, filter: "blur(20px)" }}
            animate={{
              opacity: phase >= 1 ? 1 : 0,
              scale: phase >= 1 ? 1 : 0.7,
              filter: phase >= 1 ? "blur(0px)" : "blur(20px)",
            }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-40 h-40 md:w-52 md:h-52"
          >
            <img
              src={LOGO_URL}
              alt="SBJ Emblem"
              className="w-full h-full object-contain rounded-full"
              style={{ filter: "drop-shadow(0 0 40px rgba(201,151,58,0.5))" }}
            />
          </motion.div>

          {/* tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 text-center px-6"
          >
            <p className="font-display text-[10px] md:text-xs tracking-[0.5em] text-[#C9973A] mb-4">
              THE HOUSE OF
            </p>
            <h1 className="font-heading italic text-3xl md:text-5xl text-[#F9F9F7] tracking-tight leading-none">
              Where tradition becomes <em className="text-[#C9973A] gold-shimmer not-italic">timeless</em>.
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
