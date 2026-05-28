"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ChevronRight, ArrowDown, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";

/* ==========================================
   IMAGE MAP
========================================== */
const IMG = {
  peacock:  "/images/ChatGPT Image May 23, 2026, 01_31_38 PM.png",
  emerald:  "/images/ChatGPT Image May 23, 2026, 01_32_10 PM.png",
  earrings: "/images/ChatGPT Image May 23, 2026, 01_32_12 PM.png",
  ruby:     "/images/ChatGPT Image May 23, 2026, 01_32_13 PM.png",
  ring:     "/images/ChatGPT Image May 23, 2026, 01_32_15 PM.png",
  necklace: "/images/ChatGPT Image May 23, 2026, 01_32_16 PM.png",
  bangle:   "/images/ChatGPT Image May 23, 2026, 01_32_17 PM.png",
  lotus:    "/images/ChatGPT Image May 23, 2026, 01_32_19 PM.png",
  choker:   "/images/ChatGPT Image May 23, 2026, 01_32_20 PM.png",
  gold1:    "/images/ChatGPT Image May 23, 2026, 01_32_21 PM.png",
  lotus2:   "/images/ChatGPT Image May 23, 2026, 01_32_22 PM.png",
  pendant:  "/images/ChatGPT Image May 23, 2026, 01_32_23 PM.png",
  bridal:   "/images/ChatGPT Image May 23, 2026, 01_32_25 PM.png",
  maang:    "/images/ChatGPT Image May 23, 2026, 01_32_26 PM.png",
  blue:     "/images/ChatGPT Image May 23, 2026, 01_32_35 PM.png",
  set:      "/images/ChatGPT Image May 23, 2026, 01_32_37 PM.png",
  ruby2:    "/images/ChatGPT Image May 23, 2026, 01_32_40 PM.png",
  green2:   "/images/ChatGPT Image May 23, 2026, 01_32_42 PM.png",
  green3:   "/images/ChatGPT Image May 23, 2026, 01_32_45 PM.png",
  hero:     "/images/ChatGPT Image May 23, 2026, 01_32_47 PM.png",
  bridal2:  "/images/ChatGPT Image May 23, 2026, 01_32_27 PM.png",
};

/* ==========================================
   SCROLL PROGRESS BAR
========================================== */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

/* ==========================================
   CURSOR GLOW FOLLOWER
========================================== */
function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div className="cursor-glow hidden lg:block" style={{ left: pos.x, top: pos.y }} />;
}

/* ==========================================
   3D TILT CARD COMPONENT
========================================== */
function TiltCard({ children, className = "", intensity = 15 }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouse = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02,1.02,1.02)`,
      transition: "transform 0.1s ease-out",
    });
  }, [intensity]);

  const handleLeave = useCallback(() => {
    setStyle({ transform: "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)", transition: "transform 0.5s ease" });
  }, []);

  return (
    <div ref={ref} className={className} style={style} onMouseMove={handleMouse} onMouseLeave={handleLeave}>
      {children}
    </div>
  );
}

/* ==========================================
   ANIMATED COUNTER
========================================== */
function AnimatedNumber({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target);
        const dur = 2000;
        const start = performance.now();
        const animate = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          setCount(Math.floor(eased * num));
          if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ==========================================
   FEATURED PIECES DATA
========================================== */
const FEATURED = [
  { name: "Peacock Haaram", sub: "22K Gold · Uncut Diamonds", img: IMG.peacock, color: "#0A4A3A" },
  { name: "Lotus Chandbalis", sub: "Gold · Emerald · Pearl", img: IMG.lotus2, color: "#5C1A1B" },
  { name: "Ruby Raj Choker", sub: "22K Gold · Burmese Rubies", img: IMG.choker, color: "#3D0C11" },
  { name: "Sapphire Bridal Set", sub: "Gold · Ceylon Sapphires", img: IMG.blue, color: "#0C3D4A" },
  { name: "Emerald Necklace", sub: "Colombian Emeralds", img: IMG.emerald, color: "#0A4A3A" },
  { name: "Maang Tikka", sub: "22K Gold · Rubies · Pearls", img: IMG.maang, color: "#1A0D3B" },
];

/* ==========================================
   CATEGORY CARDS DATA
========================================== */
const CATEGORIES = [
  { name: "Every Day", img: IMG.earrings, bg: "bg-gradient-to-br from-[#FDF1EB] to-[#FAEBE4]" },
  { name: "Workwear", img: IMG.ring, bg: "bg-gradient-to-br from-[#E8D5F5] to-[#F3E8FF]" },
  { name: "Partywear", img: IMG.pendant, bg: "bg-gradient-to-br from-[#D6EAF8] to-[#E8F4FD]" },
  { name: "Bridal", img: IMG.bridal, bg: "bg-gradient-to-br from-[#F8D7DA] to-[#FCE4EC]" },
  { name: "Gifting", img: IMG.set, bg: "bg-gradient-to-br from-[#D4E7DC] to-[#E8F5E9]" },
];

/* ==========================================
   MAIN PAGE
========================================== */
export default function HomePage() {
  useScrollReveal();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <div className="noise-overlay" />

      {/* ====================================================
          1. HERO — Cinematic full-bleed with floating jewels
      ==================================================== */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #001C38 0%, #0D1B2A 25%, #1A0D3B 50%, #0D1B2A 75%, #001C38 100%)",
            backgroundSize: "400% 400%",
            animation: "gradient-shift 12s ease infinite",
          }}
        />

        {/* Radial glow centres */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(201,168,76,0.12)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(248,215,218,0.08)_0%,transparent_50%)]" />

        {/* Gold decorative frames */}
        <div className="absolute inset-4 md:inset-8 border border-[#C9A84C]/15 rounded-2xl pointer-events-none" />
        <div className="absolute inset-6 md:inset-12 border border-[#C9A84C]/8 rounded-2xl pointer-events-none" />

        {/* Corner ornaments */}
        <div className="absolute top-8 left-8 md:top-14 md:left-14 text-[#C9A84C]/30 text-2xl">✦</div>
        <div className="absolute top-8 right-8 md:top-14 md:right-14 text-[#C9A84C]/30 text-2xl">✦</div>
        <div className="absolute bottom-8 left-8 md:bottom-14 md:left-14 text-[#C9A84C]/30 text-2xl">✦</div>
        <div className="absolute bottom-8 right-8 md:bottom-14 md:right-14 text-[#C9A84C]/30 text-2xl">✦</div>

        {/* Floating jewellery — large parallax pieces */}
        <motion.div
          className="absolute top-[10%] right-[5%] lg:right-[12%] w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden float-2 glow-breathe"
          data-parallax="0.2"
        >
          <img src={IMG.gold1} alt="" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          className="absolute bottom-[12%] left-[3%] lg:left-[10%] w-44 h-44 md:w-60 md:h-60 rounded-full overflow-hidden float-1"
          data-parallax="0.15"
          style={{ filter: "drop-shadow(0 20px 60px rgba(201,168,76,0.4))" }}
        >
          <img src={IMG.bangle} alt="" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          className="absolute top-[55%] right-[2%] w-28 h-28 md:w-40 md:h-40 rounded-2xl overflow-hidden float-3 opacity-60"
          data-parallax="0.3"
        >
          <img src={IMG.lotus2} alt="" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          className="absolute top-[20%] left-[3%] w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden float-4 opacity-40"
          data-parallax="0.25"
        >
          <img src={IMG.ruby} alt="" className="w-full h-full object-cover" />
        </motion.div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/60" />
            <span className="overline-royal text-[#C9A84C]/80">The House of Sri Bhashyakara · Est. Hyderabad</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-royal text-5xl md:text-7xl lg:text-8xl text-[#FAF6EE] mb-8 leading-[1.05]"
          >
            Daily wear styles
            <br />
            <span className="gold-text">your heart will love.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-sub text-xl md:text-2xl italic text-[#FAF6EE]/60 max-w-xl mx-auto mb-12"
          >
            Crafting heirlooms for South Indian families across three generations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/shop" className="btn-royal-solid">
              Explore Collections <ChevronRight size={16} />
            </Link>
            <Link href="/contact" className="btn-royal">
              Book Private Viewing
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[#FAF6EE]/40">Scroll</span>
            <ArrowDown size={16} className="text-[#C9A84C] animate-bounce" />
          </motion.div>
        </div>
      </motion.section>

      {/* ====================================================
          MARQUEE STRIP
      ==================================================== */}
      <div className="marquee py-5">
        <div className="marquee-track">
          {Array.from({ length: 3 }, (_, k) => (
            <div key={k} className="flex items-center gap-10 px-8">
              {["Temple Heritage", "✦", "Bridal Constellations", "✦", "Emerald Royale", "✦", "Sacred Craftsmanship", "✦", "22K Gold Atelier", "✦", "Hyderabad · Est. 1984", "✦"].map((t, i) => (
                <span
                  key={i}
                  className={t === "✦" ? "text-[#C9A84C] text-sm" : "font-body text-[11px] tracking-[0.3em] uppercase text-[#0D1B2A]/50 font-medium"}
                >
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          2. BRIDAL BANNER — Dramatic parallax with logo overlay
      ==================================================== */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full scale-110"
          data-parallax="0.12"
          style={{
            backgroundImage: `url('${IMG.bridal2}')`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1E14] via-[#2A1E14]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A1E14]/60 via-transparent to-[#2A1E14]/60" />

        <div className="absolute inset-0 flex items-center justify-center">
          <TiltCard className="cursor-default" intensity={8}>
            <div className="bg-[#001C38]/85 backdrop-blur-xl p-2 rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.5)] border border-[#C9A84C]/25">
              <div className="border border-[#C9A84C]/20 rounded-[32px] px-14 py-20 text-center relative overflow-hidden">
                {/* Shimmer inside */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 via-transparent to-[#C9A84C]/5 pointer-events-none" />
                <svg width="44" height="44" viewBox="0 0 36 36" fill="none" className="mx-auto mb-6 relative z-10">
                  <circle cx="18" cy="18" r="17" stroke="#C9A84C" strokeWidth="1" />
                  <path d="M18 6 L28 14 L24 30 L12 30 L8 14 Z" fill="none" stroke="#C9A84C" strokeWidth="1" />
                  <circle cx="18" cy="18" r="2.5" fill="#C9A84C" />
                </svg>
                <h2 className="font-royal text-4xl md:text-6xl text-[#FAF6EE] tracking-[0.15em] uppercase mb-3 relative z-10">
                  Sri Bhashyakara
                </h2>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mb-4" />
                <p className="font-body text-xs text-[#C9A84C] tracking-[0.4em] uppercase relative z-10">
                  Bridal Edition · 2026
                </p>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* ====================================================
          3. STORY SECTION — Poetic text with animated ornaments
      ==================================================== */}
      <section className="py-36 px-6 bg-pastel-animated relative overflow-hidden">
        {/* Subtle floating decorative circles */}
        <div className="absolute top-20 left-10 w-48 h-48 rounded-full bg-[#E8D5F5]/30 blur-3xl float-2 pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-[#FAEBE4]/40 blur-3xl float-1 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#FDE9A2]/15 blur-[80px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="reveal mb-8">
            <div className="flex items-center justify-center gap-4 mb-10">
              <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/40" />
              <Sparkles size={18} className="text-[#C9A84C]/60" />
              <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/40" />
            </div>
          </div>
          <h2 className="reveal delay-100 font-royal text-4xl md:text-6xl text-[#0D1B2A] leading-tight mb-10">
            Shimmering gold. For the stars above,
            <br />
            Hear them whisper tales of{" "}
            <em className="gold-text not-italic font-medium">softly love.</em>
          </h2>
          <div className="reveal delay-200 flex items-center justify-center gap-4">
            <span className="w-px h-16 bg-gradient-to-b from-[#C9A84C]/50 to-transparent" />
          </div>
          <div className="reveal delay-300 mt-6 text-[#C9A84C] text-2xl tracking-widest">❋ ✦ ❋</div>
        </div>
      </section>

      {/* ====================================================
          4. HERITAGE SHOWCASE — Arch + text with 3D tilt
      ==================================================== */}
      <section className="py-28 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #FAF6EE 50%, #FDF1EB 100%)" }}>
        {/* Decorative gold circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-[#C9A84C]/10 pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full border border-[#C9A84C]/8 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal-left order-2 lg:order-1 max-w-lg">
            <div className="overline-royal mb-6 flex items-center gap-3">
              <span className="w-6 h-px bg-[#C9A84C]" />
              The Atelier
            </div>
            <h3 className="font-royal text-4xl md:text-5xl mb-6 text-[#0D1B2A] leading-tight">
              We Do Not Sell Jewellery.{" "}
              <em className="gold-text not-italic">We Hold the Moments</em>
            </h3>
            <div className="w-16 h-px bg-gradient-to-r from-[#C9A84C] to-transparent mb-8" />
            <p className="font-sub text-lg text-[#0D1B2A]/60 italic leading-relaxed mb-4">
              Sri Bhashyakara is a house — not a store. We have been hand-setting stones
              for South Indian families across three generations.
            </p>
            <p className="font-body text-sm text-[#0D1B2A]/50 leading-relaxed mb-10">
              Every creation begins with a sacred gesture — the master&apos;s hand meets paper.
              Under candlelight, one karigar seats each stone by hand. No two pieces are identical.
            </p>
            <Link href="/shop" className="btn-royal-solid">
              Explore Collection <ChevronRight size={16} />
            </Link>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-14 pt-8 border-t border-[#C9A84C]/15">
              <div className="text-center">
                <div className="font-royal text-4xl gold-text"><AnimatedNumber target="40" suffix="+" /></div>
                <div className="overline-royal text-[0.55rem] mt-1 opacity-60">Years of Craft</div>
              </div>
              <div className="text-center">
                <div className="font-royal text-4xl gold-text"><AnimatedNumber target="3" /></div>
                <div className="overline-royal text-[0.55rem] mt-1 opacity-60">Generations</div>
              </div>
              <div className="text-center">
                <div className="font-royal text-4xl gold-text"><AnimatedNumber target="10" suffix="K+" /></div>
                <div className="overline-royal text-[0.55rem] mt-1 opacity-60">Families Served</div>
              </div>
            </div>
          </div>

          <div className="reveal-right order-1 lg:order-2 flex justify-center">
            <TiltCard intensity={10}>
              <div className="arch-container w-full max-w-[380px] aspect-[3/5] bg-gradient-to-b from-[#2A1E14] to-[#1A1008] p-5 flex flex-col items-center justify-center relative">
                <div className="absolute inset-4 border border-[#C9A84C]/15 rounded-[999px_999px_16px_16px] pointer-events-none" />
                {/* Brand text */}
                <div className="text-center z-10 mb-8 mt-14">
                  <div className="font-royal text-[#C9A84C] text-sm tracking-[0.3em] uppercase mb-2">Sri Bhashyakara</div>
                  <div className="font-sub italic text-[#FAF6EE]/40 text-xs">Sacred Geometry in Gold</div>
                </div>
                {/* Jewel image */}
                <div className="w-52 h-52 rounded-full overflow-hidden border-2 border-[#C9A84C]/30 z-10 glow-pulse">
                  <img src={IMG.lotus2} alt="Heritage jewellery" className="w-full h-full object-cover" />
                </div>
                <div className="mt-10 text-[#C9A84C]/60 text-sm tracking-widest z-10">❋ ✦ ❋</div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ====================================================
          5. FULL-WIDTH PARALLAX IMAGE — with overlay text
      ==================================================== */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          data-parallax="0.15"
          style={{
            backgroundImage: `url('${IMG.hero}')`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/80 via-transparent to-[#0D1B2A]/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="reveal font-royal text-3xl md:text-5xl text-[#FAF6EE] mb-4">
              Crafted in <em className="gold-text not-italic">Light &amp; Gold</em>
            </h3>
            <p className="reveal delay-100 font-sub text-lg italic text-[#FAF6EE]/60">
              Every piece is a universe unto itself
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          6. WEAR ME WITH LOVE — Pastel card grid
      ==================================================== */}
      <section className="py-28 px-6 relative" style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #FDF1EB 50%, #FFF8F0 100%)" }}>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />

        <div className="max-w-[1400px] mx-auto">
          <div className="reveal text-center mb-16">
            <div className="overline-royal mb-4">Curated For You</div>
            <h2 className="font-royal text-4xl md:text-6xl text-[#0D1B2A]">
              Wear me with <em className="gold-text not-italic font-medium">Love</em>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {CATEGORIES.map((cat, i) => (
              <TiltCard key={cat.name} intensity={12}>
                <Link href="/shop" className={`reveal block`} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className={`pastel-card ${cat.bg} p-6 md:p-8 h-full min-h-[280px] md:min-h-[340px] flex flex-col justify-between group`}>
                    <span className="font-body text-xs font-bold tracking-[0.2em] text-[#0D1B2A]/60 uppercase group-hover:text-[#C9A84C] transition-colors duration-500">
                      {cat.name}
                    </span>
                    <div className="flex justify-center mt-4">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-700 group-hover:scale-110 ring-2 ring-white/60">
                        <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="text-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-[#C9A84C] text-xs tracking-widest flex items-center justify-center gap-1">
                        Explore <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          7. FEATURED MASTERPIECES — Stunning grid
      ==================================================== */}
      <section className="py-28 px-6 relative" style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #FAF6EE 100%)" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal flex items-end justify-between mb-16">
            <div>
              <div className="overline-royal mb-3">The Vault</div>
              <h2 className="heading-lg">
                Featured <em className="gold-text not-italic">Masterpieces</em>
              </h2>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 overline-royal text-[0.6rem] hover:text-[#F0C96B] transition-colors">
              View All <ChevronRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED.map((piece, i) => (
              <TiltCard key={piece.name} intensity={8}>
                <div
                  className="reveal jewel-card group"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <Link href="/shop">
                    <div className="relative aspect-square overflow-hidden rounded-2xl" style={{ background: piece.color }}>
                      <img
                        src={piece.img}
                        alt={piece.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="card-overlay rounded-2xl" />
                      <div className="card-content">
                        <p className="font-royal text-xl text-[#FAF6EE] mb-1">{piece.name}</p>
                        <p className="font-sub italic text-[#C9A84C] text-sm mb-2">{piece.sub}</p>
                        <span className="overline-royal text-[0.55rem] opacity-0 group-hover:opacity-70 transition-opacity flex items-center gap-1">
                          View Piece <ChevronRight size={10} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          8. AIRA COLLECTION — Dark navy arch with floating pieces
      ==================================================== */}
      <section className="py-28 px-6" style={{ background: "var(--warm-cream)" }}>
        <div className="max-w-[1400px] mx-auto relative">
          <div
            className="rounded-[40px] md:rounded-[80px] p-10 md:p-20 lg:p-28 relative overflow-hidden border border-[#C9A84C]/15"
            style={{
              background: "linear-gradient(135deg, #001C38 0%, #0D1B2A 40%, #1A0D3B 100%)",
            }}
          >
            {/* Background glow effects */}
            <div className="absolute top-0 right-0 w-[60%] h-[100%] bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.12)_0%,transparent_60%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(248,215,218,0.06)_0%,transparent_60%)] pointer-events-none" />

            {/* Floating sparkles */}
            <div className="absolute top-[20%] right-[15%] text-[#C9A84C]/20 text-sm float-1">✦</div>
            <div className="absolute top-[60%] left-[10%] text-[#C9A84C]/15 text-xl float-3">✦</div>
            <div className="absolute bottom-[20%] right-[30%] text-[#C9A84C]/10 text-lg float-2">❋</div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="reveal">
                <div className="overline-royal mb-4 text-[#C9A84C]/70">Signature Collection</div>
                <h2 className="font-royal text-5xl md:text-7xl text-[#FAF6EE] mb-6 leading-tight">
                  Aira
                </h2>
                <div className="w-16 h-px bg-gradient-to-r from-[#C9A84C] to-transparent mb-8" />
                <p className="font-sub text-lg text-[#FAF6EE]/50 italic leading-relaxed mb-4 max-w-md">
                  Masterfully crafted to embody grace — delicate gold intertwining with precious stones.
                </p>
                <p className="font-body text-sm text-[#FAF6EE]/35 leading-relaxed mb-10 max-w-md">
                  Creating a symphony of light perfect for any grand occasion. Each piece is hand-blessed at our family shrine before leaving the atelier.
                </p>
                <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C9A84C] to-[#F0C96B] text-[#001C38] font-body text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:shadow-[0_8px_30px_rgba(201,168,76,0.4)] transition-all duration-500 hover:-translate-y-1">
                  Explore Aira <ChevronRight size={14} />
                </Link>
              </div>

              <div className="reveal-scale flex justify-center lg:justify-end">
                <TiltCard intensity={10}>
                  <div className="arch-container w-full max-w-[320px] aspect-[3/4] bg-gradient-to-b from-[#2A1E14] to-[#1A0D0A] p-4 relative">
                    <div className="absolute inset-3 border border-[#C9A84C]/10 rounded-[999px_999px_16px_16px] pointer-events-none" />
                    <img src={IMG.blue} alt="Aira Collection" className="w-full h-full object-cover rounded-[999px_999px_12px_12px]" />
                  </div>
                </TiltCard>
              </div>
            </div>

            {/* Bottom product grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 relative z-10">
              {[IMG.earrings, IMG.ruby, IMG.emerald, IMG.ring].map((img, i) => (
                <TiltCard key={i} intensity={12}>
                  <div
                    className="reveal bg-[#FAF6EE] p-5 rounded-2xl group cursor-pointer hover:shadow-2xl transition-all duration-500"
                    style={{ transitionDelay: `${i * 0.12}s` }}
                  >
                    <div className="aspect-square overflow-hidden rounded-xl">
                      <img
                        src={img}
                        alt="Aira piece"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          9. GALLERY MOSAIC — Quick stunning visual
      ==================================================== */}
      <section className="py-24 px-6" style={{ background: "var(--warm-cream)" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal text-center mb-16">
            <div className="overline-royal mb-4">The Gallery</div>
            <h2 className="heading-lg">
              Crafted in <em className="gold-text not-italic">Light &amp; Gold</em>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[IMG.emerald, IMG.lotus2, IMG.ruby2, IMG.choker, IMG.blue, IMG.necklace, IMG.earrings, IMG.set].map((img, i) => (
              <TiltCard key={i} intensity={8}>
                <div
                  className={`reveal overflow-hidden rounded-2xl cursor-pointer group ${
                    i === 0 || i === 5 ? "md:row-span-2" : ""
                  }`}
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <div className={`relative ${i === 0 || i === 5 ? "aspect-[3/4] md:h-full" : "aspect-square"} overflow-hidden rounded-2xl`}>
                    <img
                      src={img}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          10. CTA — Beautiful final section
      ==================================================== */}
      <section className="relative py-36 px-6 overflow-hidden" style={{ background: "linear-gradient(135deg, #001C38 0%, #0D1B2A 50%, #1A0D3B 100%)" }}>
        {/* Animated background blobs */}
        <div className="absolute top-0 left-[20%] w-96 h-96 rounded-full bg-[#C9A84C]/5 blur-[100px] float-2 pointer-events-none" />
        <div className="absolute bottom-0 right-[20%] w-80 h-80 rounded-full bg-[#F8D7DA]/5 blur-[80px] float-3 pointer-events-none" />

        {/* Stars */}
        <div className="absolute top-[10%] left-[15%] text-[#C9A84C]/20 float-1">✦</div>
        <div className="absolute top-[30%] right-[20%] text-[#C9A84C]/15 float-4">✦</div>
        <div className="absolute bottom-[20%] left-[30%] text-[#C9A84C]/10 float-2">❋</div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="reveal overline-royal text-[#C9A84C]/70 mb-6">Begin Your Journey</div>
          <h2 className="reveal delay-100 font-royal text-4xl md:text-6xl text-[#FAF6EE] mb-6 leading-tight">
            Most beautiful <em className="gold-text not-italic">moments await...</em>
          </h2>
          <p className="reveal delay-200 font-sub text-xl text-[#FAF6EE]/40 italic mb-12 max-w-lg mx-auto">
            Tell us your story. We will craft a constellation of jewellery designed just for you.
          </p>
          <div className="reveal delay-300 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#C9A84C] to-[#F0C96B] text-[#001C38] font-body text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:shadow-[0_12px_40px_rgba(201,168,76,0.4)] transition-all duration-500 hover:-translate-y-2">
              Book Private Appointment <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
