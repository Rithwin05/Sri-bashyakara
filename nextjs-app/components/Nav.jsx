"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/shop", label: "Collections" },
  { href: "/about", label: "Heritage" },
  { href: "/contact", label: "Atelier" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "py-3 bg-ivory/95 backdrop-blur-md border-b border-royalNavy/10 shadow-sm"
            : "py-5 bg-ivory/90 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(v => !v)}
            className="lg:hidden text-royalNavy p-2"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none" className="shrink-0">
              <circle cx="18" cy="18" r="17" stroke="#0D1B2A" strokeWidth="1" />
              <path d="M18 6 L28 14 L24 30 L12 30 L8 14 Z" fill="none" stroke="#0D1B2A" strokeWidth="1.5" />
              <path d="M18 6 L28 14 L18 10 L8 14 Z" fill="rgba(13,27,42,0.1)" />
              <circle cx="18" cy="18" r="2" fill="#0D1B2A" />
            </svg>
            <div>
              <div className="font-royal text-royalNavy text-[13px] tracking-[0.25em] uppercase leading-none font-semibold">
                Sri Bhashyakara
              </div>
              <div className="font-sub italic text-royalNavy/70 text-[10px] tracking-[0.12em] mt-0.5">
                Fine Indian Jewellery
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative font-body text-[11px] font-medium tracking-[0.2em] uppercase transition-colors group ${
                    active ? "text-royalGold" : "text-royalNavy hover:text-royalGold"
                  }`}
                >
                  {label}
                  <span className={`absolute -bottom-1 left-0 w-full h-px bg-royalGold transition-transform origin-left duration-500 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5 text-royalNavy">
            <Link href="/contact" className="hidden md:flex items-center gap-2 hover:text-royalGold transition-colors">
              <Phone size={16} strokeWidth={1.5} />
              <span className="font-body text-[10px] tracking-[0.15em] font-medium uppercase">Book Visit</span>
            </Link>
            <Link href="/checkout" className="hover:text-royalGold transition-colors flex items-center gap-2">
              <ShoppingBag size={18} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[99] bg-ivory/98 backdrop-blur-xl flex flex-col transition-all duration-500 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="flex-1 flex flex-col items-center justify-center gap-10 px-8">
          <div className="text-royalNavy font-semibold text-xs tracking-[0.4em] uppercase mb-4">Sri Bhashyakara</div>
          <div className="w-16 h-px bg-royalNavy/20" />
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-royal text-4xl text-royalNavy hover:text-royalGold transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="w-16 h-px bg-royalNavy/20 mt-4" />
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn-royal-solid text-xs mt-4"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </>
  );
}
