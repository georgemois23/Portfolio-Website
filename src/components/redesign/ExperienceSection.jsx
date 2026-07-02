import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import RingButton from "./RingButton";

const MotionBox = motion.create(Box);

// Vertical work-history list mapped from the experience data.
export default function ExperienceSection({ experience, resumeUrl }) {
  return (
    <Box as="section" id="resume" bg="portfolio.bg" py={{ base: 16, md: 24 }}>
      <Box maxW="1000px" mx="auto" px={{ base: 6, md: 10, lg: 16 }}>
        <SectionHeader
          eyebrow="Experience"
          title="Work"
          titleItalic="history"
          subtext="Roles, studies, and milestones along the way."
        />

        <Flex direction="column" gap={{ base: 4, md: 5 }}>
          {experience.map((entry, index) => (
            <MotionBox
              key={entry.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              bg="portfolio.surface/30"
              border="1px solid"
              borderColor="portfolio.stroke"
              borderRadius="2xl"
              p={{ base: 6, md: 8 }}
              css={{ transition: "background 0.3s ease" }}
              _hover={{ bg: "portfolio.surface" }}
            >
              <Flex
                justify="space-between"
                direction={{ base: "column", md: "row" }}
                align={{ base: "flex-start", md: "baseline" }}
                gap={{ base: 2, md: 6 }}
                mb={entry.summary ? 4 : 0}
              >
                <Box>
                  <Text
                    fontFamily="display"
                    fontStyle="italic"
                    fontSize={{ base: "xl", md: "2xl" }}
                    color="portfolio.text"
                    lineHeight="1.2"
                  >
                    {entry.role}
                  </Text>
                  {entry.company && (
                    <Text fontSize="sm" color="portfolio.muted" mt={1}>
                      {entry.company}
                    </Text>
                  )}
                </Box>
                <Text
                  fontSize="xs"
                  color="portfolio.muted"
                  textTransform="uppercase"
                  letterSpacing="0.2em"
                  whiteSpace="nowrap"
                  flexShrink={0}
                >
                  {entry.start} – {entry.end}
                </Text>
              </Flex>

              {entry.summary && (
                <Text fontSize="sm" color="portfolio.muted" maxW="2xl" textAlign="left">
                  {entry.summary}
                </Text>
              )}

              {entry.highlights && entry.highlights.length > 0 && (
                <Flex as="ul" direction="column" gap={1.5} mt={4} pl={0} listStyleType="none">
                  {entry.highlights.map((highlight, i) => (
                    <Flex as="li" key={i} gap={3} align="flex-start" textAlign="left">
                      <Box as="span" color="portfolio.muted" fontSize="xs" mt="5px" aria-hidden="true">
                        —
                      </Box>
                      <Text fontSize="sm" color="portfolio.muted">
                        {highlight}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              )}

              {entry.stack && entry.stack.length > 0 && (
                <Flex wrap="wrap" gap={2} mt={5}>
                  {entry.stack.map((tech) => (
                    <Text
                      key={tech}
                      fontSize="xs"
                      color="portfolio.text"
                      bg="portfolio.stroke/50"
                      borderRadius="full"
                      px={3}
                      py={1}
                    >
                      {tech}
                    </Text>
                  ))}
                </Flex>
              )}
            </MotionBox>
          ))}
        </Flex>

        <Flex justify="center" mt={{ base: 10, md: 14 }}>
          <RingButton variant="outline" href={resumeUrl} download="Moysiadis George CV.pdf">
            Download resume <Box as="span" aria-hidden="true">↗</Box>
          </RingButton>
        </Flex>
      </Box>
    </Box>
  );
}
