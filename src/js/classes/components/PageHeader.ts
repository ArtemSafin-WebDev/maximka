import Component from "../Component";

class PageHeader extends Component {
  private readonly toggleButton: HTMLButtonElement | null;
  private readonly menuLinks: HTMLAnchorElement[];
  private isMenuOpen = false;
  private scrollRaf = 0;

  constructor(element: HTMLElement) {
    super(element);

    this.toggleButton = this.element.querySelector<HTMLButtonElement>(
      ".js-page-header-toggle"
    );
    this.menuLinks = Array.from(
      this.element.querySelectorAll<HTMLAnchorElement>(".page-header__menu a")
    );

    this.toggleButton?.addEventListener("click", this.handleToggleClick);
    this.menuLinks.forEach((link) => {
      link.addEventListener("click", this.closeMenu);
    });
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    document.addEventListener("keydown", this.handleKeyDown);

    this.updateScrolledState();
  }

  public destroy() {
    this.toggleButton?.removeEventListener("click", this.handleToggleClick);
    this.menuLinks.forEach((link) => {
      link.removeEventListener("click", this.closeMenu);
    });
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("keydown", this.handleKeyDown);
    if (this.scrollRaf) cancelAnimationFrame(this.scrollRaf);
    this.closeMenu();
    this.unregister();
  }

  private openMenu = () => {
    this.isMenuOpen = true;
    this.element.classList.add("is-menu-open");
    this.toggleButton?.setAttribute("aria-expanded", "true");
  };

  private closeMenu = () => {
    this.isMenuOpen = false;
    this.element.classList.remove("is-menu-open");
    this.toggleButton?.setAttribute("aria-expanded", "false");
  };

  private handleToggleClick = () => {
    if (this.isMenuOpen) {
      this.closeMenu();
      return;
    }

    this.openMenu();
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && this.isMenuOpen) {
      this.closeMenu();
    }
  };

  private handleScroll = () => {
    if (this.scrollRaf) return;

    this.scrollRaf = requestAnimationFrame(() => {
      this.scrollRaf = 0;
      this.updateScrolledState();
    });
  };

  private updateScrolledState() {
    this.element.classList.toggle("is-scrolled", window.scrollY > 8);
  }
}

export default PageHeader;
