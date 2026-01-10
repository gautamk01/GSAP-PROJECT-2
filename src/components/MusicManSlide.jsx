import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import musicManAnimation from "../assets/Music Man.json";

gsap.registerPlugin(ScrollTrigger);

function MusicManSlide() {
  const containerRef = useRef(null);
  const musicManRef = useRef(null);
  const lottieRef = useRef(null);
  const scrollDirection = useRef("down"); // Ref instead of state
  const lastScrollY = useRef(0);

  useGSAP(() => {
    const slideContainer2 = containerRef.current;
    const slideMusicMan = musicManRef.current;

    // Track scroll direction without re-renders
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDirection.current =
        currentScrollY > lastScrollY.current ? "down" : "up";
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);

    if (!slideContainer2 || !slideMusicMan) return;

    // Set initial opacity
    gsap.set(slideContainer2, { opacity: 1 });

    ScrollTrigger.create({
      trigger: ".slide-spacer-2",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Container animation
        let containerTranslateX;
        if (progress < 0.5) {
          containerTranslateX = -100 + (progress / 0.5) * 100;
        } else {
          containerTranslateX = 0;
        }

        // Music Man independent movement
        let musicManExtraTranslateX;
        if (progress < 0.5) {
          musicManExtraTranslateX = 0;
        } else {
          const phaseProgress = (progress - 0.5) / 0.5;
          musicManExtraTranslateX = phaseProgress * 200;
        }

        // Only update position (opacity controlled by synchronized fade)
        gsap.set(slideContainer2, {
          x: `${containerTranslateX}%`,
        });

        gsap.set(slideMusicMan, {
          x: `${musicManExtraTranslateX}vw`,
          rotateY: scrollDirection.current === "up" ? -180 : 0, // Invert to fix mirror image
        });

        // Music Man animation playback
        const lottieAnimation = lottieRef.current;
        if (lottieAnimation && lottieAnimation.animationItem) {
          const scrollDistance = self.scroll() - self.start;
          const pixelsPerFrame = 3;
          const totalFrames = lottieAnimation.animationItem.totalFrames || 100;

          const musicManFrame =
            Math.floor(scrollDistance / pixelsPerFrame) % totalFrames;
          lottieAnimation.goToAndStop(musicManFrame, true);
        }
      },
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array

  return (
    <>
      <section className="slide-spacer-2"></section>
      <div className="slide-container-2" ref={containerRef}>
        <div className="slide-content-2">
          <h2>Music Brings Joy</h2>
          <p>Let the rhythm guide you.</p>
        </div>
        <div className="slide-musicman" ref={musicManRef}>
          <Lottie
            lottieRef={lottieRef}
            animationData={musicManAnimation}
            loop={false}
            autoplay={false}
          />
        </div>
      </div>
    </>
  );
}

export default MusicManSlide;
