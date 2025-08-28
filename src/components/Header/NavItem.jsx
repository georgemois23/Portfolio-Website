import { Text } from "@chakra-ui/react";
import { ToolTipUnderConstruction } from "../ToolTipUnderConstruction";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export const NavItem = ({ item, onClose, isMobile = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (item.type === "external") {
      window.open(item.path, "_blank");
    } else {
      navigate(item.path);
    }
    if (onClose) onClose();
  };

  if (item.underConstruction) {
    return (
      <Text onClick={handleClick}>
        <ToolTipUnderConstruction where={item.label} />
      </Text>
    );
  }

  return (
    <Text
    onClick={handleClick}
    fontSize={isMobile ? "lg" : "md"}
    fontWeight={isMobile ? "800" : "600"}
    py={isMobile ? 2 : 1}
    px={isActive ? 3 : 0}
    width={isMobile ? "full" : "auto"}
    textAlign={isMobile ? "center" : "left"}
    borderRadius="lg"
    transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
    color={
        isActive
          ? "brand.dark.background" 
          : "brand.dark.text"
        // isActive
        //   ? "brand.dark.background" 
        //   : "brand.dark.text"
        
      // isMobile
      //   ? isActive
      //     ? "brand.dark.secondary" 
      //     : "brand.dark.text"
      //   : isActive
      //   ? "brand.dark.text" 
      //   : "brand.dark.text"
    }
    // bg={isMobile ? "transparent" : isActive ? "#000d33" : "transparent"}
    bg={"transparent"}
    // boxShadow={isMobile ? "none" : isActive ? "0 0 8px rgba(0, 80, 200, 0.1)" : "none"} 
    // textShadow={isMobile ? "none" : isActive ? "0 0 4px rgba(100, 180, 255, 0.2)" : "none"} 
    // border={isMobile ? "1px solid transparent" : isActive ? "1px solid rgba(100, 180, 255, 0.10)" : "1px solid transparent"} 
    _hover={{
      color: isMobile
        ? isActive
          ? "brand.dark.secondary" 
          : "brand.dark.secondary"
        : !isActive
        ? "brand.dark.text"
        : "brand.dark.background",
        // : "white",
      transform: isMobile ? "none" : !isActive ? "translateY(-2px) scale(1.02)" : "none",
      textDecoration: "none",
      cursor: isActive ? "default" : "pointer"
    }}
    _active={{
      transform: isMobile ? "none" : "scale(0.98)",
      // bg: isMobile ? "transparent" : "#000d33", 
      // boxShadow: isMobile ? "none" : "0 0 10px rgba(0, 80, 200, 0.25)", 
    }}
    userSelect="none"
    letterSpacing="-0.025em"
    willChange="transform, box-shadow"
    style={{
      WebkitTapHighlightColor: "transparent",
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
  >

    {item.label}<Text as={'span'} pr={0}> <Text transition="all 0.2s ease-in-out" as={'span'} mt={2} opacity={isMobile ? 1 : hovered ? 1 : 0} >{item.icon}</Text></Text>
  </Text>
  
  );
};