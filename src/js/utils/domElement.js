export const exists = selector =>
  document.querySelector(selector) ? true : false;

export const unwrap = element => {
  const parent = element.parentNode;
  while (element.firstChild) {
    parent.insertBefore(element.firstChild, element);
  }
  parent.removeChild(element);
};

export const hasChildren = element =>
  element.children.length > 0 ? true : false;

export const getAttributes = (attrs, validKeys) => {
  const newAttrs = {};

  for (const key in attrs) {
    if (attrs.hasOwnProperty(key) && validKeys.includes(key)) {
      let value = attrs[key];

      if (!isNaN(value)) {
        value = parseInt(value);
      }
      if (value === "true") {
        value = true;
      }
      if (value === "false") {
        value = false;
      }
      if (key === "json") {
        value = JSON.parse(value);
      }

      newAttrs[key] = value;
    }
  }

  return newAttrs;
};

export const mapAttributesToProps = (element, defaultProps) => {
  if (!element || !defaultProps) {
    return;
  }

  const attrs = getAttributes(element.dataset, Object.keys(defaultProps));

  if (attrs) {
    return { ...defaultProps, ...attrs };
  } else {
    return defaultProps;
  }
};

export const getTransitionDuration = element => {
  const style = window.getComputedStyle(element);
  if (!style) {
    return;
  }

  const duration = parseFloat(
    style.getPropertyValue("transition-duration").replace("s", "")
  );
  const delay = style.getPropertyValue("transition-delay")
    ? parseFloat(style.getPropertyValue("transition-delay").replace("s", ""))
    : 0;

  const val = duration + delay;
  return val * 1000;
};

export const onTransitionEnd = (element, callback) => {
  const duration = getTransitionDuration(element);
  setTimeout(() => {
    callback(element, duration);
  }, duration);
};
