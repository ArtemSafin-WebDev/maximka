import initAboutProject from "./aboutProject";
import initAdvantages from "./advantages";
import initGallery from "./gallery";
import initProgress from "./progress";
import initPromos from "./promos";
import initSolutions from "./solutions";

export default function sections() {
  initAboutProject();
  initGallery();
  initProgress();
  initSolutions();
  initAdvantages();
  initPromos();
}
