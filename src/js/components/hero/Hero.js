import ImagePreloader from "image-preloader";
import domState from "../../constants/domState";
import { exists, onTransitionEnd } from "../../utils/domElement";
import { componentName, selector } from "./Hero.constants";

class Hero {
  constructor(element, props) {
    this.props = props;
    this.setElements(element);
    this.addClasses();
    this.init();
  }

  setElements(root) {
    this.element = {
      root,
      content: root.querySelector(selector.content)
    };
  }

  addClasses() {
    if (this.props.bgImage)
      this.element.root.classList.add(
        `${componentName}-bg${this.props.bgFixed ? "-fixed" : ""}`
      );
    if (this.props.transition)
      this.element.root.classList.add(
        `has-transition-${this.props.transitionType}`
      );
  }

  init() {
    if (this.props.bgImage) {
      this.setBg();
    } else if (this.props.transition) {
      this.transitionIn();
    }
  }

  setBg() {
    if (this.props.preload) {
      this.preloader = new ImagePreloader();
      this.preloader.preload(this.props.bgImage).then(status => {
        this.onBgLoaded();
      });
    } else {
      this.onBgLoaded();
    }
  }

  onBgLoaded() {
    setTimeout(() => {
      this.element.root.style.backgroundImage = `url(${this.props.bgImage})`;
      this.element.root.classList.add(domState.loaded);

      if (this.props.transition) {
        this.transitionIn();
      }
    }, this.props.loadingDelay);
  }

  transitionIn() {
    setTimeout(() => {
      this.element.root.classList.add(domState.transitionIn);
    }, this.props.transitionDelay);
  }
}

export default Hero;
