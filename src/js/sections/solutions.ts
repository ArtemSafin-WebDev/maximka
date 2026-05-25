import SolutionsTabs from "../classes/components/SolutionsTabs";

export default function initSolutions() {
  document.querySelectorAll<HTMLElement>(".js-solutions").forEach((element) => {
    if (!SolutionsTabs.getInstanceFor(element)) {
      new SolutionsTabs(element);
    }
  });
}
