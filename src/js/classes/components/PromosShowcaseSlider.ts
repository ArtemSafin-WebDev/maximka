import Swiper from "swiper";
import { EffectFade, Pagination } from "swiper/modules";

import Component from "../Component";

class PromosShowcaseSlider extends Component {
  private swiper: Swiper | null = null;

  constructor(element: HTMLElement) {
    super(element);

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

  public destroy() {
    this.swiper?.destroy(true, true);
    this.swiper = null;
    this.unregister();
  }
}

export default PromosShowcaseSlider;
