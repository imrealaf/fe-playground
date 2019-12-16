import config from "../../constants/config";

export const componentName = "panel";

export const events = {
  open: `${componentName}.open`,
  opened: `${componentName}.opened`,
  close: `${componentName}.close`,
  closed: `${componentName}.closed`,
  escaped: `${componentName}.escaped`
};

export const defaultProps = {
  position: "left",
  close: true,
  dismissible: true,
  keyboard: true,
  size: false,
  overlay: true,
  overlayOpacity: 5,
  autoOpen: false,
  delay: 0
};

export const className = {
  root: `${config.namespace}-${componentName}`,
  content: `${componentName}_content`,
  header: `${componentName}_header`,
  footer: `${componentName}_footer`,
  body: `${componentName}_body`,
  close: `${config.namespace}-close`,
  overlay: `${config.namespace}-overlay`,
  body: `${componentName}-is-active`
};

export const selector = {
  root: `.${className.root}`,
  content: `.${className.content}`,
  header: `.${className.header}`,
  footer: `.${className.footer}`,
  title: `.${className.title}`,
  body: `.${className.body}`,
  close: `.${className.close}`,
  overlay: `.${className.overlay}`,
  focusable: `a[href], button:not([disabled]), [tabindex="0"], [data-dismiss="${componentName}"]`
};
