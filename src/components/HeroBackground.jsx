import { useRef } from "react";
import { Box } from "@chakra-ui/react";
import "./HeroBackground.css";

export default function HeroBackground() {
  const spotRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = spotRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  return (
    <Box
      ref={spotRef}
      onMouseMove={handleMouseMove}
      className="hero-bg"
      position="absolute"
      inset={0}
      zIndex={0}
      overflow="hidden"
      pointerEvents="none"
    >
      <div className="hero-bg__blob hero-bg__blob--one" />
      <div className="hero-bg__blob hero-bg__blob--two" />
      <div className="hero-bg__blob hero-bg__blob--three" />
      <div className="hero-bg__grid" />
      <div className="hero-bg__spotlight" />
      <div className="hero-bg__vignette" />
    </Box>
  );
}
