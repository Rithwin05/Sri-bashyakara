import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { getCollection, whatsappUrl } from "@/lib/api";
import GoldDust from "@/components/GoldDust";
import Reveal from "@/components/Reveal";

const ATMOSPHERES = {
  "carved-pillars": "radial-gradient(ellipse at top, #1a1816 0%, #0A0A0A 70%)",
  "emerald-mist":   "radial-gradient(ellipse at center, #122621 0%, #0A0A0A 70%)",
  "starfield":      "radial-gradient(ellipse at top, #1a1d36 0%, #0A0A0A 70%)",
  "moonlight":      "radial-gradient(ellipse at center, #1d1d2a 0%, #0A0A0A 70%)",
  "minimal":        "linear-gradient(180deg, #0A0A0A, #111111)",
};

export default function CollectionWorld() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    setData(null);
    setActiveIdx(0);
    getCollection(slug)
      .then(setData)
      .catch(() => navigate("/", { replace: true }));
  }, [slug, navigate]);

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center" data-testid="collection-loading">
        <p className="overline">Loading the world…</p>
      </main>
    );
  }

  const active = data.pieces[activeIdx];

  return (
    <main
      data-testid={`collection-world-${slug}`}
      className="relative min-h-screen pt-32 pb-20 overflow-hidden"
      style={{ background: ATMOSPHERES[data.atmosphere] || ATMOSPHERES.minimal }}
    >
      <GoldDust count={40} />

      {/* HEADER */}
      <section className="relative z-10 px-6 lg:px-12 max-w-[1500px] mx-auto">
        <Reveal>
          <Link to="/" data-testid="back-home-link" className="inline-flex items-center gap-2 font-display text-[10px] tracking-[0.3em] uppercase text-[#A3A3A3] hover:text-[#C9973A] transition mb-12">
            <ChevronLeft size={14} /> Back to House
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20">
          <Reveal className="md:col-span-7">
            <div className="overline mb-6" style={{ color: data.accent }}>{data.mood}</div>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-[7rem] text-[#F9F9F7] leading-[0.95] tracking-tight">
              {data.name.split(" ").slice(0, -1).join(" ")} <em className="not-italic gold-shimmer">{data.name.split(" ").slice(-1)}</em>.
            </h1>
            <p className="font-heading italic text-xl md:text-2xl text-[#C9973A] mt-6">{data.tagline}</p>
          </Reveal>
          <Reveal delay={150} className="md:col-span-5 md:pt-10">
            <p className="font-body text-[#A3A3A3] leading-relaxed">{data.story}</p>
            <div className="hairline mt-8" />
          </Reveal>
        </div>
      </section>

      {/* FEATURED ARTIFACT (active) */}
      <section className="relative z-10 px-6 lg:px-12 max-w-[1500px] mx-auto mb-24" data-testid="featured-artifact">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-7">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16,1,0.3,1] }}
              className="relative aspect-[4/5] overflow-hidden"
              style={{ boxShadow: "0 60px 120px -40px rgba(201,151,58,0.3)" }}
            >
              <img src={active.image} alt={active.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.85) 100%)" }} />
            </motion.div>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5">
            <motion.div
              key={active.id + "-text"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: [0.16,1,0.3,1] }}
            >
              <div className="overline mb-4" style={{ color: data.accent }}>The Artifact · {active.id.toUpperCase()}</div>
              <h2 className="font-heading text-4xl md:text-5xl text-[#F9F9F7] leading-tight">{active.name}</h2>
              <p className="font-display text-[10px] tracking-[0.28em] uppercase text-[#C9973A] mt-4">{active.material}</p>
              <div className="hairline my-8" />
              <p className="font-heading italic text-xl md:text-2xl text-[#F9F9F7] leading-relaxed">{active.story}</p>

              <div className="flex flex-wrap gap-4 mt-10">
                <a
                  href={whatsappUrl(`Hello SBJ — I would like to enquire about ${active.name} from ${data.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`artifact-enquire-${active.id}`}
                  className="btn-gold"
                >
                  Enquire Privately
                </a>
                <Link to="/reserve" data-testid={`artifact-reserve-${active.id}`} className="btn-ghost-gold">
                  Reserve A Viewing
                </Link>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* PIECE SELECTOR */}
      <section className="relative z-10 px-6 lg:px-12 max-w-[1500px] mx-auto mb-24">
        <Reveal>
          <div className="flex items-center justify-between mb-8">
            <div className="overline">All Artifacts In This World</div>
            <span className="font-display text-[10px] tracking-[0.3em] uppercase text-[#A3A3A3]">
              {String(activeIdx + 1).padStart(2, "0")} / {String(data.pieces.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {data.pieces.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveIdx(i)}
              data-testid={`piece-tile-${p.id}`}
              className={`group text-left transition-all ${i === activeIdx ? "ring-1 ring-[#C9973A]" : ""}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={p.image} alt={p.name} loading="lazy"
                     className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0"
                     style={{ background: "linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.85) 100%)" }} />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="font-heading text-lg text-[#F9F9F7] leading-tight">{p.name}</p>
                  <p className="font-display text-[9px] tracking-[0.25em] uppercase text-[#C9973A]/80 mt-1">View artifact</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CONTINUE JOURNEY */}
      <section className="relative z-10 px-6 lg:px-12 max-w-[1500px] mx-auto pt-12 border-t border-[#C9973A]/15">
        <Reveal>
          <div className="overline mb-6">Continue Your Journey</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/bridal-journey" data-testid="continue-bridal" className="group">
              <div className="relative p-10 border border-[#C9973A]/20 hover:border-[#C9973A] transition-colors h-full">
                <h3 className="font-heading text-3xl text-[#F9F9F7] leading-tight">Tell us your wedding story.</h3>
                <p className="font-body text-[#A3A3A3] mt-4 text-sm">Begin the Bridal Journey questionnaire.</p>
                <span className="inline-flex items-center gap-2 mt-6 font-display text-[10px] tracking-[0.3em] uppercase text-[#C9973A]">
                  Begin <ChevronRight size={12} className="group-hover:translate-x-1 transition" />
                </span>
              </div>
            </Link>
            <Link to="/reserve" data-testid="continue-reserve" className="group">
              <div className="relative p-10 border border-[#C9973A]/20 hover:border-[#C9973A] transition-colors h-full">
                <h3 className="font-heading text-3xl text-[#F9F9F7] leading-tight">Reserve a private viewing.</h3>
                <p className="font-body text-[#A3A3A3] mt-4 text-sm">Hyderabad showroom · concierge appointments.</p>
                <span className="inline-flex items-center gap-2 mt-6 font-display text-[10px] tracking-[0.3em] uppercase text-[#C9973A]">
                  Reserve <ChevronRight size={12} className="group-hover:translate-x-1 transition" />
                </span>
              </div>
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
