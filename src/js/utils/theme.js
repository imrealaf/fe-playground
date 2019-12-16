import theme from "../constants/theme";

export const getThemeFromClass = className => {
  for (const key in theme) {
    if (theme.hasOwnProperty(key)) {
      if (className.indexOf(key) > -1) return key;
    }
  }
};

export const getOppositeTheme = themeKey => {
  if (themeKey) {
    return theme[themeKey] ? theme[themeKey].opposite : false;
  } else {
    return false;
  }
};

export const getOppositeThemeFromClass = className => {
  for (const key in theme) {
    if (theme.hasOwnProperty(key)) {
      if (className.indexOf(key) > -1) return getOppositeTheme(key);
    }
  }
};
