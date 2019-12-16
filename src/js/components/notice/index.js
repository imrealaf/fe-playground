import { exists, mapAttributesToProps } from "../../utils/domElement";
import { selector, defaultProps } from "./Notice.constants";
import Notice from "./Notice";

if (exists(selector.root)) {
  const element = document.querySelector(selector.root);
  const props = mapAttributesToProps(element, defaultProps);
  window.Notice = new Notice(element, props);
}
