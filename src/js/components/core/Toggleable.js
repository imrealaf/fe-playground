import config from "../../constants/config";
import {
  getThemeFromClass,
  getOppositeThemeFromClass
} from "../../utils/theme";
import { onTransitionEnd } from "../../utils/domElement";
import keyCode from "../../constants/keyCode";
import domState from "../../constants/domState";

class Toggleable {
  constructor(element, props) {
    this.props = props;
    this.active = false;

    this.setElements(element);
    this.onConstruct();
    this.setFocusableElements();

    if (this.props.close) this.addCloseButton();

    this.addClasses();
    this.initEvents();
  }

  onConstruct() {}
  setElements() {}
  addClasses() {}

  /* ------------------------------------------ C R E A T E ------------------------------------------- */

  addCloseButton() {
    const theme = getOppositeThemeFromClass(this.element.root.className);
    this.element.close = document.createElement("button");
    this.element.close.className = `${config.namespace}-close close-${theme}`;
    this.element.close.setAttribute("data-dismiss", this.name);
    this.element.close.setAttribute("aria-label", this.props.closeLabel);
    this.element.close.setAttribute("type", "button");
    this.element.content.prepend(this.element.close);
  }

  /* ------------------------------------------ F O C U S I N G ------------------------------------------- */

  setFocusableElements() {
    if (!this.focusElement) return false;
    this.focusElements = this.focusElement.querySelectorAll(
      this.selectors.focusable
    );
    this.element.firstFocus = this.focusElements[0];
    this.element.lastFocus = this.focusElements[this.focusElements.length - 1];
  }

  hasFocusableElements() {
    return this.focusElements.length > 0;
  }

  setFocus() {
    this.focusElement.focus();
    this.setKeydownTabEvent();
  }

  unsetFocus() {
    this.focusElement.blur();
    this.removeKeydownTabEvent();
  }

  handleBackwardTab() {
    if (document.activeElement === this.element.firstFocus) {
      this.element.lastFocus.focus();
      setTimeout(() => {
        this.element.lastFocus.focus();
      });
    }
  }

  handleForwardTab() {
    if (document.activeElement === this.element.lastFocus) {
      this.element.firstFocus.focus();
      setTimeout(() => {
        this.element.firstFocus.focus();
      });
    }
  }

  /* ------------------------------------------ E V E N T S ------------------------------------------- */

  initEvents() {
    this.setToggleClickEvent();
    if (this.props.close) this.setCloseClickEvent();
  }

  setToggleClickEvent() {
    this.toggles = document.querySelectorAll(
      `[data-toggle="${this.name}"][href="#${this.id}"],[data-toggle="${this.name}"][data-target="#${this.id}"]`
    );

    this.toggleClickEvent = e => {
      e.preventDefault();
      this.toggle(e.target);
    };

    for (let index = 0; index < this.toggles.length; index++) {
      const toggle = this.toggles[index];
      toggle.addEventListener("click", this.toggleClickEvent);
    }
  }

  removeToggleClickEvents() {
    for (let i = 0; i < this.toggles.length; i++) {
      const toggle = this.toggles[i];
      toggle.removeEventListener("click", this.toggleClickEvent);
    }
  }

  setOverlayClickEvent() {
    this.overlayClickEvent = () => {
      this.close(false);
    };
    this.element.overlay.addEventListener("click", this.overlayClickEvent);
  }

  removeOverlayClickEvent() {
    this.element.overlay.removeEventListener("click", this.overlayClickEvent);
  }

  setCloseClickEvent() {
    this.closeClickEvent = e => {
      e.preventDefault();
      this.close(false);
    };

    this.closeElements = this.element.root.querySelectorAll(
      `${this.selectors.close}, [data-dismiss="${this.name}"]`
    );

    for (let i = 0; i < this.closeElements.length; i++) {
      const element = this.closeElements[i];
      element.addEventListener("click", this.closeClickEvent);
    }
  }

  removeCloseClickEvent() {
    for (let i = 0; i < this.closeElements.length; i++) {
      const element = this.closeElements[i];
      element.removeEventListener("click", this.closeClickEvent);
    }
  }

  setDismissKeyEvent() {
    this.dismissKeyEvent = e => {
      if (e.which === keyCode.escape || e.keyCode === keyCode.escape) {
        this.close(false);
      }
    };
    document.addEventListener("keyup", this.dismissKeyEvent);
  }

  removeDismissKeyEvent() {
    document.removeEventListener("keyup", this.dismissKeyEvent);
  }

  setKeydownTabEvent() {
    this.keydownTabEvent = e => {
      if (e.which === keyCode.tab || e.keyCode === keyCode.tab) {
        if (e.shiftKey) {
          this.handleBackwardTab();
        } else {
          this.handleForwardTab();
        }
      }
    };

    document.addEventListener("keydown", this.keydownTabEvent);
  }

  removeKeydownTabEvent() {
    document.removeEventListener("keydown", this.keydownTabEvent);
  }

  /* ------------------------------------------ O V E R L A Y ------------------------------------------- */

  addOverlay() {
    // Create element and add properties
    const container = this.element.root;
    const theme = getThemeFromClass(this.element.root.className);
    this.element.overlay = document.createElement("div");
    this.element.overlay.className = `${config.namespace}-overlay overlay-fixed overlay-${theme} overlay-${this.props.overlayOpacity} has-transition`;

    // Inject into DOM
    container.prepend(this.element.overlay);

    // Animate in if toggleable component
    setTimeout(() => {
      this.element.overlay.classList.add(domState.transitionIn);
    });

    // Set event if applicable
    if (this.props.dismissible) {
      this.setOverlayClickEvent();
    }
  }

  removeOverlay() {
    // Determine parent container
    const container = this.element.root;

    // If event set previous, remove ..
    if (this.props.close) {
      this.removeOverlayClickEvent();
    }

    // Animate out then remove from DOM
    this.element.overlay.classList.add(domState.transitionOut);
    onTransitionEnd(this.element.overlay, () => {
      container.removeChild(this.element.overlay);
      this.element.overlay = null;
    });
  }

  /* ------------------------------------------ P R E L O A D E R ------------------------------------------- */

  addPreloader() {
    // Create element and add properties
    const container = this.element.content;
    this.element.preloader = document.createElement("div");
    this.element.preloader.className = "preloader preloader--content";
    this.element.preloader.innerHTML =
      '<div class="ellipsis"><div></div><div></div><div></div><div></div></div>';

    // Inject into DOM
    container.prepend(this.element.preloader);
  }

  removePreloader() {
    // Determine parent container
    const container = this.element.content;

    // remove from DOM
    container.removeChild(this.element.preloader);
    this.element.preloader = null;
  }

  /* ------------------------------------------ M E T H O D S ------------------------------------------- */

  toggle(relatedTarget) {
    if (!this.active) {
      this.open(relatedTarget);
    } else {
      this.close(relatedTarget);
    }
  }

  open(toggleElement) {
    if (this.active) return;

    this.element.root.classList.add(domState.active);
    document.body.classList.add(`${this.name}-${domState.active}`);

    if (toggleElement) {
      toggleElement.setAttribute("aria-expanded", true);
    }

    if (this.props.overlay) this.addOverlay();
    if (this.props.dismissible && this.props.keyboard)
      this.setDismissKeyEvent();

    setTimeout(() => {
      this.element.root.classList.add(domState.transitionIn);
    });

    this.active = true;
    this.element.root.setAttribute("aria-expanded", true);
    this.setFocus();

    this.element.root.dispatchEvent(
      new CustomEvent(this.events.open, {
        bubbles: true
      })
    );

    onTransitionEnd(this.transitionElement, () => {
      this.element.root.dispatchEvent(
        new CustomEvent(this.events.opened, {
          bubbles: true
        })
      );
    });
  }

  close(toggleElement) {
    if (!this.active) return;
    this.element.root.classList.add(domState.transitionOut);

    if (toggleElement) {
      toggleElement.setAttribute("aria-expanded", false);
      toggleElement.blur();
    }

    this.active = false;

    this.element.root.setAttribute("aria-expanded", false);
    this.unsetFocus();

    document.body.classList.remove(`${this.name}-${domState.active}`);

    this.element.root.dispatchEvent(
      new CustomEvent(this.events.close, {
        bubbles: true
      })
    );

    if (this.props.overlay) this.removeOverlay();
    if (this.props.dismissible && this.props.keyboard)
      this.removeDismissKeyEvent();

    onTransitionEnd(this.transitionElement, () => {
      this.element.root.classList.remove(
        domState.active,
        domState.transitionIn,
        domState.transitionOut
      );

      this.element.root.dispatchEvent(
        new CustomEvent(this.events.closed, {
          bubbles: true
        })
      );
    });
  }

  loading() {
    return new Promise(resolve => {
      this.element.root.classList.add(domState.loading);
      this.addPreloader();
      onTransitionEnd(this.element.body, () => {
        resolve();
      });
    });
  }

  loaded(timeout) {
    return new Promise(resolve => {
      setTimeout(
        () => {
          this.element.root.classList.remove(domState.loading);
          onTransitionEnd(this.element.body, () => {
            this.removePreloader();
            resolve();
          });
        },
        timeout ? timeout : 300
      );
    });
  }
}

export default Toggleable;
