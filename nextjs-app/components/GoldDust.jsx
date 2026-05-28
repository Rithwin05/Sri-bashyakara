"use client";

import { useMemo } from "react";

export default function GoldDust({ count = 40, className = "" }) {
  const particles = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 18,
    dur: 12 + Math.random() * 18,
    drift: (Math.random() - 0.5) * 80,
    size: 1 + Math.random() * 2.5,
    opacity: 0.3 + Math.random() * 0.6,
  })), [count]);

  return (
    <div className={`particle-layer ${className}`} aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="dust"
          style={{
            left: `${p.left}%`,
            animationDelay: `-${p.delay}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            "--dur": `${p.dur}s`,
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
