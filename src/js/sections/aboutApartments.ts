import AboutApartmentsSlider from "../classes/components/AboutApartmentsSlider";

export default function initAboutApartments() {
  document
    .querySelectorAll<HTMLElement>(".js-about-apartments-slider")
    .forEach((element) => {
      if (!AboutApartmentsSlider.getInstanceFor(element)) {
        new AboutApartmentsSlider(element);
      }
    });
}
