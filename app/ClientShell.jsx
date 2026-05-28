"use client";

import { useState } from "react";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppConcierge from "@/components/WhatsAppConcierge";
import IntroSequence from "@/components/IntroSequence";

export default function ClientShell({ children }) {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <IntroSequence onComplete={() => setIntroDone(true)} />
      <CustomCursor />
      <Nav />
      {children}
      <Footer />
      <WhatsAppConcierge />
    </>
  );
}
