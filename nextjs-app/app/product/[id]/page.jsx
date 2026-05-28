"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Share2, Heart, ChevronDown } from "lucide-react";

const HERO_IMG = "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/h2hwamgm_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_47%20PM.png";
const MINIMAL_IMG = "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/eayhc24a_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_45%20PM.png";

export default function ProductDetailPage({ params }) {
  const [activeImg, setActiveImg] = useState(0);
  const images = [HERO_IMG, MINIMAL_IMG, HERO_IMG];

  return (
    <main className="min-h-screen bg-crispWhite pt-24">
      {/* Breadcrumbs */}
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-6 flex items-center gap-2 font-body text-[10px] uppercase tracking-widest text-deepBlue/50">
        <Link href="/" className="hover:text-mutedGold transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-mutedGold transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-deepBlue">Soleil Diamond Ring</span>
      </div>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 pb-24">
        
        {/* Visuals */}
        <div className="space-y-6">
          <div className="relative aspect-[4/5] bg-pastelAccent overflow-hidden group cursor-crosshair rounded-sm">
            <img 
              src={images[activeImg]} 
              alt="Soleil Diamond Ring" 
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-150 origin-center"
            />
            {/* Arrows */}
            <div className="absolute inset-y-0 left-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => { e.preventDefault(); setActiveImg((i) => (i === 0 ? images.length - 1 : i - 1)); }}
                className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center text-deepBlue hover:bg-white"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => { e.preventDefault(); setActiveImg((i) => (i === images.length - 1 ? 0 : i + 1)); }}
                className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center text-deepBlue hover:bg-white"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`aspect-square overflow-hidden rounded-sm border transition-colors ${activeImg === idx ? 'border-mutedGold' : 'border-transparent'}`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover hover:opacity-80 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:pt-10">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-heading text-4xl text-deepBlue">Soleil Diamond Ring</h1>
            <button className="text-deepBlue/50 hover:text-mutedGold transition-colors"><Heart size={24} strokeWidth={1.5} /></button>
          </div>
          <p className="font-body text-xl text-deepBlue/80 mb-8">$4,200</p>

          <p className="font-body text-sm text-deepBlue/70 leading-relaxed mb-8 font-light">
            An exquisite display of modern minimalism. The Soleil Diamond Ring features a brilliant-cut center stone set in a sleek 18k yellow gold band, offering a perfect balance of heritage and contemporary design.
          </p>

          <div className="space-y-6 mb-12">
            <div>
              <p className="font-body text-[10px] uppercase tracking-widest text-deepBlue mb-3">Select Size</p>
              <div className="flex gap-3">
                {['6', '7', '8', '9'].map(size => (
                  <button key={size} className="w-12 h-12 border border-mutedGold/30 text-deepBlue font-body text-sm hover:border-mutedGold hover:text-mutedGold transition-all">
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link href="/checkout" className="btn-gold flex-1 text-center">Add to Bag</Link>
            <button className="w-14 h-14 border border-mutedGold/30 flex items-center justify-center text-deepBlue hover:border-mutedGold hover:text-mutedGold transition-all">
              <Share2 size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="border-t border-mutedGold/20 pt-8 space-y-4">
            <details className="group">
              <summary className="font-body text-xs uppercase tracking-widest text-deepBlue flex justify-between items-center cursor-pointer list-none py-2">
                Product Details
                <ChevronDown size={16} className="group-open:rotate-180 transition-transform" />
              </summary>
              <div className="font-body text-sm text-deepBlue/70 pt-4 pb-2 font-light">
                <ul className="list-disc pl-4 space-y-1">
                  <li>18k Solid Yellow Gold</li>
                  <li>1.5 Carat Brilliant-Cut Diamond (VVS1, E Color)</li>
                  <li>Handcrafted in our exclusive atelier</li>
                </ul>
              </div>
            </details>
            <details className="group border-t border-mutedGold/10 pt-4">
              <summary className="font-body text-xs uppercase tracking-widest text-deepBlue flex justify-between items-center cursor-pointer list-none py-2">
                Shipping & Returns
                <ChevronDown size={16} className="group-open:rotate-180 transition-transform" />
              </summary>
              <div className="font-body text-sm text-deepBlue/70 pt-4 pb-2 font-light">
                Complimentary secure shipping on all orders. Returns are accepted within 30 days of delivery in pristine condition.
              </div>
            </details>
          </div>

        </div>
      </div>
    </main>
  );
}
