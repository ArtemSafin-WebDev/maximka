import Swiper from "swiper";
import { EffectFade, Navigation, Pagination } from "swiper/modules";

import Component from "../Component";

class PromosShowcaseSlider extends Component {
  private swiper: Swiper | null = null;

  constructor(element: HTMLElement) {
    super(element);

    this.swiper = new Swiper(this.element, {
      modules: [EffectFade, Navigation, Pagination],
      slidesPerView: 1,
      autoHeight: true,
      effect: "fade",
      rewind: true,
      fadeEffect: {
        crossFade: true,
      },
      speed: 500,
      watchOverflow: true,
      navigation: {
        prevEl: this.element.querySelector<HTMLButtonElement>(
          ".js-promos-showcase-prev"
        ),
        nextEl: this.element.querySelector<HTMLButtonElement>(
          ".js-promos-showcase-next"
        ),
      },
      pagination: {
        el: this.element.querySelector<HTMLElement>(".swiper-pagination"),
        clickable: true,
      },
    });
  }

  public destroy() {
    this.swiper?.destroy(true, true);
    this.swiper = null;
    this.unregister();
  }
}

export default PromosShowcaseSlider;
