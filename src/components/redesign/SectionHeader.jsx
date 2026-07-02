import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

// Shared section header: eyebrow rule + label, heading with italic word, subtext,
// and an optional right-aligned action (desktop only).
export default function SectionHeader({ eyebrow, title, titleItalic, subtext, action }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      mb={{ base: 10, md: 14 }}
    >
      <Flex align="center" gap={3} mb={5}>
        <Box w="2rem" h="1px" bg="portfolio.stroke" />
        <Text
          fontSize="xs"
          color="portfolio.muted"
          textTransform="uppercase"
          letterSpacing="0.3em"
        >
          {eyebrow}
        </Text>
      </Flex>
      <Flex
        justify="space-between"
        align={{ base: "flex-start", md: "flex-end" }}
        direction={{ base: "column", md: "row" }}
        gap={6}
      >
        <Box>
          <Heading
            as="h2"
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="400"
            color="portfolio.text"
            lineHeight="1.1"
            letterSpacing="-0.02em"
          >
            {title}{" "}
            <Text as="span" fontFamily="display" fontStyle="italic">
              {titleItalic}
            </Text>
          </Heading>
          {subtext && (
            <Text mt={4} fontSize={{ base: "sm", md: "md" }} color="portfolio.muted" maxW="md">
              {subtext}
            </Text>
          )}
        </Box>
        {action && <Box display={{ base: "none", md: "block" }}>{action}</Box>}
      </Flex>
    </MotionBox>
  );
}
