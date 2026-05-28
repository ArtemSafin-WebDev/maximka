import Swiper from "swiper";
import { Navigation, Scrollbar } from "swiper/modules";

import { MOBILE_BREAKPOINT } from "../../constants/breakpoints";
import Component from "../Component";

class GallerySlider extends Component {
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
          this.element.querySelector<HTMLButtonElement>(".js-gallery-prev"),
        nextEl:
          this.element.querySelector<HTMLButtonElement>(".js-gallery-next"),
      },
      scrollbar: {
        el: this.element.querySelector<HTMLElement>(".swiper-scrollbar"),
        draggable: true,
      },
      breakpoints: {
        0: {
          loop: false,
          spaceBetween: 12,
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

export default GallerySlider;
