import config from "../../constants/config";

export const componentName = "navbar";

export const className = {
  root: `${config.namespace}-${componentName}`,
  logo: `${componentName}_logo`
};

export const selector = {
  root: `.${className.root}`,
  logo: `.${className.logo} img`,
  notice: `.${config.namespace}-notice`
};

export const defaultProps = {
  watchBg: false,
  bgTrigger: "#content",
  watchSticky: false,
  hideSticky: true,
  switchLogo: false,
  switchIcons: false
};
