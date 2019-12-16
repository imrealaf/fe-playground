import { exists, mapAttributesToProps } from "../../utils/domElement";
import { selector, defaultProps } from "./Navbar.constants";
import Navbar from "./Navbar";

if (exists(selector.root)) {
  const element = document.querySelector(selector.root);
  const props = mapAttributesToProps(element, defaultProps);
  window.Navbar = new Navbar(element, props);
}
