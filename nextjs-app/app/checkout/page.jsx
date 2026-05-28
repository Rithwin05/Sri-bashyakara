"use client";

import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";

const HERO_IMG = "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/h2hwamgm_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_47%20PM.png";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-crispWhite pt-24 pb-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Checkout Form */}
        <div className="lg:col-span-7 pt-10">
          <Reveal>
            <h1 className="font-heading text-4xl text-deepBlue mb-12">Secure Checkout</h1>
            
            {/* Steps Accordion Simulation */}
            <div className="space-y-8">
              
              {/* Step 1: Contact */}
              <div className="border-b border-mutedGold/20 pb-8">
                <h2 className="font-body text-xs tracking-widest uppercase text-deepBlue mb-6 flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-deepBlue text-white flex items-center justify-center">1</span>
                  Contact Information
                </h2>
                <div className="space-y-6 pl-10">
                  <input type="email" className="editorial-input" placeholder="Email Address" />
                  <div className="flex items-center gap-2 mt-4">
                    <input type="checkbox" id="newsletter" className="w-4 h-4 accent-mutedGold" />
                    <label htmlFor="newsletter" className="font-body text-xs text-deepBlue/70">Keep me updated on news and exclusive offers</label>
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping */}
              <div className="border-b border-mutedGold/20 pb-8 opacity-50 pointer-events-none">
                <h2 className="font-body text-xs tracking-widest uppercase text-deepBlue mb-6 flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full border border-deepBlue/30 text-deepBlue flex items-center justify-center">2</span>
                  Shipping Details
                </h2>
              </div>

              {/* Step 3: Payment */}
              <div className="border-b border-mutedGold/20 pb-8 opacity-50 pointer-events-none">
                <h2 className="font-body text-xs tracking-widest uppercase text-deepBlue mb-6 flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full border border-deepBlue/30 text-deepBlue flex items-center justify-center">3</span>
                  Payment
                </h2>
              </div>

              <div className="pt-6 pl-10">
                <button className="btn-gold w-full flex justify-center items-center gap-2">
                  Continue to Shipping <ChevronRight size={16} />
                </button>
              </div>

            </div>
          </Reveal>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 pt-10">
          <Reveal delay={150}>
            <div className="bg-pastelAccent p-8 rounded-sm">
              <h2 className="font-heading text-2xl text-deepBlue mb-8">Order Summary</h2>
              
              <div className="flex gap-6 mb-8 border-b border-mutedGold/20 pb-8">
                <div className="w-24 h-32 bg-crispWhite overflow-hidden">
                  <img src={HERO_IMG} alt="Product" className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-deepBlue mb-2">Soleil Diamond Ring</h3>
                  <p className="font-body text-xs text-deepBlue/60 mb-2">Size: 7</p>
                  <p className="font-body text-sm text-deepBlue">$4,200</p>
                </div>
              </div>

              <div className="space-y-4 font-body text-sm text-deepBlue border-b border-mutedGold/20 pb-6 mb-6">
                <div className="flex justify-between">
                  <span className="text-deepBlue/70">Subtotal</span>
                  <span>$4,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-deepBlue/70">Secure Shipping</span>
                  <span className="uppercase text-mutedGold text-xs tracking-widest">Complimentary</span>
                </div>
              </div>

              <div className="flex justify-between font-heading text-2xl text-deepBlue mb-8">
                <span>Total</span>
                <span>$4,200</span>
              </div>

              <div className="flex items-center gap-3 font-body text-xs text-deepBlue/50 justify-center">
                <ShieldCheck size={16} />
                Secure Encrypted Checkout
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </main>
  );
}
