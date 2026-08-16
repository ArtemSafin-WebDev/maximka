import initAboutProject from "./aboutProject";
import initAboutApartments from "./aboutApartments";
import initAboutGallery from "./aboutGallery";
import initApartmentHero from "./apartmentHero";
import initApartmentCatalog from "./apartmentCatalog";
import initApartmentRecommendations from "./apartmentRecommendations";
import initAdvantages from "./advantages";
import initContactsFaq from "./contactsFaq";
import initFeatures from "./features";
import initGallery from "./gallery";
import initInfrastructure from "./infrastructure";
import initProgress from "./progress";
import initPromos from "./promos";
import initProjectLocation from "./projectLocation";
import initSolutions from "./solutions";

export default function sections() {
  initApartmentCatalog();
  initAboutApartments();
  initAboutGallery();
  initApartmentHero();
  initApartmentRecommendations();
  initAboutProject();
  initContactsFaq();
  initGallery();
  initFeatures();
  initProgress();
  initSolutions();
  initAdvantages();
  initInfrastructure();
  initPromos();
  initProjectLocation();
}
