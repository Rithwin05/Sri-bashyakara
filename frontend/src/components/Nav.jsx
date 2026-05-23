import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "House" },
  { to: "/collection/temple", label: "Temple" },
  { to: "/collection/emerald", label: "Emerald" },
  { to: "/collection/bridal", label: "Bridal" },
  { to: "/collection/pearls", label: "Pearls" },
  { to: "/collection/modern", label: "Modern" },
  { to: "/bridal-journey", label: "Bridal Journey" },
  { to: "/showroom", label: "Showroom" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "py-3 backdrop-blur-xl bg-[#0A0A0A]/75 border-b border-[#C9973A]/15" : "py-6"
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link to="/" data-testid="nav-logo-link" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-[#C9973A]/50 flex items-center justify-center bg-[#0B132B] group-hover:border-[#C9973A] transition-colors">
            <span className="font-display text-[#C9973A] text-[11px]">SBJ</span>
          </div>
          <div className="hidden md:block leading-none">
            <div className="font-display text-[10px] tracking-[0.32em] text-[#C9973A]">SRI BHASHYAKARA</div>
            <div className="font-heading italic text-[11px] text-[#A3A3A3] mt-0.5">jewellery house</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8" data-testid="primary-nav">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              className={({ isActive }) =>
                `font-display text-[10.5px] tracking-[0.28em] uppercase transition-colors ${
                  isActive ? "text-[#C9973A]" : "text-[#F9F9F7]/80 hover:text-[#C9973A]"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/reserve"
          data-testid="nav-reserve-btn"
          className="hidden md:inline-block btn-ghost-gold text-[10px] py-3 px-5"
        >
          Reserve Viewing
        </Link>

        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-[#C9973A] p-2"
          aria-label="Open menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          data-testid="mobile-nav-drawer"
          className="lg:hidden fixed inset-0 top-[68px] bg-[#0A0A0A]/98 backdrop-blur-2xl"
        >
          <div className="px-8 py-12 flex flex-col gap-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                className={({ isActive }) =>
                  `font-heading text-3xl tracking-tight ${isActive ? "text-[#C9973A]" : "text-[#F9F9F7]"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/reserve"
              onClick={() => setOpen(false)}
              data-testid="mobile-nav-reserve"
              className="btn-gold mt-6 self-start"
            >
              Reserve Viewing
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
