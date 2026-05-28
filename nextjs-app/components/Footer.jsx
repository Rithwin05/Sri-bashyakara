import Link from "next/link";
import { SBJ_ADDRESS, SBJ_PHONE_DISPLAY } from "@/lib/api";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-[#C9973A]/15 bg-[#0A0A0A] mt-32"
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="overline mb-6">Sri Bhashyakara Jewellery</div>
          <h3 className="font-heading text-4xl md:text-5xl text-[#F9F9F7] leading-tight mb-6">
            Where tradition <em className="text-[#C9973A] not-italic gold-shimmer">becomes</em> timeless.
          </h3>
          <p className="font-body text-[#A3A3A3] text-sm leading-relaxed max-w-md">
            A cinematic heritage jewellery house rooted in Hyderabad — concierge-led, family-witnessed,
            generationally crafted.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="overline mb-4">House</div>
          <ul className="space-y-3 font-body text-sm">
            <li><Link href="/collection/temple" className="text-[#F9F9F7]/70 hover:text-[#C9973A] transition">Temple of Heritage</Link></li>
            <li><Link href="/collection/emerald" className="text-[#F9F9F7]/70 hover:text-[#C9973A] transition">The Emerald Chamber</Link></li>
            <li><Link href="/collection/bridal" className="text-[#F9F9F7]/70 hover:text-[#C9973A] transition">Bridal Constellation</Link></li>
            <li><Link href="/collection/pearls" className="text-[#F9F9F7]/70 hover:text-[#C9973A] transition">House of Pearls</Link></li>
            <li><Link href="/collection/modern" className="text-[#F9F9F7]/70 hover:text-[#C9973A] transition">The Modern Aura</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="overline mb-4">Visit · Speak</div>
          <p className="font-heading text-xl text-[#F9F9F7] leading-snug">{SBJ_ADDRESS}</p>
          <p className="font-body text-sm text-[#A3A3A3] mt-4">Concierge · {SBJ_PHONE_DISPLAY}</p>
          <div className="flex gap-3 mt-8">
            <Link href="/reserve" data-testid="footer-reserve" className="btn-ghost-gold text-[10px] py-3 px-5">Reserve Viewing</Link>
            <Link href="/bridal-journey" data-testid="footer-bridal" className="btn-ghost-gold text-[10px] py-3 px-5">Bridal Journey</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[#C9973A]/10 py-6 px-6 lg:px-12 flex flex-col md:flex-row justify-between gap-3 max-w-[1500px] mx-auto">
        <p className="font-display text-[10px] tracking-[0.32em] uppercase text-[#A3A3A3]">
          © {new Date().getFullYear()} Sri Bhashyakara Jewellery Pvt Ltd
        </p>
        <p className="font-display text-[10px] tracking-[0.32em] uppercase text-[#A3A3A3]">
          A House of Cinematic Heritage
        </p>
      </div>
    </footer>
  );
}
