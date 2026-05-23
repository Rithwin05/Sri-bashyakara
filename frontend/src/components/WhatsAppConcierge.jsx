import { useState } from "react";
import { whatsappUrl, SBJ_PHONE_DISPLAY } from "@/lib/api";
import { MessageCircle } from "lucide-react";

export default function WhatsAppConcierge() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        data-testid="whatsapp-concierge-btn"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-24 z-40 group"
        aria-label="SBJ Concierge"
      >
        <span className="absolute inset-0 rounded-full bg-[#C9973A]/30 animate-ping" />
        <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#C9973A] text-[#0A0A0A] shadow-[0_15px_40px_-10px_rgba(201,151,58,0.6)] group-hover:scale-105 transition-transform">
          <MessageCircle size={22} strokeWidth={1.8} />
        </span>
      </button>

      {open && (
        <div
          data-testid="concierge-card"
          className="fixed bottom-24 right-6 md:right-24 z-40 w-[320px] bg-[#0B132B]/95 backdrop-blur-xl border border-[#C9973A]/30 p-6 shadow-2xl"
        >
          <div className="overline mb-3">Speak With An SBJ Advisor</div>
          <p className="font-heading text-2xl text-[#F9F9F7] leading-tight mb-4">
            Begin your <em className="text-[#C9973A] not-italic">private experience</em>.
          </p>
          <p className="font-body text-xs text-[#A3A3A3] mb-5">
            Our concierge will reply within working hours — Hyderabad time.
            <br />Direct line · {SBJ_PHONE_DISPLAY}
          </p>
          <a
            data-testid="concierge-open-whatsapp"
            href={whatsappUrl("Hello SBJ — I would like to begin a private consultation.")}
            target="_blank"
            rel="noreferrer"
            className="btn-gold w-full text-center block"
          >
            Open WhatsApp
          </a>
          <button
            data-testid="concierge-close"
            onClick={() => setOpen(false)}
            className="mt-4 w-full font-display text-[10px] tracking-[0.28em] uppercase text-[#A3A3A3] hover:text-[#C9973A] transition"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
