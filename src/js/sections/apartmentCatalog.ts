import ApartmentCatalog from "../classes/components/ApartmentCatalog";

export default function initApartmentCatalog() {
  document
    .querySelectorAll<HTMLElement>(".js-apartment-catalog")
    .forEach((element) => {
      if (!ApartmentCatalog.getInstanceFor(element)) {
        new ApartmentCatalog(element);
      }
    });
}
