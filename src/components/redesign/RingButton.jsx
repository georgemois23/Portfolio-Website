import { Box } from "@chakra-ui/react";
import { palette } from "../../theme/theme";

/**
 * Pill button with an animated accent-gradient border ring that appears on hover.
 * variant: "solid" | "outline" | "ghost"
 * size: "sm" | "md"
 */
export default function RingButton({
  variant = "outline",
  size = "md",
  href,
  target,
  download,
  onClick,
  children,
}) {
  const isSolid = variant === "solid";
  const isGhost = variant === "ghost";
  const pad =
    size === "sm"
      ? { px: 4, py: 2, fontSize: "xs" }
      : { px: 7, py: 3.5, fontSize: "sm" };

  return (
    <Box
      as={href ? "a" : "button"}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      download={download}
      onClick={onClick}
      position="relative"
      display="inline-flex"
      borderRadius="full"
      cursor="pointer"
      bg="transparent"
      border="none"
      p={0}
      transition="transform 0.3s ease"
      _hover={{ transform: "scale(1.05)" }}
      css={{
        "&:hover .ring-layer": { opacity: 1 },
        "&:hover .ring-inner": isSolid
          ? { background: palette.background, color: palette.text }
          : { borderColor: "transparent" },
      }}
    >
      <Box
        className="ring-layer animate-gradient-shift"
        position="absolute"
        inset="-2px"
        borderRadius="full"
        opacity={0}
        transition="opacity 0.25s ease"
        style={{ background: palette.accentGradient }}
        aria-hidden="true"
      />
      <Box
        className="ring-inner"
        position="relative"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        borderRadius="full"
        fontWeight="500"
        letterSpacing="0.02em"
        whiteSpace="nowrap"
        transition="background 0.3s ease, color 0.3s ease, border-color 0.3s ease"
        bg={isSolid ? "portfolio.text" : isGhost ? "portfolio.surface" : "portfolio.bg"}
        color={isSolid ? "portfolio.bg" : "portfolio.text"}
        border={isSolid || isGhost ? "2px solid transparent" : "2px solid"}
        borderColor={isSolid || isGhost ? "transparent" : "portfolio.stroke"}
        backdropFilter={isGhost ? "blur(12px)" : undefined}
        {...pad}
      >
        {children}
      </Box>
    </Box>
  );
}
