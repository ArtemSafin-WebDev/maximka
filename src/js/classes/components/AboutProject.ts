import Component from "../Component";

class AboutProject extends Component {
  private button: HTMLButtonElement | null;
  private buttonText: HTMLElement | null;
  private more: HTMLElement | null;
  private openLabel: string;
  private closeLabel: string;

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

    this.button?.addEventListener("click", this.handleClick);
  }

  public destroy() {
    this.button?.removeEventListener("click", this.handleClick);
    this.unregister();
  }

  private setExpanded(expanded: boolean) {
    this.element.classList.toggle("is-expanded", expanded);
    this.button?.setAttribute("aria-expanded", String(expanded));
    this.more?.setAttribute("aria-hidden", String(!expanded));

    if (this.buttonText) {
      this.buttonText.textContent = expanded ? this.closeLabel : this.openLabel;
    }
  }

  private handleClick = () => {
    this.setExpanded(!this.element.classList.contains("is-expanded"));
  };
}

export default AboutProject;
