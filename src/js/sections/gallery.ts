import GallerySlider from "../classes/components/GallerySlider";

export default function initGallery() {
  document.querySelectorAll<HTMLElement>(".js-gallery-slider").forEach((element) => {
    if (!GallerySlider.getInstanceFor(element)) {
      new GallerySlider(element);
    }
  });
}
