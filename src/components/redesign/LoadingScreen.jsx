import { useEffect, useRef, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { palette } from "../../theme/theme";

const MotionBox = motion.create(Box);
const MotionText = motion.create(Text);

const WORDS = ["Design", "Create", "Inspire"];
const DURATION = 2700;

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let raf;
    let timeout;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / DURATION, 1);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout = setTimeout(() => onCompleteRef.current?.(), 400);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <MotionBox
      position="fixed"
      inset={0}
      zIndex={9999}
      bg="portfolio.bg"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      {/* Top-left label */}
      <MotionText
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        position="absolute"
        top={{ base: 6, md: 10 }}
        left={{ base: 6, md: 10 }}
        fontSize="xs"
        color="portfolio.muted"
        textTransform="uppercase"
        letterSpacing="0.3em"
      >
        Portfolio
      </MotionText>

      {/* Center rotating words */}
      <Box
        position="absolute"
        inset={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <AnimatePresence mode="wait">
          <MotionText
            key={wordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
            fontFamily="display"
            fontStyle="italic"
            color="portfolio.text"
            opacity={0.8}
          >
            {WORDS[wordIndex]}
          </MotionText>
        </AnimatePresence>
      </Box>

      {/* Bottom-right counter */}
      <Text
        position="absolute"
        bottom={{ base: 10, md: 14 }}
        right={{ base: 6, md: 10 }}
        fontSize={{ base: "6xl", md: "8xl", lg: "9xl" }}
        fontFamily="display"
        color="portfolio.text"
        lineHeight="1"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {String(count).padStart(3, "0")}
      </Text>

      {/* Bottom progress bar */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="3px"
        bg="portfolio.stroke"
        opacity={0.5}
      >
        <Box
          h="100%"
          transformOrigin="left"
          transform={`scaleX(${count / 100})`}
          style={{
            background: palette.accentGradient,
            boxShadow: `0 0 8px ${palette.accentGlow}`,
          }}
        />
      </Box>
    </MotionBox>
  );
}
