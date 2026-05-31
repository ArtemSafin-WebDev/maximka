import Component from "../Component";

type Coordinates = [number, number];

interface YMaps3 {
  ready: Promise<void>;
  import: (packageName: string) => Promise<unknown>;
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
}

interface CoordinatesStyle {
  color: string;
  width: number;
}

interface YMapInstance {
  addChild: (child: YMapEntity) => YMapInstance;
  removeChild: (child: YMapEntity) => YMapInstance;
  destroy?: () => void;
}

type YMapEntity = object;

interface InfrastructurePoint {
  category: string;
  title: string;
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
  private filters: HTMLButtonElement[];
  private points: InfrastructurePoint[];
  private map: YMapInstance | null = null;
  private visibleMarkers = new Set<YMapEntity>();

  constructor(element: HTMLElement) {
    super(element);

    this.canvas = element.querySelector<HTMLElement>(
      ".js-infrastructure-map-canvas"
    );
    this.filters = Array.from(
      element.querySelectorAll<HTMLButtonElement>(".js-infrastructure-filter")
    );
    this.points = this.getPoints();

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
      .addChild(new ymaps3.YMapDefaultSchemeLayer({ customization: this.getMapTheme() }))
      .addChild(new ymaps3.YMapDefaultFeaturesLayer());

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
    const complexTitle = this.element.dataset.complexTitle ?? "ЖК «Максима»";
    const complexIcon = this.element.dataset.complexIcon ?? "";

    this.map.addChild(
      new ymaps3.YMapFeature({
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [49.10134, 55.85964],
              [49.10237, 55.85974],
              [49.10263, 55.8593],
              [49.10157, 55.85915],
              [49.10134, 55.85964],
            ],
          ],
        },
        style: {
          fill: "rgba(255, 87, 74, 0.72)",
          stroke: [
            {
              color: "#ff574a",
              width: 3,
            },
          ],
        },
      })
    );

    if (!complexIcon) {
      return;
    }

    const marker = document.createElement("img");
    marker.className = "infrastructure-complex-marker";
    marker.src = complexIcon;
    marker.alt = complexTitle;
    marker.width = 66;
    marker.height = 90;

    this.map.addChild(
      new ymaps3.YMapMarker(
        {
          coordinates: complexCoordinates,
          zIndex: 20,
        },
        marker
      )
    );
  }

  private getMapTheme(): Record<string, unknown>[] {
    return [
      {
        tags: {
          any: ["road"],
        },
        stylers: [
          {
            color: "#d6d6d6",
          },
        ],
      },
      {
        tags: {
          any: ["landscape", "admin", "water", "transit"],
        },
        stylers: [
          {
            saturation: -0.9,
          },
          {
            opacity: 0.62,
          },
        ],
      },
    ];
  }

  private getPoints(): InfrastructurePoint[] {
    return Array.from(
      this.element.querySelectorAll<HTMLElement>(".js-infrastructure-point")
    ).map((pointElement) => ({
      category: pointElement.dataset.category ?? "all",
      title: pointElement.dataset.title ?? "",
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

  private createPointElement(point: InfrastructurePoint): HTMLElement {
    const marker = document.createElement("button");
    marker.className = "infrastructure-marker";
    marker.type = "button";
    marker.setAttribute("aria-label", point.title);

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
    meta.textContent = [point.address, point.distance].filter(Boolean).join(" · ");

    tooltip.append(title, meta);
    marker.append(icon, tooltip);

    return marker;
  }

  private handleFilterClick = (event: Event): void => {
    const filter = event.currentTarget as HTMLButtonElement;
    const category = filter.dataset.category ?? "all";
    this.setActiveCategory(category);
  };

  private setActiveCategory(category: string): void {
    this.filters.forEach((filter) => {
      const isActive = filter.dataset.category === category;
      filter.classList.toggle("active", isActive);
      filter.setAttribute("aria-pressed", isActive.toString());
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

  private showMapError(error: unknown): void {
    if (!this.canvas) {
      return;
    }

    console.warn("Infrastructure map is unavailable", error);
    this.canvas.textContent = "Карта временно недоступна";
  }

  public destroy(): void {
    this.filters.forEach((filter) => {
      filter.removeEventListener("click", this.handleFilterClick);
    });

    this.map?.destroy?.();
    this.unregister();
  }
}

export default InfrastructureMap;
