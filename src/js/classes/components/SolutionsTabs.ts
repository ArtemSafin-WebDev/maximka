import Component from "../Component";

class SolutionsTabs extends Component {
  private readonly tabs: HTMLButtonElement[];
  private readonly panels: HTMLElement[];
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

    this.tabs.forEach((tab) => {
      tab.addEventListener("click", this.handleTabClick);
    });

    this.setActive(0);
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
  }

  public destroy() {
    this.tabs.forEach((tab) => {
      tab.removeEventListener("click", this.handleTabClick);
    });
    this.unregister();
  }
}

export default SolutionsTabs;
