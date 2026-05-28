"use client";

import Reveal from "@/components/Reveal";
import { SBJ_ADDRESS, SBJ_PHONE_DISPLAY } from "@/lib/api";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-pastelAccent pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <Reveal>
          <div className="font-body text-xs tracking-widest text-mutedGold uppercase mb-6">Concierge</div>
          <h1 className="font-heading text-5xl text-deepBlue mb-10">Private Appointments</h1>
          <p className="font-body text-deepBlue/70 font-light leading-relaxed mb-12 max-w-md">
            To view our collections or discuss a bespoke commission, we invite you to arrange a private appointment at our flagship boutique.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-2xl text-deepBlue mb-2">Boutique</h3>
              <p className="font-body text-deepBlue/70 font-light leading-relaxed">{SBJ_ADDRESS}</p>
            </div>
            <div>
              <h3 className="font-heading text-2xl text-deepBlue mb-2">Connect</h3>
              <p className="font-body text-deepBlue/70 font-light leading-relaxed">
                T: {SBJ_PHONE_DISPLAY}<br />
                E: concierge@sribhashyakara.com
              </p>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={200}>
          <div className="bg-crispWhite p-10 md:p-14 shadow-2xl rounded-sm">
            <h3 className="font-heading text-3xl text-deepBlue mb-8">Request an Appointment</h3>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="font-body text-xs tracking-widest uppercase text-deepBlue block mb-3">Name</label>
                <input type="text" className="editorial-input" placeholder="Your full name" />
              </div>
              <div>
                <label className="font-body text-xs tracking-widest uppercase text-deepBlue block mb-3">Email</label>
                <input type="email" className="editorial-input" placeholder="Your email address" />
              </div>
              <div>
                <label className="font-body text-xs tracking-widest uppercase text-deepBlue block mb-3">Interest</label>
                <input type="text" className="editorial-input" placeholder="E.g., Bridal, Bespoke, The Aura Collection" />
              </div>
              <button className="btn-gold w-full mt-4">Submit Request</button>
            </form>
          </div>
        </Reveal>

      </div>
    </main>
  );
}
