import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  // 1. Global Styles (formerly styles.global)
  globalCss: {
    body: {
      backgroundColor: "brand.dark.primary",
      color: "brand.dark.text",
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
      colors: {
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