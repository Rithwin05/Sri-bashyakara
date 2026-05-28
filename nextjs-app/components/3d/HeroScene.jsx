"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas2D cinematic "Vault" — a golden ring + diamond constellation +
 * dust field rendered with pure 2D canvas. Reliable, mobile-friendly,
 * and luxurious. Replaces R3F to avoid React 19 reconciler issues.
 */
export default function HeroScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let w = 0, h = 0, dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 120 : 260;
    const particles = Array.from({ length: COUNT }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.4 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.05 - Math.random() * 0.25,
      a: 0.2 + Math.random() * 0.7,
      hue: Math.random() > 0.85 ? "diamond" : "gold",
    }));

    // diamond constellation
    const DIAMONDS = isMobile ? 4 : 7;
    const diamonds = Array.from({ length: DIAMONDS }).map((_, i) => ({
      angle: (i / DIAMONDS) * Math.PI * 2 + Math.random() * 0.5,
      radius: 180 + Math.random() * 140,
      speed: 0.0006 + Math.random() * 0.0008,
      size: 6 + Math.random() * 10,
      twinkle: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2 + (isMobile ? 0 : w * 0.18);
      const cy = h / 2;

      // ambient radial gold glow
      const ambient = ctx.createRadialGradient(cx, cy, 30, cx, cy, Math.max(w, h) * 0.7);
      ambient.addColorStop(0, "rgba(201, 151, 58, 0.18)");
      ambient.addColorStop(0.5, "rgba(201, 151, 58, 0.04)");
      ambient.addColorStop(1, "rgba(10, 10, 10, 0)");
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, w, h);

      // outer faint ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.0008);
      const ringR = isMobile ? 130 : 200;
      // ring glow
      const ringGlow = ctx.createRadialGradient(0, 0, ringR - 30, 0, 0, ringR + 50);
      ringGlow.addColorStop(0, "rgba(201, 151, 58, 0)");
      ringGlow.addColorStop(0.5, "rgba(201, 151, 58, 0.25)");
      ringGlow.addColorStop(1, "rgba(201, 151, 58, 0)");
      ctx.fillStyle = ringGlow;
      ctx.beginPath();
      ctx.arc(0, 0, ringR + 50, 0, Math.PI * 2);
      ctx.fill();

      // gold ring (torus look — gradient stroke)
      const grad = ctx.createLinearGradient(-ringR, -ringR, ringR, ringR);
      grad.addColorStop(0, "#8C6B25");
      grad.addColorStop(0.45, "#F1D27A");
      grad.addColorStop(0.55, "#C9973A");
      grad.addColorStop(1, "#6B4A1C");
      ctx.lineWidth = isMobile ? 8 : 14;
      ctx.strokeStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, ringR, 0, Math.PI * 2);
      ctx.stroke();

      // ring highlight sweep
      const sweep = ctx.createConicGradient(t * 0.01, 0, 0);
      sweep.addColorStop(0, "rgba(255,255,255,0)");
      sweep.addColorStop(0.05, "rgba(255,255,255,0.7)");
      sweep.addColorStop(0.15, "rgba(255,255,255,0)");
      sweep.addColorStop(1, "rgba(255,255,255,0)");
      ctx.lineWidth = isMobile ? 3 : 5;
      ctx.strokeStyle = sweep;
      ctx.beginPath();
      ctx.arc(0, 0, ringR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // diamond constellation around ring
      diamonds.forEach((d) => {
        d.angle += d.speed * 16;
        d.twinkle += 0.04;
        const px = cx + Math.cos(d.angle) * d.radius;
        const py = cy + Math.sin(d.angle) * d.radius * 0.7;
        const tw = 0.55 + (Math.sin(d.twinkle) + 1) * 0.22;

        // halo
        const haloR = d.size * 4;
        const halo = ctx.createRadialGradient(px, py, 0, px, py, haloR);
        halo.addColorStop(0, `rgba(255, 240, 200, ${0.5 * tw})`);
        halo.addColorStop(0.4, `rgba(201, 151, 58, ${0.18 * tw})`);
        halo.addColorStop(1, "rgba(255, 240, 200, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(px, py, haloR, 0, Math.PI * 2);
        ctx.fill();

        // diamond shape
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(d.angle * 1.4);
        ctx.fillStyle = `rgba(255, 250, 235, ${0.9 * tw})`;
        ctx.beginPath();
        ctx.moveTo(0, -d.size);
        ctx.lineTo(d.size * 0.7, 0);
        ctx.lineTo(0, d.size);
        ctx.lineTo(-d.size * 0.7, 0);
        ctx.closePath();
        ctx.fill();
        // inner sparkle
        ctx.fillStyle = `rgba(255, 255, 255, ${0.85 * tw})`;
        ctx.beginPath();
        ctx.moveTo(0, -d.size * 0.5);
        ctx.lineTo(d.size * 0.25, 0);
        ctx.lineTo(0, d.size * 0.5);
        ctx.lineTo(-d.size * 0.25, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      // particles (gold dust + occasional white)
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath();
        ctx.fillStyle = p.hue === "diamond"
          ? `rgba(255, 250, 235, ${p.a})`
          : `rgba(201, 151, 58, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="hero-canvas"
      className="w-full h-full block"
      style={{ background: "transparent" }}
    />
  );
}
