"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowDown } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";

/* ==========================================
   IMAGE MAP  (URL-encoded filenames)
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
  bridal2:  "/images/ChatGPT Image May 23, 2026, 01_32_27 PM.png"
};

/* ==========================================
   FLOATING JEWEL ELEMENT (Parallax)
========================================== */
function FloatingJewel({ src, alt, className = "", style = {}, floatClass = "float-1" }) {
  return (
    <div className={`absolute pointer-events-none select-none ${className} ${floatClass}`} style={style}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover drop-shadow-2xl"
        loading="lazy"
      />
    </div>
  );
}

export default function HomePage() {
  useScrollReveal();

  return (
    <div className="bg-ivory min-h-screen text-royalNavy">
      {/* Noise grain overlay for texture */}
      <div className="noise-overlay opacity-[0.02]" />

      {/* ====================================================
          1. HERO SECTION (Navy Blue)
      ==================================================== */}
      <section className="relative w-full h-[90vh] bg-navyBlue flex items-center justify-center overflow-hidden pt-20">
        
        {/* Subtle radial glow in the background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-royalNavy/50 via-navyBlue to-navyBlue" />

        {/* Decorative Gold Frame */}
        <div className="absolute inset-6 border border-royalGold/20 pointer-events-none rounded-xl" />
        <div className="absolute inset-8 border border-royalGold/10 pointer-events-none rounded-xl" />

        {/* Floating Jewellery Parallax */}
        <FloatingJewel
          src={IMG.gold1}
          alt="Gold Necklace"
          className="w-72 h-72 lg:w-96 lg:h-96 top-[15%] right-[-5%] lg:right-[10%] opacity-90 rounded-full"
          floatClass="float-2"
        />
        <FloatingJewel
          src={IMG.bangle}
          alt="Gold Bangle"
          className="w-48 h-48 lg:w-64 lg:h-64 bottom-[15%] left-[5%] lg:left-[15%] opacity-80 rounded-full"
          floatClass="float-1"
        />

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <div className="reveal overline-royal text-royalGold/80 mb-6 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-royalGold/50" />
            Everyday Elegance
            <span className="w-8 h-px bg-royalGold/50" />
          </div>
          
          <h1 className="reveal delay-100 font-royal text-4xl lg:text-6xl text-ivory mb-8 leading-tight">
            Daily wear styles <br/>
            <em className="text-royalGold not-italic">your heart will love.</em>
          </h1>

          <div className="reveal delay-200 inline-block border border-royalGold/30 p-1 rounded-sm backdrop-blur-sm bg-navyBlue/50 mb-10">
            <div className="border border-royalGold/20 px-8 py-3 text-ivory font-body text-sm uppercase tracking-widest flex items-center gap-2">
              <span className="text-royalGold">✦</span>
              Explore The Collection
              <span className="text-royalGold">✦</span>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="reveal delay-400 absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="overline-royal text-[10px] text-ivory/50">Scroll to Discover</span>
            <ArrowDown size={16} className="text-royalGold animate-bounce opacity-80" />
          </div>
        </div>
      </section>


      {/* ====================================================
          2. BRIDAL HIGHLIGHT BANNER
      ==================================================== */}
      <section className="relative w-full h-[75vh] bg-archBrown overflow-hidden">
        {/* Full width background image of bride/jewelry */}
        <div 
          className="absolute inset-0 w-full h-full opacity-60 mix-blend-luminosity"
          data-parallax="0.1"
          style={{
            backgroundImage: `url('${IMG.bridal2}')`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        />
        {/* Soft dark gradient on top */}
        <div className="absolute inset-0 bg-gradient-to-t from-archBrown/90 via-archBrown/40 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center">
          {/* Logo Frame overlay similar to Indriya */}
          <div className="reveal scale-95 hover:scale-100 transition-transform duration-700 bg-navyBlue/90 backdrop-blur-md p-2 rounded-t-[40px] rounded-b-[40px] shadow-2xl border border-royalGold/30">
            <div className="border border-royalGold/30 rounded-t-[32px] rounded-b-[32px] px-12 py-16 text-center">
              <svg width="40" height="40" viewBox="0 0 36 36" fill="none" className="mx-auto mb-6">
                <circle cx="18" cy="18" r="17" stroke="#C9A84C" strokeWidth="1" />
                <path d="M18 6 L28 14 L24 30 L12 30 L8 14 Z" fill="none" stroke="#C9A84C" strokeWidth="1" />
              </svg>
              <h2 className="font-royal text-3xl md:text-5xl text-ivory tracking-widest uppercase mb-4">
                Sri Bhashyakara
              </h2>
              <div className="w-16 h-px bg-royalGold mx-auto mb-4" />
              <p className="font-body text-xs text-royalGold tracking-[0.3em] uppercase">
                Bridal Edition
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. STORY SECTION
      ==================================================== */}
      <section className="py-32 px-6 bg-ivory">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="reveal font-royal text-4xl md:text-5xl text-royalNavy leading-tight mb-8">
            Shimmering gold. For the stars above, <br/>
            Hear them whisper tales of <em className="text-royalGold not-italic">softly love.</em>
          </h2>
          <div className="reveal delay-100 w-px h-16 bg-royalGold/50 mx-auto" />
          <div className="reveal delay-200 mt-4 text-royalGold text-xl">✦</div>
        </div>
      </section>

      {/* ====================================================
          4. GAHARA BANYAN (ARCH) SHOWCASE
      ==================================================== */}
      <section className="py-20 px-6 bg-ivory relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="reveal-left order-2 md:order-1 max-w-md">
            <h3 className="font-royal text-3xl md:text-4xl mb-4 text-royalNavy">
              The Heritage Collection
            </h3>
            <div className="w-12 h-px bg-royalGold mb-6" />
            <p className="font-body text-sm text-royalNavy/70 leading-relaxed mb-8">
              Every creation begins with a sacred gesture — the master&apos;s hand meets paper. 
              Twenty-eight generations of motifs guide each line. Under candlelight, one karigar seats each stone by hand. No two pieces are identical.
            </p>
            <Link href="/shop" className="btn-royal-solid">
              Explore Collection
            </Link>
          </div>

          <div className="reveal-right order-1 md:order-2 flex justify-center">
            {/* The Arch Container */}
            <div className="relative w-full max-w-[350px] aspect-[1/2] rounded-t-full bg-archBrown p-4 shadow-2xl flex flex-col items-center justify-center border border-royalGold/10">
               {/* Inner gold border */}
               <div className="absolute inset-3 border border-royalGold/20 rounded-t-full pointer-events-none" />
               <div className="text-center z-10 mb-8 mt-12">
                 <div className="font-royal text-royalGold text-sm tracking-widest uppercase mb-2">Sri Bhashyakara</div>
                 <div className="font-sub italic text-ivory/60 text-xs">Sacred Geometry</div>
               </div>
               
               <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-royalGold/30 shadow-[0_0_30px_rgba(201,168,76,0.3)] z-10">
                 <img src={IMG.lotus2} alt="Jewelry piece" className="w-full h-full object-cover" />
               </div>
               <div className="mt-8 text-royalGold text-sm">✦</div>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================
          5. FULL WIDTH PARALLAX IMAGE
      ==================================================== */}
      <section className="relative w-full h-[60vh] overflow-hidden my-16">
         <div 
           className="absolute inset-0 w-full h-full"
           data-parallax="0.15"
           style={{
             backgroundImage: `url('${IMG.hero}')`,
             backgroundSize: "cover",
             backgroundPosition: "center 40%",
           }}
         />
      </section>


      {/* ====================================================
          6. WEAR ME WITH LOVE GRID
      ==================================================== */}
      <section className="py-24 px-6 bg-ivory">
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal mb-12">
            <h2 className="font-royal text-4xl md:text-5xl text-royalNavy">
              Wear me with <em className="text-royalGold not-italic">Love</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Grid of Categories */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <Link href="/shop" className="reveal delay-100 col-span-2 group">
                <div className="bg-blushLight rounded-lg p-8 h-full flex flex-col justify-between hover:shadow-xl transition-shadow border border-blushPink">
                  <span className="font-body text-sm font-semibold tracking-wider text-royalNavy/70 uppercase mb-8 group-hover:text-royalNavy">Every Day</span>
                  <div className="flex justify-end">
                    <img src={IMG.earrings} alt="Every day" className="w-24 h-24 object-cover rounded-full shadow-lg group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
              </Link>
              
              <Link href="/shop" className="reveal delay-200 group">
                <div className="bg-blushPink/50 rounded-lg p-6 h-full flex flex-col justify-between hover:shadow-xl transition-shadow border border-blushPink">
                  <span className="font-body text-xs font-semibold tracking-wider text-royalNavy/70 uppercase mb-4 group-hover:text-royalNavy">Workwear</span>
                  <img src={IMG.ring} alt="Workwear" className="w-20 h-20 object-cover mx-auto rounded-full group-hover:scale-105 transition-transform duration-500" />
                </div>
              </Link>

              <Link href="/shop" className="reveal delay-300 group">
                <div className="bg-blushLight rounded-lg p-6 h-full flex flex-col justify-between hover:shadow-xl transition-shadow border border-blushPink">
                  <span className="font-body text-xs font-semibold tracking-wider text-royalNavy/70 uppercase mb-4 group-hover:text-royalNavy">Partywear</span>
                  <img src={IMG.pendant} alt="Partywear" className="w-20 h-20 object-cover mx-auto rounded-full group-hover:scale-105 transition-transform duration-500" />
                </div>
              </Link>
              
              <Link href="/shop" className="reveal delay-400 group">
                <div className="bg-[#F0E6D8] rounded-lg p-6 h-full flex flex-col justify-between hover:shadow-xl transition-shadow border border-[#E0D6C8]">
                  <span className="font-body text-xs font-semibold tracking-wider text-royalNavy/70 uppercase mb-4 group-hover:text-royalNavy">Bridal</span>
                </div>
              </Link>

              <Link href="/shop" className="reveal delay-500 group">
                <div className="bg-blushPink/80 rounded-lg p-6 h-full flex flex-col justify-between hover:shadow-xl transition-shadow border border-blushPink">
                  <span className="font-body text-xs font-semibold tracking-wider text-royalNavy/70 uppercase mb-4 group-hover:text-royalNavy">Gifting</span>
                </div>
              </Link>
            </div>

            {/* Right Large Image */}
            <div className="lg:col-span-5 reveal delay-600">
              <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden relative">
                 <img src={IMG.bridal} alt="Wear me with love" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================
          7. AIRA COLLECTION (DARK NAVY ARCH BG)
      ==================================================== */}
      <section className="py-24 px-6 bg-ivory">
        <div className="max-w-[1400px] mx-auto bg-navyBlue rounded-[40px] md:rounded-[80px] p-8 md:p-16 lg:p-24 text-ivory relative overflow-hidden border border-royalGold/20">
          
          <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-royalGold/10 via-transparent to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left text */}
            <div className="reveal">
              <h2 className="font-royal text-4xl md:text-5xl text-ivory mb-6">
                Aira
              </h2>
              <p className="font-body text-sm text-ivory/70 leading-relaxed mb-8 max-w-md">
                Masterfully crafted to embody grace. The Aira collection features delicate gold intertwining with precious stones, creating a symphony of light perfect for any grand occasion.
              </p>
              <Link href="/shop" className="btn-royal-solid bg-royalGold text-navyBlue hover:bg-royalGoldLight">
                Explore Collection
              </Link>
            </div>

            {/* Right Arch Image */}
            <div className="reveal-scale flex justify-center lg:justify-end">
              <div className="w-full max-w-[300px] aspect-[3/4] bg-archBrown rounded-t-full p-3 border border-royalGold/20 shadow-2xl relative">
                <div className="absolute inset-0 border border-royalGold/10 rounded-t-full m-2 pointer-events-none" />
                <img src={IMG.blue} alt="Aira Collection" className="w-full h-full object-cover rounded-t-full rounded-b-xl" />
              </div>
            </div>
          </div>

          {/* Bottom Grid of small items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 relative z-10">
            {[IMG.earrings, IMG.ruby, IMG.emerald, IMG.ring].map((img, i) => (
              <div key={i} className="reveal bg-ivory p-4 md:p-6 rounded-lg hover:shadow-xl transition-shadow group flex items-center justify-center aspect-square" style={{ transitionDelay: `${i * 0.1}s` }}>
                <img src={img} alt="Aira piece" className="w-full h-full object-cover rounded-md group-hover:scale-110 transition-transform duration-500 shadow-sm" />
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
