import AdvantagesSlider from "../classes/components/AdvantagesSlider";

export default function initAdvantages() {
  document.querySelectorAll<HTMLElement>(".js-advantages-slider").forEach((element) => {
    if (!AdvantagesSlider.getInstanceFor(element)) {
      new AdvantagesSlider(element);
    }
  });
}
