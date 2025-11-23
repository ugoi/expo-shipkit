/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#ffffff";

export const Colors = {
  light: {
    text: "#11181C",
    disabledText: "#A0A0A0",
    placeHolderText: "#687076",
    background: "#ffffff",
    disabledBackground: "#E0E0E0",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    black: "#000000",
    white: "#ffffff",
    switchOn: "#0a7ea4",
    switchOff: "#cccccc",
  },
  dark: {
    text: "#ECEDEE",
    disabledText: "#5A5A5A",
    placeHolderText: "#9BA1A6",
    background: "#151718",
    disabledBackground: "#2A2A2A",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    black: "#000000",
    white: "#ffffff",
    switchOn: "#0a7ea4",
    switchOff: "#555555",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignBold` */
    sansBold: "system-ui-bold",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    sansBold: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    sansBold:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

const defaultTypography = {
  h1: { fontSize: 32, fontFamily: Fonts.sans, fontWeight: "700" },
  h2: { fontSize: 24, fontFamily: Fonts.sans, fontWeight: "600" },
  h3: { fontSize: 20, fontFamily: Fonts.sans, fontWeight: "500" },
  body: { fontSize: 16, fontFamily: Fonts.sans, fontWeight: "400" },
  caption: { fontSize: 12, fontFamily: Fonts.sans, fontWeight: "300" },
  button: { fontSize: 16, fontFamily: Fonts.sans, fontWeight: "600" },
  input: { fontSize: 16, fontFamily: Fonts.sans, fontWeight: "400" },
};

export const Typography = Platform.select({
  ios: {
    ...defaultTypography,
  },
  default: {
    ...defaultTypography,
  },
  web: {
    ...defaultTypography,
  },
});

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
};

export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
};

// Interaction states for buttons and other UI elements
export const InteractionStates = {
  hover: {
    opacity: 0.8,
  },
  active: {
    opacity: 0.6,
  },
  disabled: {
    opacity: 0.4,
  },
};

// Example icon sizes
export const IconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
};

// Accessibility helpers
export const Accessibility = {
  minTouchableSize: 48, // Minimum recommended tap target size
};

export const Breakpoints = {
  xs: 0, // <-- make sure to register one breakpoint with value 0
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
  // use as many breakpoints as you need
};
