import Component from "../Component";
import mapCustomization from "../../data/infrastructureMapCustomization.json";

type Coordinates = [number, number];

interface YMaps3 {
  ready: Promise<void>;
  import: YMaps3Import;
  YMap: new (
    element: HTMLElement,
    options: {
      location: {
        center: Coordinates;
        zoom: number;
      };
      behaviors?: string[];
    }
  ) => YMapInstance;
  YMapDefaultSchemeLayer: new (options?: Record<string, unknown>) => YMapEntity;
  YMapDefaultFeaturesLayer: new (options?: Record<string, unknown>) => YMapEntity;
  YMapMarker: new (
    options: {
      coordinates: Coordinates;
      zIndex?: number;
    },
    element: HTMLElement
  ) => YMapEntity;
  YMapFeature: new (options: {
    geometry: {
      type: "Polygon";
      coordinates: Coordinates[][];
    };
    style: {
      fill?: string;
      stroke?: CoordinatesStyle[];
    };
  }) => YMapEntity;
  YMapControls: new (options?: {
    position?: string;
    orientation?: "horizontal" | "vertical";
  }) => YMapControlsEntity;
}

type YMaps3Import = ((packageName: string) => Promise<unknown>) & {
  registerCdn?: (cdnTemplate: string, packageNames: string[]) => void;
};

interface CoordinatesStyle {
  color: string;
  width: number;
}

interface YMapInstance {
  addChild: (child: YMapEntity) => YMapInstance;
  removeChild: (child: YMapEntity) => YMapInstance;
  destroy?: () => void;
}

interface YMapEntity {
  update?: (changedProps: Record<string, unknown>) => void;
}

interface YMapControlsEntity extends YMapEntity {
  addChild: (child: YMapEntity) => YMapControlsEntity;
}

interface YMapDefaultUiTheme {
  YMapZoomControl: new (options?: Record<string, unknown>) => YMapEntity;
}

interface InfrastructurePoint {
  category: string;
  title: string;
  description: string;
  address: string;
  distance: string;
  coordinates: Coordinates;
  icon: string;
  marker: YMapEntity | null;
}

declare global {
  interface Window {
    ymaps3?: YMaps3;
  }
}

let yandexMapsPromise: Promise<YMaps3> | null = null;

class InfrastructureMap extends Component {
  private canvas: HTMLElement | null;
  private filterRoot: HTMLElement | null;
  private filterToggle: HTMLButtonElement | null;
  private currentFilterText: HTMLElement | null;
  private filters: HTMLButtonElement[];
  private points: InfrastructurePoint[];
  private map: YMapInstance | null = null;
  private visibleMarkers = new Set<YMapEntity>();

  constructor(element: HTMLElement) {
    super(element);

    this.canvas = element.querySelector<HTMLElement>(
      ".js-infrastructure-map-canvas"
    );
    this.filterRoot = element.querySelector<HTMLElement>(
      ".js-infrastructure-filters"
    );
    this.filterToggle = element.querySelector<HTMLButtonElement>(
      ".js-infrastructure-filter-toggle"
    );
    this.currentFilterText = element.querySelector<HTMLElement>(
      ".js-infrastructure-filter-current"
    );
    this.filters = Array.from(
      element.querySelectorAll<HTMLButtonElement>(".js-infrastructure-filter")
    );
    this.points = this.getPoints();

    this.filterToggle?.addEventListener("click", this.handleFilterToggleClick);
    document.addEventListener("click", this.handleDocumentClick);
    document.addEventListener("keydown", this.handleDocumentKeydown);

    this.filters.forEach((filter) => {
      filter.addEventListener("click", this.handleFilterClick);
      filter.setAttribute(
        "aria-pressed",
        filter.classList.contains("active").toString()
      );
    });

    this.initMap().catch((error) => {
      this.showMapError(error);
    });
  }

  private static loadApi(apiKey: string): Promise<YMaps3> {
    if (window.ymaps3) {
      return Promise.resolve(window.ymaps3);
    }

    if (!yandexMapsPromise) {
      yandexMapsPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
        script.async = true;
        script.addEventListener("load", async () => {
          if (!window.ymaps3) {
            reject(new Error("Yandex Maps API is not available"));
            return;
          }

          await window.ymaps3.ready;
          resolve(window.ymaps3);
        });
        script.addEventListener("error", () => {
          reject(new Error("Failed to load Yandex Maps API"));
        });
        document.head.appendChild(script);
      });
    }

    return yandexMapsPromise;
  }

  private async initMap(): Promise<void> {
    if (!this.canvas) {
      return;
    }

    const apiKey = this.element.dataset.apiKey;
    if (!apiKey) {
      return;
    }

    const ymaps3 = await InfrastructureMap.loadApi(apiKey);
    const center = this.parseCoordinates(this.element.dataset.center);
    const zoom = Number(this.element.dataset.zoom ?? 15.6);

    this.map = new ymaps3.YMap(this.canvas, {
      location: {
        center,
        zoom,
      },
      behaviors: ["drag", "pinchZoom", "dblClick"],
    });

    this.map
      .addChild(
        new ymaps3.YMapDefaultSchemeLayer({
          customization: mapCustomization as Record<string, unknown>[],
        })
      )
      .addChild(new ymaps3.YMapDefaultFeaturesLayer());

    await this.addControls(ymaps3);
    this.addComplexObjects(ymaps3);
    this.points.forEach((point) => {
      point.marker = new ymaps3.YMapMarker(
        {
          coordinates: point.coordinates,
          zIndex: 10,
        },
        this.createPointElement(point)
      );
    });
    this.setActiveCategory("all");
  }

  private addComplexObjects(ymaps3: YMaps3): void {
    if (!this.map) {
      return;
    }

    const complexCoordinates = this.parseCoordinates(
      this.element.dataset.complexCoordinates
    );
    const contour = this.parseContour(this.element.dataset.complexContour);
    const complexTitle = this.element.dataset.complexTitle ?? "ЖК «Максима»";
    const complexIcon = this.element.dataset.complexIcon ?? "";

    if (contour.length > 2) {
      this.map.addChild(
        new ymaps3.YMapFeature({
          geometry: {
            type: "Polygon",
            coordinates: [contour],
          },
          style: {
            fill: "rgba(255, 87, 74, 0.38)",
            stroke: [
              {
                color: "#ff574a",
                width: 2,
              },
            ],
          },
        })
      );
    }

    if (!complexIcon) {
      return;
    }

    const marker = document.createElement("div");
    marker.className = "infrastructure-complex-marker";
    marker.setAttribute("aria-label", complexTitle);

    const image = document.createElement("img");
    image.className = "infrastructure-complex-marker__image";
    image.src = complexIcon;
    image.alt = "";
    image.width = 66;
    image.height = 90;
    marker.append(image);

    this.map.addChild(
      new ymaps3.YMapMarker(
        {
          coordinates: complexCoordinates,
          zIndex: 100,
        },
        marker
      )
    );
  }

  private async addControls(ymaps3: YMaps3): Promise<void> {
    if (!this.map) {
      return;
    }

    try {
      ymaps3.import.registerCdn?.("https://cdn.jsdelivr.net/npm/{package}", [
        "@yandex/ymaps3-default-ui-theme@0.0",
      ]);

      const { YMapZoomControl } = (await ymaps3.import(
        "@yandex/ymaps3-default-ui-theme"
      )) as YMapDefaultUiTheme;

      this.map.addChild(
        new ymaps3.YMapControls({
          position: "right",
          orientation: "vertical",
        }).addChild(new YMapZoomControl({}))
      );
    } catch (error) {
      console.warn("Yandex Maps zoom control is unavailable", error);
    }
  }

  private getPoints(): InfrastructurePoint[] {
    return Array.from(
      this.element.querySelectorAll<HTMLElement>(".js-infrastructure-point")
    ).map((pointElement) => ({
      category: pointElement.dataset.category ?? "all",
      title: pointElement.dataset.title ?? "",
      description: pointElement.dataset.description ?? "",
      address: pointElement.dataset.address ?? "",
      distance: pointElement.dataset.distance ?? "",
      coordinates: this.parseCoordinates(pointElement.dataset.coordinates),
      icon: pointElement.dataset.icon ?? "",
      marker: null,
    }));
  }

  private parseCoordinates(value: string | undefined): Coordinates {
    const [longitude = "0", latitude = "0"] = (value ?? "")
      .split(",")
      .map((coordinate) => coordinate.trim());

    return [Number(longitude), Number(latitude)];
  }

  private parseContour(value: string | undefined): Coordinates[] {
    return (value ?? "")
      .split(";")
      .map((coordinates) => this.parseCoordinates(coordinates))
      .filter(([longitude, latitude]) => Number.isFinite(longitude) && Number.isFinite(latitude));
  }

  private createPointElement(point: InfrastructurePoint): HTMLElement {
    const marker = document.createElement("button");
    marker.className = "infrastructure-marker";
    marker.type = "button";
    marker.setAttribute("aria-label", point.title);
    marker.addEventListener("mouseenter", () => {
      point.marker?.update?.({ zIndex: 1000 });
    });
    marker.addEventListener("mouseleave", () => {
      point.marker?.update?.({ zIndex: 10 });
    });
    marker.addEventListener("focus", () => {
      point.marker?.update?.({ zIndex: 1000 });
    });
    marker.addEventListener("blur", () => {
      point.marker?.update?.({ zIndex: 10 });
    });

    const icon = document.createElement("img");
    icon.className = "infrastructure-marker__icon";
    icon.src = point.icon;
    icon.alt = "";
    icon.width = 56;
    icon.height = 56;

    const tooltip = document.createElement("span");
    tooltip.className = "infrastructure-marker__tooltip";

    const title = document.createElement("span");
    title.className = "infrastructure-marker__title";
    title.textContent = point.title;

    const meta = document.createElement("span");
    meta.className = "infrastructure-marker__meta";
    meta.textContent =
      point.description ||
      [point.address, point.distance].filter(Boolean).join(" · ");

    tooltip.append(title, meta);
    marker.append(icon, tooltip);

    return marker;
  }

  private handleFilterClick = (event: Event): void => {
    const filter = event.currentTarget as HTMLButtonElement;
    const category = filter.dataset.category ?? "all";
    this.setActiveCategory(category);
    this.closeFilters();
  };

  private setActiveCategory(category: string): void {
    this.filters.forEach((filter) => {
      const isActive = filter.dataset.category === category;
      filter.classList.toggle("active", isActive);
      filter.setAttribute("aria-pressed", isActive.toString());

      if (isActive && this.currentFilterText) {
        this.currentFilterText.textContent = filter.textContent?.trim() ?? "";
      }
    });

    if (!this.map) {
      return;
    }

    this.points.forEach((point) => {
      if (!point.marker) {
        return;
      }

      const isVisible = category === "all" || point.category === category;
      if (isVisible && !this.visibleMarkers.has(point.marker)) {
        this.map?.addChild(point.marker);
        this.visibleMarkers.add(point.marker);
      }

      if (!isVisible && this.visibleMarkers.has(point.marker)) {
        this.map?.removeChild(point.marker);
        this.visibleMarkers.delete(point.marker);
      }
    });
  }

  private handleFilterToggleClick = (): void => {
    const isOpen = this.filterRoot?.classList.toggle("is-open") ?? false;
    this.filterToggle?.setAttribute("aria-expanded", isOpen.toString());
  };

  private handleDocumentClick = (event: MouseEvent): void => {
    const target = event.target;
    if (!(target instanceof Node) || this.filterRoot?.contains(target)) {
      return;
    }

    this.closeFilters();
  };

  private handleDocumentKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      this.closeFilters();
    }
  };

  private closeFilters(): void {
    this.filterRoot?.classList.remove("is-open");
    this.filterToggle?.setAttribute("aria-expanded", "false");
  }

  private showMapError(error: unknown): void {
    if (!this.canvas) {
      return;
    }

    console.warn("Infrastructure map is unavailable", error);
    this.canvas.textContent = "Карта временно недоступна";
  }

  public destroy(): void {
    this.filterToggle?.removeEventListener(
      "click",
      this.handleFilterToggleClick
    );
    document.removeEventListener("click", this.handleDocumentClick);
    document.removeEventListener("keydown", this.handleDocumentKeydown);

    this.filters.forEach((filter) => {
      filter.removeEventListener("click", this.handleFilterClick);
    });

    this.map?.destroy?.();
    this.unregister();
  }
}

export default InfrastructureMap;
