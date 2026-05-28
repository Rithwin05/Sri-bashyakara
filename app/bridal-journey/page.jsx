"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { postConsultation, whatsappUrl } from "@/lib/api";
import GoldDust from "@/components/GoldDust";

const STEPS = [
  {
    key: "wedding_month",
    title: "When does the family gather?",
    sub: "Your wedding month — so we know which festivals will overlap.",
    options: ["This year", "Within 6 months", "6–12 months", "Over a year away", "Just exploring"],
  },
  {
    key: "aesthetic",
    title: "Which world does she walk in?",
    sub: "Aesthetic direction for the bridal ensemble.",
    options: ["Traditional · Temple", "Royal · Polki", "Emerald · Diamond", "Pearl · Modern", "Fusion"],
  },
  {
    key: "jewellery_focus",
    title: "What does she carry first?",
    sub: "The piece your family is searching for.",
    options: ["Full bridal set", "Temple necklace", "Emerald haaram", "Pearl ensemble", "Solitaire / Modern"],
  },
  {
    key: "is_nri",
    title: "Where shall we send the lookbook?",
    sub: "We coordinate with NRI families across the United States, UK, Singapore and the Gulf.",
    options: ["I am in India", "I am NRI · USA", "I am NRI · UK / EU", "I am NRI · Gulf / SG"],
  },
];

export default function BridalJourney() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ full_name: "", phone: "", email: "", family_notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const isContact = step === STEPS.length;
  const current = STEPS[step];

  const pickOption = (val) => {
    const isNRI = STEPS[step].key === "is_nri";
    setAnswers((a) => ({
      ...a,
      [STEPS[step].key]: val,
      ...(isNRI ? { is_nri: val !== "I am in India" } : {}),
    }));
    setTimeout(() => setStep((s) => s + 1), 350);
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        full_name: contact.full_name,
        phone: contact.phone,
        email: contact.email || null,
        wedding_month: answers.wedding_month || null,
        aesthetic: answers.aesthetic || null,
        jewellery_focus: answers.jewellery_focus || null,
        family_notes: contact.family_notes || null,
        is_nri: !!answers.is_nri,
      };
      await postConsultation(payload);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert("Something interrupted the conversation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      data-testid="bridal-journey-page"
      className="relative min-h-screen pt-32 pb-20 px-6 lg:px-12 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at top, #1a1d36 0%, #0A0A0A 70%)" }}
    >
      <GoldDust count={50} />

      {/* faux starfield */}
      <div className="absolute inset-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <span key={i} className="absolute rounded-full bg-[#F9F9F7]"
            style={{
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`, height: `${1 + Math.random() * 2}px`,
              opacity: 0.15 + Math.random() * 0.5,
              boxShadow: "0 0 4px rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto">
        <div className="overline text-center mb-6">The Bridal Constellation</div>
        <h1 className="font-heading text-4xl md:text-6xl text-center text-[#F9F9F7] tracking-tight leading-tight mb-4">
          Your <em className="not-italic gold-shimmer">bridal journey</em>.
        </h1>
        <p className="font-body text-[#A3A3A3] text-center max-w-xl mx-auto mb-16">
          Four soft questions. No catalogue. Only a conversation about what your family carries.
        </p>

        {/* progress */}
        <div className="flex items-center justify-center gap-3 mb-16">
          {STEPS.map((_, i) => (
            <span key={i} className={`h-px transition-all ${i <= step ? "bg-[#C9973A] w-12" : "bg-[#C9973A]/25 w-6"}`} />
          ))}
          <span className={`h-px transition-all ${isContact ? "bg-[#C9973A] w-12" : "bg-[#C9973A]/25 w-6"}`} />
        </div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: [0.16,1,0.3,1] }}
              data-testid="bridal-journey-done"
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#C9973A] mb-8">
                <Check size={28} className="text-[#C9973A]" />
              </div>
              <h2 className="font-heading text-3xl md:text-5xl text-[#F9F9F7] mb-6">The conversation has begun.</h2>
              <p className="font-body text-[#A3A3A3] max-w-md mx-auto leading-relaxed">
                Our concierge will write to you within working hours. In the meantime, you may share a note on
                WhatsApp — we are listening.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <a
                  href={whatsappUrl(`Hello SBJ — I just completed the Bridal Journey (${contact.full_name}).`)}
                  target="_blank" rel="noreferrer"
                  data-testid="bridal-done-whatsapp"
                  className="btn-gold"
                >
                  Continue On WhatsApp
                </a>
                <button onClick={() => router.push("/")} data-testid="bridal-done-home" className="btn-ghost-gold">
                  Return to the House
                </button>
              </div>
            </motion.div>
          ) : isContact ? (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
              className="space-y-10"
              data-testid="bridal-contact-step"
            >
              <div>
                <p className="overline mb-3">Final step</p>
                <h2 className="font-heading text-3xl md:text-5xl text-[#F9F9F7] leading-tight">
                  How shall the concierge <em className="not-italic text-[#C9973A]">reach you</em>?
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="overline block mb-2">Your name</label>
                  <input
                    data-testid="bridal-name-input"
                    className="editorial-input"
                    value={contact.full_name}
                    onChange={(e) => setContact({ ...contact, full_name: e.target.value })}
                    placeholder="Anjali Reddy"
                  />
                </div>
                <div>
                  <label className="overline block mb-2">Phone (with country code)</label>
                  <input
                    data-testid="bridal-phone-input"
                    className="editorial-input"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    placeholder="+91 90000 00000"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="overline block mb-2">Email · optional</label>
                  <input
                    data-testid="bridal-email-input"
                    className="editorial-input"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="overline block mb-2">A note to the atelier · optional</label>
                  <textarea
                    data-testid="bridal-notes-input"
                    rows={3}
                    className="editorial-input resize-none"
                    value={contact.family_notes}
                    onChange={(e) => setContact({ ...contact, family_notes: e.target.value })}
                    placeholder="My grandmother's mangalsutra is sapphire. The wedding is at the Chowmahalla Palace."
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-8">
                <button onClick={() => setStep(step - 1)} data-testid="bridal-prev-btn" className="font-display text-[10px] tracking-[0.3em] uppercase text-[#A3A3A3] hover:text-[#C9973A] inline-flex items-center gap-2">
                  <ChevronLeft size={14} /> Back
                </button>
                <button
                  onClick={submit}
                  disabled={!contact.full_name || !contact.phone || submitting}
                  data-testid="bridal-submit-btn"
                  className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending…" : "Send To The Concierge"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
              className="space-y-10"
              data-testid={`bridal-step-${step}`}
            >
              <div>
                <p className="overline mb-3">Question {step + 1} of {STEPS.length}</p>
                <h2 className="font-heading text-3xl md:text-5xl text-[#F9F9F7] leading-tight">{current.title}</h2>
                <p className="font-body text-[#A3A3A3] mt-4 max-w-lg">{current.sub}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {current.options.map((opt) => {
                  const isActive = answers[current.key] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => pickOption(opt)}
                      data-testid={`bridal-option-${current.key}-${opt.toLowerCase().replace(/\s|·|\//g, "-")}`}
                      className={`choice-chip ${isActive ? "is-active" : ""}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-8">
                {step > 0 ? (
                  <button onClick={() => setStep(step - 1)} data-testid="bridal-prev-btn-step" className="font-display text-[10px] tracking-[0.3em] uppercase text-[#A3A3A3] hover:text-[#C9973A] inline-flex items-center gap-2">
                    <ChevronLeft size={14} /> Back
                  </button>
                ) : <span />}
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!answers[current.key]}
                  data-testid="bridal-next-btn"
                  className="font-display text-[10px] tracking-[0.3em] uppercase text-[#C9973A] inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
