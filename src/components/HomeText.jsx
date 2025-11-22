import { Box, Flex, Text, Button, Icon, Center, VStack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
const Hometext = ({ shouldAnimate }) => {
const MotionSpan = motion.span;
const texts = [
    { content: "FULL-STACK", color: undefined },
    { content: "DEVELOPER", color: undefined },
  ];

  return (
<Box textAlign="center" fontWeight="800" lineHeight="0.9" fontFamily="Arial" mt="10vh"  display="flex" justifyContent="center" flexDirection="column" >

    <AnimatePresence>
      {texts.map((text, index) => (
        <Text
          key={index}
          fontSize={{base: "4xl",sm: "5xl", md: "6xl", lg: "9xl" }}
          color={text.color}
          display="inline-block"
          userSelect={'none'}
        >
          {text.content.split(" ").map((word, wordIndex) => {
            const Component = shouldAnimate ? MotionSpan : "span";
            const props = shouldAnimate
              ? {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: {
                    duration: 0.5,
                    delay: index * 0.3 + wordIndex * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }
              : {};

            return (
              <Component
                key={wordIndex}
                {...props}
                style={{
                  display: "inline-block",
                  marginRight: "0.25em",
                  whiteSpace: "wrap",
                  userSelect: 'none'
                }}
              >
                {word}
              </Component>
            );
          })}
        </Text>
      ))}
    </AnimatePresence>
</Box>
    );
};

export default Hometext;
