import Swiper from "swiper";
import { Navigation } from "swiper/modules";

import Component from "../Component";

class FeaturesModal extends Component {
  private readonly dialog: HTMLDialogElement;
  private readonly cards: HTMLButtonElement[];
  private readonly closeButtons: HTMLButtonElement[];
  private readonly prevButton: HTMLButtonElement;
  private readonly nextButton: HTMLButtonElement;
  private readonly prevText: HTMLElement;
  private readonly nextText: HTMLElement;
  private readonly slideTitles: string[];
  private swiper: Swiper | null = null;
  private previouslyFocusedElement: HTMLElement | null = null;
  private shouldRestoreFocus = false;

  constructor(element: HTMLElement) {
    super(element);

    this.dialog = element.querySelector<HTMLDialogElement>(
      ".js-features-modal"
    ) as HTMLDialogElement;
    this.cards = Array.from(
      element.querySelectorAll<HTMLButtonElement>(".js-features-card")
    );
    this.closeButtons = Array.from(
      this.dialog.querySelectorAll<HTMLButtonElement>(
        ".js-features-modal-close"
      )
    );
    this.prevButton = this.dialog.querySelector<HTMLButtonElement>(
      ".js-features-modal-prev"
    ) as HTMLButtonElement;
    this.nextButton = this.dialog.querySelector<HTMLButtonElement>(
      ".js-features-modal-next"
    ) as HTMLButtonElement;
    this.prevText = this.dialog.querySelector<HTMLElement>(
      ".js-features-modal-prev-text"
    ) as HTMLElement;
    this.nextText = this.dialog.querySelector<HTMLElement>(
      ".js-features-modal-next-text"
    ) as HTMLElement;
    this.slideTitles = Array.from(
      this.dialog.querySelectorAll<HTMLElement>("[data-features-slide-title]")
    ).map((slide) => slide.dataset.featuresSlideTitle ?? "");

    const slider = this.dialog.querySelector<HTMLElement>(
      ".js-features-modal-slider"
    ) as HTMLElement;
    this.swiper = new Swiper(slider, {
      modules: [Navigation],
      slidesPerView: "auto",
      centeredSlides: true,
      loop: true,
      spaceBetween: 40,
      speed: 500,
      watchOverflow: true,
      navigation: {
        prevEl: this.prevButton,
        nextEl: this.nextButton,
      },
      on: {
        slideChange: () => this.updateNavigation(),
      },
    });

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleDialogClick = this.handleDialogClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.close = this.close.bind(this);

    this.cards.forEach((card) => {
      card.addEventListener("click", this.handleCardClick);
    });
    this.closeButtons.forEach((button) => {
      button.addEventListener("click", this.close);
    });
    this.dialog.addEventListener("click", this.handleDialogClick);
    this.dialog.addEventListener("close", this.handleClose);

    this.updateNavigation();
  }

  private handleCardClick(event: MouseEvent) {
    const trigger = event.currentTarget;
    if (!(trigger instanceof HTMLButtonElement)) return;

    const index = Number(trigger.dataset.featuresIndex ?? 0);
    this.open(trigger, Number.isFinite(index) ? index : 0, event.detail === 0);
  }

  private handleDialogClick(event: MouseEvent) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const isInteractiveArea = target.closest(
      ".features-modal__panel, .features-modal__nav"
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

    requestAnimationFrame(() => {
      this.swiper?.update();
      this.swiper?.slideToLoop(index, 0);
      this.updateNavigation(index);
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

  public destroy() {
    this.cards.forEach((card) => {
      card.removeEventListener("click", this.handleCardClick);
    });
    this.closeButtons.forEach((button) => {
      button.removeEventListener("click", this.close);
    });
    this.dialog.removeEventListener("click", this.handleDialogClick);
    this.dialog.removeEventListener("close", this.handleClose);
    this.swiper?.destroy(true, true);
    this.swiper = null;
    this.unregister();
  }
}

export default FeaturesModal;
