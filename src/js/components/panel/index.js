import { exists, mapAttributesToProps } from "../../utils/domElement";
import { selector, defaultProps } from "./Panel.constants";
import Panel from "./Panel";

if (exists(selector.root)) {
  const elements = document.querySelectorAll(selector.root);
  elements.forEach(element => {
    const props = mapAttributesToProps(element, defaultProps);

    if (element.id) {
      if (typeof window.Panel === undefined) window.Panel = {};
      Panel[element.id] = new Panel(element, props);
    } else {
      throw "Panel does not have an ID";
    }
  });
}
