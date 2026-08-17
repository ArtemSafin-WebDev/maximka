import Component from "../Component";
import CatalogApi, {
  CatalogApiError,
  type CatalogFacets,
  type CatalogOptionFacet,
  type CatalogResponse,
} from "../services/CatalogApi";
import renderApartmentCard from "../../utils/renderApartmentCard";
import ApartmentRecommendations from "./ApartmentRecommendations";

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

type CatalogLoadMode = "replace" | "append";

const CATALOG_URL_KEYS = [
  "rooms",
  "priceMin",
  "priceMax",
  "areaMin",
  "areaMax",
  "entrances",
  "floorMin",
  "floorMax",
  "floorOptions",
  "features",
  "hideReserved",
  "sort",
];

class ApartmentCatalog extends Component {
  private readonly form: HTMLFormElement | null;
  private readonly modal: HTMLElement | null;
  private readonly openButton: HTMLButtonElement | null;
  private readonly filterCount: HTMLElement | null;
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
  private readonly results: HTMLElement | null;
  private readonly grid: HTMLElement | null;
  private readonly count: HTMLOutputElement | null;
  private readonly loadMoreButton: HTMLButtonElement | null;
  private readonly loadMoreCount: HTMLElement | null;
  private readonly remainingCount: HTMLElement | null;
  private readonly emptyElement: HTMLElement | null;
  private readonly errorElement: HTMLElement | null;
  private readonly errorText: HTMLElement | null;
  private readonly retryButton: HTMLButtonElement | null;
  private readonly statusElement: HTMLElement | null;
  private readonly hideReservedInput: HTMLInputElement | null;
  private readonly contactItem: HTMLElement | null;
  private readonly mortgageItem: HTMLElement | null;
  private readonly api: CatalogApi | null;
  private readonly pageSize: number;
  private readonly mobileMedia = window.matchMedia("(max-width: 576px)");
  private readonly ranges: CatalogRange[];
  private readonly eventController = new AbortController();
  private requestController: AbortController | null = null;
  private requestId = 0;
  private nextCursor: string | null = null;
  private lastFailedMode: CatalogLoadMode = "replace";
  private lastFailedParams: URLSearchParams | null = null;
  private readonly loadedIds = new Set<string>();
  private hasLoadedOnce = false;
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
    this.filterCount = this.element.querySelector<HTMLElement>(
      ".js-catalog-filter-count"
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
    this.results = this.element.querySelector<HTMLElement>(
      ".apartment-catalog__results"
    );
    this.grid = this.element.querySelector<HTMLElement>(".js-catalog-grid");
    this.count = this.element.querySelector<HTMLOutputElement>(
      ".js-catalog-count"
    );
    this.loadMoreButton = this.element.querySelector<HTMLButtonElement>(
      ".js-catalog-more"
    );
    this.loadMoreCount = this.element.querySelector<HTMLElement>(
      ".js-catalog-more-count"
    );
    this.remainingCount = this.element.querySelector<HTMLElement>(
      ".js-catalog-remaining"
    );
    this.emptyElement = this.element.querySelector<HTMLElement>(
      ".js-catalog-empty"
    );
    this.errorElement = this.element.querySelector<HTMLElement>(
      ".js-catalog-error"
    );
    this.errorText = this.element.querySelector<HTMLElement>(
      ".js-catalog-error-text"
    );
    this.retryButton = this.element.querySelector<HTMLButtonElement>(
      ".js-catalog-retry"
    );
    this.statusElement = this.element.querySelector<HTMLElement>(
      ".js-catalog-status"
    );
    this.hideReservedInput = this.element.querySelector<HTMLInputElement>(
      'input[name="hide-reserved"]'
    );
    this.contactItem = this.grid?.querySelector<HTMLElement>(
      ".apartment-catalog__item--contact"
    ) ?? null;
    this.mortgageItem = this.grid?.querySelector<HTMLElement>(
      ".apartment-catalog__item--mortgage"
    ) ?? null;
    const dataUrl = this.element.dataset.url ?? "";
    this.api = dataUrl ? new CatalogApi(dataUrl) : null;
    const configuredPageSize = Number(this.element.dataset.pageSize);
    this.pageSize =
      Number.isInteger(configuredPageSize) && configuredPageSize > 0
        ? Math.min(configuredPageSize, 50)
        : 15;
    this.ranges = Array.from(
      this.element.querySelectorAll<HTMLElement>(".js-catalog-range")
    )
      .map((rangeElement) => this.createRange(rangeElement))
      .filter((range): range is CatalogRange => range !== null);

    this.ranges.forEach((range) => this.initRange(range));
    this.restoreStateFromUrl();
    this.form?.addEventListener("submit", this.handleSubmit, {
      signal: this.eventController.signal,
    });
    this.form?.addEventListener("reset", this.handleReset, {
      signal: this.eventController.signal,
    });
    this.form?.addEventListener("change", this.updateFilterCount, {
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
    this.hideReservedInput?.addEventListener(
      "change",
      this.handleHideReservedChange,
      { signal: this.eventController.signal }
    );
    this.loadMoreButton?.addEventListener("click", this.handleLoadMore, {
      signal: this.eventController.signal,
    });
    this.retryButton?.addEventListener("click", this.handleRetry, {
      signal: this.eventController.signal,
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
    this.updateFilterCount();
    this.updateSortLabel();
    this.updateModalAccessibility();

    if (this.api) {
      void this.loadApartments("replace");
    }
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
    this.updateFilterCount();
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

    if (this.api) {
      void this.loadApartments("replace");
    } else if (this.isFilterOpen) {
      this.closeFilter();
    }
  };

  private handleReset = () => {
    if (this.resetRaf) cancelAnimationFrame(this.resetRaf);

    this.resetRaf = requestAnimationFrame(() => {
      this.resetRaf = 0;
      this.ranges.forEach((range) => {
        this.setRange(range, range.initialMin, range.initialMax);
      });
      this.updateFilterCount();

      if (this.api) {
        void this.loadApartments("replace");
      }
    });
  };

  private handleHideReservedChange = () => {
    if (this.api) {
      void this.loadApartments("replace");
      return;
    }

    this.element
      .querySelectorAll<HTMLElement>(".js-reserved-apartment")
      .forEach((item) => {
        item.hidden = Boolean(this.hideReservedInput?.checked);
      });
  };

  private handleLoadMore = () => {
    if (this.api && this.nextCursor) {
      void this.loadApartments("append");
    }
  };

  private handleRetry = () => {
    if (this.api) {
      void this.loadApartments(this.lastFailedMode, this.lastFailedParams);
    }
  };

  private updateFilterCount = () => {
    if (!this.form || !this.filterCount) return;

    const checkedCount = this.form.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]:checked'
    ).length;
    const activeRangeCount = this.ranges.filter(
      (range) =>
        Number(range.minRange.value) !== range.min ||
        Number(range.maxRange.value) !== range.max
    ).length;
    const activeFilterCount = checkedCount + activeRangeCount;

    this.filterCount.textContent = String(activeFilterCount);
    this.filterCount.setAttribute(
      "aria-label",
      `Выбрано параметров: ${activeFilterCount}`
    );
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
    if (this.api) void this.loadApartments("replace");
    else this.sortApartments();
    this.closeSort();
    this.sortTrigger?.focus();
  };

  private restoreStateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    if (!CATALOG_URL_KEYS.some((key) => params.has(key))) return;

    ["rooms", "entrances", "floor-options", "features"].forEach((name) => {
      const queryKey = name === "floor-options" ? "floorOptions" : name;
      const values = new Set(params.getAll(queryKey));
      this.form
        ?.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`)
        .forEach((input) => {
          input.checked = values.has(input.value);
        });
    });

    const sort = params.get("sort");
    if (sort) {
      const option = this.sortOptions.find(({ value }) => value === sort);
      if (option) option.checked = true;
    }

    if (this.hideReservedInput) {
      this.hideReservedInput.checked = params.get("hideReserved") === "true";
    }

    this.restoreRangeFromUrl(
      ".catalog-filter__group--price",
      params.get("priceMin"),
      params.get("priceMax")
    );
    this.restoreRangeFromUrl(
      ".catalog-filter__group--area",
      params.get("areaMin"),
      params.get("areaMax")
    );
    this.restoreRangeFromUrl(
      ".catalog-range--floor",
      params.get("floorMin"),
      params.get("floorMax")
    );
  }

  private restoreRangeFromUrl(
    selector: string,
    minValue: string | null,
    maxValue: string | null
  ) {
    const range = this.ranges.find(({ element }) => element.matches(selector));
    if (!range || (minValue === null && maxValue === null)) return;

    this.setRange(
      range,
      minValue === null ? Number(range.minRange.value) : Number(minValue),
      maxValue === null ? Number(range.maxRange.value) : Number(maxValue)
    );
  }

  private getSearchParams(cursor?: string | null) {
    const params = new URLSearchParams();

    this.appendCheckedValues(params, "rooms", "rooms");
    this.appendRangeValues(
      params,
      ".catalog-filter__group--price",
      "priceMin",
      "priceMax"
    );
    this.appendRangeValues(
      params,
      ".catalog-filter__group--area",
      "areaMin",
      "areaMax"
    );
    this.appendCheckedValues(params, "entrances", "entrances");
    this.appendRangeValues(
      params,
      ".catalog-range--floor",
      "floorMin",
      "floorMax"
    );
    this.appendCheckedValues(params, "floor-options", "floorOptions");
    this.appendCheckedValues(params, "features", "features");

    if (this.hideReservedInput?.checked) {
      params.set("hideReserved", "true");
    }

    const sort = this.sortOptions.find(({ checked }) => checked)?.value;
    if (sort) params.set("sort", sort);
    params.set("limit", String(this.pageSize));
    if (cursor) params.set("cursor", cursor);

    return params;
  }

  private appendCheckedValues(
    params: URLSearchParams,
    inputName: string,
    queryName: string
  ) {
    this.form
      ?.querySelectorAll<HTMLInputElement>(`input[name="${inputName}"]:checked`)
      .forEach(({ value }) => params.append(queryName, value));
  }

  private appendRangeValues(
    params: URLSearchParams,
    selector: string,
    minName: string,
    maxName: string
  ) {
    const range = this.ranges.find(({ element }) => element.matches(selector));
    if (!range) return;

    params.set(minName, range.minRange.value);
    params.set(maxName, range.maxRange.value);
  }

  private syncUrl(params: URLSearchParams) {
    const pageUrl = new URL(window.location.href);
    CATALOG_URL_KEYS.forEach((key) => pageUrl.searchParams.delete(key));

    params.forEach((value, key) => {
      if (key !== "cursor" && key !== "limit") {
        pageUrl.searchParams.append(key, value);
      }
    });

    window.history.replaceState(null, "", pageUrl);
  }

  private async loadApartments(
    mode: CatalogLoadMode,
    retryParams: URLSearchParams | null = null
  ) {
    if (!this.api || !this.grid) return;
    if (mode === "append" && !this.nextCursor) return;

    this.requestController?.abort();
    const controller = new AbortController();
    this.requestController = controller;
    const currentRequestId = ++this.requestId;
    const params = retryParams
      ? new URLSearchParams(retryParams)
      : this.getSearchParams(mode === "append" ? this.nextCursor : null);
    let shouldRestartAfterExpiredCursor = false;

    this.hideError();
    this.setLoading(true, mode);

    try {
      const response = await this.api.load(params, controller.signal);
      if (currentRequestId !== this.requestId) return;

      if (
        mode === "append" &&
        response.items.some(({ id }) => this.loadedIds.has(id))
      ) {
        throw new Error("Catalog response contains an already loaded apartment");
      }

      this.applyResponse(response, mode);
      this.lastFailedParams = null;
      if (mode === "replace") {
        this.syncUrl(params);
        if (this.isFilterOpen) this.closeFilter();
        if (this.hasLoadedOnce) this.scrollToResults();
      }
      this.hasLoadedOnce = true;
    } catch (error) {
      if (controller.signal.aborted || currentRequestId !== this.requestId) {
        return;
      }

      if (
        mode === "append" &&
        error instanceof CatalogApiError &&
        error.code === "CURSOR_EXPIRED"
      ) {
        this.nextCursor = null;
        this.lastFailedMode = "replace";
        this.lastFailedParams = null;
        this.announce("Выдача обновилась. Загружаем квартиры заново");
        shouldRestartAfterExpiredCursor = true;
      } else {
        this.lastFailedMode = mode;
        this.lastFailedParams = new URLSearchParams(params);
        this.showError(error, mode);
      }
    } finally {
      if (currentRequestId === this.requestId) {
        this.requestController = null;
        this.setLoading(false, mode);
      }

      if (shouldRestartAfterExpiredCursor) {
        queueMicrotask(() => void this.loadApartments("replace"));
      }
    }
  }

  private applyResponse(response: CatalogResponse, mode: CatalogLoadMode) {
    if (!this.grid) return;

    if (mode === "replace") {
      this.getApartmentElements().forEach((item) => item.remove());
      this.loadedIds.clear();
    }

    const renderedItems = response.items.map((item) => {
      this.loadedIds.add(item.id);
      return renderApartmentCard(item);
    });
    this.grid.append(...renderedItems);

    this.nextCursor = response.pagination.nextCursor;
    if (this.count) this.count.value = String(response.pagination.total);

    this.arrangeContentItems(response.pagination.total);
    this.updatePagination(response);
    if (mode === "replace" && response.facets) {
      this.applyFacets(response.facets);
    }

    const isEmpty = response.pagination.total === 0;
    if (this.emptyElement) this.emptyElement.hidden = !isEmpty;
    this.element.classList.add("is-api-ready");

    const recommendations = ApartmentRecommendations.getInstanceFor(this.grid);
    if (recommendations) recommendations.refresh();
    else new ApartmentRecommendations(this.grid);

    this.announce(
      mode === "append"
        ? `Загружено еще ${response.pagination.returned} квартир`
        : `Найдено квартир: ${response.pagination.total}`
    );
  }

  private getApartmentElements() {
    if (!this.grid) return [];

    return Array.from(
      this.grid.querySelectorAll<HTMLElement>(".apartment-catalog__item")
    ).filter((item) => item.querySelector(".apartment-card--catalog"));
  }

  private arrangeContentItems(total: number) {
    if (!this.grid) return;

    const apartments = this.getApartmentElements();
    const hasApartments = total > 0;

    if (this.contactItem) {
      this.contactItem.hidden = !hasApartments;
      if (hasApartments) {
        const contactAnchor = apartments[7];
        if (contactAnchor) contactAnchor.after(this.contactItem);
        else this.grid.append(this.contactItem);
      }
    }

    if (this.mortgageItem) {
      this.mortgageItem.hidden = !hasApartments;
      if (hasApartments) this.grid.append(this.mortgageItem);
    }
  }

  private updatePagination(response: CatalogResponse) {
    const { pagination } = response;
    const hasMore = pagination.hasMore;

    if (this.loadMoreButton) {
      this.loadMoreButton.hidden = !hasMore;
    }
    if (this.loadMoreCount) {
      this.loadMoreCount.textContent = String(
        Math.min(pagination.limit, pagination.remaining)
      );
    }
    if (this.remainingCount) {
      this.remainingCount.textContent = String(pagination.remaining);
    }
  }

  private applyFacets(facets: CatalogFacets) {
    this.applyRangeFacet(".catalog-filter__group--price", facets.price);
    this.applyRangeFacet(".catalog-filter__group--area", facets.area);
    this.applyRangeFacet(".catalog-range--floor", facets.floor);
    this.applyOptionFacets("rooms", facets.rooms);
    this.applyOptionFacets("entrances", facets.entrances);
    this.applyOptionFacets("features", facets.features);
  }

  private applyRangeFacet(
    selector: string,
    facet: { min: number; max: number } | undefined
  ) {
    if (!facet) return;
    const range = this.ranges.find(({ element }) => element.matches(selector));
    if (!range) return;

    range.min = facet.min;
    range.max = facet.max;
    range.element.dataset.min = String(facet.min);
    range.element.dataset.max = String(facet.max);
    range.minRange.min = String(facet.min);
    range.minRange.max = String(facet.max);
    range.maxRange.min = String(facet.min);
    range.maxRange.max = String(facet.max);
    this.setRange(
      range,
      Number(range.minRange.value),
      Number(range.maxRange.value)
    );
  }

  private applyOptionFacets(
    inputName: string,
    facets: CatalogOptionFacet[] | undefined
  ) {
    if (!facets || !this.form) return;
    const counts = new Map(facets.map(({ value, count }) => [value, count]));

    this.form
      .querySelectorAll<HTMLInputElement>(`input[name="${inputName}"]`)
      .forEach((input) => {
        const count = counts.get(input.value);
        if (count === undefined) return;

        input.disabled = count === 0 && !input.checked;
        input.setAttribute("aria-description", `Доступно квартир: ${count}`);
      });
  }

  private setLoading(isLoading: boolean, mode: CatalogLoadMode) {
    this.element.classList.toggle("is-loading", isLoading);
    if (isLoading) this.results?.setAttribute("aria-busy", "true");
    else this.results?.removeAttribute("aria-busy");

    if (this.loadMoreButton) {
      this.loadMoreButton.disabled = isLoading;
      if (isLoading && mode === "append") {
        this.loadMoreButton.setAttribute("aria-busy", "true");
      } else {
        this.loadMoreButton.removeAttribute("aria-busy");
      }
    }
    if (this.retryButton) this.retryButton.disabled = isLoading;
  }

  private hideError() {
    if (this.errorElement) this.errorElement.hidden = true;
  }

  private showError(error: unknown, mode: CatalogLoadMode) {
    console.warn("ApartmentCatalog: failed to load apartments", error);

    let message =
      mode === "append"
        ? "Не удалось загрузить следующие квартиры"
        : "Не удалось обновить каталог";

    if (error instanceof CatalogApiError) {
      if (error.status === 400) message = "Проверьте выбранные параметры фильтра";
      if (error.status === 429) message = "Слишком много запросов. Попробуйте позже";
      if (error.status >= 500) message = "Сервис временно недоступен";
    }

    if (this.errorText) this.errorText.textContent = message;
    if (this.errorElement) this.errorElement.hidden = false;
    if ((mode === "replace" || !this.nextCursor) && this.loadMoreButton) {
      this.loadMoreButton.hidden = true;
    }
    this.announce(message);
  }

  private announce(message: string) {
    if (this.statusElement) this.statusElement.textContent = message;
  }

  private scrollToResults() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    this.results?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }

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
    this.requestController?.abort();
    this.requestController = null;
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
