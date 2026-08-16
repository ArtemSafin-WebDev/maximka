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
  private readonly ranges: CatalogRange[];
  private readonly eventController = new AbortController();
  private resetRaf = 0;

  constructor(element: HTMLElement) {
    super(element);

    this.form = this.element.querySelector<HTMLFormElement>(
      ".js-catalog-filter"
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

  public destroy() {
    this.eventController.abort();
    if (this.resetRaf) cancelAnimationFrame(this.resetRaf);
    this.unregister();
  }
}

export default ApartmentCatalog;
