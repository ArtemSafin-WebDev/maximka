import AboutGallery from "../classes/components/AboutGallery";

export default function initAboutGallery() {
  document.querySelectorAll<HTMLElement>(".js-about-gallery").forEach((element) => {
    if (!AboutGallery.getInstanceFor(element)) {
      new AboutGallery(element);
    }
  });
}
