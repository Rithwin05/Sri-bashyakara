import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import GoldDust from "@/components/GoldDust";
import { whatsappUrl, SBJ_ADDRESS } from "@/lib/api";
import { COLLECTIONS } from "@/lib/data/collections";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0A0A0A]" />
});

const TempleScene = dynamic(() => import("@/components/3d/TempleScene"), {
  ssr: false
});

const HERO_IMG = "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/h2hwamgm_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_47%20PM.png";
const RUBY_IMG = "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/eayhc24a_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_45%20PM.png";
const EMERALD_IMG = "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/e43952ag_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_42%20PM.png";

const CRAFT_STEPS = [
  { num: "I", title: "The Sketch", body: "Every piece begins on hand-drawn paper — twenty-eight generations of motifs answering a single bride's request." },
  { num: "II", title: "The Mould", body: "Wax models are cast in lost-wax: the only way the tiniest peacock feather survives the fire." },
  { num: "III", title: "The Setting", body: "Stones are seated by hand under candle-grade light, one at a time, by the same karigar who began the piece." },
  { num: "IV", title: "The Blessing", body: "Before leaving the atelier, each set is blessed at the family shrine — a private ritual we have not skipped in forty years." },
];

export default function Home() {
  const collections = COLLECTIONS.map(c => ({
    ...c,
    cover: c.pieces[0].image
  }));

  return (
    <main data-testid="home-page" className="relative">
      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        <GoldDust count={50} />
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>
        <div className="absolute inset-0 z-[1] pointer-events-none"
             style={{ background: "radial-gradient(ellipse at 70% 50%, transparent 0%, rgba(10,10,10,0.5) 60%, #0A0A0A 100%)" }} />

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Reveal delay={0}>
              <p
                className="overline mb-6"
                data-testid="hero-overline"
              >
                The House of Sri Bhashyakara · Est. Hyderabad
              </p>
            </Reveal>
            <Reveal delay={150}>
              <h1
                className="font-heading text-5xl md:text-7xl lg:text-[7.5rem] text-[#F9F9F7] leading-[0.95] tracking-[-0.02em]"
                data-testid="hero-title"
              >
                Where jewellery <br/>
                <em className="not-italic gold-shimmer">becomes legacy.</em>
              </h1>
            </Reveal>
            <Reveal delay={400}>
              <p
                className="font-body text-[#A3A3A3] text-base md:text-lg mt-8 max-w-xl leading-relaxed"
              >
                A cinematic heritage jewellery house — concierge-led, generationally crafted, and rooted in the
                sacred geometry of South Indian temples.
              </p>
            </Reveal>
            <Reveal delay={650}>
              <div
                className="flex flex-wrap gap-4 mt-12"
              >
                <Link href="/bridal-journey" data-testid="hero-bridal-cta" className="btn-gold">
                  Begin Your Bridal Journey
                </Link>
                <Link href="/reserve" data-testid="hero-reserve-cta" className="btn-ghost-gold">
                  Reserve a Private Viewing
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <span className="font-display text-[10px] tracking-[0.4em] text-[#C9973A]/70">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#C9973A] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="marquee py-4" data-testid="manifesto-marquee">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-12 px-6">
              {["Cinematic Heritage", "Temple Jewellery", "Bridal Constellation", "Hyderabad · Est. Jubilee Hills", "Concierge-Led Atelier", "Where Tradition Becomes Timeless"].map((t, i) => (
                <span key={i} className="flex items-center gap-12">
                  <span className="font-display text-[11px] tracking-[0.4em] uppercase text-[#C9973A]">{t}</span>
                  <span className="text-[#C9973A]/40">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ MANIFESTO ============ */}
      <section className="relative py-32 md:py-48 px-6 lg:px-12 overflow-hidden" data-testid="manifesto-section">
        <GoldDust count={25} />
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 relative">
          <Reveal className="md:col-span-4 md:sticky md:top-32 self-start">
            <div className="overline mb-4">The Manifesto</div>
            <div className="hairline mb-8" />
            <p className="font-display text-xs tracking-[0.3em] text-[#A3A3A3] leading-loose">
              I · INTRIGUE<br />
              II · AWE<br />
              III · HERITAGE<br />
              IV · BRIDAL<br />
              V · PRESTIGE<br />
              VI · LEGACY
            </p>
          </Reveal>
          <Reveal delay={150} className="md:col-span-8 md:col-start-5">
            <h2 className="font-heading text-4xl md:text-6xl text-[#F9F9F7] leading-tight mb-10 tracking-tight">
              We do not sell jewellery. <br/>
              <em className="not-italic text-[#C9973A]">We hold the moments</em> that become<br/>
              the family&apos;s <em className="italic">first stories</em>.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-body text-[#A3A3A3] text-base leading-relaxed mt-12">
              <p>
                Sri Bhashyakara is a house — not a store. We have been hand-setting stones for South Indian families
                across three generations, and the jewellery we make is meant to be inherited, not consumed.
              </p>
              <p>
                When a bride visits us, the showroom closes. We meet with her family, hear the wedding story,
                and only then begin to sketch. Every piece leaves our atelier blessed at the family shrine.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ TEMPLE UNIVERSE ============ */}
      <section
        className="relative min-h-screen py-32 px-6 lg:px-12 overflow-hidden"
        data-testid="temple-universe-section"
        style={{ background: "radial-gradient(ellipse at center, #15192d 0%, #0A0A0A 70%)" }}
      >
        <div className="absolute inset-0 z-0 opacity-90">
          <TempleScene />
        </div>
        <div className="absolute inset-0 z-[1] pointer-events-none"
             style={{ background: "linear-gradient(180deg, #0A0A0A 0%, transparent 20%, transparent 80%, #0A0A0A 100%)" }} />
        <div className="relative z-10 max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <div className="overline mb-6">Signature World</div>
            <h2 className="font-heading text-5xl md:text-7xl text-[#F9F9F7] leading-[0.95] tracking-tight">
              The Temple of <em className="not-italic gold-shimmer">Heritage</em>.
            </h2>
            <p className="font-body text-[#A3A3A3] mt-8 leading-relaxed max-w-md">
              Lakshmi pendants. Peacock harams. Carved kadas. The pieces in this world are guarded by the goddess herself —
              each one designed to be worn the morning of the muhurtham.
            </p>
            <Link
              href="/collection/temple"
              data-testid="temple-explore-cta"
              className="inline-flex items-center gap-3 mt-10 font-display text-[11px] tracking-[0.32em] uppercase text-[#C9973A] group"
            >
              Enter the Temple <ChevronRight size={14} className="group-hover:translate-x-1 transition" />
            </Link>
          </Reveal>
          <Reveal delay={200} className="lg:col-span-7 relative">
            <div
              className="relative aspect-[4/5] overflow-hidden"
              style={{ boxShadow: "0 60px 120px -40px rgba(201,151,58,0.35)" }}
            >
              <img
                src={HERO_IMG}
                alt="Temple jewellery — Lakshmi pendant haram with peacock motifs"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0"
                   style={{ background: "linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.85) 100%)" }} />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="overline mb-2">Lakshmi Pendant Haaram</div>
                <p className="font-heading italic text-2xl text-[#F9F9F7]">An ensemble guarded by twin peacocks.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ COLLECTION WORLDS ============ */}
      <section className="relative py-32 px-6 lg:px-12" data-testid="worlds-section">
        <div className="max-w-[1500px] mx-auto">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <div>
              <div className="overline mb-4">The Five Worlds</div>
              <h2 className="font-heading text-4xl md:text-6xl text-[#F9F9F7] leading-tight tracking-tight">
                Each collection is its own <em className="not-italic text-[#C9973A]">atmosphere</em>.
              </h2>
            </div>
            <p className="font-body text-[#A3A3A3] max-w-sm leading-relaxed">
              Enter a world — and the room around it changes. Light, scent, sound, jewellery: all curated to one mood.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {collections.map((c, i) => (
              <Reveal
                key={c.slug}
                delay={i * 100}
                className={`group ${i % 2 === 0 ? "md:col-span-7" : "md:col-span-5"} ${i > 0 ? "md:mt-12" : ""}`}
              >
                <Link href={`/collection/${c.slug}`} data-testid={`world-card-${c.slug}`} className="block relative overflow-hidden">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={c.cover}
                      alt={c.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-80"
                         style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.85) 100%)" }} />
                    <div className="absolute top-6 left-6 right-6 flex items-center gap-2">
                      <span className="w-6 h-px" style={{ background: c.accent }} />
                      <span className="font-display text-[10px] tracking-[0.32em] uppercase" style={{ color: c.accent }}>
                        World {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="font-heading text-3xl md:text-4xl text-[#F9F9F7] leading-none mb-3">{c.name}</h3>
                      <p className="font-body text-sm text-[#A3A3A3] italic">{c.tagline}</p>
                      <span className="inline-flex items-center gap-2 mt-5 font-display text-[10px] tracking-[0.32em] uppercase text-[#C9973A]">
                        Enter <ChevronRight size={12} className="group-hover:translate-x-1 transition" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FLOATING MUSEUM (horizontal) ============ */}
      <section
        className="relative py-32 overflow-hidden"
        data-testid="museum-section"
        style={{ background: "linear-gradient(180deg, #0A0A0A, #0B132B 50%, #0A0A0A)" }}
      >
        <GoldDust count={30} />
        <Reveal className="max-w-[1500px] mx-auto px-6 lg:px-12 mb-16">
          <div className="overline mb-4">The Floating Museum</div>
          <h2 className="font-heading text-4xl md:text-6xl text-[#F9F9F7] leading-tight max-w-3xl tracking-tight">
            Featured artifacts, suspended in <em className="not-italic gold-shimmer">candle light</em>.
          </h2>
        </Reveal>

        <div className="flex gap-8 overflow-x-auto pb-8 px-6 lg:px-12 no-scrollbar snap-x snap-mandatory" data-testid="museum-track">
          {[
            { img: HERO_IMG, name: "Lakshmi Pendant Haaram", world: "Temple of Heritage", price: "On enquiry" },
            { img: EMERALD_IMG, name: "Emerald Cascade Haaram", world: "Emerald Chamber", price: "On enquiry" },
            { img: RUBY_IMG, name: "Carved Lakshmi Kada", world: "Temple of Heritage", price: "On enquiry" },
            { img: EMERALD_IMG, name: "Panna Vine Choker", world: "Emerald Chamber", price: "On enquiry" },
            { img: HERO_IMG, name: "Sankalpa Bridal Set", world: "Bridal Constellation", price: "On enquiry" },
            { img: RUBY_IMG, name: "Ruby Halo Cuff", world: "Modern Aura", price: "On enquiry" },
          ].map((p, i) => (
            <div
              key={i}
              data-testid={`museum-card-${i}`}
              className="snap-center flex-none w-[78vw] sm:w-[420px] group"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-[#0B132B]"
                   style={{ boxShadow: "0 40px 80px -30px rgba(201,151,58,0.25)" }}>
                <img src={p.img} alt={p.name} loading="lazy"
                     className="w-full h-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-105" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2">
                  <Sparkles size={12} className="text-[#C9973A]" />
                  <span className="font-display text-[9px] tracking-[0.3em] uppercase text-[#C9973A]">{p.world}</span>
                </div>
              </div>
              <div className="mt-5">
                <h4 className="font-heading text-2xl text-[#F9F9F7] leading-tight">{p.name}</h4>
                <p className="font-display text-[10px] tracking-[0.3em] uppercase text-[#A3A3A3] mt-2">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CRAFTSMANSHIP ============ */}
      <section className="relative py-32 px-6 lg:px-12" data-testid="craftsmanship-section">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <Reveal className="md:col-span-5 md:sticky md:top-32 self-start">
            <div className="overline mb-4">The Atelier · Four Quiet Steps</div>
            <h2 className="font-heading text-4xl md:text-6xl text-[#F9F9F7] leading-tight tracking-tight">
              A piece takes <em className="not-italic text-[#C9973A]">a hundred days</em>. Sometimes longer.
            </h2>
            <p className="font-body text-[#A3A3A3] mt-8 leading-relaxed max-w-md">
              The same karigar carries a piece from sketch to blessing. We do not outsource. We do not mass-produce.
              We do not begin a second piece until the first is finished.
            </p>
          </Reveal>
          <div className="md:col-span-7 md:col-start-6 space-y-16">
            {CRAFT_STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 100}>
                <div className="grid grid-cols-12 gap-6 items-start border-b border-[#C9973A]/15 pb-12">
                  <span className="col-span-2 font-display text-3xl text-[#C9973A]">{s.num}</span>
                  <div className="col-span-10">
                    <h3 className="font-heading text-3xl text-[#F9F9F7] mb-3">{s.title}</h3>
                    <p className="font-body text-[#A3A3A3] leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BRIDAL CONSTELLATION TEASER ============ */}
      <section
        className="relative py-32 md:py-48 px-6 lg:px-12 overflow-hidden"
        data-testid="bridal-teaser-section"
        style={{ background: "radial-gradient(ellipse at top, #1a1d36 0%, #0A0A0A 70%)" }}
      >
        <GoldDust count={50} />
        {/* faux stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 80 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-[#F9F9F7]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                opacity: 0.2 + Math.random() * 0.6,
                boxShadow: "0 0 4px rgba(255,255,255,0.6)",
              }}
            />
          ))}
        </div>
        <div className="relative z-10 max-w-[1300px] mx-auto text-center">
          <Reveal>
            <div className="overline mb-6">The Bridal Constellation</div>
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl text-[#F9F9F7] leading-[0.95] tracking-tight">
              Every bride is her own <br/><em className="not-italic gold-shimmer">galaxy</em>.
            </h2>
            <p className="font-body text-[#A3A3A3] mt-10 max-w-xl mx-auto leading-relaxed">
              Tell us your wedding month and your mother&apos;s saree colour — and we will sketch a constellation
              of jewellery designed for the morning of, the muhurtham, and the reception.
            </p>
            <Link href="/bridal-journey" data-testid="bridal-cta-2" className="btn-gold mt-12 inline-block">
              Begin Your Bridal Journey
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ CONCIERGE INVITATION ============ */}
      <section className="relative py-32 px-6 lg:px-12" data-testid="concierge-section">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-6">
            <div className="overline mb-4">An Invitation</div>
            <h2 className="font-heading text-4xl md:text-6xl text-[#F9F9F7] leading-tight tracking-tight">
              Begin your <em className="not-italic text-[#C9973A]">private experience</em>.
            </h2>
            <p className="font-body text-[#A3A3A3] mt-8 leading-relaxed max-w-md">
              Speak with an SBJ advisor. No catalogue, no pressure — only a conversation about what you love
              and what your family already wears.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href={whatsappUrl("Hello SBJ — I would like to begin my private experience.")}
                target="_blank"
                rel="noreferrer"
                data-testid="concierge-whatsapp-link"
                className="btn-gold"
              >
                Speak With An Advisor
              </a>
              <Link href="/reserve" data-testid="concierge-reserve-link" className="btn-ghost-gold">
                Reserve A Private Viewing
              </Link>
            </div>
          </Reveal>
          <Reveal delay={200} className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden"
                 style={{ boxShadow: "0 60px 120px -40px rgba(201,151,58,0.3)" }}>
              <img src={RUBY_IMG} alt="Ruby gold heritage bangle" className="w-full h-full object-cover" />
              <div className="absolute inset-0"
                   style={{ background: "linear-gradient(0deg, rgba(10,10,10,0.7) 0%, transparent 50%)" }} />
              <div className="absolute bottom-6 left-6">
                <div className="overline">Carved Lakshmi Kada</div>
                <p className="font-heading italic text-2xl text-[#F9F9F7] mt-1">Forty days. One karigar.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ SHOWROOM REVEAL ============ */}
      <section className="relative py-32 px-6 lg:px-12" data-testid="showroom-section"
               style={{ background: "linear-gradient(180deg, #0A0A0A, #0B132B)" }}>
        <div className="max-w-[1500px] mx-auto">
          <Reveal className="text-center mb-16">
            <div className="overline mb-4">The Showroom</div>
            <h2 className="font-heading text-4xl md:text-6xl text-[#F9F9F7] leading-tight tracking-tight">
              The cinematic world <em className="not-italic text-[#C9973A]">continues in person</em>.
            </h2>
          </Reveal>
          <Reveal delay={150} className="text-center">
            <p className="font-heading italic text-3xl md:text-4xl text-[#F9F9F7] max-w-3xl mx-auto leading-snug">
              {SBJ_ADDRESS}
            </p>
            <div className="hairline mx-auto my-10" />
            <Link href="/showroom" data-testid="visit-showroom-link" className="btn-ghost-gold inline-block">
              Plan Your Visit
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
