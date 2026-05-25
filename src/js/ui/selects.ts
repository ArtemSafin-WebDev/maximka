import Select from "../classes/components/Select";

export default function selects() {
  document.querySelectorAll<HTMLElement>(".js-select").forEach((element) => {
    if (!Select.getInstanceFor(element)) {
      new Select(element);
    }
  });
}
