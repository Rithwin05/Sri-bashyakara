"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "py-4 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden p-2 ${scrolled || pathname !== '/' ? 'text-deepBlue' : 'text-white'}`}
          aria-label="Open menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link href="/" data-testid="nav-logo-link" className="flex items-center gap-4 group mx-auto lg:mx-0">
          <div className="hidden lg:block leading-none text-left">
            <div className={`font-display text-[14px] tracking-[0.2em] uppercase transition-colors ${scrolled || pathname !== '/' ? 'text-deepBlue' : 'text-white'}`}>
              Sri Bhashyakara
            </div>
            <div className={`font-body text-[10px] uppercase tracking-widest mt-1 ${scrolled || pathname !== '/' ? 'text-mutedGold' : 'text-white/80'}`}>
              Fine Jewellery
            </div>
          </div>
          <div className={`lg:hidden font-display text-[16px] tracking-[0.2em] uppercase ${scrolled || pathname !== '/' ? 'text-deepBlue' : 'text-white'}`}>
              SBJ
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => {
            const isActive = pathname.startsWith(l.to);
            const isScrolledOrInner = scrolled || pathname !== '/';
            return (
              <Link
                key={l.to}
                href={l.to}
                className={`font-body text-[11px] tracking-[0.15em] uppercase transition-colors relative group ${
                  isScrolledOrInner 
                    ? (isActive ? "text-mutedGold" : "text-deepBlue hover:text-mutedGold")
                    : (isActive ? "text-mutedGold" : "text-white/90 hover:text-white")
                }`}
              >
                {l.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${isScrolledOrInner ? 'bg-mutedGold' : 'bg-white'}`}></span>
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link
            href="/checkout"
            className={`transition-colors flex items-center gap-2 ${scrolled || pathname !== '/' ? 'text-deepBlue hover:text-mutedGold' : 'text-white hover:text-mutedGold'}`}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="hidden md:inline font-body text-[11px] tracking-[0.1em] uppercase">Bag (0)</span>
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-[70px] bg-white h-screen flex flex-col">
          <div className="px-8 py-12 flex flex-col gap-8 flex-1">
            {links.map((l) => {
              const isActive = pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className={`font-display text-4xl tracking-wide ${isActive ? "text-mutedGold" : "text-deepBlue"}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
