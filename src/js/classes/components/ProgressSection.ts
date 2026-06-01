import Swiper from "swiper";
import { Navigation, Scrollbar } from "swiper/modules";

import { MOBILE_BREAKPOINT } from "../../constants/breakpoints";
import {
  duplicateLoopSlides,
  removeLoopSlideDuplicates,
} from "../../utils/loopSlides";
import Component from "../Component";

interface ProgressItem {
  image: string;
  width: number;
  height: number;
  alt: string;
  year?: string;
  quarter?: string;
}

interface ProgressUpdateDetail {
  items?: ProgressItem[];
}

interface ProgressResponse {
  items: unknown[];
}

interface ProgressFilters {
  year: string;
  quarter: string;
}

class ProgressSection extends Component {
  private readonly slider: HTMLElement | null;
  private readonly list: HTMLElement | null;
  private readonly filterInputs: HTMLInputElement[];
  private readonly emptyElement: HTMLElement | null;
  private readonly dataUrl: string;
  private readonly mediaQuery = window.matchMedia(
    `(max-width: ${MOBILE_BREAKPOINT}px)`
  );
  private abortController: AbortController | null = null;
  private swiper: Swiper | null = null;
  private readonly handleFilterChange = () => this.handleFiltersChange();
  private readonly handleContentUpdate = (event: Event) =>
    this.handleProgressUpdate(event);
  private readonly handleMediaChange = () => this.reinitSlider();

  constructor(element: HTMLElement) {
    super(element);

    this.slider = this.element.querySelector<HTMLElement>(".js-progress-slider");
    this.list = this.element.querySelector<HTMLElement>(".progress__list");
    this.filterInputs = Array.from(
      this.element.querySelectorAll<HTMLInputElement>(".js-progress-filter")
    );
    this.emptyElement =
      this.element.querySelector<HTMLElement>(".js-progress-empty");
    this.dataUrl = this.element.dataset.url ?? "";

    this.filterInputs.forEach((input) => {
      input.addEventListener("change", this.handleFilterChange);
    });
    this.element.addEventListener("progress:update", this.handleContentUpdate);
    this.mediaQuery.addEventListener("change", this.handleMediaChange);

    this.reinitSlider();

    if (this.dataUrl) {
      void this.loadItems(this.getFilterValues());
    }
  }

  private initSlider(slider: HTMLElement) {
    const isMobile = this.mediaQuery.matches;

    if (!isMobile) {
      duplicateLoopSlides(slider);
    }

    return new Swiper(slider, {
      modules: [Navigation, Scrollbar],
      slidesPerView: "auto",
      spaceBetween: isMobile ? 16 : 20,
      speed: 500,
      watchOverflow: true,
      loop: !isMobile,
      navigation: {
        prevEl: slider.querySelector<HTMLButtonElement>(".js-progress-prev"),
        nextEl: slider.querySelector<HTMLButtonElement>(".js-progress-next"),
      },
      scrollbar: {
        el: slider.querySelector<HTMLElement>(".swiper-scrollbar"),
        draggable: true,
      },
    });
  }

  private handleFiltersChange() {
    const filterValues = this.getFilterValues();

    if (this.dataUrl) {
      void this.loadItems(filterValues);
      return;
    }

    this.element.dispatchEvent(
      new CustomEvent("progress:filter-change", {
        bubbles: true,
        detail: filterValues,
      })
    );
  }

  private handleProgressUpdate(event: Event) {
    const detail = event instanceof CustomEvent
      ? (event.detail as ProgressUpdateDetail | undefined)
      : undefined;

    if (detail?.items) {
      this.renderItems(detail.items);
    }

    this.reinitSlider();
  }

  private async loadItems(filters: ProgressFilters) {
    this.abortController?.abort();
    this.abortController = new AbortController();

    try {
      const response = await fetch(this.getRequestUrl(filters), {
        signal: this.abortController.signal,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Progress request failed: ${response.status}`);
      }

      const data = (await response.json()) as unknown;
      this.renderItems(this.parseItems(data));
      this.reinitSlider();
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      console.warn("ProgressSection: failed to load items", error);
    }
  }

  private getRequestUrl(filters: ProgressFilters) {
    const url = new URL(this.dataUrl, window.location.href);

    if (filters.year) {
      url.searchParams.set("year", filters.year);
    }

    if (filters.quarter) {
      url.searchParams.set("quarter", filters.quarter);
    }

    return url;
  }

  private parseItems(data: unknown) {
    const source: unknown[] = Array.isArray(data)
      ? data
      : this.isProgressResponse(data)
        ? data.items
        : [];

    return source.filter((item): item is ProgressItem =>
      this.isProgressItem(item)
    );
  }

  private isProgressResponse(data: unknown): data is ProgressResponse {
    return (
      typeof data === "object" &&
      data !== null &&
      "items" in data &&
      Array.isArray(data.items)
    );
  }

  private isProgressItem(item: unknown): item is ProgressItem {
    if (typeof item !== "object" || item === null) {
      return false;
    }

    const progressItem = item as Partial<ProgressItem>;

    return (
      typeof progressItem.image === "string" &&
      typeof progressItem.width === "number" &&
      typeof progressItem.height === "number" &&
      typeof progressItem.alt === "string"
    );
  }

  private renderItems(items: ProgressItem[]) {
    if (!this.list) return;

    const slides = items.map((item) => {
      const slide = document.createElement("li");
      slide.className = "progress__slide swiper-slide js-progress-slide";

      if (item.year) {
        slide.dataset.year = item.year;
      }

      if (item.quarter) {
        slide.dataset.quarter = item.quarter;
      }

      const image = document.createElement("img");
      image.className = "progress__image";
      image.src = item.image;
      image.width = item.width;
      image.height = item.height;
      image.alt = item.alt;
      image.loading = "lazy";

      slide.append(image);

      return slide;
    });

    this.list.replaceChildren(...slides);
  }

  private reinitSlider() {
    this.destroySlider();

    const hasSlides = this.hasSlides();

    if (this.emptyElement) {
      this.emptyElement.hidden = hasSlides;
    }

    this.slider?.classList.toggle("progress__slider--empty", !hasSlides);

    if (this.slider && hasSlides) {
      this.swiper = this.initSlider(this.slider);
      this.swiper.slideTo(0, 0);
      this.swiper.update();
    }
  }

  private hasSlides() {
    return (
      this.element.querySelectorAll<HTMLElement>(".js-progress-slide").length >
      0
    );
  }

  private getFilterValues() {
    return {
      year: this.getCheckedValue("progress-year"),
      quarter: this.getCheckedValue("progress-quarter"),
    };
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
    this.element.removeEventListener(
      "progress:update",
      this.handleContentUpdate
    );
    this.mediaQuery.removeEventListener("change", this.handleMediaChange);
    this.abortController?.abort();
    this.destroySlider();
    this.unregister();
  }

  private destroySlider() {
    this.swiper?.destroy(true, true);
    this.swiper = null;
    if (this.slider) {
      removeLoopSlideDuplicates(this.slider);
    }
  }
}

export default ProgressSection;
