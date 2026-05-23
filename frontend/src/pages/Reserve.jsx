import { useState } from "react";
import { Check } from "lucide-react";
import { postReservation, whatsappUrl } from "@/lib/api";
import GoldDust from "@/components/GoldDust";
import Reveal from "@/components/Reveal";

const COLLECTIONS = [
  "The Temple of Heritage",
  "The Emerald Chamber",
  "The Bridal Constellation",
  "The House of Pearls",
  "The Modern Aura",
  "Undecided · Surprise me",
];

export default function Reserve() {
  const [form, setForm] = useState({
    full_name: "", phone: "", email: "",
    preferred_date: "", preferred_time: "", party_size: 2,
    occasion: "", collection_interest: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await postReservation({
        ...form,
        party_size: Number(form.party_size) || 1,
        email: form.email || null,
        preferred_date: form.preferred_date || null,
        preferred_time: form.preferred_time || null,
        occasion: form.occasion || null,
        collection_interest: form.collection_interest || null,
        message: form.message || null,
      });
      setDone(true);
    } catch (err) {
      console.error(err);
      alert("Could not send the reservation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      data-testid="reserve-page"
      className="relative min-h-screen pt-32 pb-20 px-6 lg:px-12 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A0A0A 0%, #0B132B 100%)" }}
    >
      <GoldDust count={30} />
      <div className="relative z-10 max-w-[1100px] mx-auto">
        <Reveal>
          <div className="overline mb-4">A Private Reservation</div>
          <h1 className="font-heading text-5xl md:text-7xl text-[#F9F9F7] leading-[0.95] tracking-tight">
            Reserve a <em className="not-italic gold-shimmer">private viewing</em>.
          </h1>
          <p className="font-body text-[#A3A3A3] mt-6 max-w-xl leading-relaxed">
            The showroom closes for you. Tell us the occasion and the world you wish to enter — and we will
            arrange tea, the karigar, and the pieces you have come to see.
          </p>
        </Reveal>

        {done ? (
          <div className="mt-20 text-center py-20" data-testid="reserve-done">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#C9973A] mb-8">
              <Check size={28} className="text-[#C9973A]" />
            </div>
            <h2 className="font-heading text-3xl md:text-5xl text-[#F9F9F7] mb-4">Your viewing is being prepared.</h2>
            <p className="font-body text-[#A3A3A3] max-w-md mx-auto leading-relaxed">
              The concierge will confirm your date within working hours.
            </p>
            <a
              href={whatsappUrl(`Hello SBJ — I just reserved a private viewing (${form.full_name}).`)}
              target="_blank" rel="noreferrer"
              data-testid="reserve-done-whatsapp"
              className="btn-gold inline-block mt-10"
            >
              Continue On WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8" data-testid="reserve-form">
            <div>
              <label className="overline block mb-2">Your name</label>
              <input data-testid="reserve-name" className="editorial-input" required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} placeholder="Anjali Reddy" />
            </div>
            <div>
              <label className="overline block mb-2">Phone (with country code)</label>
              <input data-testid="reserve-phone" className="editorial-input" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 90000 00000" />
            </div>
            <div>
              <label className="overline block mb-2">Email · optional</label>
              <input type="email" data-testid="reserve-email" className="editorial-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            </div>
            <div>
              <label className="overline block mb-2">Party size</label>
              <input type="number" min={1} max={12} data-testid="reserve-party-size" className="editorial-input" value={form.party_size} onChange={(e) => setForm({ ...form, party_size: e.target.value })} />
            </div>
            <div>
              <label className="overline block mb-2">Preferred date</label>
              <input type="date" data-testid="reserve-date" className="editorial-input" value={form.preferred_date} onChange={(e) => setForm({ ...form, preferred_date: e.target.value })} />
            </div>
            <div>
              <label className="overline block mb-2">Preferred time</label>
              <input type="time" data-testid="reserve-time" className="editorial-input" value={form.preferred_time} onChange={(e) => setForm({ ...form, preferred_time: e.target.value })} />
            </div>
            <div>
              <label className="overline block mb-2">Occasion</label>
              <input data-testid="reserve-occasion" className="editorial-input" value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })} placeholder="Bridal · Anniversary · Heirloom" />
            </div>
            <div>
              <label className="overline block mb-2">World of interest</label>
              <select
                data-testid="reserve-collection"
                className="editorial-input"
                value={form.collection_interest}
                onChange={(e) => setForm({ ...form, collection_interest: e.target.value })}
                style={{ color: form.collection_interest ? "#F9F9F7" : "rgba(243,243,240,0.3)" }}
              >
                <option value="" style={{ background: "#0B132B" }}>Select a world</option>
                {COLLECTIONS.map((c) => <option key={c} value={c} style={{ background: "#0B132B", color: "#F9F9F7" }}>{c}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="overline block mb-2">A note to the concierge · optional</label>
              <textarea
                rows={3}
                data-testid="reserve-message"
                className="editorial-input resize-none"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Will be visiting from Dallas, prefer evening hours."
              />
            </div>
            <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-[#C9973A]/15">
              <p className="font-body text-xs text-[#A3A3A3] max-w-md">
                Reservations are confirmed by our concierge in person. We do not share details with third parties.
              </p>
              <button type="submit" disabled={submitting} data-testid="reserve-submit" className="btn-gold disabled:opacity-40">
                {submitting ? "Sending…" : "Reserve The Viewing"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
