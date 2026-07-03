import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { qaItems } from "../QAAccordion";
import { FadeIn, headingGradientCss } from "./SelectedWorks";
import { palette } from "../../theme/theme";

const MotionBox = motion.create(Box);

// D7E2EA at low alpha for the row dividers.
const dividerColor = `${palette.showcaseBorder}33`;

// Editorial Q&A accordion in the showcase aesthetic: giant gradient heading,
// numbered rows, expandable answers. Content comes from the existing qaItems.
export default function QASection() {
  const [openValue, setOpenValue] = useState(null);

  const toggle = (value) =>
    setOpenValue((current) => (current === value ? null : value));

  return (
    <Box
      as="section"
      id="qa"
      style={{ backgroundColor: palette.showcaseBg }}
      pt={{ base: 10, md: 14 }}
      pb={{ base: 16, md: 24 }}
    >
      <Box maxW="1200px" mx="auto" px={{ base: 4, sm: 6, md: 10 }}>
        <FadeIn>
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            textTransform="uppercase"
            letterSpacing="0.25em"
            color="portfolio.muted"
            mb={3}
          >
            Questions & Answers
          </Text>
          <Text
            as="h2"
            fontFamily="kanit"
            fontWeight="900"
            textTransform="uppercase"
            lineHeight="none"
            letterSpacing="tight"
            fontSize="clamp(3rem, 10vw, 8rem)"
            css={headingGradientCss}
            mb={{ base: 8, md: 12 }}
          >
            Q&A
          </Text>
        </FadeIn>

        <Box>
          {qaItems.map((item, index) => {
            const isOpen = openValue === item.value;
            return (
              <FadeIn key={item.value} delay={index * 0.06} y={20}>
                <Box
                  borderTop="1px solid"
                  borderBottom={
                    index === qaItems.length - 1 ? "1px solid" : "none"
                  }
                  style={{ borderColor: dividerColor }}
                >
                  <Flex
                    as="button"
                    onClick={() => toggle(item.value)}
                    w="100%"
                    align="baseline"
                    justify="space-between"
                    gap={{ base: 4, md: 8 }}
                    py={{ base: 5, md: 7 }}
                    px={{ base: 1, md: 2 }}
                    textAlign="left"
                    cursor="pointer"
                    bg="transparent"
                    border="none"
                    css={{
                      "&:hover .qa-question": { color: palette.showcaseBorder },
                    }}
                    aria-expanded={isOpen}
                  >
                    <Flex align="baseline" gap={{ base: 4, md: 8 }} minW={0}>
                      <Text
                        fontFamily="kanit"
                        fontWeight="700"
                        fontSize={{ base: "sm", md: "lg" }}
                        color="portfolio.muted"
                        flexShrink={0}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </Text>
                      <Text
                        className="qa-question"
                        fontFamily="kanit"
                        fontWeight="600"
                        textTransform="uppercase"
                        lineHeight="1.2"
                        letterSpacing="0.02em"
                        fontSize="clamp(1.05rem, 2.6vw, 1.85rem)"
                        color={isOpen ? undefined : "portfolio.text"}
                        style={isOpen ? { color: palette.showcaseBorder } : undefined}
                        transition="color 0.25s ease"
                      >
                        {item.question}
                      </Text>
                    </Flex>
                    <Box
                      as="span"
                      fontFamily="kanit"
                      fontWeight="300"
                      fontSize={{ base: "2xl", md: "3xl" }}
                      lineHeight="1"
                      color="portfolio.muted"
                      transform={isOpen ? "rotate(45deg)" : "rotate(0deg)"}
                      transition="transform 0.3s ease"
                      flexShrink={0}
                      aria-hidden="true"
                    >
                      +
                    </Box>
                  </Flex>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <MotionBox
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        overflow="hidden"
                      >
                        <Text
                          pb={{ base: 6, md: 8 }}
                          px={{ base: 1, md: 2 }}
                          pl={{ base: "calc(0.25rem + 2.5rem)", md: "calc(0.5rem + 4rem)" }}
                          fontSize={{ base: "sm", md: "md" }}
                          lineHeight="1.9"
                          color="portfolio.muted"
                          maxW="720px"
                        >
                          {item.answer}
                        </Text>
                      </MotionBox>
                    )}
                  </AnimatePresence>
                </Box>
              </FadeIn>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
