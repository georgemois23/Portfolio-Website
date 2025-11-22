import { Text } from "@chakra-ui/react";
import { ToolTipUnderConstruction } from "../ToolTipUnderConstruction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const NavItem = ({ item, onClose, isMobile = false }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (item.type === "external") {
      window.open(item.path, "_blank");
    } else if (item.scroll) {
      navigate('/', { state: { scrollTo: item.scroll } });
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
      px={3}
      width={isMobile ? "full" : "auto"}
      textAlign={isMobile ? "center" : "left"}
      borderRadius="lg"
      transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      color="brand.dark.text"
      bg="transparent"
      _hover={{
        color: "brand.dark.secondary",
        transform: isMobile ? "none" : "translateY(-2px) scale(1.02)",
        textDecoration: "none",
        cursor: "pointer"
      }}
      _active={{
        transform: isMobile ? "none" : "scale(0.98)"
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
      {item.label}
      {item.icon && (
        <Text as="span" pr={0}>
          <Text
            transition="all 0.2s ease-in-out"
            as="span"
            mt={2}
            opacity={isMobile ? 1 : hovered ? 1 : 0}
          >
            {item.icon}
          </Text>
        </Text>
      )}
    </Text>
  );
};
