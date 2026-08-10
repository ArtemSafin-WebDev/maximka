import ContactsLead from "../classes/components/ContactsLead";

export default function contactsLead() {
  document
    .querySelectorAll<HTMLElement>(".js-contacts-lead")
    .forEach((element) => {
      new ContactsLead(element);
    });
}
