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
  path: "/duck.json",
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
