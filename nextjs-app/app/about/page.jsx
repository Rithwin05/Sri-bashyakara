"use client";

import Reveal from "@/components/Reveal";

const HERO_IMG = "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/h2hwamgm_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_47%20PM.png";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-crispWhite">
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-deepBlue" />
        <div className="absolute inset-0 bg-gradient-to-t from-deepBlue via-deepBlue/50 to-transparent z-10" />
        <img 
          src={HERO_IMG} 
          alt="Brand Heritage" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="relative z-20 text-center px-6">
          <Reveal>
            <div className="font-body text-xs tracking-widest text-mutedGold uppercase mb-6">Our Philosophy</div>
            <h1 className="font-heading text-5xl md:text-7xl text-white max-w-4xl mx-auto leading-tight">
              A legacy of <em className="italic font-light text-mutedGold">uncompromising</em> elegance.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-32 px-6 lg:px-12 max-w-[1000px] mx-auto text-center">
        <Reveal>
          <p className="font-body text-xl md:text-2xl text-deepBlue leading-relaxed font-light mb-12">
            Since our founding, Sri Bhashyakara has stood at the intersection of heritage craftsmanship and avant-garde design. We do not merely create jewellery; we sculpt timeless artifacts for the modern era.
          </p>
          <div className="w-12 h-[1px] bg-mutedGold mx-auto mb-12" />
          <p className="font-body text-base text-deepBlue/70 leading-loose font-light">
            Our atelier model ensures that every piece is given the utmost attention. Master artisans, some of whom have perfected their craft for over forty years, spend hundreds of hours setting ethically sourced stones into precise geometric and fluid forms. This dedication to excellence is what defines the SBJ signature.
          </p>
        </Reveal>
      </section>

    </main>
  );
}
