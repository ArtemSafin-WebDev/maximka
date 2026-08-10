import ContactsFaq from "../classes/components/ContactsFaq";

export default function initContactsFaq() {
  document.querySelectorAll<HTMLElement>(".js-contacts-faq").forEach((element) => {
    if (!ContactsFaq.getInstanceFor(element)) {
      new ContactsFaq(element);
    }
  });
}
