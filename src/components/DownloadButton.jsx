import { Button } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { LuDownload } from "react-icons/lu";


// 1. Purple Fire Colors
const fireColors = "conic-gradient(from 0deg, #322659, #9f7aea, #d6bcfa, #9f7aea, #322659)";

// 2. Rotation Animation
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const DownloadButton = () => {
  return (
    <Button
      as="a"
      href="/Moysiadis_George.pdf"
      download="Moysiadis George CV.pdf"
      rel="noopener noreferrer"
      
      // Layout
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      borderRadius={'2xl'}
      marginInline={'auto'}
      w={'fit-content'}
      p={6}
      size="md"
      
      // Styles
      position="relative"
      overflow="hidden"
      isolation="isolate"
      bg="transparent"
      borderWidth="0px"
      color="brand.dark.text"
      
      // IMPORTANT: Add smooth transition for the scale effect
      transition="transform 0.2s ease-in-out"

      // --- The "Flame" Border ---
      _before={{
        content: '""',
        position: 'absolute',
        inset: '-4px',
        background: fireColors,
        animation: `${spin} 4s linear infinite`,
        zIndex: -2,
      }}

      // --- The "Mask" (Background) ---
      _after={{
        content: '""',
        position: 'absolute',
        inset: '2px',
        borderRadius: 'inherit',
        background: "brand.dark.background",
        zIndex: -1,
        // Removed transition for background since we aren't changing it anymore
      }}

      // --- Interactions ---
      sx={{
        "svg": { transition: "transform 0.2s" }
      }}
      
      _hover={{
        // 1. Scale up the whole button slightly
        transform: "scale(1.05)",
        
        // 2. Keep the icon movement
        "svg": { transform: "translateX(3px) translateY(-3px)" }
        
        // Removed: bg color change
        // Removed: text color change
      }}
    >
      <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
        Download CV
        <LuDownload />
      </span>
    </Button>
  );
};