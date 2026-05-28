import Swiper from "swiper";
import { Scrollbar } from "swiper/modules";

import { MOBILE_BREAKPOINT } from "../../constants/breakpoints";
import Component from "../Component";

class ProgressSection extends Component {
  private readonly slider: HTMLElement | null;
  private readonly slides: HTMLElement[];
  private readonly filterInputs: HTMLInputElement[];
  private readonly emptyElement: HTMLElement | null;
  private readonly prevButton: HTMLButtonElement | null;
  private readonly nextButton: HTMLButtonElement | null;
  private readonly swiper: Swiper | null;
  private readonly desktopMediaQuery = window.matchMedia(
    `(min-width: ${MOBILE_BREAKPOINT + 1}px)`
  );
  private readonly handleMediaChange = () => this.updateNavigationState();
  private readonly handlePrevClick = () => {
    if (
      this.desktopMediaQuery.matches &&
      this.swiper?.isBeginning &&
      !this.swiper.isLocked
    ) {
      this.slideToLastVisible();
      return;
    }

    this.swiper?.slidePrev();
  };
  private readonly handleNextClick = () => {
    if (
      this.desktopMediaQuery.matches &&
      this.swiper?.isEnd &&
      !this.swiper.isLocked
    ) {
      this.swiper.slideTo(0);
      return;
    }

    this.swiper?.slideNext();
  };
  private readonly handleFilterChange = () => this.updateFilter();
  private readonly updateNavigationState = () => {
    const isDesktop = this.desktopMediaQuery.matches;
    const isLocked = Boolean(this.swiper?.isLocked);

    this.prevButton?.classList.toggle(
      "swiper-button-disabled",
      isLocked || (!isDesktop && Boolean(this.swiper?.isBeginning))
    );
    this.prevButton?.toggleAttribute(
      "disabled",
      isLocked || (!isDesktop && Boolean(this.swiper?.isBeginning))
    );
    this.nextButton?.classList.toggle(
      "swiper-button-disabled",
      isLocked || (!isDesktop && Boolean(this.swiper?.isEnd))
    );
    this.nextButton?.toggleAttribute(
      "disabled",
      isLocked || (!isDesktop && Boolean(this.swiper?.isEnd))
    );
  };

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
    this.prevButton =
      this.element.querySelector<HTMLButtonElement>(".js-progress-prev");
    this.nextButton =
      this.element.querySelector<HTMLButtonElement>(".js-progress-next");
    this.swiper = this.slider ? this.initSlider(this.slider) : null;

    this.prevButton?.addEventListener("click", this.handlePrevClick);
    this.nextButton?.addEventListener("click", this.handleNextClick);
    this.desktopMediaQuery.addEventListener("change", this.handleMediaChange);
    this.swiper?.on("slideChange", this.updateNavigationState);
    this.swiper?.on("update", this.updateNavigationState);
    this.filterInputs.forEach((input) => {
      input.addEventListener("change", this.handleFilterChange);
    });

    this.updateFilter();
    this.updateNavigationState();
  }

  private initSlider(slider: HTMLElement) {
    return new Swiper(slider, {
      modules: [Scrollbar],
      slidesPerView: "auto",
      spaceBetween: 20,
      speed: 500,
      watchOverflow: true,
      scrollbar: {
        el: slider.querySelector<HTMLElement>(".swiper-scrollbar"),
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
    this.updateNavigationState();
  }

  private getCheckedValue(name: string) {
    const checkedInput = this.filterInputs.find(
      (input) => input.name === name && input.checked
    );

    return checkedInput?.value ?? "";
  }

  private slideToLastVisible() {
    const lastVisibleSlideIndex = this.slides.reduce(
      (lastIndex, slide, index) => (slide.hidden ? lastIndex : index),
      0
    );

    this.swiper?.slideTo(lastVisibleSlideIndex);
  }

  public destroy() {
    this.prevButton?.removeEventListener("click", this.handlePrevClick);
    this.nextButton?.removeEventListener("click", this.handleNextClick);
    this.desktopMediaQuery.removeEventListener("change", this.handleMediaChange);
    this.swiper?.off("slideChange", this.updateNavigationState);
    this.swiper?.off("update", this.updateNavigationState);
    this.filterInputs.forEach((input) => {
      input.removeEventListener("change", this.handleFilterChange);
    });
    this.swiper?.destroy(true, true);
    this.unregister();
  }
}

export default ProgressSection;
