import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import touristsAnimation from "../assets/Tourists by car.json";

gsap.registerPlugin(ScrollTrigger);

function ThankYouSlide() {
  const containerRef = useRef(null);
  const touristsRef = useRef(null);
  const lottieRef = useRef(null);

  useGSAP(() => {
    const slideContainer3 = containerRef.current;
    const slideTourists = touristsRef.current;

    // Wait for animationItem to be ready
    if (!slideContainer3 || !slideTourists) return;

    ScrollTrigger.create({
      trigger: ".slide-spacer-3",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Fade in logic
        const containerOpacity = progress < 0.1 ? progress / 0.1 : 1;

        // Move from left to right and exit
        const containerTranslateX = -100 + progress * 300; // -100% to +200%

        gsap.set(slideContainer3, {
          opacity: containerOpacity,
          x: `${containerTranslateX}%`,
        });

        // Tourists animation playback
        const lottieAnimation = lottieRef.current;
        if (lottieAnimation && lottieAnimation.animationItem) {
          const scrollDistance = self.scroll() - self.start;
          const pixelsPerFrame = 3;
          const totalFrames = lottieAnimation.animationItem.totalFrames || 100;

          const touristsFrame =
            Math.floor(scrollDistance / pixelsPerFrame) % totalFrames;
          lottieAnimation.goToAndStop(touristsFrame, true);
        }
      },
    });
  }, []);

  return (
    <>
      <section className="slide-spacer-3"></section>
      <div className="slide-container-3" ref={containerRef}>
        <div className="slide-tourists" ref={touristsRef}>
          <Lottie
            lottieRef={lottieRef}
            animationData={touristsAnimation}
            loop={false}
            autoplay={false}
          />
        </div>
        <h1 className="thank-you-text">THANK YOU</h1>
      </div>
    </>
  );
}

export default ThankYouSlide;
