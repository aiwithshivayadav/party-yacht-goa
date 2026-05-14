"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import LoadingScreen from "@/components/LoadingScreen";
import CursorEffect from "@/components/CursorEffect";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experiences from "@/components/Experiences";
import YachtCollection from "@/components/YachtCollection";
import GoaExperience from "@/components/GoaExperience";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import BookingSection from "@/components/BookingSection";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import FaqSection from "@/components/FaqSection";
import TrustBar from "@/components/TrustBar";
import Footer from "@/components/Footer";

const FloatingWhatsApp = dynamic(() => import("@/components/FloatingWhatsApp"), {
  ssr: false,
});

export default function Home() {
  const [loading, setLoading] = useState(true);

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    let lenis: import("lenis").default | null = null;

    const init = async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis!.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    };

    init();
    return () => { lenis?.destroy(); };
  }, []);

  const handleLoadingComplete = () => {
    setTimeout(() => setLoading(false), 200);
  };

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <CursorEffect />
      <ScrollProgress />

      <main className={`relative transition-opacity duration-700 ${loading ? "opacity-0 pointer-events-none" : "opacity-100"} pb-[72px] md:pb-0`}>
        <Navbar />
        <Hero />
        <TrustBar />
        <Experiences />
        <YachtCollection />
        <GoaExperience />
        <Gallery />
        <Testimonials />
        <BookingSection />
        <FaqSection />
        <WhatsAppCTA />
        <Footer />
      </main>

      <FloatingWhatsApp />
    </>
  );
}
