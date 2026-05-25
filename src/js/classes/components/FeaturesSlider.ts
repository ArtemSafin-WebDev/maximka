import Swiper from "swiper";
import { Scrollbar } from "swiper/modules";

import { MOBILE_BREAKPOINT } from "../../constants/breakpoints";
import Component from "../Component";

class FeaturesSlider extends Component {
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
      if (!this.swiper) {
        this.swiper = new Swiper(this.element, {
          modules: [Scrollbar],
          slidesPerView: "auto",
          spaceBetween: 12,
          speed: 500,
          watchOverflow: true,
          scrollbar: {
            el: this.element.querySelector<HTMLElement>(".swiper-scrollbar"),
            draggable: true,
          },
        });
      }

      return;
    }

    this.swiper?.destroy(true, true);
    this.swiper = null;
  }

  public destroy() {
    this.mediaQuery.removeEventListener("change", this.handleMediaChange);
    this.swiper?.destroy(true, true);
    this.swiper = null;
    this.unregister();
  }
}

export default FeaturesSlider;
