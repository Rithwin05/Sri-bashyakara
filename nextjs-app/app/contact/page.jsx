"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import dynamic from "next/dynamic";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const RoyalParticles = dynamic(() => import("@/components/RoyalParticles"), { ssr: false });

export default function ContactPage() {
  useScrollReveal();
  return (
    <main style={{ background: "#050810" }} className="min-h-screen pt-28 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="relative py-24 text-center mb-16 overflow-hidden">
          <RoyalParticles count={60} />
          <div className="reveal overline-royal mb-4">Speak With Us</div>
          <h1 className="reveal delay-100 heading-xl mb-6">
            Begin a <em className="gold-text not-italic">Private Conversation</em>
          </h1>
          <p className="reveal delay-200 sub-heading max-w-lg mx-auto">
            No catalogue. No pressure. Just a warm conversation about what you love
            and what your family already wears.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Info column */}
          <div className="lg:col-span-4 space-y-10 reveal-left">
            <div>
              <div className="overline-royal mb-6">Our Atelier</div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin size={18} className="text-[#C9A84C] mt-0.5 shrink-0" />
                  <p className="font-body text-sm text-[#FAF6EE]/65 leading-relaxed">
                    Sri Bhashyakara Jewellery<br />
                    Jubilee Hills, Hyderabad<br />
                    Telangana – 500033
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={18} className="text-[#C9A84C] shrink-0" />
                  <p className="font-body text-sm text-[#FAF6EE]/65">+91 40 2354 7890</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={18} className="text-[#C9A84C] shrink-0" />
                  <p className="font-body text-sm text-[#FAF6EE]/65">concierge@sribhashyakara.com</p>
                </div>
                <div className="flex items-center gap-4">
                  <Clock size={18} className="text-[#C9A84C] shrink-0" />
                  <p className="font-body text-sm text-[#FAF6EE]/65">Mon–Sat: 10am – 7pm IST<br />Sunday by appointment only</p>
                </div>
              </div>
            </div>

            <div className="divider-gold" />

            <div>
              <div className="overline-royal mb-4">Private Appointments</div>
              <p className="font-body text-sm text-[#FAF6EE]/50 leading-relaxed">
                For a truly exclusive experience, we close the showroom and dedicate our
                full attention to your family. Submit the form and our concierge will call
                within 24 hours.
              </p>
            </div>

            {/* Jewellery accent image */}
            <div className="border border-[#C9A84C]/15 overflow-hidden">
              <img
                src="/images/ChatGPT Image May 23, 2026, 01_32_23 PM.png"
                alt="SBJ jewellery"
                className="w-full aspect-square object-cover opacity-80"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8 reveal-right">
            <div
              className="border border-[#C9A84C]/20 p-10 md:p-14"
              style={{ background: "rgba(201,168,76,0.02)" }}
            >
              <h2 className="font-royal text-3xl text-[#FAF6EE] mb-10">Request an Appointment</h2>
              <form onSubmit={e => e.preventDefault()} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="overline-royal text-[0.6rem] block mb-3">Full Name</label>
                    <input type="text" className="royal-input" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="overline-royal text-[0.6rem] block mb-3">Phone Number</label>
                    <input type="tel" className="royal-input" placeholder="+91 99999 00000" />
                  </div>
                </div>
                <div>
                  <label className="overline-royal text-[0.6rem] block mb-3">Email Address</label>
                  <input type="email" className="royal-input" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="overline-royal text-[0.6rem] block mb-3">Occasion</label>
                  <select className="royal-input appearance-none cursor-pointer" defaultValue="">
                    <option value="" disabled>Select occasion...</option>
                    <option>Bridal Trousseau</option>
                    <option>Anniversary Gift</option>
                    <option>Bespoke Commission</option>
                    <option>Festival Jewellery</option>
                    <option>Collection Exploration</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="overline-royal text-[0.6rem] block mb-3">Tell Us Your Story</label>
                  <textarea
                    rows={5}
                    className="royal-input resize-none"
                    placeholder="Tell us about the occasion, your preferences, or any piece you saw that caught your eye..."
                  />
                </div>
                <button type="submit" className="btn-royal-solid w-full justify-center">
                  Submit Request · Our Concierge Will Call You
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
