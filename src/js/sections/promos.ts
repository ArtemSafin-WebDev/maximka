import PromosSlider from "../classes/components/PromosSlider";

export default function initPromos() {
  document.querySelectorAll<HTMLElement>(".js-promos-slider").forEach((element) => {
    if (!PromosSlider.getInstanceFor(element)) {
      new PromosSlider(element);
    }
  });
}
