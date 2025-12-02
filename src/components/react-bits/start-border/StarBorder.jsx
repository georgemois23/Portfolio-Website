import { Button } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

// Example: default fire-like gradient
const defaultColors = "conic-gradient(from 0deg, #322659, #9f7aea, #d6bcfa, #9f7aea, #322659)";

// Rotation animation
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const StarBorder = ({
  children,
  colors = defaultColors,
  speed = "4s",
  ...props
}) => {
  return (
    <Button
      {...props}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      borderRadius="2xl"
      marginInline="auto"
      w="fit-content"
      p={6}
      size="md"
      position="relative"
      overflow="hidden"
      isolation="isolate"
      bg="transparent"
      borderWidth="0px"
      color="white"
      transition="transform 0.2s ease-in-out"
      _before={{
        content: '""',
        position: 'absolute',
        inset: '-4px',
        background: colors,
        animation: `${spin} ${speed} linear infinite`,
        zIndex: -2,
      }}
      _after={{
        content: '""',
        position: 'absolute',
        inset: '2px',
        borderRadius: 'inherit',
        background: "#000", // inner mask
        zIndex: -1,
      }}
      _hover={{
        transform: "scale(1.05)",
      }}
    >
      <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
        {children}
      </span>
    </Button>
  );
};

export default StarBorder;