import Swiper from "swiper";
import { Scrollbar } from "swiper/modules";

import Component from "../Component";

class SolutionsTabs extends Component {
  private readonly tabs: HTMLButtonElement[];
  private readonly panels: HTMLElement[];
  private readonly swipers: Swiper[];
  private readonly handleTabClick = (event: Event) => {
    const tab = event.currentTarget as HTMLButtonElement;
    this.setActive(this.tabs.indexOf(tab));
  };
  private activeIndex = -1;

  constructor(element: HTMLElement) {
    super(element);

    this.tabs = Array.from(
      this.element.querySelectorAll<HTMLButtonElement>(".js-solutions-tab")
    );
    this.panels = Array.from(
      this.element.querySelectorAll<HTMLElement>(".js-solutions-panel")
    );
    this.swipers = this.panels
      .map((panel) => panel.querySelector<HTMLElement>(".js-solutions-slider"))
      .filter((slider): slider is HTMLElement => Boolean(slider))
      .map((slider) => this.initSlider(slider));

    this.tabs.forEach((tab) => {
      tab.addEventListener("click", this.handleTabClick);
    });

    this.setActive(0);
  }

  private initSlider(slider: HTMLElement) {
    return new Swiper(slider, {
      modules: [Scrollbar],
      slidesPerView: "auto",
      spaceBetween: 20,
      speed: 500,
      watchOverflow: true,
      scrollbar: {
        el: slider.querySelector<HTMLElement>(".swiper-scrollbar"),
        draggable: true,
      },
      breakpoints: {
        0: {
          spaceBetween: 11,
        },
        577: {
          spaceBetween: 20,
        },
      },
    });
  }

  private setActive(index: number) {
    if (index < 0 || index >= this.tabs.length || index === this.activeIndex) {
      return;
    }

    this.tabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === index;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    this.panels.forEach((panel, panelIndex) => {
      const isActive = panelIndex === index;
      panel.classList.toggle("active", isActive);
      panel.toggleAttribute("hidden", !isActive);
    });

    this.activeIndex = index;
    this.swipers[index]?.update();
  }

  public destroy() {
    this.tabs.forEach((tab) => {
      tab.removeEventListener("click", this.handleTabClick);
    });
    this.swipers.forEach((swiper) => swiper.destroy(true, true));
    this.unregister();
  }
}

export default SolutionsTabs;
