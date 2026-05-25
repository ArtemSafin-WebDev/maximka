import PageHeader from "../classes/components/PageHeader";

export default function pageHeader() {
  const element = document.querySelector<HTMLElement>(".js-page-header");
  if (!element) return;

  new PageHeader(element);
}
