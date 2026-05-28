"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Filter } from "lucide-react";
import { COLLECTIONS } from "@/lib/data/collections";

const HERO_IMG = "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/h2hwamgm_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_47%20PM.png";
const MINIMAL_IMG = "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/eayhc24a_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_45%20PM.png";
const MODERN_IMG = "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/e43952ag_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_42%20PM.png";

const PRODUCTS = [
  { id: 1, name: "Soleil Diamond Ring", price: "$4,200", category: "rings", img: HERO_IMG },
  { id: 2, name: "Lumiere Drop Earrings", price: "$3,800", category: "earrings", img: MODERN_IMG },
  { id: 3, name: "Crimson Velvet Cuff", price: "$8,500", category: "bracelets", img: MINIMAL_IMG },
  { id: 4, name: "Aura Pendant Necklace", price: "$5,100", category: "necklaces", img: MODERN_IMG },
  { id: 5, name: "Eternity Diamond Band", price: "$2,900", category: "rings", img: MINIMAL_IMG },
  { id: 6, name: "Cascade Sapphire Necklace", price: "$12,000", category: "necklaces", img: HERO_IMG },
];

export default function ShopPage() {
  const [filter, setFilter] = useState("all");

  const filteredProducts = filter === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <main className="min-h-screen bg-crispWhite pt-32 pb-24">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl md:text-6xl text-deepBlue">Curated Collections</h1>
          <p className="font-body text-deepBlue/60 mt-4 max-w-xl mx-auto">
            Discover our meticulously crafted pieces, designed for the modern connoisseur.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-y border-mutedGold/20 py-4 mb-12 gap-4">
          <div className="flex items-center gap-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {["all", "necklaces", "earrings", "rings", "bracelets"].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-body text-xs uppercase tracking-widest transition-colors whitespace-nowrap ${
                  filter === cat ? "text-mutedGold" : "text-deepBlue/60 hover:text-deepBlue"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-deepBlue">
            <Filter size={14} /> Filter & Sort
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group block">
              <div className="relative aspect-[4/5] bg-pastelAccent overflow-hidden mb-5">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
              <h2 className="font-heading text-xl text-deepBlue">{product.name}</h2>
              <p className="font-body text-sm text-deepBlue/60 mt-1">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
