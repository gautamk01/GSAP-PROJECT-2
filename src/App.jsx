import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import PopeyeSlide from "./components/PopeyeSlide";
import MusicManSlide from "./components/MusicManSlide";
import ThankYouSlide from "./components/ThankYouSlide";
import "./styles/App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef(null);

  // Setup Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  // Synchronized fade-out for both text sections when Thank You appears
  useGSAP(() => {
    const popeyeContainer = document.querySelector(".slide-container");
    const musicManContainer = document.querySelector(".slide-container-2");

    if (!popeyeContainer || !musicManContainer) return;

    ScrollTrigger.create({
      trigger: ".slide-spacer-3",
      start: "top bottom",
      end: "top center",
      scrub: 1,
      onUpdate: (self) => {
        const fadeProgress = self.progress;
        const fadeOpacity = fadeProgress >= 1 ? 0 : 1 - fadeProgress;

        gsap.set([popeyeContainer, musicManContainer], {
          opacity: fadeOpacity,
        });
      },
    });
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <About />
      <PopeyeSlide />
      <MusicManSlide />
      <ThankYouSlide />
    </>
  );
}

export default App;
