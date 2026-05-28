import Link from "next/link";
import { SBJ_ADDRESS, SBJ_PHONE_DISPLAY } from "@/lib/api";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-mutedGold/20 bg-deepBlue mt-32"
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="font-display text-[14px] tracking-[0.2em] uppercase text-white mb-6">Sri Bhashyakara</div>
          <h3 className="font-heading text-4xl md:text-5xl text-white leading-tight mb-6 font-light">
            Crafting the <em className="text-mutedGold not-italic">extraordinary</em>.
          </h3>
          <p className="font-body text-white/70 text-sm leading-relaxed max-w-md">
            A luxury jewellery house rooted in heritage, designed for the modern connoisseur. Experience unparalleled craftsmanship.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="font-body text-xs tracking-widest uppercase text-mutedGold mb-6">Collections</div>
          <ul className="space-y-4 font-body text-sm">
            <li><Link href="/shop?category=necklaces" className="text-white/70 hover:text-mutedGold transition">Necklaces</Link></li>
            <li><Link href="/shop?category=earrings" className="text-white/70 hover:text-mutedGold transition">Earrings</Link></li>
            <li><Link href="/shop?category=rings" className="text-white/70 hover:text-mutedGold transition">Rings</Link></li>
            <li><Link href="/shop?category=bracelets" className="text-white/70 hover:text-mutedGold transition">Bracelets</Link></li>
            <li><Link href="/shop?category=bridal" className="text-white/70 hover:text-mutedGold transition">Bridal Exclusives</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="font-body text-xs tracking-widest uppercase text-mutedGold mb-6">Contact & Visit</div>
          <p className="font-heading text-xl text-white leading-snug">{SBJ_ADDRESS}</p>
          <p className="font-body text-sm text-white/70 mt-4">Concierge · {SBJ_PHONE_DISPLAY}</p>
          <div className="flex gap-4 mt-8">
            <Link href="/contact" data-testid="footer-contact" className="btn-ghost-gold text-[10px] py-3 px-6">Book an Appointment</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-mutedGold/10 py-8 px-6 lg:px-12 flex flex-col md:flex-row justify-between gap-4 max-w-[1500px] mx-auto">
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/50">
          © {new Date().getFullYear()} Sri Bhashyakara Jewellery Pvt Ltd. All rights reserved.
        </p>
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/50">
          A Legacy of Modern Luxury
        </p>
      </div>
    </footer>
  );
}
