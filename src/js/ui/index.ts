import accordions from "./accordions";
import contactsLead from "./contactsLead";
import meetingModals from "./meetingModals";
import modals from "./modals";
import pageHeader from "./pageHeader";
import selects from "./selects";

export default function ui() {
  pageHeader();
  accordions();
  contactsLead();
  modals();
  meetingModals();
  selects();
}
