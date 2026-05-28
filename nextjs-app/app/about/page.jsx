"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const RoyalParticles = dynamic(() => import("@/components/RoyalParticles"), { ssr: false });

const IMAGES = {
  hero: "/images/ChatGPT Image May 23, 2026, 01_32_40 PM.png",
  craft: "/images/ChatGPT Image May 23, 2026, 01_32_20 PM.png",
  atelier: "/images/ChatGPT Image May 23, 2026, 01_31_38 PM.png",
  showroom: "/images/ChatGPT Image May 23, 2026, 01_32_26 PM.png",
};

const PILLARS = [
  { n: "01", label: "Heritage", text: "Rooted in 40 years of Hyderabadi craftsmanship, every piece carries the weight of tradition." },
  { n: "02", label: "Mastery", text: "Our karigars have passed their skills through family lines for generations — a living lineage." },
  { n: "03", label: "Exclusivity", text: "We create in limited quantities. Each piece is unique; no two jewels leave our atelier alike." },
  { n: "04", label: "Legacy", text: "We make jewellery for families, not customers. Our pieces are meant to be inherited." },
];

export default function AboutPage() {
  useScrollReveal();
  return (
    <main style={{ background: "#050810" }} className="min-h-screen">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden">
        <RoyalParticles count={80} />
        <div className="absolute inset-0">
          <img src={IMAGES.hero} alt="Heritage jewellery" className="w-full h-full object-cover opacity-35 mix-blend-luminosity" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/60 to-[#050810]/30" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-16 pt-32">
          <div className="reveal overline-royal mb-4">Our Story</div>
          <h1 className="reveal delay-100 heading-xl max-w-2xl">
            A Legacy Forged in <em className="gold-text not-italic">Sacred Fire</em>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-32 px-6 lg:px-16 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal-scale">
            <img src={IMAGES.craft} alt="Craft" className="w-full aspect-[3/4] object-cover border border-[#C9A84C]/20" />
          </div>
          <div className="reveal-right space-y-8">
            <div className="overline-royal">Est. 1984</div>
            <h2 className="heading-lg">Four Decades. One Family. One Promise.</h2>
            <div className="divider-gold" />
            <p className="sub-heading italic font-sub text-[#FAF6EE]/70 leading-relaxed">
              Sri Bhashyakara was born in Hyderabad&apos;s jewellery quarter in 1984, when our founder Sri Raghavendra Bhashyakara hand-carved the first peacock pendant for his daughter&apos;s wedding.
            </p>
            <p className="font-body text-sm text-[#FAF6EE]/50 leading-relaxed">
              Today, his grandchildren continue the tradition — using the same lost-wax casting techniques, the same family stone sources in Jaipur, and the same blessing ritual that happens before every piece leaves our workshop. We have served over 10,000 families across South India.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 px-6 lg:px-16 max-w-[1600px] mx-auto">
        <div className="reveal text-center mb-16">
          <div className="overline-royal mb-4">Our Pillars</div>
          <h2 className="heading-lg">What We <em className="gold-text not-italic">Stand For</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, i) => (
            <div
              key={p.n}
              className="reveal border border-[#C9A84C]/15 p-8 relative"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="text-[#C9A84C]/30 font-royal text-5xl mb-4">{p.n}</div>
              <div className="overline-royal mb-3">{p.label}</div>
              <p className="font-body text-sm text-[#FAF6EE]/55 leading-relaxed">{p.text}</p>
              <div className="absolute top-3 right-3 text-[#C9A84C]/20 text-xs">✦</div>
            </div>
          ))}
        </div>
      </section>

      {/* Atelier image */}
      <section className="py-24 px-6 lg:px-16 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="reveal-left space-y-6">
          <div className="overline-royal">The Atelier</div>
          <h2 className="heading-lg">Crafted by Hand. Blessed by Heart.</h2>
          <p className="font-sub italic text-[#FAF6EE]/70 text-lg leading-relaxed">
            Our workshop in Hyderabad&apos;s old city is where ancient technique meets devotion. Every karigar here has trained for at least fifteen years before touching an SBJ piece.
          </p>
          <Link href="/contact" className="btn-royal inline-flex">
            Visit the Atelier <ChevronRight size={14} />
          </Link>
        </div>
        <div className="reveal-scale grid grid-cols-2 gap-3">
          <img src={IMAGES.atelier} alt="" className="w-full aspect-square object-cover border border-[#C9A84C]/15" />
          <img src={IMAGES.showroom} alt="" className="w-full aspect-square object-cover border border-[#C9A84C]/15 mt-8" />
        </div>
      </section>

    </main>
  );
}
