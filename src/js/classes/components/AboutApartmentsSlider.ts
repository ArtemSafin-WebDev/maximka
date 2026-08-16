import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper";
import { EffectFade, Pagination } from "swiper/modules";

import { MOBILE_BREAKPOINT } from "../../constants/breakpoints";
import Component from "../Component";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_STACK_TOP_REM = 16;
const DESKTOP_STACK_STEP_REM = 4;
const DESKTOP_STACK_SHRINK_REM = 12;
const DESKTOP_STACK_MIN_SCALE = 0.5;

class AboutApartmentsSlider extends Component {
  private swiper: Swiper | null = null;
  private stackTimelines: gsap.core.Timeline[] = [];
  private readonly mediaQuery = window.matchMedia(
    `(max-width: ${MOBILE_BREAKPOINT}px)`
  );
  private readonly handleMediaChange = () => this.update();

  private getCardScale(slide: HTMLElement, stackDepth: number) {
    if (stackDepth === 0) return 1;

    const slideWidth = slide.getBoundingClientRect().width;
    const rootFontSize = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );

    return Math.max(
      (slideWidth -
        stackDepth * DESKTOP_STACK_SHRINK_REM * rootFontSize) /
        slideWidth,
      DESKTOP_STACK_MIN_SCALE
    );
  }

  constructor(element: HTMLElement) {
    super(element);

    this.mediaQuery.addEventListener("change", this.handleMediaChange);
    this.update();
  }

  private update() {
    if (this.mediaQuery.matches) {
      this.destroyDesktopStack();

      if (!this.swiper) {
        this.swiper = new Swiper(this.element, {
          modules: [EffectFade, Pagination],
          slidesPerView: 1,
          autoHeight: true,
          effect: "fade",
          fadeEffect: {
            crossFade: true,
          },
          speed: 500,
          watchOverflow: true,
          pagination: {
            el: this.element.querySelector<HTMLElement>(".swiper-pagination"),
            clickable: true,
          },
        });
      }

      return;
    }

    this.swiper?.destroy(true, true);
    this.swiper = null;
    this.initDesktopStack();
  }

  private initDesktopStack() {
    if (this.stackTimelines.length > 0) return;

    const slides = Array.from(
      this.element.querySelectorAll<HTMLElement>(".about-apartments__slide")
    );

    slides.forEach((slide, slideIndex) => {
      slide.style.setProperty(
        "--stack-top",
        `${DESKTOP_STACK_TOP_REM + slideIndex * DESKTOP_STACK_STEP_REM}rem`
      );
      slide.style.setProperty("--stack-z-index", String(slideIndex + 1));
    });

    slides.slice(1).forEach((slide, slideIndex) => {
      const previousSlides = slides.slice(0, slideIndex + 1);
      const previousActiveSlide = previousSlides[previousSlides.length - 1];
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: slide,
          start: () => {
            const stickyOffset = Number.parseFloat(
              getComputedStyle(previousActiveSlide).top
            );

            return `top bottom+=${stickyOffset}`;
          },
          end: () => {
            const stickyOffset = Number.parseFloat(getComputedStyle(slide).top);

            return `top top+=${stickyOffset}`;
          },
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      previousSlides.forEach((previousSlide, previousSlideIndex) => {
        const stackDepth = slideIndex + 1 - previousSlideIndex;
        const previousStackDepth = stackDepth - 1;
        const card = previousSlide.querySelector<HTMLElement>(
          ".about-apartments__card"
        );
        const cardContents = previousSlide.querySelectorAll<HTMLElement>(
          ".about-apartments__content, .about-apartments__media"
        );

        if (card) {
          timeline.fromTo(
            card,
            {
              opacity: previousStackDepth === 0 ? 1 : 0.5,
              scale: () =>
                this.getCardScale(previousSlide, previousStackDepth),
              transformOrigin: "center top",
            },
            {
              opacity: 0.5,
              scale: () => this.getCardScale(previousSlide, stackDepth),
              transformOrigin: "center top",
              duration: 1,
              ease: "none",
              immediateRender: false,
            },
            0
          );
        }

        if (cardContents.length > 0) {
          timeline.fromTo(
            cardContents,
            {
              opacity: previousStackDepth === 0 ? 1 : 0,
            },
            {
              opacity: 0,
              duration: 1,
              ease: "none",
              immediateRender: false,
            },
            0
          );
        }
      });

      this.stackTimelines.push(timeline);
    });

    ScrollTrigger.refresh();
  }

  private destroyDesktopStack() {
    this.stackTimelines.forEach((timeline) => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    });
    this.stackTimelines = [];

    this.element
      .querySelectorAll<HTMLElement>(".about-apartments__slide")
      .forEach((slide) => {
        slide.style.removeProperty("--stack-top");
        slide.style.removeProperty("--stack-z-index");
      });
    this.element
      .querySelectorAll<HTMLElement>(".about-apartments__card")
      .forEach((card) => {
        card.style.removeProperty("opacity");
        card.style.removeProperty("transform");
        card.style.removeProperty("transform-origin");
      });
    this.element
      .querySelectorAll<HTMLElement>(
        ".about-apartments__content, .about-apartments__media"
      )
      .forEach((content) => content.style.removeProperty("opacity"));
  }

  public destroy() {
    this.mediaQuery.removeEventListener("change", this.handleMediaChange);
    this.swiper?.destroy(true, true);
    this.swiper = null;
    this.destroyDesktopStack();
    this.unregister();
  }
}

export default AboutApartmentsSlider;
