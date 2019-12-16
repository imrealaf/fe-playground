import config from "../../constants/config";

export const componentName = "hero";

export const className = {
  root: `${config.namespace}-${componentName}`,
  content: `${componentName}_content`
};

export const selector = {
  root: `.${className.root}`,
  content: `.${className.content}`
};

export const defaultProps = {
  loadingDelay: 300,
  preload: true,
  transition: false,
  transitionDelay: 300,
  transitionType: "slide-up", // slide-up, slide-down, scale-in, scale-out
  bgImage: false,
  bgFixed: false
};
