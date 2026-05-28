"use client";

import { useEffect, useRef } from "react";

/**
 * Temple ambience — torch-lit golden arches with floating motes.
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
    const COUNT = isMobile ? 60 : 140;

    const motes = Array.from({ length: COUNT }).map(() => ({
      x: Math.random() * w, y: Math.random() * h,
      r: 0.4 + Math.random() * 2,
      vy: -0.1 - Math.random() * 0.35,
      vx: (Math.random() - 0.5) * 0.15,
      a: 0.2 + Math.random() * 0.7,
    }));

    let t = 0;
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      // ambient floor torches
      const cx1 = w * 0.22, cy1 = h * 0.55;
      const cx2 = w * 0.78, cy2 = h * 0.55;
      [[cx1, cy1], [cx2, cy2]].forEach(([cx, cy]) => {
        const flicker = 0.85 + Math.sin(t * 0.05 + cx) * 0.08 + Math.random() * 0.04;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.4 * flicker);
        g.addColorStop(0, `rgba(241, 210, 122, ${0.35 * flicker})`);
        g.addColorStop(0.3, `rgba(201, 151, 58, ${0.15 * flicker})`);
        g.addColorStop(1, "rgba(10, 10, 10, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });

      // central aura
      const cax = w / 2, cay = h * 0.45;
      const aura = ctx.createRadialGradient(cax, cay, 40, cax, cay, w * 0.5);
      aura.addColorStop(0, "rgba(201, 151, 58, 0.25)");
      aura.addColorStop(0.4, "rgba(201, 151, 58, 0.08)");
      aura.addColorStop(1, "rgba(10, 10, 10, 0)");
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, w, h);

      // arches (stylized)
      ctx.save();
      ctx.translate(cax, cay);
      const archGlow = ctx.createLinearGradient(0, -120, 0, 220);
      archGlow.addColorStop(0, "rgba(241, 210, 122, 0.0)");
      archGlow.addColorStop(0.5, "rgba(201, 151, 58, 0.35)");
      archGlow.addColorStop(1, "rgba(201, 151, 58, 0.0)");
      ctx.strokeStyle = archGlow;
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        const r = 80 + i * 70;
        ctx.beginPath();
        ctx.arc(0, 100, r, Math.PI + 0.25, Math.PI * 2 - 0.25);
        ctx.stroke();
      }
      ctx.restore();

      // central rotating ornament (mandala-ish)
      ctx.save();
      ctx.translate(cax, cay);
      ctx.rotate(t * 0.003);
      const orn = isMobile ? 40 : 60;
      for (let i = 0; i < 12; i++) {
        ctx.rotate(Math.PI / 6);
        ctx.beginPath();
        ctx.moveTo(0, -orn);
        ctx.lineTo(orn * 0.18, -orn * 0.4);
        ctx.lineTo(0, -orn * 0.2);
        ctx.lineTo(-orn * 0.18, -orn * 0.4);
        ctx.closePath();
        const petal = ctx.createLinearGradient(0, -orn, 0, 0);
        petal.addColorStop(0, "rgba(241, 210, 122, 0.95)");
        petal.addColorStop(1, "rgba(201, 151, 58, 0.4)");
        ctx.fillStyle = petal;
        ctx.fill();
      }
      // center jewel
      ctx.beginPath();
      ctx.arc(0, 0, orn * 0.18, 0, Math.PI * 2);
      const jewel = ctx.createRadialGradient(0, 0, 0, 0, 0, orn * 0.18);
      jewel.addColorStop(0, "rgba(255, 255, 255, 1)");
      jewel.addColorStop(0.4, "rgba(241, 210, 122, 0.9)");
      jewel.addColorStop(1, "rgba(201, 151, 58, 0.3)");
      ctx.fillStyle = jewel;
      ctx.fill();
      ctx.restore();

      // motes
      motes.forEach((m) => {
        m.x += m.vx; m.y += m.vy;
        if (m.y < -10) { m.y = h + 10; m.x = Math.random() * w; }
        ctx.beginPath();
        ctx.fillStyle = `rgba(241, 210, 122, ${m.a})`;
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
