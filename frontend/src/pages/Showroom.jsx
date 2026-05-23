import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, ChevronRight } from "lucide-react";
import { SBJ_ADDRESS, SBJ_PHONE_DISPLAY, whatsappUrl } from "@/lib/api";
import GoldDust from "@/components/GoldDust";
import Reveal from "@/components/Reveal";

const RUBY_IMG = "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/eayhc24a_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_45%20PM.png";
const HERO_IMG = "https://customer-assets.emergentagent.com/job_89bdb731-09ba-4714-b1da-795d63177d28/artifacts/h2hwamgm_ChatGPT%20Image%20May%2023%2C%202026%2C%2001_32_47%20PM.png";

export default function Showroom() {
  return (
    <main
      data-testid="showroom-page"
      className="relative min-h-screen pt-32 pb-20 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at top, #0B132B 0%, #0A0A0A 70%)" }}
    >
      <GoldDust count={40} />

      <section className="relative z-10 px-6 lg:px-12 max-w-[1500px] mx-auto">
        <Reveal>
          <div className="overline mb-4">The Showroom</div>
          <h1 className="font-heading text-5xl md:text-7xl text-[#F9F9F7] leading-[0.95] tracking-tight max-w-4xl">
            The cinematic world continues <em className="not-italic gold-shimmer">in person</em>.
          </h1>
        </Reveal>
      </section>

      <section className="relative z-10 px-6 lg:px-12 max-w-[1500px] mx-auto mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <Reveal className="lg:col-span-7">
          <div className="relative aspect-[16/11] overflow-hidden"
               style={{ boxShadow: "0 60px 120px -40px rgba(201,151,58,0.3)" }}>
            <img src={HERO_IMG} alt="SBJ Showroom — Jubilee Hills" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.85) 100%)" }} />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="overline mb-2">Jubilee Hills · Hyderabad</div>
              <p className="font-heading italic text-2xl text-[#F9F9F7]">A doorway opened, the world reduced to the room.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-5">
          <div className="space-y-10">
            <div>
              <div className="overline mb-3 flex items-center gap-2"><MapPin size={12} /> Address</div>
              <p className="font-heading text-2xl text-[#F9F9F7] leading-snug">{SBJ_ADDRESS}</p>
              <a
                href="https://maps.google.com/?q=Sri+Bhashyakara+Jewellery+Jubilee+Hills+Hyderabad"
                target="_blank" rel="noreferrer"
                data-testid="showroom-maps-link"
                className="inline-flex items-center gap-2 font-display text-[10px] tracking-[0.3em] uppercase text-[#C9973A] mt-4"
              >
                Open in Maps <ChevronRight size={12} />
              </a>
            </div>

            <div>
              <div className="overline mb-3 flex items-center gap-2"><Phone size={12} /> Concierge Line</div>
              <p className="font-heading text-2xl text-[#F9F9F7]">{SBJ_PHONE_DISPLAY}</p>
            </div>

            <div>
              <div className="overline mb-3 flex items-center gap-2"><Clock size={12} /> Visiting Hours</div>
              <p className="font-body text-[#A3A3A3] leading-relaxed">
                Daily · 11:00 AM – 8:30 PM (IST)<br />
                Private viewings by appointment only — the showroom closes for your family.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/reserve" data-testid="showroom-reserve-btn" className="btn-gold">Reserve A Viewing</Link>
              <a href={whatsappUrl("Hello SBJ — I would like to plan a showroom visit.")} target="_blank" rel="noreferrer"
                 data-testid="showroom-whatsapp-btn" className="btn-ghost-gold">
                Speak With An Advisor
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Showroom story */}
      <section className="relative z-10 px-6 lg:px-12 max-w-[1300px] mx-auto mt-32 grid grid-cols-1 md:grid-cols-12 gap-12">
        <Reveal className="md:col-span-4">
          <div className="overline mb-4">Inside The Showroom</div>
          <div className="hairline mb-8" />
          <p className="font-display text-xs tracking-[0.3em] uppercase text-[#C9973A] leading-loose">
            I · THE WELCOME<br />
            II · THE TEA<br />
            III · THE PIECES<br />
            IV · THE BLESSING
          </p>
        </Reveal>
        <Reveal delay={150} className="md:col-span-8 space-y-12">
          {[
            { num: "I", title: "The Welcome", body: "You are received by name. The doors close. The conversation begins with the wedding — not the jewellery." },
            { num: "II", title: "The Tea", body: "Filter coffee or masala chai is offered. Stones are not touched until your family has settled." },
            { num: "III", title: "The Pieces", body: "Only the pieces matched to your aesthetic are brought out, one tray at a time, under candle-grade light." },
            { num: "IV", title: "The Blessing", body: "When you decide, the piece is set aside and blessed at our family shrine before it is finished for you." },
          ].map((s) => (
            <div key={s.num} className="grid grid-cols-12 gap-6 border-b border-[#C9973A]/15 pb-10">
              <span className="col-span-2 font-display text-3xl text-[#C9973A]">{s.num}</span>
              <div className="col-span-10">
                <h3 className="font-heading text-3xl text-[#F9F9F7] mb-3">{s.title}</h3>
                <p className="font-body text-[#A3A3A3] leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>
    </main>
  );
}
