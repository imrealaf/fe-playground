import { componentName, className, events, selector } from "./Panel.constants";
import Toggleable from "../core/Toggleable";

class Panel extends Toggleable {
  onConstruct() {
    this.name = componentName;
    this.selectors = selector;
    this.events = events;
    this.id = this.element.root.id;
  }

  setElements(root) {
    this.element = {
      root: root,
      content: root.querySelector(selector.content),
      header: root.querySelector(selector.header),
      body: root.querySelector(selector.body),
      footer: root.querySelector(selector.footer)
    };

    this.transitionElement = this.element.content;
    this.focusElement = this.element.content;
  }

  addClasses() {
    this.element.root.classList.add(`${this.name}-${this.props.position}`);
  }
}

export default Panel;
