import Component from "../Component";

class DialogModal extends Component {
  private dialog: HTMLDialogElement;
  private closeButtons: HTMLButtonElement[];
  private previouslyFocusedElement: HTMLElement | null = null;
  private shouldRestoreFocus = false;

  constructor(dialog: HTMLDialogElement) {
    super(dialog);
    this.dialog = dialog;
    this.closeButtons = Array.from(
      dialog.querySelectorAll<HTMLButtonElement>(".js-dialog-close")
    );

    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleDialogClick = this.handleDialogClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.close = this.close.bind(this);

    document.addEventListener("click", this.handleDocumentClick);
    dialog.addEventListener("click", this.handleDialogClick);
    dialog.addEventListener("close", this.handleClose);
    this.closeButtons.forEach((button) => {
      button.addEventListener("click", this.close);
    });
  }

  private handleDocumentClick(event: MouseEvent) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const trigger = target.closest<HTMLElement>(
      `[data-dialog-target="${this.dialog.id}"], a[href="#${this.dialog.id}"]`
    );
    if (!trigger) return;

    event.preventDefault();
    this.open(trigger, event.detail === 0);
  }

  private handleDialogClick(event: MouseEvent) {
    const target = event.target;
    if (target instanceof Element && target.closest(".js-dialog-close")) {
      this.close();
      return;
    }

    if (event.target === this.dialog) {
      this.close();
    }
  }

  private open(trigger: HTMLElement, shouldRestoreFocus: boolean) {
    if (this.dialog.open) return;

    this.previouslyFocusedElement = trigger;
    this.shouldRestoreFocus = shouldRestoreFocus;
    this.dialog.showModal();
    document.body.classList.add("modal-open");
  }

  private close() {
    if (!this.dialog.open) return;
    this.dialog.close();
  }

  private handleClose() {
    document.body.classList.remove("modal-open");
    this.dialog.querySelector("form")?.reset();
    if (this.shouldRestoreFocus) {
      this.previouslyFocusedElement?.focus();
    } else {
      this.previouslyFocusedElement?.blur();
    }
    this.previouslyFocusedElement = null;
    this.shouldRestoreFocus = false;
  }

  destroy() {
    document.removeEventListener("click", this.handleDocumentClick);
    this.dialog.removeEventListener("click", this.handleDialogClick);
    this.dialog.removeEventListener("close", this.handleClose);
    this.closeButtons.forEach((button) => {
      button.removeEventListener("click", this.close);
    });
    this.unregister();
  }
}

export default DialogModal;
