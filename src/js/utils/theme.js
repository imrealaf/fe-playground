import theme from "../constants/theme";

export const getThemeFromClass = className => {
  for (const key in theme) {
    if (theme.hasOwnProperty(key)) {
      if (className.indexOf(key) > -1) return key;
    }
  }
};
