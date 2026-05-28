"use client";

import { useEffect, useRef } from "react";

/**
 * RoyalParticles – gold dust + star particles rising up, canvas2D.
 * Extremely performant; no external deps.
 */
export default function RoyalParticles({ count = 120, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let W = 0, H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Particle types: gold dust, white star, teal shimmer
    const TYPES = ["gold", "gold", "gold", "star", "star", "teal"];
    const particles = Array.from({ length: count }, () => {
      const type = TYPES[Math.floor(Math.random() * TYPES.length)];
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: type === "star" ? 1.2 + Math.random() * 1.8 : 0.4 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(0.06 + Math.random() * 0.25),
        a: 0.15 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        type,
        drift: (Math.random() - 0.5) * 30,
      };
    });

    let t = 0;
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.x += p.vx + Math.sin(t * 0.008 + p.phase) * 0.15;
        p.y += p.vy;
        p.phase += p.twinkleSpeed;

        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10) { p.x = W + 10; }
        if (p.x > W + 10) { p.x = -10; }

        const twinkle = 0.5 + Math.sin(p.phase) * 0.5;
        const alpha = p.a * twinkle;

        if (p.type === "gold") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201,168,76,${alpha})`;
          ctx.fill();
          // halo
          if (p.r > 1) {
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
            g.addColorStop(0, `rgba(240,201,107,${alpha * 0.5})`);
            g.addColorStop(1, "rgba(201,168,76,0)");
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (p.type === "star") {
          // 4-point star
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(t * 0.005 + p.phase);
          const s = p.r * (0.7 + twinkle * 0.5);
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            ctx.lineTo(Math.cos(angle) * s * 2.5, Math.sin(angle) * s * 2.5);
            ctx.lineTo(Math.cos(angle + Math.PI / 4) * s, Math.sin(angle + Math.PI / 4) * s);
          }
          ctx.closePath();
          ctx.fillStyle = `rgba(253,233,162,${alpha})`;
          ctx.fill();
          ctx.restore();
        } else {
          // teal shimmer
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100,220,180,${alpha * 0.5})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ background: "transparent" }}
    />
  );
}
