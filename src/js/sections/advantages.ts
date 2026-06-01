import AdvantagesSlider from "../classes/components/AdvantagesSlider";
import CardsModal from "../classes/components/CardsModal";

export default function initAdvantages() {
  document.querySelectorAll<HTMLElement>(".js-advantages-slider").forEach((element) => {
    if (!AdvantagesSlider.getInstanceFor(element)) {
      new AdvantagesSlider(element);
    }
  });

  document.querySelectorAll<HTMLElement>(".js-advantages").forEach((element) => {
    if (!CardsModal.getInstanceFor(element)) {
      new CardsModal(element);
    }
  });
}
