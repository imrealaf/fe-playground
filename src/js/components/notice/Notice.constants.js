import config from "../../constants/config";

export const componentName = "notice";

export const className = {
  root: `${config.namespace}-${componentName}`,
  close: `${config.namespace}-close`
};

export const selector = {
  root: `.${className.root}`,
  dismiss: `[data-dismiss="${componentName}"]`,
  bottomSheet: `.${config.namespace}-bottom-sheet`
};

export const noticeCookieName = `${config.namespace}_${componentName}_dismiss`;

export const defaultProps = {
  dismissible: false,
  rememberDismiss: false
};
