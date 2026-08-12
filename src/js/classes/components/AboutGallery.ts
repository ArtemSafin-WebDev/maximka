import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

import Component from "../Component";

class AboutGallery extends Component {
  private readonly moreButton: HTMLButtonElement | null;

  constructor(element: HTMLElement) {
    super(element);

    this.moreButton = this.element.querySelector<HTMLButtonElement>(
      ".js-about-gallery-more"
    );
    this.moreButton?.addEventListener("click", this.handleMoreButtonClick);
    Fancybox.bind(this.element, '[data-fancybox="about-gallery"]');
  }

  private readonly handleMoreButtonClick = () => {
    this.element.classList.add("about-gallery--expanded");
    this.moreButton?.setAttribute("aria-expanded", "true");

    if (this.moreButton) {
      this.moreButton.hidden = true;
    }
  };

  public destroy() {
    this.moreButton?.removeEventListener("click", this.handleMoreButtonClick);
    Fancybox.unbind(this.element, '[data-fancybox="about-gallery"]');
    this.unregister();
  }
}

export default AboutGallery;
