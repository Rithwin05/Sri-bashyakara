import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import GoldDust from "@/components/GoldDust";
import { COLLECTIONS } from "@/lib/data/collections";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-deepBlue" />
});

// Using TempleScene as a pedestal showcase instead of literal temple
const PedestalScene = dynamic(() => import("@/components/3d/TempleScene"), {
  ssr: false
});

const HERO_IMG = "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/h2hwamgm_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_47%20PM.png";
const MINIMAL_IMG = "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/eayhc24a_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_45%20PM.png";
const MODERN_IMG = "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/e43952ag_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_42%20PM.png";

const ATELIER_FEATURES = [
  { num: "01", title: "Uncompromising Sourcing", body: "We source only the rarest gems, prioritizing ethical origins and spectacular clarity." },
  { num: "02", title: "Avant-Garde Design", body: "Blending classic elegance with bold, modern silhouettes for the contemporary wearer." },
  { num: "03", title: "Master Craftsmanship", body: "Every piece is sculpted by master artisans who have perfected their discipline over decades." },
];

export default function Home() {
  const collections = COLLECTIONS.map(c => ({
    ...c,
    cover: c.pieces[0].image
  }));

  return (
    <main data-testid="home-page" className="relative bg-crispWhite">
      
      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-deepBlue">
        <GoldDust count={30} />
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-deepBlue via-deepBlue/80 to-transparent" />

        <div className="relative z-10 max-w-[1500px] w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <Reveal delay={0}>
              <p className="font-body text-xs tracking-[0.25em] text-mutedGold uppercase mb-6 font-medium">
                The House of Sri Bhashyakara
              </p>
            </Reveal>
            <Reveal delay={150}>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-[7rem] text-white leading-[1.05] tracking-[-0.01em]">
                Elevating <br/>
                <em className="italic text-mutedGold font-light">modern luxury.</em>
              </h1>
            </Reveal>
            <Reveal delay={400}>
              <p className="font-body text-white/80 text-base md:text-lg mt-8 max-w-xl leading-relaxed font-light">
                Discover a world of meticulously crafted jewellery. We blend heritage with contemporary design to create pieces that transcend time.
              </p>
            </Reveal>
            <Reveal delay={650}>
              <div className="flex flex-wrap gap-5 mt-12">
                <Link href="/shop" className="btn-gold flex items-center gap-2">
                  Explore Collections <ArrowRight size={16} />
                </Link>
                <Link href="/about" className="btn-ghost-gold">
                  Our Philosophy
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="marquee py-5 border-y border-mutedGold/20 bg-pastelAccent">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-12 px-6">
              {["Timeless Elegance", "Modern Luxury", "Unparalleled Craftsmanship", "Sri Bhashyakara", "Curated Collections", "Bespoke Design"].map((t, i) => (
                <span key={i} className="flex items-center gap-12">
                  <span className="font-body text-xs tracking-[0.3em] uppercase text-deepBlue font-medium">{t}</span>
                  <span className="text-mutedGold/60 text-xs">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ MANIFESTO ============ */}
      <section className="relative py-32 md:py-48 px-6 lg:px-12 bg-crispWhite">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 relative">
          <Reveal className="md:col-span-4 md:sticky md:top-32 self-start">
            <div className="font-body text-xs tracking-widest text-mutedGold uppercase mb-4 font-medium">Philosophy</div>
            <div className="w-16 h-[1px] bg-mutedGold mb-10" />
            <p className="font-body text-sm tracking-[0.2em] text-deepBlue/50 leading-loose uppercase">
              Vision<br />
              Precision<br />
              Excellence<br />
              Innovation
            </p>
          </Reveal>
          <Reveal delay={150} className="md:col-span-8">
            <h2 className="font-heading text-4xl md:text-6xl text-deepBlue leading-[1.2] mb-10">
              We design for the <em className="italic text-mutedGold font-light">modern connoisseur</em>.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-body text-deepBlue/70 text-base leading-relaxed mt-12">
              <p>
                At Sri Bhashyakara, we believe luxury should be an intimate experience. We discard mass production in favor of absolute exclusivity, ensuring every piece is a unique masterpiece.
              </p>
              <p>
                Our collections are curated for individuals who appreciate the delicate balance between bold, contemporary aesthetics and timeless elegance.
              </p>
            </div>
            <div className="mt-16">
              <Link href="/about" className="font-body text-xs uppercase tracking-[0.2em] text-mutedGold hover:text-deepBlue transition-colors flex items-center gap-2">
                Discover Our Heritage <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PEDESTAL SHOWCASE ============ */}
      <section className="relative min-h-screen py-32 px-6 lg:px-12 overflow-hidden bg-pastelAccent">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
          <PedestalScene />
        </div>
        <div className="relative z-10 max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <div className="font-body text-xs tracking-widest text-mutedGold uppercase mb-6 font-medium">Highlight</div>
            <h2 className="font-heading text-5xl md:text-7xl text-deepBlue leading-[1.1]">
              The <em className="italic text-mutedGold font-light">Aura</em> Collection.
            </h2>
            <p className="font-body text-deepBlue/70 mt-8 leading-relaxed max-w-md">
              A striking exploration of form and light. The Aura collection features crisp, architectural lines studded with ethically sourced brilliant-cut diamonds.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 mt-12 font-body text-[11px] tracking-[0.2em] uppercase text-deepBlue group hover:text-mutedGold transition-colors"
            >
              Shop The Collection <ChevronRight size={16} className="group-hover:translate-x-1 transition" />
            </Link>
          </Reveal>
          <Reveal delay={200} className="lg:col-span-7 relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
              <img
                src={MINIMAL_IMG}
                alt="Minimalist Aura Collection Necklace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deepBlue/90 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="font-body text-xs text-mutedGold uppercase tracking-widest mb-2">Aura Pendant</div>
                <p className="font-heading text-2xl text-white">Architectural elegance.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CURATED GALLERY ============ */}
      <section className="relative py-32 px-6 lg:px-12 bg-crispWhite">
        <div className="max-w-[1500px] mx-auto">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <div className="font-body text-xs tracking-widest text-mutedGold uppercase mb-4 font-medium">Curated</div>
              <h2 className="font-heading text-4xl md:text-6xl text-deepBlue leading-tight">
                New <em className="italic text-mutedGold font-light">Arrivals</em>.
              </h2>
            </div>
            <Link href="/shop" className="font-body text-xs tracking-[0.2em] text-deepBlue uppercase hover:text-mutedGold transition-colors flex items-center gap-2">
              View All <ArrowRight size={14} />
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: HERO_IMG, name: "Soleil Diamond Ring", price: "$4,200", tag: "New" },
              { img: MODERN_IMG, name: "Lumiere Drop Earrings", price: "$3,800", tag: "Exclusive" },
              { img: MINIMAL_IMG, name: "Crimson Velvet Cuff", price: "$8,500", tag: "Signature" }
            ].map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <Link href={`/product/${i}`} className="block group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-pastelAccent mb-6">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105" />
                    <div className="absolute top-4 left-4 bg-deepBlue text-white font-body text-[9px] uppercase tracking-widest px-3 py-1">
                      {p.tag}
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl text-deepBlue mb-2">{p.name}</h3>
                  <p className="font-body text-sm text-deepBlue/60">{p.price}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ATELIER ============ */}
      <section className="relative py-32 px-6 lg:px-12 bg-deepBlue text-white">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <Reveal className="md:col-span-5 md:sticky md:top-32 self-start">
            <div className="font-body text-xs tracking-widest text-mutedGold uppercase mb-4 font-medium">The Atelier</div>
            <h2 className="font-heading text-4xl md:text-6xl leading-[1.2]">
              Uncompromising <em className="italic text-mutedGold font-light">Excellence</em>.
            </h2>
            <p className="font-body text-white/70 mt-8 leading-relaxed max-w-md font-light">
              We operate an exclusive atelier model. By bypassing traditional retail chains, we maintain absolute control over quality, from the first sketch to the final polish.
            </p>
          </Reveal>
          <div className="md:col-span-6 md:col-start-7 space-y-16">
            {ATELIER_FEATURES.map((s, i) => (
              <Reveal key={s.num} delay={i * 100}>
                <div className="grid grid-cols-12 gap-6 items-start border-b border-mutedGold/20 pb-12">
                  <span className="col-span-2 font-display text-2xl text-mutedGold font-light">{s.num}</span>
                  <div className="col-span-10">
                    <h3 className="font-heading text-2xl text-white mb-3">{s.title}</h3>
                    <p className="font-body text-white/60 leading-relaxed font-light">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONCIERGE ============ */}
      <section className="relative py-32 px-6 lg:px-12 bg-pastelAccent">
        <div className="max-w-[1300px] mx-auto text-center">
          <Reveal>
            <div className="font-body text-xs tracking-widest text-mutedGold uppercase mb-6 font-medium">Private Appointments</div>
            <h2 className="font-heading text-4xl md:text-6xl text-deepBlue leading-tight max-w-2xl mx-auto">
              Experience our collections <em className="italic text-mutedGold font-light">in person</em>.
            </h2>
            <p className="font-body text-deepBlue/70 mt-8 max-w-xl mx-auto leading-relaxed">
              Book a private consultation at our flagship boutique. Discover our latest creations with the guidance of a dedicated jewellery specialist.
            </p>
            <div className="flex flex-wrap justify-center gap-5 mt-12">
              <Link href="/contact" className="btn-gold">
                Book an Appointment
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
