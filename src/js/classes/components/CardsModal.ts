import Swiper from "swiper";
import { Navigation } from "swiper/modules";

import { MOBILE_BREAKPOINT } from "../../constants/breakpoints";
import {
  duplicateLoopSlides,
  removeLoopSlideDuplicates,
} from "../../utils/loopSlides";
import Component from "../Component";

class CardsModal extends Component {
  private readonly dialog: HTMLDialogElement;
  private readonly triggers: HTMLButtonElement[];
  private readonly closeButtons: HTMLButtonElement[];
  private readonly prevButton: HTMLButtonElement;
  private readonly nextButton: HTMLButtonElement;
  private readonly prevText: HTMLElement;
  private readonly nextText: HTMLElement;
  private readonly slider: HTMLElement;
  private readonly slideTitles: string[];
  private swiper: Swiper | null = null;
  private previouslyFocusedElement: HTMLElement | null = null;
  private shouldRestoreFocus = false;

  constructor(element: HTMLElement) {
    super(element);

    this.dialog = element.querySelector<HTMLDialogElement>(
      ".js-details-modal"
    ) as HTMLDialogElement;
    this.triggers = Array.from(
      element.querySelectorAll<HTMLButtonElement>(".js-details-modal-trigger")
    );
    this.closeButtons = Array.from(
      this.dialog.querySelectorAll<HTMLButtonElement>(
        ".js-details-modal-close"
      )
    );
    this.prevButton = this.dialog.querySelector<HTMLButtonElement>(
      ".js-details-modal-prev"
    ) as HTMLButtonElement;
    this.nextButton = this.dialog.querySelector<HTMLButtonElement>(
      ".js-details-modal-next"
    ) as HTMLButtonElement;
    this.prevText = this.dialog.querySelector<HTMLElement>(
      ".js-details-modal-prev-text"
    ) as HTMLElement;
    this.nextText = this.dialog.querySelector<HTMLElement>(
      ".js-details-modal-next-text"
    ) as HTMLElement;
    this.slideTitles = Array.from(
      this.dialog.querySelectorAll<HTMLElement>("[data-details-slide-title]")
    ).map((slide) => slide.dataset.detailsSlideTitle ?? "");

    this.slider = this.dialog.querySelector<HTMLElement>(
      ".js-details-modal-slider"
    ) as HTMLElement;

    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleDialogClick = this.handleDialogClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateActiveGeometry = this.updateActiveGeometry.bind(this);
    this.close = this.close.bind(this);

    this.triggers.forEach((trigger) => {
      trigger.addEventListener("click", this.handleTriggerClick);
    });
    this.closeButtons.forEach((button) => {
      button.addEventListener("click", this.close);
    });
    this.dialog.addEventListener("click", this.handleDialogClick);
    this.dialog.addEventListener("close", this.handleClose);
    window.addEventListener("resize", this.updateActiveGeometry);

    this.updateNavigation();
  }

  private initSlider() {
    if (this.swiper) return;

    duplicateLoopSlides(this.slider);

    this.swiper = new Swiper(this.slider, {
      modules: [Navigation],
      slidesPerView: "auto",
      centeredSlides: true,
      loop: true,
      spaceBetween: 14,
      speed: 500,
      watchOverflow: true,
      navigation: {
        prevEl: this.prevButton,
        nextEl: this.nextButton,
      },
      breakpoints: {
        [MOBILE_BREAKPOINT + 1]: {
          spaceBetween: 40,
        },
      },
      on: {
        slideChange: () => {
          this.updateNavigation();
          this.updateActiveGeometry();
        },
      },
    });
  }

  private handleTriggerClick(event: MouseEvent) {
    const trigger = event.currentTarget;
    if (!(trigger instanceof HTMLButtonElement)) return;

    const index = Number(trigger.dataset.detailsIndex ?? 0);
    this.open(trigger, Number.isFinite(index) ? index : 0, event.detail === 0);
  }

  private handleDialogClick(event: MouseEvent) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const isInteractiveArea = target.closest(
      ".js-details-modal-panel, .js-details-modal-nav"
    );
    if (!isInteractiveArea) {
      this.close();
    }
  }

  private open(
    trigger: HTMLElement,
    index: number,
    shouldRestoreFocus: boolean
  ) {
    this.previouslyFocusedElement = trigger;
    this.shouldRestoreFocus = shouldRestoreFocus;

    if (!this.dialog.open) {
      this.dialog.showModal();
      document.body.classList.add("modal-open");
    }

    this.initSlider();

    requestAnimationFrame(() => {
      this.swiper?.update();
      this.swiper?.slideToLoop(index, 0);
      this.updateNavigation(index);
      this.updateActiveGeometry();
    });
  }

  private close() {
    if (!this.dialog.open) return;
    this.dialog.close();
  }

  private handleClose() {
    document.body.classList.remove("modal-open");

    if (this.shouldRestoreFocus) {
      this.previouslyFocusedElement?.focus();
    } else {
      this.previouslyFocusedElement?.blur();
    }

    this.previouslyFocusedElement = null;
    this.shouldRestoreFocus = false;
  }

  private updateNavigation(index = this.swiper?.realIndex ?? 0) {
    if (this.slideTitles.length === 0) return;

    const activeIndex = (index + this.slideTitles.length) % this.slideTitles.length;
    const prevIndex =
      (activeIndex - 1 + this.slideTitles.length) % this.slideTitles.length;
    const nextIndex = (activeIndex + 1) % this.slideTitles.length;
    const prevTitle = this.slideTitles[prevIndex];
    const nextTitle = this.slideTitles[nextIndex];

    this.prevText.textContent = prevTitle;
    this.nextText.textContent = nextTitle;
    this.prevButton.setAttribute("aria-label", `Показать: ${prevTitle}`);
    this.nextButton.setAttribute("aria-label", `Показать: ${nextTitle}`);
  }

  private updateActiveGeometry() {
    requestAnimationFrame(() => {
      const activeSlide = this.dialog.querySelector<HTMLElement>(
        ".features-modal__slide.swiper-slide-active"
      );
      if (!activeSlide) return;

      const rect = activeSlide.getBoundingClientRect();
      this.dialog.style.setProperty(
        "--features-modal-active-top",
        `${rect.top}px`
      );
    });
  }

  public destroy() {
    this.triggers.forEach((trigger) => {
      trigger.removeEventListener("click", this.handleTriggerClick);
    });
    this.closeButtons.forEach((button) => {
      button.removeEventListener("click", this.close);
    });
    this.dialog.removeEventListener("click", this.handleDialogClick);
    this.dialog.removeEventListener("close", this.handleClose);
    window.removeEventListener("resize", this.updateActiveGeometry);
    this.swiper?.destroy(true, true);
    this.swiper = null;
    removeLoopSlideDuplicates(this.slider);
    this.unregister();
  }
}

export default CardsModal;
