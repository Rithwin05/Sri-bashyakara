"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Filter, X } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import dynamic from "next/dynamic";

const RoyalParticles = dynamic(() => import("@/components/RoyalParticles"), { ssr: false });

const CATEGORIES = ["All", "Necklaces", "Earrings", "Rings", "Bangles", "Bridal Sets"];

const PRODUCTS = [
  { id: 1, name: "Peacock Heritage Haaram", cat: "Necklaces", sub: "22K Gold · Uncut Diamonds · Emeralds", img: "/images/ChatGPT Image May 23, 2026, 01_31_38 PM.png", tag: "Signature" },
  { id: 2, name: "Emerald Diamond Necklace", cat: "Necklaces", sub: "Colombian Emeralds · VVS Diamonds", img: "/images/ChatGPT Image May 23, 2026, 01_32_10 PM.png", tag: "New" },
  { id: 3, name: "Lotus Temple Earrings", cat: "Earrings", sub: "22K Gold · South Sea Pearls", img: "/images/ChatGPT Image May 23, 2026, 01_32_12 PM.png", tag: "Exclusive" },
  { id: 4, name: "Ruby Polki Set", cat: "Bridal Sets", sub: "Burmese Rubies · Polki Diamonds", img: "/images/ChatGPT Image May 23, 2026, 01_32_13 PM.png", tag: "Bridal" },
  { id: 5, name: "Antique Gold Ring", cat: "Rings", sub: "22K Gold · Navratna Stones", img: "/images/ChatGPT Image May 23, 2026, 01_32_15 PM.png", tag: "Heritage" },
  { id: 6, name: "Chandelier Temple Necklace", cat: "Necklaces", sub: "22K Gold · Temple Design", img: "/images/ChatGPT Image May 23, 2026, 01_32_16 PM.png", tag: "Temple" },
  { id: 7, name: "Gold Kangan Bangles", cat: "Bangles", sub: "22K Gold · Hand Engraved", img: "/images/ChatGPT Image May 23, 2026, 01_32_17 PM.png", tag: "Classic" },
  { id: 8, name: "Diamond Lotus Pendant", cat: "Necklaces", sub: "18K Gold · VVS Diamonds", img: "/images/ChatGPT Image May 23, 2026, 01_32_19 PM.png", tag: "Exclusive" },
  { id: 9, name: "Royal Ruby Choker", cat: "Bridal Sets", sub: "Burmese Rubies · Diamonds · 22K Gold", img: "/images/ChatGPT Image May 23, 2026, 01_32_20 PM.png", tag: "Bridal" },
  { id: 10, name: "Antique Polki Necklace", cat: "Necklaces", sub: "Polki · Meenakari · 22K Gold", img: "/images/ChatGPT Image May 23, 2026, 01_32_21 PM.png", tag: "Heritage" },
  { id: 11, name: "Lotus Moonlit Chandbalis", cat: "Earrings", sub: "Emeralds · Pearls · 22K Gold", img: "/images/ChatGPT Image May 23, 2026, 01_32_22 PM.png", tag: "New" },
  { id: 12, name: "Gold Filigree Pendant", cat: "Necklaces", sub: "22K Gold · Handcrafted Filigree", img: "/images/ChatGPT Image May 23, 2026, 01_32_23 PM.png", tag: "Signature" },
  { id: 13, name: "Bridal Polki Choker", cat: "Bridal Sets", sub: "Polki · Emeralds · Ruby Drops", img: "/images/ChatGPT Image May 23, 2026, 01_32_25 PM.png", tag: "Bridal" },
  { id: 14, name: "Maang Tikka Set", cat: "Bridal Sets", sub: "Kundan · Rubies · Pearl Drop", img: "/images/ChatGPT Image May 23, 2026, 01_32_26 PM.png", tag: "Bridal" },
  { id: 15, name: "Sapphire Royal Necklace Set", cat: "Bridal Sets", sub: "Ceylon Sapphires · Diamonds · 22K Gold", img: "/images/ChatGPT Image May 23, 2026, 01_32_35 PM.png", tag: "Signature" },
  { id: 16, name: "Diamond Layered Set", cat: "Bridal Sets", sub: "VVS Diamonds · 22K Yellow Gold", img: "/images/ChatGPT Image May 23, 2026, 01_32_37 PM.png", tag: "Exclusive" },
  { id: 17, name: "Ruby Antique Haram", cat: "Necklaces", sub: "Rubies · Old-Cut Diamonds", img: "/images/ChatGPT Image May 23, 2026, 01_32_40 PM.png", tag: "Heritage" },
  { id: 18, name: "Emerald Cascade Necklace", cat: "Necklaces", sub: "Emerald Drops · Diamond Halo", img: "/images/ChatGPT Image May 23, 2026, 01_32_42 PM.png", tag: "New" },
];

export default function ShopPage() {
  const [active, setActive] = useState("All");
  useScrollReveal();

  const filtered = active === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === active);

  return (
    <main
      className="min-h-screen pt-28"
      style={{ background: "linear-gradient(180deg, #050810 0%, #0A0F1E 100%)" }}
    >
      {/* Hero banner */}
      <section className="relative py-24 overflow-hidden">
        <RoyalParticles count={80} />
        <div className="absolute inset-0 opacity-10">
          <img src="/images/ChatGPT Image May 23, 2026, 01_32_35 PM.png" alt="" className="w-full h-full object-cover mix-blend-luminosity" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050810] via-transparent to-[#050810]" />
        <div className="relative z-10 text-center px-6">
          <div className="overline-royal mb-4">Our Vault</div>
          <h1 className="heading-xl mb-4">
            <em className="gold-text not-italic">Sacred</em> Collections
          </h1>
          <p className="sub-heading max-w-xl mx-auto">
            Every piece carries the soul of South Indian heritage and the hands of master karigars.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-[64px] z-40 bg-[#050810]/95 backdrop-blur-xl border-b border-[#C9A84C]/15 py-4">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16 flex items-center gap-4 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex-none font-body text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 transition-all ${
                active === cat
                  ? "bg-gradient-to-r from-[#C9A84C] to-[#F0C96B] text-[#050810] font-semibold"
                  : "border border-[#C9A84C]/25 text-[#FAF6EE]/60 hover:border-[#C9A84C]/60 hover:text-[#C9A84C]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 py-16">
        <p className="overline-royal mb-10 opacity-50">{filtered.length} Pieces</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className="reveal jewel-card group"
              style={{ transitionDelay: `${(i % 8) * 0.07}s` }}
            >
              <Link href={`/product/${p.id}`}>
                <div className="relative aspect-square overflow-hidden bg-[#0A0F1E]">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="card-overlay" />
                  {/* Tag */}
                  <div className="absolute top-3 left-3 bg-[#C9A84C] text-[#050810] font-body text-[8px] font-semibold uppercase tracking-widest px-2.5 py-1">
                    {p.tag}
                  </div>
                  <div className="card-content">
                    <p className="font-royal text-lg text-[#FAF6EE] mb-0.5">{p.name}</p>
                    <p className="font-sub italic text-[#C9A84C] text-xs">{p.sub}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-20 px-6">
        <p className="sub-heading mb-6">Looking for something bespoke?</p>
        <Link href="/contact" className="btn-royal-solid">
          Commission a Piece <ChevronRight size={16} />
        </Link>
      </div>
    </main>
  );
}
