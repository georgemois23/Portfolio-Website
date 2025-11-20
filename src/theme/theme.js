import { background, Button, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false, 
  },
  colors: {
    brand: {
      light: {
        text: "#dceeff",
        primary: "#0031a1",
        secondary: "#e76a0f"
      },
      dark: {
        // text: "#025a4e",
        // text: "#7f5539",
        text: "#d6e3f0",
        primary: "#ede9de",
        // secondary: "#7f5539"
        // secondary: "#A78BFA",
        // secondary: "#025a4e",
        secondary: "#916de8",

        // background: "#0f1f2f"
        background: "black"
      }
    },
  },
  breakpoints: {
    xxs:'140px',
    xs: "280px",
    sm: "320px",
    sm2: "480px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1600px",
    "3xl": "1920px",
  },
  fonts: {},
  fontSizes: {},
  styles: {
    global: {
      body: {
        backgroundColor: "brand.dark.primary", 
        color: "brand.dark.text",  
        "::selection": {
        backgroundColor: "brand.dark.secondary",
        color: "brand.dark.background",

      },
      },
     
    },
  },
  components: {
    Image:{
      baseStyle: {
        draggable: false,
        userSelect: "none",
    }},
    Button: {
      baseStyle: {
        variant:"solid",
        _hover: {
          fontweight: "bold",
          color: "brand.dark.secondary",
          backgroundColor: "brand.dark.text",
          transform: "scale(1.05)", 
          transition: "all 0.3s ease-in-out",
        },
      },
    },
  },
});

export default theme;
