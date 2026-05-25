import initAboutProject from "./aboutProject";
import initFeatures from "./features";
import initGallery from "./gallery";
import initPromos from "./promos";
import initSolutions from "./solutions";

export default function sections() {
  initAboutProject();
  initGallery();
  initFeatures();
  initSolutions();
  initPromos();
}
