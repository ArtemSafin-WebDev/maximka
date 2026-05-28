import Swiper from "swiper";
import { Scrollbar } from "swiper/modules";

import { MOBILE_BREAKPOINT } from "../../constants/breakpoints";
import Component from "../Component";

class GallerySlider extends Component {
  private readonly swiper: Swiper;
  private readonly prevButton: HTMLButtonElement | null;
  private readonly nextButton: HTMLButtonElement | null;
  private readonly desktopMediaQuery = window.matchMedia(
    `(min-width: ${MOBILE_BREAKPOINT + 1}px)`
  );
  private readonly handleMediaChange = () => this.updateNavigationState();
  private readonly handlePrevClick = () => {
    if (
      this.desktopMediaQuery.matches &&
      this.swiper.isBeginning &&
      !this.swiper.isLocked
    ) {
      this.slideToLast();
      return;
    }

    this.swiper.slidePrev();
  };
  private readonly handleNextClick = () => {
    if (
      this.desktopMediaQuery.matches &&
      this.swiper.isEnd &&
      !this.swiper.isLocked
    ) {
      this.swiper.slideTo(0);
      return;
    }

    this.swiper.slideNext();
  };
  private readonly updateNavigationState = () => {
    const isDesktop = this.desktopMediaQuery.matches;
    const isLocked = this.swiper.isLocked;

    this.prevButton?.classList.toggle(
      "swiper-button-disabled",
      isLocked || (!isDesktop && this.swiper.isBeginning)
    );
    this.prevButton?.toggleAttribute(
      "disabled",
      isLocked || (!isDesktop && this.swiper.isBeginning)
    );
    this.nextButton?.classList.toggle(
      "swiper-button-disabled",
      isLocked || (!isDesktop && this.swiper.isEnd)
    );
    this.nextButton?.toggleAttribute(
      "disabled",
      isLocked || (!isDesktop && this.swiper.isEnd)
    );
  };

  constructor(element: HTMLElement) {
    super(element);

    this.prevButton = this.element.querySelector<HTMLButtonElement>(".js-gallery-prev");
    this.nextButton = this.element.querySelector<HTMLButtonElement>(".js-gallery-next");
    this.swiper = this.initSlider();

    this.prevButton?.addEventListener("click", this.handlePrevClick);
    this.nextButton?.addEventListener("click", this.handleNextClick);
    this.desktopMediaQuery.addEventListener("change", this.handleMediaChange);
    this.swiper.on("slideChange", this.updateNavigationState);
    this.swiper.on("update", this.updateNavigationState);
    this.updateNavigationState();
  }

  private initSlider() {
    return new Swiper(this.element, {
      modules: [Scrollbar],
      slidesPerView: "auto",
      spaceBetween: 20,
      speed: 500,
      watchOverflow: true,
      scrollbar: {
        el: this.element.querySelector<HTMLElement>(".swiper-scrollbar"),
        draggable: true,
      },
      breakpoints: {
        0: {
          spaceBetween: 12,
        },
        577: {
          spaceBetween: 20,
        },
      },
    });
  }

  private slideToLast() {
    this.swiper.slideTo(Math.max(this.swiper.slides.length - 1, 0));
  }

  public destroy() {
    this.prevButton?.removeEventListener("click", this.handlePrevClick);
    this.nextButton?.removeEventListener("click", this.handleNextClick);
    this.desktopMediaQuery.removeEventListener("change", this.handleMediaChange);
    this.swiper.off("slideChange", this.updateNavigationState);
    this.swiper.off("update", this.updateNavigationState);
    this.swiper.destroy(true, true);
    this.unregister();
  }
}

export default GallerySlider;
