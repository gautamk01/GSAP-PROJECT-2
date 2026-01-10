import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import lottie from "lottie-web";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

let scrollDirection = "down";
let lastScrollY = 0;

lenis.on("scroll", ({ scroll }) => {
  scrollDirection = scroll > lastScrollY ? "down" : "up";
  lastScrollY = scroll;
});

const heroImg = document.querySelector(".hero-img");
const lottieContainer = document.querySelector(".lottie");

const lottieAnimation = lottie.loadAnimation({
  container: lottieContainer,
  path: "/Duck.json",
  renderer: "svg",
  autoplay: false,
});

const heroImgInitialwidth = heroImg.offsetWidth;
const heroImgTargetWidth = 300;

ScrollTrigger.create({
  trigger: ".about",
  start: "top bottom",
  end: "top 30%",
  scrub: 1,
  onUpdate: (self) => {
    const heroImgCurrentWidth =
      heroImgInitialwidth -
      self.progress * (heroImgInitialwidth - heroImgTargetWidth);
    gsap.set(heroImg, { width: `${heroImgCurrentWidth}px` });
  },
});

let isAnimationPaused = false;

ScrollTrigger.create({
  trigger: ".about",
  start: "top 30%",
  end: "bottom top",
  scrub: 1,
  onUpdate: (self) => {
    const lottieOffset = self.progress * window.innerHeight * 1.1;

    isAnimationPaused = self.progress > 0;
    gsap.set(lottieContainer, {
      y: -lottieOffset,
      rotateY: scrollDirection === "up" ? -180 : 0,
    });
  },
});

ScrollTrigger.create({
  trigger: ".hero",
  start: "top top",
  end: "bottom top",
  scrub: 1,
  onUpdate: (self) => {
    if (!isAnimationPaused) {
      const scrollDistance = self.scroll() - self.start;
      const pixelsPerFrame = 3;
      const frame =
        Math.floor(scrollDistance / pixelsPerFrame) %
        lottieAnimation.totalFrames;
      lottieAnimation.goToAndStop(frame, true);
    }
    gsap.set(lottieContainer, {
      rotateY: scrollDirection === "up" ? -180 : 0,
    });
  },
});

// ===== SINGLE DUCK SLIDE SECTION =====

const slideContainer = document.querySelector(".slide-container");
const slideDuck = document.querySelector(".slide-duck");

// Load single duck animation
const slideDuckAnimation = lottie.loadAnimation({
  container: slideDuck,
  path: "/Duck.json",
  renderer: "svg",
  autoplay: false,
});

ScrollTrigger.create({
  trigger: ".slide-spacer",
  start: "top bottom",
  end: "bottom top",
  scrub: 1,
  onUpdate: (self) => {
    const progress = self.progress;

    // 1. Fade In/Out Logic
    const containerOpacity =
      progress < 0.15
        ? progress / 0.15
        : progress > 0.85
        ? (1 - progress) / 0.15
        : 1;

    // 2. Container Animation (Controls Text Position)
    // Phase 1 (0 -> 0.5): Duck and Text travel TOGETHER from right to center
    // Phase 2 (0.5 -> 1.0): Container (Text) STAYS at center
    let containerTranslateX;
    if (progress < 0.5) {
      // Both duck and text slide from right to center together
      containerTranslateX = 100 - (progress / 0.5) * 100;
    } else {
      // Container stays at center (text is now centered)
      containerTranslateX = 0;
    }

    gsap.set(slideContainer, {
      opacity: containerOpacity,
      x: `${containerTranslateX}%`,
    });

    // 3. Duck Independent Movement (Relative to Container)
    // Phase 1 (0 -> 0.5): Duck stays with container (no extra transform)
    // Phase 2 (0.5 -> 1.0): Duck continues left, moving off-screen
    let duckExtraTranslateX;
    if (progress < 0.5) {
      // Duck stays in place within the container (travels with it)
      duckExtraTranslateX = 0;
    } else {
      // Duck moves from its current position (in container) to far left
      // In remaining 0.5 progress, move from 0 to -200vw (far off-screen)
      const phaseProgress = (progress - 0.5) / 0.5;
      duckExtraTranslateX = -phaseProgress * 200; // Move 200vw to the left
    }

    gsap.set(slideDuck, {
      x: `${duckExtraTranslateX}vw`, // Use vw for viewport-relative movement
      rotateY: scrollDirection === "up" ? 0 : 180, // Duck rotation
    });

    // 4. Duck Lottie Animation Playback - MATCHING HERO SPEED
    const scrollDistance = self.scroll() - self.start;
    const pixelsPerFrame = 3;

    const frame =
      Math.floor(scrollDistance / pixelsPerFrame) %
      slideDuckAnimation.totalFrames;
    slideDuckAnimation.goToAndStop(frame, true);
  },
});
