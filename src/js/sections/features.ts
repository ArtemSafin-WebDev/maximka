import FeaturesSlider from "../classes/components/FeaturesSlider";

export default function initFeatures() {
  document.querySelectorAll<HTMLElement>(".js-features-slider").forEach((element) => {
    if (!FeaturesSlider.getInstanceFor(element)) {
      new FeaturesSlider(element);
    }
  });
}
