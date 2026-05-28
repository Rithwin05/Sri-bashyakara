import Link from "next/link";
import { SBJ_ADDRESS, SBJ_PHONE_DISPLAY } from "@/lib/api";
import { Phone, Mail, MapPin } from "lucide-react";

const LINKS = {
  Collections: [
    { label: "Temple Heritage", href: "/shop?c=temple" },
    { label: "Emerald Royale", href: "/shop?c=emerald" },
    { label: "Bridal Constellation", href: "/shop?c=bridal" },
    { label: "Sapphire Nights", href: "/shop?c=sapphire" },
    { label: "Pearl Cascade", href: "/shop?c=pearl" },
  ],
  Explore: [
    { label: "Our Heritage", href: "/about" },
    { label: "The Atelier", href: "/about#atelier" },
    { label: "Bridal Journey", href: "/contact" },
    { label: "Gifting", href: "/shop" },
    { label: "Care Guide", href: "/about" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #F5EDD8 100%)" }}>
      {/* Decorative top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      {/* Floating background orbs */}
      <div className="absolute top-20 left-[10%] w-80 h-80 rounded-full bg-[#FAEBE4]/30 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 right-[10%] w-60 h-60 rounded-full bg-[#E8D5F5]/20 blur-[60px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14">

          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="17" stroke="#0D1B2A" strokeWidth="1" />
                <path d="M18 6 L28 14 L24 30 L12 30 L8 14 Z" fill="none" stroke="#0D1B2A" strokeWidth="1.5" />
                <path d="M18 6 L28 14 L18 10 L8 14 Z" fill="rgba(13,27,42,0.08)" />
                <circle cx="18" cy="18" r="2" fill="#C9A84C" />
              </svg>
              <div>
                <div className="font-royal text-[#0D1B2A] text-[13px] tracking-[0.25em] uppercase font-semibold">Sri Bhashyakara</div>
                <div className="font-sub italic text-[#0D1B2A]/50 text-[10px] tracking-[0.12em]">Fine Indian Jewellery · Est. 1984</div>
              </div>
            </div>

            <h3 className="font-royal text-3xl md:text-4xl text-[#0D1B2A] leading-tight mb-6">
              Where Tradition{" "}
              <em className="gold-text not-italic font-medium">Becomes</em> Timeless.
            </h3>

            <p className="font-body text-sm text-[#0D1B2A]/60 leading-relaxed max-w-sm mb-8">
              A cinematic heritage jewellery house rooted in Hyderabad — concierge-led,
              family-witnessed, generationally crafted for life&apos;s extraordinary moments.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-[#0D1B2A]/15 flex items-center justify-center text-[#0D1B2A]/60 hover:bg-[#0D1B2A] hover:text-[#FAF6EE] hover:border-[#0D1B2A] transition-all duration-500 hover:shadow-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full border border-[#0D1B2A]/15 flex items-center justify-center text-[#0D1B2A]/60 hover:bg-[#0D1B2A] hover:text-[#FAF6EE] hover:border-[#0D1B2A] transition-all duration-500 hover:shadow-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([cat, links]) => (
            <div key={cat} className="md:col-span-2">
              <div className="font-body text-[0.65rem] font-bold tracking-[0.3em] text-[#C9A84C] uppercase mb-6">{cat}</div>
              <ul className="space-y-4">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="font-body text-sm text-[#0D1B2A]/70 hover:text-[#C9A84C] transition-colors duration-300 font-medium leading-relaxed"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="md:col-span-3">
            <div className="font-body text-[0.65rem] font-bold tracking-[0.3em] text-[#C9A84C] uppercase mb-6">Find Us</div>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-[#C9A84C] shrink-0 mt-0.5" />
                <p className="font-body text-sm text-[#0D1B2A]/70 leading-relaxed">{SBJ_ADDRESS}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-[#C9A84C] shrink-0" />
                <p className="font-body text-sm text-[#0D1B2A]/70 font-medium">{SBJ_PHONE_DISPLAY}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-[#C9A84C] shrink-0" />
                <p className="font-body text-sm text-[#0D1B2A]/70 font-medium">concierge@sribhashyakara.com</p>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/contact" className="btn-royal-solid text-[0.65rem] py-3 px-6">
                Book Private Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent my-12" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body font-medium text-[0.6rem] tracking-[0.15em] text-[#0D1B2A]/40 uppercase">
            © {new Date().getFullYear()} Sri Bhashyakara Jewellery Pvt Ltd · All Rights Reserved
          </p>
          <p className="font-body font-medium text-[0.6rem] tracking-[0.15em] text-[#0D1B2A]/40 uppercase">
            A House of Sacred Heritage · Hyderabad, India
          </p>
        </div>
      </div>
    </footer>
  );
}
