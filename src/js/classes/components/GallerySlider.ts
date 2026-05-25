import Swiper from "swiper";
import { Scrollbar } from "swiper/modules";

import Component from "../Component";

class GallerySlider extends Component {
  private readonly swiper: Swiper;
  private readonly prevButton: HTMLButtonElement | null;
  private readonly nextButton: HTMLButtonElement | null;
  private readonly handlePrevClick = () => this.swiper.slidePrev();
  private readonly handleNextClick = () => this.swiper.slideNext();
  private readonly updateNavigationState = () => {
    this.prevButton?.classList.toggle(
      "swiper-button-disabled",
      this.swiper.isBeginning
    );
    this.prevButton?.toggleAttribute("disabled", this.swiper.isBeginning);
    this.nextButton?.classList.toggle(
      "swiper-button-disabled",
      this.swiper.isEnd
    );
    this.nextButton?.toggleAttribute("disabled", this.swiper.isEnd);
  };

  constructor(element: HTMLElement) {
    super(element);

    this.prevButton = this.element.querySelector<HTMLButtonElement>(".js-gallery-prev");
    this.nextButton = this.element.querySelector<HTMLButtonElement>(".js-gallery-next");
    this.swiper = this.initSlider();

    this.prevButton?.addEventListener("click", this.handlePrevClick);
    this.nextButton?.addEventListener("click", this.handleNextClick);
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

  public destroy() {
    this.prevButton?.removeEventListener("click", this.handlePrevClick);
    this.nextButton?.removeEventListener("click", this.handleNextClick);
    this.swiper.off("slideChange", this.updateNavigationState);
    this.swiper.off("update", this.updateNavigationState);
    this.swiper.destroy(true, true);
    this.unregister();
  }
}

export default GallerySlider;
