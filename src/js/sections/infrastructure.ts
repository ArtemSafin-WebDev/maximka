import InfrastructureMap from "../classes/components/InfrastructureMap";

export default function initInfrastructure() {
  document
    .querySelectorAll<HTMLElement>(".js-infrastructure-map")
    .forEach((element) => {
      if (!InfrastructureMap.getInstanceFor(element)) {
        new InfrastructureMap(element);
      }
    });
}
