import initAboutProject from "./aboutProject";
import initApartmentRecommendations from "./apartmentRecommendations";
import initAdvantages from "./advantages";
import initContactsFaq from "./contactsFaq";
import initFeatures from "./features";
import initGallery from "./gallery";
import initInfrastructure from "./infrastructure";
import initProgress from "./progress";
import initPromos from "./promos";
import initSolutions from "./solutions";

export default function sections() {
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
}
