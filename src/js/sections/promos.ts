import PromosSlider from "../classes/components/PromosSlider";
import PromosShowcaseSlider from "../classes/components/PromosShowcaseSlider";

export default function initPromos() {
  document
    .querySelectorAll<HTMLElement>(".js-promos-showcase-slider")
    .forEach((element) => {
      if (!PromosShowcaseSlider.getInstanceFor(element)) {
        new PromosShowcaseSlider(element);
      }
    });

  document.querySelectorAll<HTMLElement>(".js-promos-slider").forEach((element) => {
    if (!PromosSlider.getInstanceFor(element)) {
      new PromosSlider(element);
    }
  });
}
