import ApartmentRecommendations from "../classes/components/ApartmentRecommendations";

export default function initApartmentRecommendations() {
  document
    .querySelectorAll<HTMLElement>(".js-apartment-recommendations")
    .forEach((element) => {
      if (!ApartmentRecommendations.getInstanceFor(element)) {
        new ApartmentRecommendations(element);
      }
    });
}
