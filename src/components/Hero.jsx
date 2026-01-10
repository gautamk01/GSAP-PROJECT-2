import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import duckAnimation from "../assets/Duck.json";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const heroImgRef = useRef(null);
  const lottieContainerRef = useRef(null);
  const lottieRef = useRef(null);
  const scrollDirection = useRef("down"); // Use ref instead of state to avoid re-renders
  const lastScrollY = useRef(0);
  const isAnimationPaused = useRef(false); // Prevent duck from animating during scroll offset

  useGSAP(() => {
    const heroImg = heroImgRef.current;
    const lottieContainer = lottieContainerRef.current;

    // Track scroll direction without re-renders
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDirection.current =
        currentScrollY > lastScrollY.current ? "down" : "up";
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);

    if (!heroImg || !lottieContainer) return;

    // Capture initial width on mount, but also valid to recalc if needed
    let heroImgInitialwidth = heroImg.offsetWidth;
    const heroImgTargetWidth = 300;

    // Ensure we have a valid width, fallback or wait for load could be better but this is safe
    if (heroImgInitialwidth === 0 && heroImg.naturalWidth > 0) {
      heroImgInitialwidth = heroImg.getBoundingClientRect().width;
    }

    // Image resize animation
    ScrollTrigger.create({
      trigger: ".about",
      start: "top bottom",
      end: "top 30%",
      scrub: 1,
      onUpdate: (self) => {
        // Recalculate width if it was 0 initially (lazy handling)
        if (heroImgInitialwidth <= 0) heroImgInitialwidth = heroImg.offsetWidth;

        const heroImgCurrentWidth =
          heroImgInitialwidth -
          self.progress * (heroImgInitialwidth - heroImgTargetWidth);
        gsap.set(heroImg, { width: `${heroImgCurrentWidth}px` });
      },
    });

    // Lottie animation scroll
    ScrollTrigger.create({
      trigger: ".about",
      start: "top 30%",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const lottieOffset = self.progress * window.innerHeight * 1.1;

        // Pause duck animation when it starts moving down
        isAnimationPaused.current = self.progress > 0;

        gsap.set(lottieContainer, {
          y: -lottieOffset,
          rotateY: scrollDirection.current === "up" ? -180 : 0,
        });
      },
    });

    // Hero Lottie animation playback
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        // Only animate duck when not being moved by scroll offset
        if (!isAnimationPaused.current) {
          const lottieAnimation = lottieRef.current;
          if (lottieAnimation && lottieAnimation.animationItem) {
            const scrollDistance = self.scroll() - self.start;
            const pixelsPerFrame = 3;
            // Access totalFrames safely - check animationItem first
            const totalFrames = lottieAnimation.animationItem.totalFrames || 100;

            const frame =
              Math.floor(scrollDistance / pixelsPerFrame) % totalFrames;
            lottieAnimation.goToAndStop(frame, true);
          }
        }

        gsap.set(lottieContainer, {
          rotateY: scrollDirection.current === "up" ? -180 : 0,
        });
      },
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array - no re-initialization on scroll

  return (
    <>
      <section className="hero"></section>
      <div className="lottie-container">
        <div className="lottie" ref={lottieContainerRef}>
          <Lottie
            lottieRef={lottieRef}
            animationData={duckAnimation}
            loop={false}
            autoplay={false}
          />
        </div>
        <div className="hero-img" ref={heroImgRef}>
          <img src="/img/simple.jpg" alt="" />
        </div>
      </div>
    </>
  );
}

export default Hero;
