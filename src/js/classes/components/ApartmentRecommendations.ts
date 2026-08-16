import Swiper from "swiper";
import { Navigation, Scrollbar } from "swiper/modules";

import { MOBILE_BREAKPOINT } from "../../constants/breakpoints";
import Component from "../Component";

interface ApartmentCardGallery {
  card: HTMLElement;
  element: HTMLElement;
  images: HTMLImageElement[];
  progressItems: HTMLElement[];
  activeIndex: number;
}

class ApartmentRecommendations extends Component {
  private swiper: Swiper | null = null;
  private readonly featureToggles: HTMLButtonElement[];
  private readonly galleries: ApartmentCardGallery[];
  private activeFeatureToggle: HTMLButtonElement | null = null;

  constructor(element: HTMLElement) {
    super(element);
    this.featureToggles = Array.from(
      this.element.querySelectorAll<HTMLButtonElement>(
        ".js-apartment-features-toggle"
      )
    );
    this.galleries = Array.from(
      this.element.querySelectorAll<HTMLElement>(".js-apartment-card-gallery")
    )
      .map((galleryElement) => {
        const card = galleryElement.closest<HTMLElement>(".apartment-card");

        if (!card || card.classList.contains("is-reserved")) return null;

        return {
          card,
          element: galleryElement,
          images: Array.from(
            galleryElement.querySelectorAll<HTMLImageElement>(
              ".js-apartment-card-image"
            )
          ),
          progressItems: Array.from(
            galleryElement.querySelectorAll<HTMLElement>(
              ".apartment-card__image-progress-item"
            )
          ),
          activeIndex: 0,
        };
      })
      .filter((gallery): gallery is ApartmentCardGallery => gallery !== null)
      .filter((gallery) => gallery.images.length > 1);

    this.featureToggles.forEach((toggle) => {
      toggle.addEventListener("click", this.handleFeatureToggle);
    });
    this.galleries.forEach(({ card }) => {
      card.addEventListener("mousemove", this.handleCardMouseMove);
      card.addEventListener("mouseleave", this.handleCardMouseLeave);
    });
    document.addEventListener("click", this.handleDocumentClick);
    document.addEventListener("keydown", this.handleDocumentKeyDown);

    this.initSlider();
  }

  private handleCardMouseMove = (event: MouseEvent) => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) return;

    const card = event.currentTarget;
    if (!(card instanceof HTMLElement)) return;

    const gallery = this.galleries.find(
      ({ card: galleryCard }) => galleryCard === card
    );
    if (!gallery) return;

    const bounds = gallery.element.getBoundingClientRect();
    const isInsideGallery =
      event.clientX >= bounds.left &&
      event.clientX < bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY < bounds.bottom;

    if (!isInsideGallery) {
      this.setGalleryImage(gallery, 0);
      return;
    }

    const relativeX = Math.min(
      Math.max(event.clientX - bounds.left, 0),
      bounds.width - 1
    );
    const nextIndex = Math.floor(
      (relativeX / bounds.width) * gallery.images.length
    );

    this.setGalleryImage(gallery, nextIndex);
  };

  private handleCardMouseLeave = (event: MouseEvent) => {
    const card = event.currentTarget;
    if (!(card instanceof HTMLElement)) return;

    const gallery = this.galleries.find(
      ({ card: galleryCard }) => galleryCard === card
    );
    if (gallery) this.setGalleryImage(gallery, 0);
  };

  private setGalleryImage(gallery: ApartmentCardGallery, index: number) {
    if (index === gallery.activeIndex || !gallery.images[index]) return;

    gallery.images[gallery.activeIndex]?.classList.remove("is-active");
    gallery.images[gallery.activeIndex]?.setAttribute("aria-hidden", "true");
    gallery.progressItems[gallery.activeIndex]?.classList.remove("is-active");

    gallery.images[index].classList.add("is-active");
    gallery.images[index].removeAttribute("aria-hidden");
    gallery.progressItems[index]?.classList.add("is-active");
    gallery.activeIndex = index;
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
      spaceBetween: 20,
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
    const popover = popoverId ? document.getElementById(popoverId) : null;

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
    const popover = popoverId ? document.getElementById(popoverId) : null;

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
    this.galleries.forEach(({ card }) => {
      card.removeEventListener("mousemove", this.handleCardMouseMove);
      card.removeEventListener("mouseleave", this.handleCardMouseLeave);
    });
    document.removeEventListener("click", this.handleDocumentClick);
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    this.swiper?.destroy(true, true);
    this.swiper = null;
    this.unregister();
  }
}

export default ApartmentRecommendations;
