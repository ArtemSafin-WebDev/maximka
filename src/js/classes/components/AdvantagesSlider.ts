import Swiper from "swiper";
import { Navigation, Scrollbar } from "swiper/modules";

import { MOBILE_BREAKPOINT } from "../../constants/breakpoints";
import {
  duplicateLoopSlides,
  removeLoopSlideDuplicates,
} from "../../utils/loopSlides";
import Component from "../Component";

class AdvantagesSlider extends Component {
  private swiper: Swiper | null = null;
  private readonly mediaQuery = window.matchMedia(
    `(max-width: ${MOBILE_BREAKPOINT}px)`
  );
  private readonly handleMediaChange = () => this.update();

  constructor(element: HTMLElement) {
    super(element);

    this.mediaQuery.addEventListener("change", this.handleMediaChange);
    this.update();
  }

  private update() {
    if (this.mediaQuery.matches) {
      this.destroySlider();

      return;
    }

    if (this.swiper) {
      return;
    }

    duplicateLoopSlides(this.element);

    this.swiper = new Swiper(this.element, {
      modules: [Navigation, Scrollbar],
      slidesPerView: "auto",
      spaceBetween: 20,
      speed: 500,
      watchOverflow: true,
      navigation: {
        prevEl:
          this.element.querySelector<HTMLButtonElement>(".js-advantages-prev"),
        nextEl:
          this.element.querySelector<HTMLButtonElement>(".js-advantages-next"),
      },
      scrollbar: {
        el: this.element.querySelector<HTMLElement>(".swiper-scrollbar"),
        draggable: true,
      },
      loop: true,
    });
  }

  public destroy() {
    this.mediaQuery.removeEventListener("change", this.handleMediaChange);
    this.destroySlider();
    this.unregister();
  }

  private destroySlider() {
    this.swiper?.destroy(true, true);
    this.swiper = null;
    removeLoopSlideDuplicates(this.element);
  }
}

export default AdvantagesSlider;
