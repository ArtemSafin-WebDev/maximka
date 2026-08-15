import ApartmentHero from "../classes/components/ApartmentHero";

export default function initApartmentHero() {
  document.querySelectorAll<HTMLElement>(".js-apartment-hero").forEach((element) => {
    if (!ApartmentHero.getInstanceFor(element)) {
      new ApartmentHero(element);
    }
  });
}
