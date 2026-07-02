import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import RingButton from "./RingButton";
import { palette } from "../../theme/theme";

const MotionBox = motion.create(Box);

const SPAN_PATTERN = [7, 5, 5, 7];

// Bento grid of project cards, mapped from the projects data.
export default function SelectedWorks({ projects, viewAllUrl }) {
  return (
    <Box as="section" id="work" bg="portfolio.bg" py={{ base: 12, md: 16 }}>
      <Box maxW="1200px" mx="auto" px={{ base: 6, md: 10, lg: 16 }}>
        <SectionHeader
          eyebrow="Selected Work"
          title="Featured"
          titleItalic="projects"
          subtext="A selection of projects I've worked on, from concept to launch."
          action={
            viewAllUrl && (
              <RingButton variant="ghost" size="sm" href={viewAllUrl} target="_blank">
                View all work <Box as="span" aria-hidden="true">→</Box>
              </RingButton>
            )
          }
        />

        <Grid templateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }} gap={{ base: 5, md: 6 }}>
          {projects.map((project, index) => {
            const span = project.span || SPAN_PATTERN[index % SPAN_PATTERN.length];
            return (
              <MotionBox
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: (index % 2) * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                gridColumn={{ base: "auto", md: `span ${span}` }}
              >
                <Box
                  as="a"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  display="block"
                  position="relative"
                  overflow="hidden"
                  bg="portfolio.surface"
                  border="1px solid"
                  borderColor="portfolio.stroke"
                  borderRadius="3xl"
                  aspectRatio={{ base: "4 / 3", md: span >= 7 ? "16 / 10" : "4 / 3.3" }}
                  css={{
                    "&:hover .work-card-image": { transform: "scale(1.05)" },
                    "&:hover .work-card-veil": { opacity: 1 },
                  }}
                >
                  {/* Project image */}
                  <Box
                    className="work-card-image"
                    position="absolute"
                    inset={0}
                    backgroundImage={`url(${project.image})`}
                    backgroundSize="cover"
                    backgroundPosition="center top"
                    transition="transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)"
                  />

                  {/* Halftone overlay */}
                  <Box
                    position="absolute"
                    inset={0}
                    opacity={0.2}
                    mixBlendMode="multiply"
                    style={{
                      backgroundImage: `radial-gradient(circle, ${palette.background} 1px, transparent 1px)`,
                      backgroundSize: "4px 4px",
                    }}
                    pointerEvents="none"
                  />

                  {/* Static label (visible on touch devices too) */}
                  <Flex
                    position="absolute"
                    left={0}
                    right={0}
                    bottom={0}
                    p={{ base: 5, md: 6 }}
                    justify="space-between"
                    align="flex-end"
                    bgGradient="to-t"
                    gradientFrom="blackAlpha.700"
                    gradientTo="transparent"
                  >
                    <Box textAlign="left">
                      <Text fontSize={{ base: "md", md: "lg" }} color="portfolio.text" fontWeight="500">
                        {project.title}
                      </Text>
                      <Text fontSize="xs" color="portfolio.muted" textTransform="uppercase" letterSpacing="0.15em" mt={1}>
                        {project.category}
                      </Text>
                    </Box>
                    <Text fontSize="xs" color="portfolio.muted">
                      {project.year}
                    </Text>
                  </Flex>

                  {/* Hover veil + label */}
                  <Flex
                    className="work-card-veil"
                    position="absolute"
                    inset={0}
                    align="center"
                    justify="center"
                    opacity={0}
                    transition="opacity 0.4s ease"
                    bg="portfolio.bg/70"
                    backdropFilter="blur(16px)"
                  >
                    <Box position="relative" display="inline-flex" borderRadius="full">
                      <Box
                        className="animate-gradient-shift"
                        position="absolute"
                        inset="-2px"
                        borderRadius="full"
                        style={{ background: palette.accentGradient }}
                        aria-hidden="true"
                      />
                      <Flex
                        position="relative"
                        align="center"
                        gap={1.5}
                        borderRadius="full"
                        bg="portfolio.text"
                        color="portfolio.bg"
                        fontSize="sm"
                        px={5}
                        py={2.5}
                      >
                        View —{" "}
                        <Text as="span" fontFamily="display" fontStyle="italic">
                          {project.title}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </MotionBox>
            );
          })}
        </Grid>

        {viewAllUrl && (
          <Flex justify="center" mt={10} display={{ base: "flex", md: "none" }}>
            <RingButton variant="ghost" size="sm" href={viewAllUrl} target="_blank">
              View all work <Box as="span" aria-hidden="true">→</Box>
            </RingButton>
          </Flex>
        )}
      </Box>
    </Box>
  );
}
