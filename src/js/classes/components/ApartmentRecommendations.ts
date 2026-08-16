import Swiper from "swiper";
import { Navigation, Scrollbar } from "swiper/modules";

import { MOBILE_BREAKPOINT } from "../../constants/breakpoints";
import Component from "../Component";

class ApartmentRecommendations extends Component {
  private swiper: Swiper | null = null;
  private readonly featureToggles: HTMLButtonElement[];
  private activeFeatureToggle: HTMLButtonElement | null = null;

  constructor(element: HTMLElement) {
    super(element);
    this.featureToggles = Array.from(
      this.element.querySelectorAll<HTMLButtonElement>(
        ".js-apartment-features-toggle"
      )
    );

    this.featureToggles.forEach((toggle) => {
      toggle.addEventListener("click", this.handleFeatureToggle);
    });
    document.addEventListener("click", this.handleDocumentClick);
    document.addEventListener("keydown", this.handleDocumentKeyDown);

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
      on: {
        slideChangeTransitionStart: () => this.closeFeaturePopover(),
      },
    });
  }

  private handleFeatureToggle = (event: MouseEvent) => {
    event.stopPropagation();

    const toggle = event.currentTarget;
    if (!(toggle instanceof HTMLButtonElement)) return;

    if (toggle === this.activeFeatureToggle) {
      this.closeFeaturePopover();
      return;
    }

    this.closeFeaturePopover();

    const card = toggle.closest<HTMLElement>(".apartment-card");
    const popoverId = toggle.getAttribute("aria-controls");
    const popover = popoverId
      ? document.getElementById(popoverId)
      : null;

    if (!card || !(popover instanceof HTMLElement)) return;

    card.classList.add("is-features-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Скрыть особенности квартиры");
    this.activeFeatureToggle = toggle;
  };

  private handleDocumentClick = (event: MouseEvent) => {
    if (!this.activeFeatureToggle) return;

    const target = event.target;
    if (!(target instanceof Node)) return;

    const popoverId = this.activeFeatureToggle.getAttribute("aria-controls");
    const popover = popoverId
      ? document.getElementById(popoverId)
      : null;

    if (
      this.activeFeatureToggle.contains(target) ||
      popover?.contains(target)
    ) {
      return;
    }

    this.closeFeaturePopover();
  };

  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Escape" || !this.activeFeatureToggle) return;

    const toggle = this.activeFeatureToggle;
    this.closeFeaturePopover();
    toggle.focus();
  };

  private closeFeaturePopover() {
    if (!this.activeFeatureToggle) return;

    const toggle = this.activeFeatureToggle;
    const card = toggle.closest<HTMLElement>(".apartment-card");

    card?.classList.remove("is-features-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Показать все особенности квартиры");
    this.activeFeatureToggle = null;
  }

  public destroy() {
    this.closeFeaturePopover();
    this.featureToggles.forEach((toggle) => {
      toggle.removeEventListener("click", this.handleFeatureToggle);
    });
    document.removeEventListener("click", this.handleDocumentClick);
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    this.swiper?.destroy(true, true);
    this.swiper = null;
    this.unregister();
  }
}

export default ApartmentRecommendations;
