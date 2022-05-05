export const COLORS = {
  white: '#FFF',
  dark: '#141414',
  gold: '#DEB253',
  darkGold: "#825f15",
  lightGold: 'rgba(222, 178, 83, .5)',
  blue: '#172B43',
  red: '#D91D13',
  light: '#E5E5E5',
  lighter: '#fafafa',
  grey: 'rgba(20, 20, 20, .5)',
  lightGrey: 'rgba(20, 20, 20, .35)',
}

export const lightTheme = {
  mode: 'light',
  PRIMARY_BACKGROUND_COLOR: COLORS.white,
  SECONDARY_BACKGROUND_COLOR: COLORS.lighter,
  PRIMARY_TEXT_COLOR: COLORS.dark,
  SECONDARY_TEXT_COLOR: COLORS.grey,
  PRIMARY_BORDER_COLOR: COLORS.light,
  INPUT_BACKGROUND_COLOR: COLORS.lighter,
  NAVBAR_BUTTON_COLOR: "dark",
  NAVBAR_BACKGROUND_COLOR: COLORS.white,
  STATUS_BAR_STYLE: "dark",
  HEADER_BACKGROUND_COLOR: COLORS.white,
  ...COLORS
}

export const darkTheme = {
  mode: 'dark',
  PRIMARY_BACKGROUND_COLOR: COLORS.dark,
  SECONDARY_BACKGROUND_COLOR: COLORS.lightGrey,
  PRIMARY_TEXT_COLOR: COLORS.white,
  SECONDARY_TEXT_COLOR: "rgba(255,255,255, .35)",
  PRIMARY_BORDER_COLOR: "rgba(255,255,255, .065)",
  INPUT_BACKGROUND_COLOR: "rgba(255,255,255, .05)",
  NAVBAR_BUTTON_COLOR: "light",
  NAVBAR_BACKGROUND_COLOR: COLORS.dark,
  STATUS_BAR_STYLE: "light",
  HEADER_BACKGROUND_COLOR: 'rgba(20, 20, 20, .7)',
  ...COLORS
}

export const SIZES = {
  xl: 27.5,
  lg: 25,
  md: 16,
  sm: 13,
  radius: 5,
  rounded: 50,
}