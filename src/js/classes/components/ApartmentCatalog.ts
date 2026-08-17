import Component from "../Component";

interface CatalogRange {
  element: HTMLElement;
  min: number;
  max: number;
  initialMin: number;
  initialMax: number;
  minRange: HTMLInputElement;
  maxRange: HTMLInputElement;
  minValue: HTMLInputElement;
  maxValue: HTMLInputElement;
}

class ApartmentCatalog extends Component {
  private readonly form: HTMLFormElement | null;
  private readonly modal: HTMLElement | null;
  private readonly openButton: HTMLButtonElement | null;
  private readonly closeButton: HTMLButtonElement | null;
  private readonly moreButton: HTMLButtonElement | null;
  private readonly featuresMoreButton: HTMLButtonElement | null;
  private readonly featuresGroup: HTMLElement | null;
  private readonly sort: HTMLElement | null;
  private readonly sortTrigger: HTMLButtonElement | null;
  private readonly sortDropdown: HTMLElement | null;
  private readonly sortLabel: HTMLElement | null;
  private readonly sortOptions: HTMLInputElement[];
  private readonly sortMobileSlot: HTMLElement | null;
  private readonly sortDesktopSlot: HTMLElement | null;
  private readonly mobileMedia = window.matchMedia("(max-width: 576px)");
  private readonly ranges: CatalogRange[];
  private readonly eventController = new AbortController();
  private previouslyFocusedElement: HTMLElement | null = null;
  private isFilterOpen = false;
  private isSortOpen = false;
  private resetRaf = 0;
  private sortCloseTimer = 0;

  constructor(element: HTMLElement) {
    super(element);

    this.form = this.element.querySelector<HTMLFormElement>(
      ".js-catalog-filter"
    );
    this.modal = this.element.querySelector<HTMLElement>(
      ".js-catalog-filter-modal"
    );
    this.openButton = this.element.querySelector<HTMLButtonElement>(
      ".js-catalog-filter-open"
    );
    this.closeButton = this.element.querySelector<HTMLButtonElement>(
      ".js-catalog-filter-close"
    );
    this.moreButton = this.element.querySelector<HTMLButtonElement>(
      ".js-catalog-filter-more"
    );
    this.featuresMoreButton = this.element.querySelector<HTMLButtonElement>(
      ".js-catalog-features-more"
    );
    this.featuresGroup = this.featuresMoreButton?.closest<HTMLElement>(
      ".catalog-filter__group--features"
    ) ?? null;
    this.sort = this.element.querySelector<HTMLElement>(".js-catalog-sort");
    this.sortTrigger = this.element.querySelector<HTMLButtonElement>(
      ".js-catalog-sort-trigger"
    );
    this.sortDropdown = this.element.querySelector<HTMLElement>(
      ".js-catalog-sort-dropdown"
    );
    this.sortLabel = this.element.querySelector<HTMLElement>(
      ".js-catalog-sort-label"
    );
    this.sortOptions = Array.from(
      this.element.querySelectorAll<HTMLInputElement>(
        ".js-catalog-sort-option"
      )
    );
    this.sortMobileSlot = this.element.querySelector<HTMLElement>(
      ".js-catalog-sort-mobile-slot"
    );
    this.sortDesktopSlot = this.element.querySelector<HTMLElement>(
      ".js-catalog-sort-desktop-slot"
    );
    this.ranges = Array.from(
      this.element.querySelectorAll<HTMLElement>(".js-catalog-range")
    )
      .map((rangeElement) => this.createRange(rangeElement))
      .filter((range): range is CatalogRange => range !== null);

    this.ranges.forEach((range) => this.initRange(range));
    this.form?.addEventListener("submit", this.handleSubmit, {
      signal: this.eventController.signal,
    });
    this.form?.addEventListener("reset", this.handleReset, {
      signal: this.eventController.signal,
    });
    this.openButton?.addEventListener("click", this.openFilter, {
      signal: this.eventController.signal,
    });
    this.closeButton?.addEventListener("click", this.closeFilter, {
      signal: this.eventController.signal,
    });
    this.moreButton?.addEventListener("click", this.toggleAdditionalFilters, {
      signal: this.eventController.signal,
    });
    this.featuresMoreButton?.addEventListener(
      "click",
      this.toggleAdditionalFeatures,
      { signal: this.eventController.signal }
    );
    this.sortTrigger?.addEventListener("click", this.toggleSort, {
      signal: this.eventController.signal,
    });
    this.sortOptions.forEach((option) => {
      option.addEventListener("change", this.handleSortChange, {
        signal: this.eventController.signal,
      });
    });
    this.modal?.addEventListener("click", this.handleModalClick, {
      signal: this.eventController.signal,
    });
    document.addEventListener("keydown", this.handleDocumentKeyDown, {
      signal: this.eventController.signal,
    });
    document.addEventListener("click", this.handleDocumentClick, {
      signal: this.eventController.signal,
    });
    this.mobileMedia.addEventListener("change", this.handleMediaChange, {
      signal: this.eventController.signal,
    });

    this.moveSort();
    this.updateSortLabel();
    this.updateModalAccessibility();
  }

  private createRange(element: HTMLElement): CatalogRange | null {
    const minRange = element.querySelector<HTMLInputElement>(
      ".js-catalog-range-min"
    );
    const maxRange = element.querySelector<HTMLInputElement>(
      ".js-catalog-range-max"
    );
    const minValue = element.querySelector<HTMLInputElement>(
      ".js-catalog-range-value-min"
    );
    const maxValue = element.querySelector<HTMLInputElement>(
      ".js-catalog-range-value-max"
    );

    if (!minRange || !maxRange || !minValue || !maxValue) return null;

    return {
      element,
      min: Number(element.dataset.min),
      max: Number(element.dataset.max),
      initialMin: Number(element.dataset.initialMin),
      initialMax: Number(element.dataset.initialMax),
      minRange,
      maxRange,
      minValue,
      maxValue,
    };
  }

  private initRange(range: CatalogRange) {
    range.minRange.addEventListener(
      "input",
      () => {
        this.setRange(range, Number(range.minRange.value), Number(range.maxRange.value), "min");
      },
      { signal: this.eventController.signal }
    );
    range.maxRange.addEventListener(
      "input",
      () => {
        this.setRange(range, Number(range.minRange.value), Number(range.maxRange.value), "max");
      },
      { signal: this.eventController.signal }
    );

    [range.minValue, range.maxValue].forEach((input) => {
      input.addEventListener(
        "input",
        () => {
          input.value = input.value.replace(/[^\d]/g, "");
        },
        { signal: this.eventController.signal }
      );
      input.addEventListener("keydown", this.handleValueKeyDown, {
        signal: this.eventController.signal,
      });
    });

    range.minValue.addEventListener(
      "change",
      () => {
        this.setRange(
          range,
          this.parseValue(range.minValue.value),
          Number(range.maxRange.value),
          "min"
        );
      },
      { signal: this.eventController.signal }
    );
    range.maxValue.addEventListener(
      "change",
      () => {
        this.setRange(
          range,
          Number(range.minRange.value),
          this.parseValue(range.maxValue.value),
          "max"
        );
      },
      { signal: this.eventController.signal }
    );

    this.setRange(range, range.initialMin, range.initialMax);
  }

  private setRange(
    range: CatalogRange,
    nextMin: number,
    nextMax: number,
    changed?: "min" | "max"
  ) {
    let minValue = Number.isFinite(nextMin) ? nextMin : range.min;
    let maxValue = Number.isFinite(nextMax) ? nextMax : range.max;

    minValue = Math.min(Math.max(minValue, range.min), range.max);
    maxValue = Math.min(Math.max(maxValue, range.min), range.max);

    if (minValue > maxValue) {
      if (changed === "max") minValue = maxValue;
      else maxValue = minValue;
    }

    range.minRange.value = String(minValue);
    range.maxRange.value = String(maxValue);
    range.minValue.value = this.formatValue(minValue);
    range.maxValue.value = this.formatValue(maxValue);

    const rangeSize = range.max - range.min || 1;
    const minPosition = ((minValue - range.min) / rangeSize) * 100;
    const maxPosition = ((maxValue - range.min) / rangeSize) * 100;
    range.element.style.setProperty("--range-min", `${minPosition}%`);
    range.element.style.setProperty("--range-max", `${maxPosition}%`);
    range.minRange.style.zIndex = minValue === maxValue ? "3" : "2";
  }

  private parseValue(value: string) {
    return Number(value.replace(/\D/g, ""));
  }

  private formatValue(value: number) {
    return new Intl.NumberFormat("ru-RU")
      .format(value)
      .replace(/\u00a0/g, " ");
  }

  private handleValueKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Enter") return;

    event.preventDefault();
    if (event.currentTarget instanceof HTMLInputElement) {
      event.currentTarget.blur();
    }
  };

  private handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (this.isFilterOpen) this.closeFilter();
  };

  private handleReset = () => {
    if (this.resetRaf) cancelAnimationFrame(this.resetRaf);

    this.resetRaf = requestAnimationFrame(() => {
      this.resetRaf = 0;
      this.ranges.forEach((range) => {
        this.setRange(range, range.initialMin, range.initialMax);
      });
    });
  };

  private openFilter = () => {
    if (!this.mobileMedia.matches || !this.modal || this.isFilterOpen) return;

    this.isFilterOpen = true;
    this.previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    this.modal.classList.add("is-open");
    this.modal.setAttribute("role", "dialog");
    this.modal.setAttribute("aria-modal", "true");
    this.modal.setAttribute("aria-label", "Фильтр квартир");
    this.modal.removeAttribute("aria-hidden");
    this.openButton?.setAttribute("aria-expanded", "true");

    requestAnimationFrame(() => this.closeButton?.focus());
  };

  private closeFilter = () => {
    if (!this.modal || !this.isFilterOpen) return;

    this.isFilterOpen = false;
    this.modal.classList.remove("is-open", "is-expanded");
    this.modal.removeAttribute("role");
    this.modal.removeAttribute("aria-modal");
    this.modal.removeAttribute("aria-label");
    this.openButton?.setAttribute("aria-expanded", "false");
    this.moreButton?.setAttribute("aria-expanded", "false");
    this.updateModalAccessibility();
    this.previouslyFocusedElement?.focus();
    this.previouslyFocusedElement = null;
  };

  private toggleAdditionalFilters = () => {
    if (!this.modal || !this.moreButton) return;

    const isExpanded = this.modal.classList.toggle("is-expanded");
    this.moreButton.setAttribute("aria-expanded", String(isExpanded));

    if (!isExpanded) this.modal.scrollTo({ top: 0, behavior: "smooth" });
  };

  private toggleAdditionalFeatures = () => {
    if (!this.featuresGroup || !this.featuresMoreButton) return;

    const isExpanded = this.featuresGroup.classList.toggle("is-expanded");
    this.featuresMoreButton.setAttribute("aria-expanded", String(isExpanded));
    this.featuresMoreButton.setAttribute(
      "aria-label",
      isExpanded
        ? "Скрыть остальные преимущества"
        : "Показать остальные преимущества"
    );
  };

  private handleModalClick = (event: MouseEvent) => {
    if (event.target === this.modal) this.closeFilter();
  };

  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && this.isSortOpen) {
      event.preventDefault();
      this.closeSort();
      this.sortTrigger?.focus();
      return;
    }

    if (!this.isFilterOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      this.closeFilter();
      return;
    }

    if (event.key !== "Tab" || !this.form) return;

    const focusableElements = Array.from(
      this.form.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => element.getClientRects().length > 0);

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  private handleDocumentClick = (event: MouseEvent) => {
    if (!this.isSortOpen || !(event.target instanceof Node)) return;
    if (
      !this.sort?.contains(event.target) &&
      !this.sortTrigger?.contains(event.target)
    ) {
      this.closeSort();
    }
  };

  private toggleSort = () => {
    if (this.isSortOpen) this.closeSort();
    else this.openSort();
  };

  private openSort() {
    if (!this.sort || !this.sortTrigger || !this.sortDropdown) return;

    if (this.sortCloseTimer) {
      window.clearTimeout(this.sortCloseTimer);
      this.sortCloseTimer = 0;
    }

    this.isSortOpen = true;
    this.sort.classList.remove("is-closing");
    this.sort.classList.add("is-open");
    this.sortTrigger.setAttribute("aria-expanded", "true");
    this.sortDropdown.setAttribute("aria-hidden", "false");
  }

  private closeSort() {
    if (!this.sort || !this.sortTrigger || !this.sortDropdown) return;

    const shouldAnimate = this.isSortOpen;
    this.isSortOpen = false;
    if (shouldAnimate) this.sort.classList.add("is-closing");
    this.sort.classList.remove("is-open");
    this.sortTrigger.setAttribute("aria-expanded", "false");
    this.sortDropdown.setAttribute("aria-hidden", "true");

    if (!shouldAnimate) return;

    if (this.sortCloseTimer) window.clearTimeout(this.sortCloseTimer);
    this.sortCloseTimer = window.setTimeout(() => {
      this.sort?.classList.remove("is-closing");
      this.sortCloseTimer = 0;
    }, 320);
  }

  private handleSortChange = () => {
    this.updateSortLabel();
    this.sortApartments();
    this.closeSort();
    this.sortTrigger?.focus();
  };

  private sortApartments() {
    const selectedValue = this.sortOptions.find(
      (option) => option.checked
    )?.value;
    if (!selectedValue) return;

    const apartments = Array.from(
      this.element.querySelectorAll<HTMLElement>(".apartment-catalog__item")
    ).filter((item) => item.querySelector(".apartment-card--catalog"));

    const sortedApartments = apartments
      .map((element, index) => {
        const price = this.parseNumericText(
          element.querySelector(".apartment-card__price strong")?.textContent
        );
        const area = this.parseNumericText(
          element.querySelector(".apartment-card__meta span")?.textContent
        );

        return { element, index, price, area };
      })
      .sort((first, second) => {
        const direction = selectedValue.endsWith("-desc") ? -1 : 1;
        const field = selectedValue.startsWith("area") ? "area" : "price";
        const difference = (first[field] - second[field]) * direction;

        return difference || first.index - second.index;
      })
      .map(({ element }) => element);

    const slots = apartments.map(() =>
      document.createComment("apartment-sort-slot")
    );
    apartments.forEach((apartment, index) => apartment.replaceWith(slots[index]));
    slots.forEach((slot, index) => slot.replaceWith(sortedApartments[index]));
  }

  private parseNumericText(value: string | null | undefined) {
    return Number(
      (value ?? "")
        .replace(/\s/g, "")
        .replace(",", ".")
        .replace(/[^\d.]/g, "")
    );
  }

  private updateSortLabel() {
    const selectedOption = this.sortOptions.find((option) => option.checked);
    const optionLabel = selectedOption
      ?.closest<HTMLLabelElement>(".catalog-sort__option")
      ?.querySelector<HTMLElement>(":scope > span:first-of-type")
      ?.textContent?.trim();

    if (!optionLabel) return;

    if (this.sortLabel) this.sortLabel.textContent = optionLabel;
    this.sortTrigger?.setAttribute(
      "aria-label",
      `Сортировка квартир: ${optionLabel}`
    );
  }

  private moveSort() {
    if (!this.sort || !this.sortTrigger) return;

    const nextSlot = this.mobileMedia.matches
      ? this.sortMobileSlot
      : this.sortDesktopSlot;
    nextSlot?.append(this.sortTrigger, this.sort);
  }

  private handleMediaChange = () => {
    this.closeSort();
    this.moveSort();
    if (!this.mobileMedia.matches) this.closeFilter();
    this.updateModalAccessibility();
  };

  private updateModalAccessibility() {
    if (!this.modal) return;

    if (this.mobileMedia.matches && !this.isFilterOpen) {
      this.modal.setAttribute("aria-hidden", "true");
    } else {
      this.modal.removeAttribute("aria-hidden");
    }
  }

  public destroy() {
    this.closeFilter();
    this.closeSort();
    if (this.sort && this.sortTrigger) {
      this.sortDesktopSlot?.append(this.sortTrigger, this.sort);
    }
    this.eventController.abort();
    if (this.resetRaf) cancelAnimationFrame(this.resetRaf);
    if (this.sortCloseTimer) window.clearTimeout(this.sortCloseTimer);
    this.unregister();
  }
}

export default ApartmentCatalog;
