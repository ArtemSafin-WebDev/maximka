import Swiper from "swiper";
import { Navigation, Scrollbar } from "swiper/modules";

import { MOBILE_BREAKPOINT } from "../../constants/breakpoints";
import {
  duplicateLoopSlides,
  removeLoopSlideDuplicates,
} from "../../utils/loopSlides";
import Component from "../Component";

class GallerySlider extends Component {
  private swiper: Swiper | null = null;
  private readonly mediaQuery = window.matchMedia(
    `(max-width: ${MOBILE_BREAKPOINT}px)`
  );
  private readonly handleMediaChange = () => this.reinitSlider();

  constructor(element: HTMLElement) {
    super(element);

    this.mediaQuery.addEventListener("change", this.handleMediaChange);
    this.reinitSlider();
  }

  private initSlider() {
    const isMobile = this.mediaQuery.matches;

    if (!isMobile) {
      duplicateLoopSlides(this.element);
    }

    return new Swiper(this.element, {
      modules: [Navigation, Scrollbar],
      slidesPerView: "auto",
      spaceBetween: isMobile ? 16 : 20,
      speed: 500,
      watchOverflow: true,
      loop: !isMobile,
      navigation: {
        prevEl:
          this.element.querySelector<HTMLButtonElement>(".js-gallery-prev"),
        nextEl:
          this.element.querySelector<HTMLButtonElement>(".js-gallery-next"),
      },
      scrollbar: {
        el: this.element.querySelector<HTMLElement>(".swiper-scrollbar"),
        draggable: true,
        dragSize: isMobile ? 81 : "auto",
      },
    });
  }

  private reinitSlider() {
    this.destroySlider();
    this.swiper = this.initSlider();
  }

  private destroySlider() {
    this.swiper?.destroy(true, true);
    this.swiper = null;
    removeLoopSlideDuplicates(this.element);
  }

  public destroy() {
    this.mediaQuery.removeEventListener("change", this.handleMediaChange);
    this.destroySlider();
    this.unregister();
  }
}

export default GallerySlider;
