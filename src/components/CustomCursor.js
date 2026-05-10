"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CoolCustomCursor({ children }) {
  const [position, setPosition] = useState({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024); // example breakpoint for big screens
    };

    checkScreen(); // initial check
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (!isDesktop) return; // skip listeners on small screens

    const interactiveSelector =
      "a, button, input, textarea, select, summary, [role='button'], [data-cursor='hover']";

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const interactiveElement = e.target.closest(interactiveSelector);
      if (interactiveElement) {
        setHovered(true);
        setLabel(interactiveElement.getAttribute("data-cursor-label") || "");
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest(interactiveSelector)) {
        setHovered(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isDesktop]);

  if (!isDesktop) {
    // Just render children without custom cursor on small screens
    return <>{children}</>;
  }
  

  return (
    <div style={{ position: "relative", cursor: "none", width: "100%" }}>
      <style>
        {`
          * {
            cursor: none !important;
          }
        `}
      </style>
      <motion.div
        animate={{
          x: position.x - (hovered ? 28 : 14),
          y: position.y - (hovered ? 28 : 14),
          width: hovered ? 56 : 28,
          height: hovered ? 56 : 28,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.3 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: "9999px",
          backgroundColor: "#ffffff",
          pointerEvents: "none",
          zIndex: 9999999,
          mixBlendMode: "difference",
          willChange: "transform,width,height",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#000000",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {hovered && label ? label : null}
      </motion.div>
      {children}
    </div>
  );
}
