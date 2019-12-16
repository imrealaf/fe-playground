import { exists, mapAttributesToProps } from "../../utils/domElement";
import { selector, defaultProps } from "./Hero.constants";
import Hero from "./Hero";

if (exists(selector.root)) {
  const elements = document.querySelectorAll(selector.root);
  elements.forEach(element => {
    const props = mapAttributesToProps(element, defaultProps);
    new Hero(element, props);
  });
}
