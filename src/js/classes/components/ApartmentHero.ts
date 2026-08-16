import Component from "../Component";

class ApartmentHero extends Component {
  private readonly tabs: HTMLButtonElement[];
  private readonly panels: HTMLElement[];
  private readonly sunToggles: HTMLButtonElement[];
  private readonly shareButtons: HTMLButtonElement[];
  private readonly printButtons: HTMLButtonElement[];
  private readonly characteristicsList: HTMLElement | null;
  private readonly characteristicsToggle: HTMLButtonElement | null;
  private readonly bookingBar: HTMLElement | null;
  private readonly scrollTopButton: HTMLButtonElement | null;
  private readonly footer: HTMLElement | null;
  private footerObserver: IntersectionObserver | null = null;
  private readyRaf = 0;
  private scrollRaf = 0;
  private activeIndex = 0;
  private isSunActive = false;

  constructor(element: HTMLElement) {
    super(element);

    this.tabs = Array.from(
      this.element.querySelectorAll<HTMLButtonElement>(".js-apartment-tab")
    );
    this.panels = Array.from(
      this.element.querySelectorAll<HTMLElement>(".js-apartment-plan")
    );
    this.sunToggles = Array.from(
      this.element.querySelectorAll<HTMLButtonElement>(
        ".js-apartment-sun-toggle"
      )
    );
    this.shareButtons = Array.from(
      this.element.querySelectorAll<HTMLButtonElement>(".js-apartment-share")
    );
    this.printButtons = Array.from(
      this.element.querySelectorAll<HTMLButtonElement>(".js-apartment-print")
    );
    this.characteristicsList = this.element.querySelector<HTMLElement>(
      ".js-apartment-characteristics"
    );
    this.characteristicsToggle =
      this.element.querySelector<HTMLButtonElement>(
        ".js-apartment-characteristics-toggle"
      );
    this.bookingBar = this.element.querySelector<HTMLElement>(
      ".js-apartment-booking-bar"
    );
    this.scrollTopButton = this.element.querySelector<HTMLButtonElement>(
      ".js-apartment-scroll-top"
    );
    this.footer = document.querySelector<HTMLElement>(".page-footer");

    this.tabs.forEach((tab) => {
      tab.addEventListener("click", this.handleTabClick);
      tab.addEventListener("keydown", this.handleTabKeyDown);
    });
    this.sunToggles.forEach((toggle) => {
      toggle.addEventListener("click", this.handleSunToggle);
    });
    this.shareButtons.forEach((button) => {
      button.addEventListener("click", this.handleShare);
    });
    this.printButtons.forEach((button) => {
      button.addEventListener("click", this.handlePrint);
    });
    this.characteristicsToggle?.addEventListener(
      "click",
      this.handleCharacteristicsToggle
    );
    this.scrollTopButton?.addEventListener("click", this.handleScrollTop);
    window.addEventListener("scroll", this.handleScroll, { passive: true });

    this.observeFooter();
    this.updateBookingBar();
    this.enableTransitions();
  }

  public destroy() {
    this.tabs.forEach((tab) => {
      tab.removeEventListener("click", this.handleTabClick);
      tab.removeEventListener("keydown", this.handleTabKeyDown);
    });
    this.sunToggles.forEach((toggle) => {
      toggle.removeEventListener("click", this.handleSunToggle);
    });
    this.shareButtons.forEach((button) => {
      button.removeEventListener("click", this.handleShare);
    });
    this.printButtons.forEach((button) => {
      button.removeEventListener("click", this.handlePrint);
    });
    this.characteristicsToggle?.removeEventListener(
      "click",
      this.handleCharacteristicsToggle
    );
    this.scrollTopButton?.removeEventListener("click", this.handleScrollTop);
    window.removeEventListener("scroll", this.handleScroll);
    this.footerObserver?.disconnect();
    if (this.readyRaf) cancelAnimationFrame(this.readyRaf);
    if (this.scrollRaf) cancelAnimationFrame(this.scrollRaf);
    this.element.classList.remove("is-ready");
    this.unregister();
  }

  private enableTransitions() {
    this.readyRaf = requestAnimationFrame(() => {
      this.readyRaf = requestAnimationFrame(() => {
        this.readyRaf = 0;
        this.element.classList.add("is-ready");
      });
    });
  }

  private setActiveTab(index: number, moveFocus = false) {
    if (index < 0 || index >= this.tabs.length || !this.panels[index]) return;

    this.tabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === index;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });
    this.panels.forEach((panel, panelIndex) => {
      const isActive = panelIndex === index;
      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
    });

    this.activeIndex = index;
    const activeTab = this.tabs[index];
    if (moveFocus) activeTab?.focus();
    activeTab?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  private handleTabClick = (event: MouseEvent) => {
    const tab = event.currentTarget as HTMLButtonElement;
    this.setActiveTab(this.tabs.indexOf(tab));
  };

  private handleTabKeyDown = (event: KeyboardEvent) => {
    let nextIndex = this.activeIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (this.activeIndex + 1) % this.tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (this.activeIndex - 1 + this.tabs.length) % this.tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = this.tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    this.setActiveTab(nextIndex, true);
  };

  private handleSunToggle = () => {
    this.isSunActive = !this.isSunActive;
    this.element.classList.toggle("is-sun-active", this.isSunActive);
    this.sunToggles.forEach((toggle) => {
      toggle.setAttribute("aria-checked", String(this.isSunActive));
      if (toggle.classList.contains("apartment-hero__round-action--sun")) {
        toggle.setAttribute(
          "aria-label",
          this.isSunActive
            ? "Скрыть направление солнца"
            : "Показать направление солнца"
        );
      }
    });
  };

  private handleCharacteristicsToggle = () => {
    if (!this.characteristicsToggle) return;

    const isExpanded =
      this.characteristicsToggle.getAttribute("aria-expanded") === "true";
    const shouldExpand = !isExpanded;

    this.characteristicsList?.classList.toggle("is-expanded", shouldExpand);
    this.characteristicsToggle.setAttribute(
      "aria-expanded",
      String(shouldExpand)
    );
    this.characteristicsToggle.textContent = shouldExpand
      ? (this.characteristicsToggle.dataset.collapseLabel ?? "Свернуть")
      : (this.characteristicsToggle.dataset.expandLabel ??
        "Все характеристики");
  };

  private handleShare = async () => {
    const shareData = { title: document.title, url: window.location.href };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard?.writeText(shareData.url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  };

  private handlePrint = () => {
    window.print();
  };

  private handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  private handleScroll = () => {
    if (this.scrollRaf) return;

    this.scrollRaf = requestAnimationFrame(() => {
      this.scrollRaf = 0;
      this.updateBookingBar();
    });
  };

  private updateBookingBar() {
    this.bookingBar?.classList.toggle("is-compact", window.scrollY > 120);

    if (!this.footerObserver && this.footer && this.bookingBar) {
      const footerTop = this.footer.getBoundingClientRect().top;
      this.bookingBar.classList.toggle(
        "is-footer-visible",
        footerTop < window.innerHeight
      );
    }
  }

  private observeFooter() {
    if (!this.footer || !this.bookingBar || !("IntersectionObserver" in window)) {
      return;
    }

    this.footerObserver = new IntersectionObserver(([entry]) => {
      this.bookingBar?.classList.toggle(
        "is-footer-visible",
        Boolean(entry?.isIntersecting)
      );
    });
    this.footerObserver.observe(this.footer);
  }
}

export default ApartmentHero;
