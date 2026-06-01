import FeaturesModal from "../classes/components/FeaturesModal";

export default function initFeatures() {
  document.querySelectorAll<HTMLElement>(".js-features").forEach((element) => {
    if (!FeaturesModal.getInstanceFor(element)) {
      new FeaturesModal(element);
    }
  });
}
