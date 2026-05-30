import Swiper from "swiper";
import { Navigation, Scrollbar } from "swiper/modules";

import { MOBILE_BREAKPOINT } from "../../constants/breakpoints";
import Component from "../Component";

class ProgressSection extends Component {
  private readonly slider: HTMLElement | null;
  private readonly slides: HTMLElement[];
  private readonly filterInputs: HTMLInputElement[];
  private readonly emptyElement: HTMLElement | null;
  private readonly swiper: Swiper | null;
  private readonly handleFilterChange = () => this.updateFilter();

  constructor(element: HTMLElement) {
    super(element);

    this.slider = this.element.querySelector<HTMLElement>(".js-progress-slider");
    this.slides = Array.from(
      this.element.querySelectorAll<HTMLElement>(".js-progress-slide")
    );
    this.filterInputs = Array.from(
      this.element.querySelectorAll<HTMLInputElement>(".js-progress-filter")
    );
    this.emptyElement =
      this.element.querySelector<HTMLElement>(".js-progress-empty");
    this.swiper = this.slider ? this.initSlider(this.slider) : null;

    this.filterInputs.forEach((input) => {
      input.addEventListener("change", this.handleFilterChange);
    });

    this.updateFilter();
  }

  private initSlider(slider: HTMLElement) {
    return new Swiper(slider, {
      modules: [Navigation, Scrollbar],
      slidesPerView: "auto",
      spaceBetween: 20,
      speed: 500,
      watchOverflow: true,
      navigation: {
        prevEl: slider.querySelector<HTMLButtonElement>(".js-progress-prev"),
        nextEl: slider.querySelector<HTMLButtonElement>(".js-progress-next"),
      },
      scrollbar: {
        el: slider.querySelector<HTMLElement>(".swiper-scrollbar"),
        draggable: true,
      },
      breakpoints: {
        0: {
          loop: false,
          spaceBetween: 16,
        },
        [MOBILE_BREAKPOINT + 1]: {
          loop: true,
          spaceBetween: 20,
        },
      },
    });
  }

  private updateFilter() {
    const year = this.getCheckedValue("progress-year");
    const quarter = this.getCheckedValue("progress-quarter");
    let visibleCount = 0;

    this.slides.forEach((slide) => {
      const matchesYear = !year || slide.dataset.year === year;
      const matchesQuarter = !quarter || slide.dataset.quarter === quarter;
      const isVisible = matchesYear && matchesQuarter;

      slide.hidden = !isVisible;
      if (isVisible) {
        visibleCount += 1;
      }
    });

    if (this.emptyElement) {
      this.emptyElement.hidden = visibleCount > 0;
    }

    this.swiper?.slideTo(0, 0);
    this.swiper?.update();
  }

  private getCheckedValue(name: string) {
    const checkedInput = this.filterInputs.find(
      (input) => input.name === name && input.checked
    );

    return checkedInput?.value ?? "";
  }

  public destroy() {
    this.filterInputs.forEach((input) => {
      input.removeEventListener("change", this.handleFilterChange);
    });
    this.swiper?.destroy(true, true);
    this.unregister();
  }
}

export default ProgressSection;
