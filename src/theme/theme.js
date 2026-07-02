import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Redesign palette — single source of truth for every color in the new UI.
// Exported as plain values so GSAP / inline CSS gradients can consume them,
// and registered below as Chakra tokens (colors.portfolio.*) for style props.
export const palette = {
  background: "#0a0a0a",
  surface: "#141414",
  text: "#f5f5f5",
  muted: "#878787",
  stroke: "#1f1f1f",
  accent: "#f5f5f5",
  accentFrom: "#89AACC",
  accentTo: "#4E85BF",
  accentGradient: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
  accentGlow: "rgba(137, 170, 204, 0.35)",
  success: "#4ade80",
};

export const fonts = {
  body: "'Inter', sans-serif",
  display: "'Instrument Serif', serif",
};

const config = defineConfig({
  // 1. Global Styles (formerly styles.global)
  globalCss: {
    body: {
      backgroundColor: "portfolio.bg",
      color: "portfolio.text",
      fontFamily: "body",
      "::selection": {
        backgroundColor: "brand.dark.secondary",
        color: "brand.dark.background",
      },
    },
  },

  theme: {
    // 2. Tokens (Colors, Fonts, Breakpoints)
    // Note: All values must be wrapped in { value: ... }
    tokens: {
      breakpoints: {
        xxs: { value: "140px" },
        xs: { value: "280px" },
        sm: { value: "320px" },
        sm2: { value: "480px" },
        md: { value: "768px" },
        lg: { value: "960px" },
        xl: { value: "1200px" },
        "2xl": { value: "1600px" },
        "3xl": { value: "1920px" },
      },
      fontSizes: {
    xxs: { value: "0.6rem" }, // ή ό,τι μέγεθος θες
    "2xs": { value: "0.7rem" },
  },
      fonts: {
        body: { value: fonts.body },
        display: { value: fonts.display },
      },
      colors: {
        portfolio: {
          bg: { value: palette.background },
          surface: { value: palette.surface },
          text: { value: palette.text },
          muted: { value: palette.muted },
          stroke: { value: palette.stroke },
          accent: { value: palette.accent },
        },
        brand: {
          light: {
            text: { value: "#dceeff" },
            primary: { value: "#0031a1" },
            secondary: { value: "#e76a0f" },
          },
          dark: {
            text: { value: "#d6e3f0" },
            primary: { value: "#ede9de" },
            secondary: { value: "#916de8" },
            background: { value: "black" },
          },
        },
      },
    },

    // 3. Component Customization (formerly components)
    recipes: {
      button: {
        base: {
          backgroundColor: "brand.dark.text",
          color: "brand.dark.background",
          // Note: 'variant' is not defined in base, it's a default prop (see below)
          _hover: {
            fontWeight: "bold", // Fixed typo from fontweight
            color: "brand.dark.secondary",
            backgroundColor: "brand.dark.text",
            transform: "scale(1.05)",
            transition: "all 0.3s ease-in-out",
          },
        },
      },
      // Image is a primitive in v3, usually styled via direct props or globalCss.
      // However, you can extend the native image recipe if you really need to:
      image: {
        base: {
          draggable: "false",
          userSelect: "none",
        },
      },
    },
  },
});

// 4. Create the system merging with defaults
export const system = createSystem(defaultConfig, config);