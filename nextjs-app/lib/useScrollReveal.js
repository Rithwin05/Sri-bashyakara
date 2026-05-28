"use client";
import { useEffect } from "react";

/**
 * useScrollReveal – wires up IntersectionObserver to add `visible` class
 * to elements with reveal / reveal-left / reveal-right / reveal-scale.
 * Also handles parallax on elements with [data-parallax].
 */
export function useScrollReveal() {
  useEffect(() => {
    // --- Intersection Observer for reveal classes ---
    const revealEls = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));

    // --- Parallax on scroll ---
    const parallaxEls = document.querySelectorAll("[data-parallax]");
    const onScroll = () => {
      const scrollY = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax") || "0.3");
        const rect = el.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translateY(${centerY * speed * -1}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
