import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import popeyeAnimation from "../assets/Popeye Walking.json";

gsap.registerPlugin(ScrollTrigger);

function PopeyeSlide() {
  const containerRef = useRef(null);
  const popeyeRef = useRef(null);
  const lottieRef = useRef(null);
  const scrollDirection = useRef("down"); // Ref instead of state
  const lastScrollY = useRef(0);

  useGSAP(() => {
    const slideContainer = containerRef.current;
    const slidePopeye = popeyeRef.current;

    // Track scroll direction without re-renders
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDirection.current =
        currentScrollY > lastScrollY.current ? "down" : "up";
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);

    if (!slideContainer || !slidePopeye) return;

    ScrollTrigger.create({
      trigger: ".slide-spacer",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Fade in logic
        const containerOpacity = progress < 0.15 ? progress / 0.15 : 1;

        // Container animation
        let containerTranslateX;
        if (progress < 0.5) {
          containerTranslateX = 100 - (progress / 0.5) * 100;
        } else {
          containerTranslateX = 0;
        }

        // Popeye independent movement
        let popeyeExtraTranslateX;
        if (progress < 0.5) {
          popeyeExtraTranslateX = 0;
        } else {
          const phaseProgress = (progress - 0.5) / 0.5;
          popeyeExtraTranslateX = -phaseProgress * 200;
        }

        gsap.set(slideContainer, {
          opacity: containerOpacity,
          x: `${containerTranslateX}%`,
        });

        gsap.set(slidePopeye, {
          x: `${popeyeExtraTranslateX}vw`,
          rotateY: scrollDirection.current === "up" ? -180 : 0, // Invert to fix mirror image
        });

        // Popeye animation playback
        const lottieAnimation = lottieRef.current;
        if (lottieAnimation && lottieAnimation.animationItem) {
          const scrollDistance = self.scroll() - self.start;
          const pixelsPerFrame = 3;
          const totalFrames = lottieAnimation.animationItem.totalFrames || 100;

          const frame =
            Math.floor(scrollDistance / pixelsPerFrame) % totalFrames;
          lottieAnimation.goToAndStop(frame, true);
        }
      },
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array

  return (
    <>
      <section className="slide-spacer"></section>
      <div className="slide-container" ref={containerRef}>
        <div className="slide-popeye" ref={popeyeRef}>
          <Lottie
            lottieRef={lottieRef}
            animationData={popeyeAnimation}
            loop={false}
            autoplay={false}
          />
        </div>
        <div className="slide-content">
          <h2>Innovation Starts Here</h2>
          <p>Your creativity leads the way.</p>
        </div>
      </div>
    </>
  );
}

export default PopeyeSlide;
