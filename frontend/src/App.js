import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppConcierge from "@/components/WhatsAppConcierge";
import IntroSequence from "@/components/IntroSequence";

import Home from "@/pages/Home";
import CollectionWorld from "@/pages/CollectionWorld";
import BridalJourney from "@/pages/BridalJourney";
import Reserve from "@/pages/Reserve";
import Showroom from "@/pages/Showroom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

function Shell() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <IntroSequence onComplete={() => setIntroDone(true)} />
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
      <Nav />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection/:slug" element={<CollectionWorld />} />
        <Route path="/bridal-journey" element={<BridalJourney />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/showroom" element={<Showroom />} />
      </Routes>
      <Footer />
      <WhatsAppConcierge />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </div>
  );
}

export default App;
