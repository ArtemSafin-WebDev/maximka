import accordions from "./accordions";
import modals from "./modals";
import pageHeader from "./pageHeader";
import selects from "./selects";

export default function ui() {
  pageHeader();
  accordions();
  modals();
  selects();
}
