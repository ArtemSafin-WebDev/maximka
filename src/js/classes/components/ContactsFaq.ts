import Component from "../Component";

class ContactsFaq extends Component {
  private readonly tabs: HTMLButtonElement[];
  private readonly panels: HTMLElement[];
  private readonly questions: HTMLButtonElement[];

  constructor(element: HTMLElement) {
    super(element);

    this.tabs = Array.from(
      this.element.querySelectorAll<HTMLButtonElement>(".js-contacts-faq-tab")
    );
    this.panels = Array.from(
      this.element.querySelectorAll<HTMLElement>(".js-contacts-faq-panel")
    );
    this.questions = Array.from(
      this.element.querySelectorAll<HTMLButtonElement>(
        ".js-contacts-faq-question"
      )
    );

    this.tabs.forEach((tab) => {
      tab.addEventListener("click", this.handleTabClick);
      tab.addEventListener("keydown", this.handleTabKeyDown);
    });
    this.questions.forEach((question) => {
      question.addEventListener("click", this.handleQuestionClick);
      this.setQuestionState(question, false);
    });

    const activeIndex = this.tabs.findIndex(
      (tab) => tab.getAttribute("aria-selected") === "true"
    );
    this.setActiveTab(activeIndex >= 0 ? activeIndex : 0, false);
  }

  public destroy() {
    this.tabs.forEach((tab) => {
      tab.removeEventListener("click", this.handleTabClick);
      tab.removeEventListener("keydown", this.handleTabKeyDown);
    });
    this.questions.forEach((question) => {
      question.removeEventListener("click", this.handleQuestionClick);
    });
    this.unregister();
  }

  private setActiveTab(index: number, moveFocus = true) {
    if (index < 0 || index >= this.tabs.length) return;

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

    if (moveFocus) this.tabs[index]?.focus();
  }

  private setQuestionState(question: HTMLButtonElement, isOpen: boolean) {
    const item = question.closest<HTMLElement>(".js-contacts-faq-item");
    const answerId = question.getAttribute("aria-controls");
    const answer = answerId
      ? document.getElementById(answerId)
      : null;

    item?.classList.toggle("is-open", isOpen);
    question.setAttribute("aria-expanded", String(isOpen));
    answer?.setAttribute("aria-hidden", String(!isOpen));
  }

  private handleTabClick = (event: MouseEvent) => {
    const tab = event.currentTarget as HTMLButtonElement;
    this.setActiveTab(this.tabs.indexOf(tab), false);
  };

  private handleTabKeyDown = (event: KeyboardEvent) => {
    const currentIndex = this.tabs.indexOf(event.currentTarget as HTMLButtonElement);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % this.tabs.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + this.tabs.length) % this.tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = this.tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    this.setActiveTab(nextIndex);
  };

  private handleQuestionClick = (event: MouseEvent) => {
    const question = event.currentTarget as HTMLButtonElement;
    const shouldOpen = question.getAttribute("aria-expanded") !== "true";
    const panel = question.closest<HTMLElement>(".js-contacts-faq-panel");

    panel
      ?.querySelectorAll<HTMLButtonElement>(".js-contacts-faq-question")
      .forEach((panelQuestion) => {
        this.setQuestionState(panelQuestion, false);
      });

    this.setQuestionState(question, shouldOpen);
  };
}

export default ContactsFaq;
