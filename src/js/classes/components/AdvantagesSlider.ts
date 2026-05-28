import Swiper from "swiper";
import { Navigation, Scrollbar } from "swiper/modules";

import { MOBILE_BREAKPOINT } from "../../constants/breakpoints";
import Component from "../Component";

class AdvantagesSlider extends Component {
  private readonly swiper: Swiper;

  constructor(element: HTMLElement) {
    super(element);

    this.swiper = this.initSlider();
  }

  private initSlider() {
    return new Swiper(this.element, {
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
      breakpoints: {
        0: {
          loop: false,
          spaceBetween: 13,
        },
        [MOBILE_BREAKPOINT + 1]: {
          loop: true,
          spaceBetween: 20,
        },
      },
    });
  }

  public destroy() {
    this.swiper.destroy(true, true);
    this.unregister();
  }
}

export default AdvantagesSlider;
