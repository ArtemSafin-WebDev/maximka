import Component from "../Component";

const MOBILE_QUERY = "(max-width: 576px)";
const MONTHS_NOMINATIVE = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const MONTHS_GENITIVE = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

class MeetingModal extends Component {
  private dialog: HTMLDialogElement;
  private contacts: HTMLElement;
  private calendar: HTMLElement;
  private form: HTMLFormElement;
  private dateInput: HTMLInputElement;
  private dateLabel: HTMLElement;
  private mobileDateLabel: HTMLElement;
  private dateError: HTMLElement;
  private calendarError: HTMLElement;
  private calendarGrid: HTMLElement;
  private monthLabel: HTMLElement;
  private calendarToggle: HTMLButtonElement;
  private calendarClose: HTMLButtonElement;
  private continueButton: HTMLButtonElement;
  private changeDateButton: HTMLButtonElement;
  private previousMonthButton: HTMLButtonElement;
  private nextMonthButton: HTMLButtonElement;
  private fields: HTMLInputElement[];
  private mobileMedia = window.matchMedia(MOBILE_QUERY);
  private reducedMotionMedia = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  private visibleMonth: Date;
  private selectedDate: Date | null = null;

  constructor(dialog: HTMLDialogElement) {
    super(dialog);
    this.dialog = dialog;
    this.contacts = this.getRequiredElement<HTMLElement>(
      ".js-meeting-contacts"
    );
    this.calendar = this.getRequiredElement<HTMLElement>(
      ".js-meeting-calendar"
    );
    this.form = this.getRequiredElement<HTMLFormElement>(".js-meeting-form");
    this.dateInput = this.getRequiredElement<HTMLInputElement>(
      ".js-meeting-date-input"
    );
    this.dateLabel = this.getRequiredElement<HTMLElement>(
      ".js-meeting-date-label"
    );
    this.mobileDateLabel = this.getRequiredElement<HTMLElement>(
      ".js-meeting-mobile-date"
    );
    this.dateError = this.getRequiredElement<HTMLElement>(
      ".js-meeting-date-error"
    );
    this.calendarError = this.getRequiredElement<HTMLElement>(
      ".js-meeting-calendar-error"
    );
    this.calendarGrid = this.getRequiredElement<HTMLElement>(
      ".js-meeting-calendar-grid"
    );
    this.monthLabel = this.getRequiredElement<HTMLElement>(
      ".js-meeting-month-label"
    );
    this.calendarToggle = this.getRequiredElement<HTMLButtonElement>(
      ".js-meeting-calendar-toggle"
    );
    this.calendarClose = this.getRequiredElement<HTMLButtonElement>(
      ".js-meeting-calendar-close"
    );
    this.continueButton = this.getRequiredElement<HTMLButtonElement>(
      ".js-meeting-continue"
    );
    this.changeDateButton = this.getRequiredElement<HTMLButtonElement>(
      ".js-meeting-change-date"
    );
    this.previousMonthButton = this.getRequiredElement<HTMLButtonElement>(
      ".js-meeting-month-prev"
    );
    this.nextMonthButton = this.getRequiredElement<HTMLButtonElement>(
      ".js-meeting-month-next"
    );
    this.fields = Array.from(
      dialog.querySelectorAll<HTMLInputElement>(".js-meeting-field")
    );

    const today = new Date();
    this.visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleCalendarToggle = this.handleCalendarToggle.bind(this);
    this.handleCalendarClose = this.handleCalendarClose.bind(this);
    this.handlePreviousMonth = this.handlePreviousMonth.bind(this);
    this.handleNextMonth = this.handleNextMonth.bind(this);
    this.handleCalendarClick = this.handleCalendarClick.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.handleCalendarAnimationEnd =
      this.handleCalendarAnimationEnd.bind(this);

    document.addEventListener("click", this.handleTriggerClick);
    document.addEventListener("click", this.handleDocumentClick);
    this.calendarToggle.addEventListener("click", this.handleCalendarToggle);
    this.calendarClose.addEventListener("click", this.handleCalendarClose);
    this.previousMonthButton.addEventListener(
      "click",
      this.handlePreviousMonth
    );
    this.nextMonthButton.addEventListener("click", this.handleNextMonth);
    this.calendarGrid.addEventListener("click", this.handleCalendarClick);
    this.continueButton.addEventListener("click", this.handleContinue);
    this.changeDateButton.addEventListener("click", this.handleChangeDate);
    this.form.addEventListener("submit", this.handleSubmit);
    this.form.addEventListener("reset", this.handleReset);
    this.mobileMedia.addEventListener("change", this.handleMediaChange);
    this.calendar.addEventListener(
      "animationend",
      this.handleCalendarAnimationEnd
    );

    this.updateFieldPlaceholders();
    this.renderCalendar();
  }

  private getRequiredElement<T extends HTMLElement>(selector: string): T {
    const element = this.dialog.querySelector<T>(selector);
    if (!element) throw new Error(`Meeting modal element not found: ${selector}`);
    return element;
  }

  private handleTriggerClick(event: MouseEvent) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const trigger = target.closest<HTMLElement>(
      `[data-dialog-target="${this.dialog.id}"], a[href="#${this.dialog.id}"]`
    );
    if (!trigger) return;

    this.clearDateErrors();
    if (this.mobileMedia.matches) {
      this.showMobileStep("calendar");
    } else {
      this.contacts.hidden = false;
      this.setCalendarVisibility(false, true);
    }
  }

  private handleDocumentClick(event: MouseEvent) {
    if (
      this.mobileMedia.matches ||
      this.calendar.hidden ||
      !(event.target instanceof Node)
    ) {
      return;
    }

    if (
      !this.calendar.contains(event.target) &&
      !this.calendarToggle.contains(event.target)
    ) {
      this.setCalendarVisibility(false);
    }
  }

  private handleCalendarToggle() {
    if (this.mobileMedia.matches) {
      this.showMobileStep("calendar");
      return;
    }

    this.setCalendarVisibility(this.calendar.hidden);
  }

  private handleCalendarClose() {
    if (this.mobileMedia.matches) {
      this.dialog.close();
      return;
    }

    this.setCalendarVisibility(false);
    this.calendarToggle.focus();
  }

  private handlePreviousMonth() {
    this.changeMonth(-1);
  }

  private handleNextMonth() {
    this.changeMonth(1);
  }

  private changeMonth(offset: number) {
    this.visibleMonth = new Date(
      this.visibleMonth.getFullYear(),
      this.visibleMonth.getMonth() + offset,
      1
    );
    this.renderCalendar();
  }

  private handleCalendarClick(event: MouseEvent) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const dayButton = target.closest<HTMLButtonElement>(
      ".js-meeting-calendar-day"
    );
    if (!dayButton || dayButton.disabled) return;

    event.stopPropagation();

    const year = Number(dayButton.dataset.year);
    const month = Number(dayButton.dataset.month);
    const day = Number(dayButton.dataset.day);
    if (![year, month, day].every(Number.isInteger)) return;

    this.selectedDate = new Date(year, month, day);
    this.updateSelectedDate();
    this.renderCalendar();
    this.clearDateErrors();

    if (!this.mobileMedia.matches) {
      this.setCalendarVisibility(false);
      this.calendarToggle.focus({ preventScroll: true });
    }
  }

  private handleContinue() {
    if (!this.selectedDate) {
      this.calendarError.textContent = "Выберите дату встречи";
      return;
    }

    this.clearDateErrors();
    this.showMobileStep("contacts");
    this.contacts
      .querySelector<HTMLElement>(".modal__title")
      ?.focus({ preventScroll: true });
  }

  private handleChangeDate() {
    this.showMobileStep("calendar");
  }

  private handleSubmit(event: SubmitEvent) {
    if (this.selectedDate) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    this.dateError.textContent = "Выберите дату встречи";

    if (this.mobileMedia.matches) {
      this.calendarError.textContent = "Выберите дату встречи";
      this.showMobileStep("calendar");
    } else {
      this.setCalendarVisibility(true);
      this.calendarToggle.focus();
    }
  }

  private handleReset() {
    this.selectedDate = null;
    this.dateInput.value = "";
    this.dateLabel.textContent = "Выбрать дату";
    this.mobileDateLabel.textContent = "Дата не выбрана";
    this.calendarToggle.classList.remove("is-selected");
    this.clearDateErrors();

    const today = new Date();
    this.visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.renderCalendar();

    if (this.mobileMedia.matches) {
      this.showMobileStep("calendar");
    } else {
      this.contacts.hidden = false;
      this.setCalendarVisibility(false, true);
    }
  }

  private handleMediaChange() {
    this.updateFieldPlaceholders();

    if (this.mobileMedia.matches) {
      this.showMobileStep(this.selectedDate ? "contacts" : "calendar");
    } else {
      this.contacts.hidden = false;
      this.setCalendarVisibility(false, true);
    }
  }

  private updateFieldPlaceholders() {
    this.fields.forEach((field) => {
      const placeholder = this.mobileMedia.matches
        ? field.dataset.placeholderMobile
        : field.dataset.placeholderDesktop;
      if (placeholder) field.placeholder = placeholder;
    });
  }

  private showMobileStep(step: "calendar" | "contacts") {
    const showCalendar = step === "calendar";
    this.contacts.hidden = false;
    this.calendar.classList.remove("is-closing");
    this.calendar.hidden = !showCalendar;
    this.dialog.dataset.mobileStep = step;
    this.calendarToggle.setAttribute("aria-expanded", String(showCalendar));
  }

  private setCalendarVisibility(isVisible: boolean, immediately = false) {
    this.calendarToggle.setAttribute("aria-expanded", String(isVisible));

    if (isVisible) {
      this.calendar.classList.remove("is-closing");
      this.calendar.hidden = false;
      return;
    }

    if (
      immediately ||
      this.calendar.hidden ||
      this.reducedMotionMedia.matches
    ) {
      this.calendar.classList.remove("is-closing");
      this.calendar.hidden = true;
      return;
    }

    this.calendar.classList.add("is-closing");
  }

  private handleCalendarAnimationEnd() {
    if (!this.calendar.classList.contains("is-closing")) return;

    this.calendar.classList.remove("is-closing");
    this.calendar.hidden = true;
  }

  private updateSelectedDate() {
    if (!this.selectedDate) return;

    const day = this.selectedDate.getDate();
    const month = MONTHS_GENITIVE[this.selectedDate.getMonth()];
    const year = this.selectedDate.getFullYear();
    this.dateInput.value = `${year}-${String(
      this.selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    this.dateLabel.textContent = `${day} ${month} ${year}`;
    this.mobileDateLabel.textContent = `${day} ${month}`;
    this.calendarToggle.classList.add("is-selected");
  }

  private clearDateErrors() {
    this.dateError.textContent = "";
    this.calendarError.textContent = "";
  }

  private renderCalendar() {
    const year = this.visibleMonth.getFullYear();
    const month = this.visibleMonth.getMonth();
    this.monthLabel.textContent = `${MONTHS_NOMINATIVE[month]} ${year}`;

    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cellsCount = firstWeekday + daysInMonth > 35 ? 42 : 35;
    const gridStart = new Date(year, month, 1 - firstWeekday);
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < cellsCount; index += 1) {
      const date = new Date(
        gridStart.getFullYear(),
        gridStart.getMonth(),
        gridStart.getDate() + index
      );
      const isCurrentMonth = date.getMonth() === month;
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isSelected =
        this.selectedDate !== null &&
        date.getFullYear() === this.selectedDate.getFullYear() &&
        date.getMonth() === this.selectedDate.getMonth() &&
        date.getDate() === this.selectedDate.getDate();

      const button = document.createElement("button");
      button.className = "meeting-calendar__day js-meeting-calendar-day";
      if (isSelected) button.classList.add("is-selected");
      button.type = "button";
      button.textContent = String(date.getDate());
      button.disabled = !isCurrentMonth || isWeekend;
      button.dataset.year = String(date.getFullYear());
      button.dataset.month = String(date.getMonth());
      button.dataset.day = String(date.getDate());
      button.setAttribute(
        "aria-label",
        `${date.getDate()} ${MONTHS_GENITIVE[date.getMonth()]} ${date.getFullYear()}`
      );
      button.setAttribute("aria-pressed", String(isSelected));
      fragment.append(button);
    }

    this.calendarGrid.replaceChildren(fragment);
  }

  destroy() {
    document.removeEventListener("click", this.handleTriggerClick);
    document.removeEventListener("click", this.handleDocumentClick);
    this.calendarToggle.removeEventListener("click", this.handleCalendarToggle);
    this.calendarClose.removeEventListener("click", this.handleCalendarClose);
    this.previousMonthButton.removeEventListener(
      "click",
      this.handlePreviousMonth
    );
    this.nextMonthButton.removeEventListener("click", this.handleNextMonth);
    this.calendarGrid.removeEventListener("click", this.handleCalendarClick);
    this.continueButton.removeEventListener("click", this.handleContinue);
    this.changeDateButton.removeEventListener("click", this.handleChangeDate);
    this.form.removeEventListener("submit", this.handleSubmit);
    this.form.removeEventListener("reset", this.handleReset);
    this.mobileMedia.removeEventListener("change", this.handleMediaChange);
    this.calendar.removeEventListener(
      "animationend",
      this.handleCalendarAnimationEnd
    );
    this.unregister();
  }
}

export default MeetingModal;
