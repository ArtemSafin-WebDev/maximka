import Component from "../Component";
import { MOBILE_BREAKPOINT } from "../../constants/breakpoints";

class ContactsLead extends Component {
  private readonly desktopSlot: HTMLElement | null;
  private readonly mobileSlot: HTMLElement | null;
  private readonly panel: HTMLElement | null;
  private readonly dialog: HTMLDialogElement | null;
  private readonly mobileMedia: MediaQueryList;

  constructor(element: HTMLElement) {
    super(element);

    this.desktopSlot = element.querySelector<HTMLElement>(
      ".js-contacts-lead-desktop-slot"
    );
    this.mobileSlot = element.querySelector<HTMLElement>(
      ".js-contacts-lead-mobile-slot"
    );
    this.panel = element.querySelector<HTMLElement>(".js-contacts-lead-panel");
    this.dialog = element.querySelector<HTMLDialogElement>(".js-dialog-modal");
    this.mobileMedia = window.matchMedia(`(width <= ${MOBILE_BREAKPOINT}px)`);

    this.relocatePanel();
    this.mobileMedia.addEventListener("change", this.handleMediaChange);
  }

  private handleMediaChange = () => {
    this.relocatePanel();
  };

  private relocatePanel() {
    if (!this.desktopSlot || !this.mobileSlot || !this.panel) return;

    if (this.mobileMedia.matches) {
      if (this.panel.parentElement !== this.mobileSlot) {
        this.mobileSlot.append(this.panel);
      }
      return;
    }

    if (this.dialog?.open) this.dialog.close();
    if (this.panel.parentElement !== this.desktopSlot) {
      this.desktopSlot.append(this.panel);
    }
  }

  destroy() {
    this.mobileMedia.removeEventListener("change", this.handleMediaChange);
    this.unregister();
  }
}

export default ContactsLead;
