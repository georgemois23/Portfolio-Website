import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { FadeIn, LiveProjectButton, headingGradientCss } from "./SelectedWorks";
import { palette } from "../../theme/theme";

// D7E2EA at low alpha for row dividers and pill outlines.
const dividerColor = `${palette.showcaseBorder}33`;

// Editorial resume: giant gradient heading and hairline-divided rows,
// mapped from the experience data.
export default function ExperienceSection({ experience, resumeUrl }) {
  return (
    <Box
      as="section"
      id="resume"
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
            Work History
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
            Resume
          </Text>
        </FadeIn>

        <Box>
          {experience.map((entry, index) => (
            <FadeIn key={entry.id} delay={index * 0.05} y={24}>
              <Grid
                templateColumns={{ base: "1fr", md: "220px 1fr" }}
                gap={{ base: 3, md: 10 }}
                borderTop="1px solid"
                borderBottom={
                  index === experience.length - 1 ? "1px solid" : "none"
                }
                style={{ borderColor: dividerColor }}
                py={{ base: 6, md: 9 }}
                px={{ base: 1, md: 2 }}
              >
                {/* Dates */}
                <Box>
                  <Text
                    fontFamily="kanit"
                    fontWeight="500"
                    fontSize={{ base: "xs", md: "sm" }}
                    color="portfolio.muted"
                    textTransform="uppercase"
                    letterSpacing="0.2em"
                    whiteSpace="nowrap"
                  >
                    {entry.start} — {entry.end}
                  </Text>
                </Box>

                {/* Role, company, summary, highlights, stack */}
                <Box minW={0}>
                  <Text
                    fontFamily="kanit"
                    fontWeight="700"
                    textTransform="uppercase"
                    lineHeight="1.15"
                    letterSpacing="0.01em"
                    fontSize="clamp(1.2rem, 2.8vw, 2rem)"
                    color="portfolio.text"
                  >
                    {entry.role}
                  </Text>
                  {entry.company && (
                    <Text
                      fontFamily="kanit"
                      fontWeight="400"
                      fontSize={{ base: "sm", md: "md" }}
                      textTransform="uppercase"
                      letterSpacing="0.08em"
                      style={{ color: palette.showcaseBorder }}
                      opacity={0.75}
                      mt={1}
                    >
                      {entry.company}
                    </Text>
                  )}

                  {entry.summary && (
                    <Text
                      mt={4}
                      fontSize={{ base: "sm", md: "md" }}
                      lineHeight="1.8"
                      color="portfolio.muted"
                      maxW="720px"
                      textAlign="left"
                    >
                      {entry.summary}
                    </Text>
                  )}

                  {entry.highlights && entry.highlights.length > 0 && (
                    <Flex as="ul" direction="column" gap={1.5} mt={4} pl={0} listStyleType="none">
                      {entry.highlights.map((highlight, i) => (
                        <Flex as="li" key={i} gap={3} align="flex-start" textAlign="left">
                          <Box
                            as="span"
                            color="portfolio.muted"
                            fontSize="xs"
                            mt="5px"
                            aria-hidden="true"
                          >
                            —
                          </Box>
                          <Text fontSize="sm" lineHeight="1.7" color="portfolio.muted">
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
                          fontFamily="kanit"
                          fontWeight="400"
                          fontSize="xs"
                          textTransform="uppercase"
                          letterSpacing="0.1em"
                          color="portfolio.muted"
                          border="1px solid"
                          style={{ borderColor: dividerColor }}
                          borderRadius="full"
                          px={3}
                          py={1}
                        >
                          {tech}
                        </Text>
                      ))}
                    </Flex>
                  )}
                </Box>
              </Grid>
            </FadeIn>
          ))}
        </Box>

        <Flex justify="center" mt={{ base: 10, md: 14 }}>
          <LiveProjectButton
            href={resumeUrl}
            download="Moysiadis George CV.pdf"
            label="Download Resume ↗"
          />
        </Flex>
      </Box>
    </Box>
  );
}
