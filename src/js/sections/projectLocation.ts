import ProjectLocationSlider from "../classes/components/ProjectLocationSlider";

export default function initProjectLocation() {
  document
    .querySelectorAll<HTMLElement>(".js-project-location-slider")
    .forEach((element) => {
      if (!ProjectLocationSlider.getInstanceFor(element)) {
        new ProjectLocationSlider(element);
      }
    });
}
