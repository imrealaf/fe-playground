import config from "../../constants/config";
import domState from "../../constants/domState";
import theme from "../../constants/theme";
import { exists, onTransitionEnd } from "../../utils/domElement";
import { getThemeFromClass } from "../../utils/theme";
import {
  className,
  componentName,
  selector,
  noticeCookieName
} from "./Notice.constants";

class Notice {
  constructor(element, props) {
    this.props = props;
    this.setElements(element);
    this.addClasses();
    this.init();
  }

  setElements(root) {
    this.element = {
      root
    };
  }

  addClasses() {
    document.body.classList.add(`has-${componentName}`);
  }

  init() {
    this.theme = getThemeFromClass(this.element.root.className);

    this.checkFixed();

    if (this.props.dismissible) {
      this.injectCloseButton();
      this.setDismissEvent();
    }

    if (!Cookies.get(noticeCookieName)) {
      this.element.root.style.display = "block";
    }
  }

  injectCloseButton() {
    this.element.close = document.createElement("div");
    this.element.close.className = `${className.close} close-${this.theme}`;
    this.element.close.setAttribute("data-dismiss", componentName);
    this.element.root.appendChild(this.element.close);
  }

  setDismissEvent() {
    this.dismissEvent = () => {
      this.onCloseClick();
    };
    this.element.close.addEventListener("click", this.dismissEvent);
  }

  onCloseClick() {
    document.body.classList.remove(`has-${componentName}`);
    this.element.root.remove();
    if (this.props.rememberDismiss) {
      Cookies.set(noticeCookieName, true);
    }
  }

  checkFixed() {
    console.log(exists(selector.bottomSheet));
    if (
      this.element.root.classList.contains(`${componentName}-fixed-bottom`) &&
      exists(selector.bottomSheet)
    ) {
      const bottomSheet = document.querySelector(selector.bottomSheet);
      this.element.root.style.bottom = `${bottomSheet.offsetHeight}px`;
    }
  }
}

export default Notice;
