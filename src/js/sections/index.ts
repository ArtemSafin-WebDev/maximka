import initAboutProject from "./aboutProject";
import initAdvantages from "./advantages";
import initFeatures from "./features";
import initGallery from "./gallery";
import initInfrastructure from "./infrastructure";
import initProgress from "./progress";
import initPromos from "./promos";
import initSolutions from "./solutions";

export default function sections() {
  initAboutProject();
  initGallery();
  initFeatures();
  initProgress();
  initSolutions();
  initAdvantages();
  initInfrastructure();
  initPromos();
}
