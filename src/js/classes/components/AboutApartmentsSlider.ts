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
  private stackTriggers: ScrollTrigger[] = [];
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
    if (this.stackTriggers.length > 0) return;

    const slides = Array.from(
      this.element.querySelectorAll<HTMLElement>(".about-apartments__slide")
    );
    const list = this.element.querySelector<HTMLElement>(
      ".about-apartments__list"
    );
    const finalStackTop =
      DESKTOP_STACK_TOP_REM +
      Math.max(slides.length - 1, 0) * DESKTOP_STACK_STEP_REM;

    list?.style.setProperty("--stack-top", "calc(100svh - 78rem)");
    list?.style.setProperty("--stack-final-top", `${finalStackTop}rem`);

    slides.forEach((slide, slideIndex) => {
      const cardTop =
        DESKTOP_STACK_TOP_REM + slideIndex * DESKTOP_STACK_STEP_REM;

      slide.style.setProperty(
        "--stack-card-offset",
        `calc(${cardTop}rem - var(--stack-top))`
      );
      slide.style.setProperty("--stack-z-index", String(slideIndex + 1));
    });

    const cards = slides.map((slide) =>
      slide.querySelector<HTMLElement>(".about-apartments__card")
    );
    const getCardTargetTop = (slideIndex: number) => {
      const slide = slides[slideIndex];
      const card = cards[slideIndex];

      if (!slide || !card) return 0;

      return (
        Number.parseFloat(getComputedStyle(slide).top) +
        Number.parseFloat(getComputedStyle(card).top)
      );
    };
    const getTransitionProgress = (incomingSlideIndex: number) => {
      const incomingCard = cards[incomingSlideIndex];

      if (!incomingCard) return 0;

      const startTop =
        window.innerHeight + getCardTargetTop(incomingSlideIndex - 1);
      const endTop = getCardTargetTop(incomingSlideIndex);
      const currentTop = incomingCard.getBoundingClientRect().top;
      const transitionDistance = startTop - endTop;

      if (transitionDistance <= 0) {
        return currentTop <= endTop ? 1 : 0;
      }

      return gsap.utils.clamp(
        0,
        1,
        (startTop - currentTop) / transitionDistance
      );
    };
    const renderStack = () => {
      const transitionProgresses = slides
        .slice(1)
        .map((_, slideIndex) => getTransitionProgress(slideIndex + 1));

      slides.forEach((slide, slideIndex) => {
        const card = cards[slideIndex];
        const cardContents = slide.querySelectorAll<HTMLElement>(
          ".about-apartments__content, .about-apartments__media"
        );
        const ownTransitionProgress =
          transitionProgresses[slideIndex] ?? 0;
        const stackDepth = transitionProgresses
          .slice(slideIndex)
          .reduce((depth, progress) => depth + progress, 0);

        if (card) {
          gsap.set(card, {
            opacity: 1 - ownTransitionProgress * 0.5,
            scale: this.getCardScale(slide, stackDepth),
            transformOrigin: "center top",
          });
        }

        if (cardContents.length > 0) {
          gsap.set(cardContents, {
            opacity: 1 - ownTransitionProgress,
          });
        }
      });
    };

    if (list) {
      const trigger = ScrollTrigger.create({
        trigger: list,
        start: "top bottom",
        end: "bottom top",
        invalidateOnRefresh: true,
        onEnter: renderStack,
        onEnterBack: renderStack,
        onLeave: renderStack,
        onLeaveBack: renderStack,
        onRefresh: renderStack,
        onUpdate: renderStack,
      });

      this.stackTriggers.push(trigger);
    }

    ScrollTrigger.refresh();
    renderStack();
  }

  private destroyDesktopStack() {
    this.stackTriggers.forEach((trigger) => trigger.kill());
    this.stackTriggers = [];

    this.element
      .querySelectorAll<HTMLElement>(".about-apartments__slide")
      .forEach((slide) => {
        slide.style.removeProperty("--stack-card-offset");
        slide.style.removeProperty("--stack-z-index");
      });
    const list = this.element.querySelector<HTMLElement>(
      ".about-apartments__list"
    );

    list?.style.removeProperty("--stack-top");
    list?.style.removeProperty("--stack-final-top");
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
