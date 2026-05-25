import AboutProject from "../classes/components/AboutProject";

export default function initAboutProject() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".js-about-project")
  );

  elements.forEach((element) => {
    new AboutProject(element);
  });
}
