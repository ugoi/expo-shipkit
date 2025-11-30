const sharedColors = {
  // Shared colors between light and dark themes
} as const;

const sharedSizes = {
  icon: {
    s: 16,
    m: 24,
    l: 32,
    xl: 48,
  },
} as const;

const typography = {
  // Shared typography styles can be defined here
  h1: 32,
  h2: 24,
  h3: 20,
  body: 16,
  caption: 12,
  button: 16,
  input: 16,
} as const;

const fonts = {
  // Shared font families can be defined here
  base: "System",
} as const;

export const lightTheme = {
  colors: {
    ...sharedColors,
    background: "#FCFAF8",
    foreground: "#EDEAE6",
    typography: "#1B140C",
    dimmed: "#ECE8E4",
    tint: "#9A734C",
    activeTint: "#1B140C",
    link: "#1E3799",
    accents: {
      banana: "#F6E58D",
      pumpkin: "#FFBE76",
      apple: "#FF7979",
      grass: "#BADC58",
      storm: "#686DE0",
    },
  },
  sizes: sharedSizes,
  typography: typography,
  fonts: fonts,
  gap: (v: number) => v * 8,
} as const;

export const darkTheme = {
  colors: {
    ...sharedColors,
    background: "#221A11",
    foreground: "#332618",
    typography: "#FFFFFF",
    dimmed: "#A8A198",
    tint: "#C9AD92",
    activeTint: "#FFFFFF",
    link: "#0C2461",
    accents: {
      banana: "#f9CA24",
      pumpkin: "#F0932B",
      apple: "#EB4D4B",
      grass: "#6AB04C",
      storm: "#4834D4",
    },
  },
  sizes: sharedSizes,
  typography: typography,
  fonts: fonts,
  gap: (v: number) => v * 8,
} as const;
