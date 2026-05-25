import ProgressSection from "../classes/components/ProgressSection";

export default function initProgress() {
  document.querySelectorAll<HTMLElement>(".js-progress").forEach((element) => {
    if (!ProgressSection.getInstanceFor(element)) {
      new ProgressSection(element);
    }
  });
}
