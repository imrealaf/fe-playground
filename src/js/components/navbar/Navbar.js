import domState from "../../constants/domState";
import theme from "../../constants/theme";
import { exists } from "../../utils/domElement";
import { componentName, selector, className } from "./Navbar.constants";

class Navbar {
  constructor(element, props) {
    this.props = props;
    this.setElements(element);
    this.addClasses();
    this.init();
  }

  setElements(root) {
    this.element = {
      root,
      bgTrigger: exists(this.props.bgTrigger)
        ? document.querySelector(this.props.bgTrigger)
        : null,
      logo: exists(selector.logo) ? root.querySelector(selector.logo) : null
    };
  }

  addClasses() {
    if (
      this.props.watchSticky &&
      this.element.bgTrigger &&
      !this.props.hideSticky
    ) {
      this.element.root.classList.add("has-bg-transition");
    }

    if (this.isTransparent()) {
      document.body.classList.add(`${componentName}-is-absolute`);
    }
  }

  init() {
    this.scrollPosition = document.body.getBoundingClientRect().top;
    this.logoSrc = this.element.logo.getAttribute("src") || false;

    // If switch icons is turned on ..
    if (this.props.switchIcons) {
      this.iconSrc = this.getIconSrc();
    }

    // If there is a notice above navbar ..
    if (
      document.body.classList.contains("has-notice") &&
      exists(selector.notice)
    ) {
      this.adjustForNotice();
    }

    if (this.props.watchSticky) {
      if (this.isTransparent() && this.element.bgTrigger) {
        this.checkBg();
        this.watchBg();
      }

      // First load for checking sticky status ..
      if (this.props.hideSticky) {
        this.checkStickyScrollFirstLoad();
      } else {
        this.checkSticky();
      }

      // Set events
      this.watchSticky();
    }
  }

  shouldSwitchLogo() {
    return this.props.switchLogo && this.element.logo;
  }

  shouldSwitchIcons() {
    return this.props.switchIcons && exists(".af-icon");
  }

  switchLogo(src) {
    setTimeout(() => {
      this.element.logo.setAttribute("src", src);
    }, 300);
  }

  getIconSrc() {
    const icons = this.element.root.querySelectorAll(".af-icon");
    let src = "";
    if (icons) {
      const className = icons[0].getAttribute("class");
      for (const key in theme) {
        if (theme.hasOwnProperty(key)) {
          const item = theme[key];
          if (className.indexOf(key) > -1) return key;
        }
      }
    }
    return src;
  }

  switchIcons(src) {
    setTimeout(() => {
      const icons = this.element.root.querySelectorAll(".af-icon");
      icons.forEach(element => {
        const className = element.getAttribute("class");
        element.setAttribute(
          "class",
          className.replace(theme[src].opposite, src)
        );
      });
    }, 300);
  }

  watchBg() {
    this.watchBgEvent = () => {
      this.checkBg();
    };

    document.addEventListener("scroll", this.watchBgEvent);
  }

  stopBgWatch() {
    document.removeEventListener("scroll", this.watchBgEvent);
  }

  checkBg() {
    const scrollY = window.scrollY || window.pageYOffset;
    const target = this.element.bgTrigger.getBoundingClientRect().top;
    const offset = !this.props.hideSticky ? 60 : 0;

    if (scrollY > this.element.bgTrigger.offsetTop - offset) {
      this.element.root.classList.remove(`${componentName}-transparent`);
      if (this.shouldSwitchLogo()) this.switchLogo(this.props.switchLogo);
      if (this.shouldSwitchIcons()) this.switchIcons(this.props.switchIcons);
    } else {
      this.element.root.classList.add(`${componentName}-transparent`);
      if (this.shouldSwitchLogo()) this.switchLogo(this.logoSrc);
      if (this.shouldSwitchIcons()) this.switchIcons(this.iconSrc);
    }
  }

  watchSticky() {
    this.offsetTop = this.element.root.offsetTop;

    this.stickyScrollEvent = () => {
      if (this.props.hideSticky) {
        this.checkStickyScrollDir();
      } else {
        this.checkSticky();
      }
    };

    document.addEventListener("scroll", this.stickyScrollEvent);
  }

  stopStickyWatch() {
    document.removeEventListener("scroll", this.stickyScrollEvent);
  }

  checkStickyScrollFirstLoad() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > this.element.root.offsetHeight) {
      document.body.classList.add(`${componentName}-${domState.sticky}`);
      setTimeout(() => {
        document.body.classList.add(
          `${componentName}-${domState.stickyActive}`
        );
      });
    }
  }

  checkStickyScrollDir() {
    const scrollY = window.scrollY || window.pageYOffset;
    const newPosition = document.body.getBoundingClientRect().top;
    const scrollDirection = newPosition > this.scrollPosition ? "up" : "down";

    // Scrolling up ..
    if (scrollDirection === "up") {
      document.body.classList.add(`${componentName}-${domState.stickyActive}`);

      // If reached the top
      if (scrollY === 0) {
        document.body.classList.remove(`${componentName}-${domState.sticky}`);

        if (
          document.body.classList.contains(
            `${componentName}-${domState.stickyActive}`
          )
        ) {
          document.body.classList.remove(
            `${componentName}-${domState.stickyActive}`
          );
        }
      }

      // Scroll is less than navbar height ..
      if (scrollY < this.element.root.offsetHeight) {
        this.element.root.classList.remove(domState.transition);
      }

      // Scrolling down
    } else {
      if (scrollY > this.element.root.offsetHeight) {
        document.body.classList.add(`${componentName}-${domState.sticky}`);

        setTimeout(() => {
          this.element.root.classList.add(domState.transition);
        });
      }

      document.body.classList.remove(
        `${componentName}-${domState.stickyActive}`
      );
    }

    // Store new position
    this.scrollPosition = newPosition;
  }

  checkSticky() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY >= this.offsetTop) {
      document.body.classList.add(`${componentName}-${domState.stickyActive}`);
    } else {
      document.body.classList.remove(
        `${componentName}-${domState.stickyActive}`
      );
    }
  }

  isTransparent() {
    return this.element.root.classList.contains(`${componentName}-transparent`);
  }

  adjustForNotice() {
    const notice = document.querySelector(selector.notice);

    // If transparent, position is absolute and need to adjust top
    if (this.isTransparent()) {
      this.element.root.style.top = `${notice.offsetHeight}px`;
    }
  }
}

export default Navbar;
