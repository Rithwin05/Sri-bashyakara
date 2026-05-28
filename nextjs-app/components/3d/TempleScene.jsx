"use client";

import { useEffect, useRef } from "react";

/**
 * Pedestal ambience — sleek spotlight and geometric rings.
 * Replaces the old Temple scene with a modern luxury pedestal.
 * Pure canvas2d for reliability + buttery 60fps on mobile.
 */
export default function TempleScene() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, w, h;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 30 : 60;

    const motes = Array.from({ length: COUNT }).map(() => ({
      x: Math.random() * w, y: Math.random() * h,
      r: 0.4 + Math.random() * 1.5,
      vy: -0.05 - Math.random() * 0.15,
      vx: (Math.random() - 0.5) * 0.1,
      a: 0.1 + Math.random() * 0.5,
    }));

    let t = 0;
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      const cax = w / 2, cay = h * 0.55;

      // Soft vertical spotlight
      const spotlight = ctx.createLinearGradient(0, 0, 0, h);
      spotlight.addColorStop(0, "rgba(255, 255, 255, 0.15)");
      spotlight.addColorStop(0.5, "rgba(212, 175, 55, 0.05)");
      spotlight.addColorStop(1, "rgba(10, 25, 47, 0)");
      ctx.fillStyle = spotlight;
      ctx.fillRect(cax - (isMobile ? 100 : 200), 0, isMobile ? 200 : 400, h);

      // Central geometric aura (Pedestal base glow)
      const aura = ctx.createRadialGradient(cax, cay, 10, cax, cay, w * 0.4);
      aura.addColorStop(0, "rgba(212, 175, 55, 0.12)");
      aura.addColorStop(0.5, "rgba(212, 175, 55, 0.03)");
      aura.addColorStop(1, "rgba(10, 25, 47, 0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      // Ellipse for 3D floor perspective
      ctx.ellipse(cax, cay + 50, isMobile ? 150 : 250, isMobile ? 40 : 70, 0, 0, Math.PI * 2);
      ctx.fill();

      // Minimalist floating rings
      ctx.save();
      ctx.translate(cax, cay - 20);
      
      const ringGlow = ctx.createLinearGradient(-150, -100, 150, 100);
      ringGlow.addColorStop(0, "rgba(212, 175, 55, 0)");
      ringGlow.addColorStop(0.5, "rgba(212, 175, 55, 0.5)");
      ringGlow.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.strokeStyle = ringGlow;
      
      for (let i = 0; i < 3; i++) {
        ctx.lineWidth = 1 - (i * 0.2);
        ctx.beginPath();
        // Counter-rotating rings
        const rotation = (i % 2 === 0 ? 1 : -1) * (t * 0.002 + (i * Math.PI/4));
        ctx.ellipse(0, 0 + (Math.sin(t*0.01 + i)*10), isMobile ? 80 + i*40 : 120 + i*60, isMobile ? 25 + i*10 : 40 + i*15, rotation, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // Motes
      motes.forEach((m) => {
        m.x += m.vx; m.y += m.vy;
        if (m.y < -10) { m.y = h + 10; m.x = Math.random() * w; }
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${m.a})`;
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  return <canvas ref={ref} data-testid="temple-canvas" className="w-full h-full block" />;
}
