export const COLORS = {
  primary: '#DEB253', // gold
  diabledBackground: 'rgba(222, 178, 83, .5)',

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
  NAVBAR_BUTTON_COLOR: "dark",
  NAVBAR_BACKGROUND_COLOR: COLORS.white,
  ...COLORS
}

export const darkTheme = {
  mode: 'dark',
  PRIMARY_BACKGROUND_COLOR: COLORS.dark,
  SECONDARY_BACKGROUND_COLOR: COLORS.lightGrey,
  PRIMARY_TEXT_COLOR: COLORS.white,
  SECONDARY_TEXT_COLOR: COLORS.light,
  PRIMARY_BORDER_COLOR: COLORS.grey,
  NAVBAR_BUTTON_COLOR: "light",
  NAVBAR_BACKGROUND_COLOR: COLORS.dark,
  ...COLORS
}

export const SIZES = {
  xl: 27.5,
  lg: 25,
  md: 16,
  sm: 10,
  radius: 5,
  rounded: 50,
}