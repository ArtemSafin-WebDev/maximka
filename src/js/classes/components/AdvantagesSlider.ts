import Swiper from "swiper";
import { Scrollbar } from "swiper/modules";

import Component from "../Component";

class AdvantagesSlider extends Component {
  private readonly swiper: Swiper;
  private readonly prevButton: HTMLButtonElement | null;
  private readonly nextButton: HTMLButtonElement | null;
  private readonly handlePrevClick = () => this.swiper.slidePrev();
  private readonly handleNextClick = () => this.swiper.slideNext();

  constructor(element: HTMLElement) {
    super(element);

    this.prevButton = this.element.querySelector<HTMLButtonElement>(".js-advantages-prev");
    this.nextButton = this.element.querySelector<HTMLButtonElement>(".js-advantages-next");
    this.swiper = this.initSlider();

    this.prevButton?.addEventListener("click", this.handlePrevClick);
    this.nextButton?.addEventListener("click", this.handleNextClick);
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
          spaceBetween: 13,
        },
        577: {
          spaceBetween: 20,
        },
      },
    });
  }

  public destroy() {
    this.prevButton?.removeEventListener("click", this.handlePrevClick);
    this.nextButton?.removeEventListener("click", this.handleNextClick);
    this.swiper.destroy(true, true);
    this.unregister();
  }
}

export default AdvantagesSlider;
