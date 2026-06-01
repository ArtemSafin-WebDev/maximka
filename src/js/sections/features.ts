import CardsModal from "../classes/components/CardsModal";

export default function initFeatures() {
  document.querySelectorAll<HTMLElement>(".js-features").forEach((element) => {
    if (!CardsModal.getInstanceFor(element)) {
      new CardsModal(element);
    }
  });
}
