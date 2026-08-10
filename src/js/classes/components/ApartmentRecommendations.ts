import Swiper from "swiper";
import { Navigation, Scrollbar } from "swiper/modules";

import { MOBILE_BREAKPOINT } from "../../constants/breakpoints";
import Component from "../Component";

class ApartmentRecommendations extends Component {
  private swiper: Swiper | null = null;

  constructor(element: HTMLElement) {
    super(element);
    this.initSlider();
  }

  private initSlider() {
    const slider = this.element.querySelector<HTMLElement>(
      ".js-apartment-recommendations-slider"
    );

    if (!slider) {
      return;
    }

    this.swiper = new Swiper(slider, {
      modules: [Navigation, Scrollbar],
      slidesPerView: "auto",
      spaceBetween: 12,
      speed: 500,
      watchOverflow: true,
      navigation: {
        prevEl: this.element.querySelector<HTMLButtonElement>(
          ".js-apartment-recommendations-prev"
        ),
        nextEl: this.element.querySelector<HTMLButtonElement>(
          ".js-apartment-recommendations-next"
        ),
      },
      scrollbar: {
        el: this.element.querySelector<HTMLElement>(".swiper-scrollbar"),
        draggable: true,
        dragSize: 42,
      },
      breakpoints: {
        [MOBILE_BREAKPOINT + 1]: {
          spaceBetween: 20,
        },
      },
    });
  }

  public destroy() {
    this.swiper?.destroy(true, true);
    this.swiper = null;
    this.unregister();
  }
}

export default ApartmentRecommendations;
