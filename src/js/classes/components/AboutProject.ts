import Component from "../Component";

class AboutProject extends Component {
  private button: HTMLButtonElement | null;
  private buttonText: HTMLElement | null;
  private more: HTMLElement | null;
  private openLabel: string;
  private closeLabel: string;
  private mobileCloseLabel: string;
  private mobileMedia: MediaQueryList;

  constructor(element: HTMLElement) {
    super(element);

    this.button = this.element.querySelector<HTMLButtonElement>(
      ".js-about-project-toggle"
    );
    this.buttonText = this.button?.querySelector("span") ?? null;
    this.more = this.element.querySelector<HTMLElement>(
      ".js-about-project-more"
    );
    this.openLabel = this.button?.dataset.openLabel ?? "Подробнее";
    this.closeLabel = this.button?.dataset.closeLabel ?? "Скрыть";
    this.mobileCloseLabel =
      this.button?.dataset.mobileCloseLabel ?? this.closeLabel;
    this.mobileMedia = window.matchMedia("(width <= 576px)");

    this.button?.addEventListener("click", this.handleClick);
    this.mobileMedia.addEventListener("change", this.handleMediaChange);
  }

  public destroy() {
    this.button?.removeEventListener("click", this.handleClick);
    this.mobileMedia.removeEventListener("change", this.handleMediaChange);
    this.unregister();
  }

  private setExpanded(expanded: boolean) {
    this.element.classList.toggle("is-expanded", expanded);
    this.button?.setAttribute("aria-expanded", String(expanded));
    this.more?.setAttribute("aria-hidden", String(!expanded));

    if (this.buttonText) {
      this.buttonText.textContent = expanded
        ? this.currentCloseLabel
        : this.openLabel;
    }
  }

  private get currentCloseLabel() {
    return this.mobileMedia.matches ? this.mobileCloseLabel : this.closeLabel;
  }

  private handleClick = () => {
    this.setExpanded(!this.element.classList.contains("is-expanded"));
  };

  private handleMediaChange = () => {
    if (this.element.classList.contains("is-expanded")) {
      this.setExpanded(true);
    }
  };
}

export default AboutProject;
