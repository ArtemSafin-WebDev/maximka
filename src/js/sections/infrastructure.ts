const initializedMaps = new WeakSet<HTMLElement>();
let infrastructureMapPromise:
  | Promise<typeof import("../classes/components/InfrastructureMap")>
  | null = null;

function loadInfrastructureMap() {
  infrastructureMapPromise ??= import("../classes/components/InfrastructureMap");
  return infrastructureMapPromise;
}

async function initMapElement(element: HTMLElement) {
  if (initializedMaps.has(element)) {
    return;
  }

  initializedMaps.add(element);
  const { default: InfrastructureMap } = await loadInfrastructureMap();

  if (!InfrastructureMap.getInstanceFor(element)) {
    new InfrastructureMap(element);
  }
}

export default function initInfrastructure() {
  const maps = document.querySelectorAll<HTMLElement>(".js-infrastructure-map");

  if (!("IntersectionObserver" in window)) {
    maps.forEach((element) => {
      window.setTimeout(() => {
        initMapElement(element);
      }, 0);
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        initMapElement(element);
      });
    },
    {
      rootMargin: "700px 0px",
    }
  );

  maps.forEach((element) => observer.observe(element));
}
