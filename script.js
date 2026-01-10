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
const slidePopeye = document.querySelector(".slide-popeye");

// Load Popeye Walking animation
const slidePopeyeAnimation = lottie.loadAnimation({
  container: slidePopeye,
  path: "/Popeye Walking.json",
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

    // 1. Fade In Logic (fade-out controlled separately for sync)
    const containerOpacity = progress < 0.15 ? progress / 0.15 : 1;

    // 2. Container Animation (Controls Text Position)
    // Phase 1 (0 -> 0.5): Popeye and Text travel TOGETHER from right to center
    // Phase 2 (0.5 -> 1.0): Container (Text) STAYS at center
    let containerTranslateX;
    if (progress < 0.5) {
      // Both popeye and text slide from right to center together
      containerTranslateX = 100 - (progress / 0.5) * 100;
    } else {
      // Container stays at center (text is now centered)
      containerTranslateX = 0;
    }

    // 3. Popeye Independent Movement (Relative to Container)
    // Phase 1 (0 -> 0.5): Popeye stays with container (no extra transform)
    // Phase 2 (0.5 -> 1.0): Popeye continues left, moving off-screen
    let popeyeExtraTranslateX;
    if (progress < 0.5) {
      // Popeye stays in place within the container (travels with it)
      popeyeExtraTranslateX = 0;
    } else {
      // Popeye moves from its current position (in container) to far left
      // In remaining 0.5 progress, move from 0 to -200vw (far off-screen)
      const phaseProgress = (progress - 0.5) / 0.5;
      popeyeExtraTranslateX = -phaseProgress * 200; // Move 200vw to the left
    }

    gsap.set(
      slideContainer,
      {
        opacity: containerOpacity,
        x: `${containerTranslateX}%`,
      },
      "+=0"
    ); // Apply immediately but allow sync fade to override

    gsap.set(slidePopeye, {
      x: `${popeyeExtraTranslateX}vw`, // Use vw for viewport-relative movement
      rotateY: scrollDirection === "up" ? 180 : 0, // Popeye rotation (inverted to fix mirror image)
    });

    // 4. Popeye Lottie Animation Playback - MATCHING HERO SPEED
    const scrollDistance = self.scroll() - self.start;
    const pixelsPerFrame = 3;

    const popeyeFrame =
      Math.floor(scrollDistance / pixelsPerFrame) %
      slidePopeyeAnimation.totalFrames;
    slidePopeyeAnimation.goToAndStop(popeyeFrame, true);
  },
});

// ===== MUSIC MAN SLIDE SECTION =====

const slideContainer2 = document.querySelector(".slide-container-2");
const slideMusicMan = document.querySelector(".slide-musicman");

// Load Music Man animation
const slideMusicManAnimation = lottie.loadAnimation({
  container: slideMusicMan,
  path: "/Music Man.json",
  renderer: "svg",
  autoplay: false,
});

ScrollTrigger.create({
  trigger: ".slide-spacer-2",
  start: "top bottom",
  end: "bottom top",
  scrub: 1,
  onUpdate: (self) => {
    const progress = self.progress;

    // 1. Fade In Logic (fade-out controlled separately for sync)
    const containerOpacity = progress < 0.15 ? progress / 0.15 : 1;

    // 2. Container Animation (Controls Text Position)
    // Phase 1 (0 -> 0.5): Music Man and Text travel TOGETHER from left to center
    // Phase 2 (0.5 -> 1.0): Container (Text) STAYS at center
    let containerTranslateX;
    if (progress < 0.5) {
      // Both music man and text slide from left to center together
      // Start at -100% (left), move to 0% (center)
      containerTranslateX = -100 + (progress / 0.5) * 100;
    } else {
      // Container stays at center (text is now centered)
      containerTranslateX = 0;
    }

    // 3. Music Man Independent Movement (Relative to Container)
    // Phase 1 (0 -> 0.5): Music Man stays with container (no extra transform)
    // Phase 2 (0.5 -> 1.0): Music Man continues right, moving off-screen
    let musicManExtraTranslateX;
    if (progress < 0.5) {
      // Music Man stays in place within the container (travels with it)
      musicManExtraTranslateX = 0;
    } else {
      // Music Man moves from its current position (in container) to far right
      // In remaining 0.5 progress, move from 0 to +200vw (far off-screen right)
      const phaseProgress = (progress - 0.5) / 0.5;
      musicManExtraTranslateX = phaseProgress * 200; // Move 200vw to the right
    }

    gsap.set(slideContainer2, {
      x: `${containerTranslateX}%`,
    }); // Opacity controlled by synchronized fade

    gsap.set(slideMusicMan, {
      x: `${musicManExtraTranslateX}vw`, // Use vw for viewport-relative movement
      rotateY: scrollDirection === "up" ? 180 : 0, // Music Man rotation (inverted to fix mirror image)
    });

    // 4. Music Man Lottie Animation Playback - MATCHING HERO SPEED
    const scrollDistance = self.scroll() - self.start;
    const pixelsPerFrame = 3;

    const musicManFrame =
      Math.floor(scrollDistance / pixelsPerFrame) %
      slideMusicManAnimation.totalFrames;
    slideMusicManAnimation.goToAndStop(musicManFrame, true);
  },
});

// ===== SYNCHRONIZED FADE-OUT FOR BOTH TEXT SECTIONS =====
// Fade out both Popeye and Music Man sections when Thank You approaches
ScrollTrigger.create({
  trigger: ".slide-spacer-3",
  start: "top bottom", // Start when Thank You spacer enters viewport
  end: "top center", // Complete fade by time Thank You reaches center
  scrub: 1,
  onUpdate: (self) => {
    const fadeProgress = self.progress;
    // Fade out both containers simultaneously and keep at 0
    const fadeOpacity = fadeProgress >= 1 ? 0 : 1 - fadeProgress;

    gsap.set([slideContainer, slideContainer2], {
      opacity: fadeOpacity,
    });
  },
});

// ===== THANK YOU SECTION =====

const slideContainer3 = document.querySelector(".slide-container-3");
const slideTourists = document.querySelector(".slide-tourists");

// Load Tourists by car animation
const slideTouristsAnimation = lottie.loadAnimation({
  container: slideTourists,
  path: "/Tourists by car.json",
  renderer: "svg",
  autoplay: false,
});

ScrollTrigger.create({
  trigger: ".slide-spacer-3",
  start: "top bottom",
  end: "bottom top",
  scrub: 1,
  onUpdate: (self) => {
    const progress = self.progress;

    console.log("Thank You Progress:", progress); // Debug

    // 1. Fade In Logic
    const containerOpacity = progress < 0.1 ? progress / 0.1 : 1;

    // 2. Container Animation - Move from Left to Right and Exit
    // Progress 0 -> 1.0: Slide from left (-100%) to right (200% - completely off-screen)
    // This makes everything (text + animation) travel across and disappear
    const containerTranslateX = -100 + progress * 300; // -100% to +200%

    gsap.set(slideContainer3, {
      opacity: containerOpacity,
      x: `${containerTranslateX}%`,
    });

    // 3. Tourists Animation Playback - MATCHING HERO SPEED
    const scrollDistance = self.scroll() - self.start;
    const pixelsPerFrame = 3;

    const touristsFrame =
      Math.floor(scrollDistance / pixelsPerFrame) %
      slideTouristsAnimation.totalFrames;
    slideTouristsAnimation.goToAndStop(touristsFrame, true);
  },
});
