import { useEffect, useRef, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { palette } from "../../theme/theme";

const MotionBox = motion.create(Box);

const CARD_RADIUS = { base: "40px", sm: "50px", md: "60px" };
const IMAGE_RADIUS = { base: "24px", sm: "32px", md: "40px" };

// D7E2EA at low alpha for the technology pills, matching the section hairlines.
const hairline = `${palette.showcaseBorder}33`;

export const headingGradientCss = {
  background: palette.showcaseHeadingGradient,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

// FadeIn wrapper per spec: whileInView, once, y-rise, cubic-bezier ease.
export function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, ...rest }) {
  return (
    <MotionBox
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      {...rest}
    >
      {children}
    </MotionBox>
  );
}

// Ghost/outline pill button — renders as a link or, with onClick, a button.
export function LiveProjectButton({ href, label = "Live Project", download, onClick }) {
  return (
    <Box
      as={href ? "a" : "button"}
      href={href}
      onClick={onClick}
      download={download}
      target={href && !download ? "_blank" : undefined}
      rel={href && !download ? "noopener noreferrer" : undefined}
      cursor="pointer"
      bg="transparent"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="full"
      border="2px solid"
      fontWeight="500"
      textTransform="uppercase"
      letterSpacing="0.15em"
      whiteSpace="nowrap"
      px={{ base: 8, sm: 10 }}
      py={{ base: 3, sm: 3.5 }}
      fontSize={{ base: "sm", sm: "md" }}
      transition="background 0.3s ease"
      style={{ borderColor: palette.showcaseBorder, color: palette.showcaseBorder }}
      _hover={{ bg: "rgba(215, 226, 234, 0.1)" }}
    >
      {label}
    </Box>
  );
}

// Detail overlay: full description, technologies, and live/source links.
// Opens when a project card is clicked. Closes on backdrop click or Escape.
function ProjectModal({ project, lenisRef, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock the page while the modal is open — pause Lenis and hide body overflow
  // (same pattern as the loading screen). The inner scroll body opts back in
  // via data-lenis-prevent so it can still scroll.
  useEffect(() => {
    const lenis = lenisRef?.current;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [lenisRef]);

  if (!project) return null;

  const dateRange =
    project.from && project.to ? `${project.from} — ${project.to}` : project.year;

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      position="fixed"
      inset={0}
      zIndex={9998}
      bg="blackAlpha.800"
      backdropFilter="blur(10px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={{ base: 4, md: 6 }}
      onClick={onClose}
    >
      <MotionBox
        initial={{ scale: 0.94, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 20, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        position="relative"
        display="flex"
        flexDirection="column"
        w="100%"
        maxW="720px"
        maxH="88vh"
        overflow="hidden"
        borderRadius={{ base: "28px", md: "36px" }}
        border="2px solid"
        style={{ backgroundColor: palette.showcaseBg, borderColor: palette.showcaseBorder }}
      >
        {/* Cover image */}
        <Box
          flexShrink={0}
          h={{ base: "180px", md: "260px" }}
          backgroundImage={`url(${project.image})`}
          backgroundSize="cover"
          backgroundPosition="center top"
        />

        {/* Close button */}
        <Box
          as="button"
          onClick={onClose}
          position="absolute"
          top={4}
          right={4}
          w={9}
          h={9}
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="blackAlpha.600"
          backdropFilter="blur(6px)"
          border="1px solid"
          borderColor="whiteAlpha.300"
          color="portfolio.text"
          fontSize="lg"
          lineHeight="1"
          cursor="pointer"
          transition="background 0.2s ease"
          _hover={{ bg: "blackAlpha.800" }}
          aria-label="Close"
        >
          ✕
        </Box>

        {/* Body — the only scroll container, so the rounded panel clips its
            thin scrollbar cleanly instead of it running the full height */}
        <Box
          overflowY="auto"
          overscrollBehavior="contain"
          data-lenis-prevent="true"
          p={{ base: 6, md: 9 }}
          css={{
            scrollbarWidth: "thin",
            scrollbarColor: `${palette.showcaseBorder}40 transparent`,
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `${palette.showcaseBorder}40`,
              borderRadius: "9999px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: `${palette.showcaseBorder}66`,
            },
          }}
        >
          <Flex justify="space-between" align="baseline" wrap="wrap" gap={3} mb={2}>
            <Text
              fontSize={{ base: "xs", md: "sm" }}
              color="portfolio.muted"
              textTransform="uppercase"
              letterSpacing="0.25em"
            >
              {project.category}
            </Text>
            {dateRange && (
              <Text
                fontFamily="kanit"
                fontSize={{ base: "xs", md: "sm" }}
                color="portfolio.muted"
                textTransform="uppercase"
                letterSpacing="0.15em"
              >
                {dateRange}
              </Text>
            )}
          </Flex>

          <Text
            fontFamily="kanit"
            fontWeight="900"
            textTransform="uppercase"
            lineHeight="1"
            letterSpacing="tight"
            fontSize="clamp(1.8rem, 5vw, 3rem)"
            css={headingGradientCss}
            mb={{ base: 4, md: 5 }}
          >
            {project.title}
          </Text>

          {project.description && (
            <Text
              fontSize={{ base: "sm", md: "md" }}
              lineHeight="1.85"
              color="portfolio.muted"
              mb={{ base: 6, md: 7 }}
            >
              {project.description}
            </Text>
          )}

          {project.skills && project.skills.length > 0 && (
            <Box mb={{ base: 7, md: 8 }}>
              <Text
                fontSize="xs"
                color="portfolio.muted"
                textTransform="uppercase"
                letterSpacing="0.2em"
                mb={3}
              >
                Technologies
              </Text>
              <Flex wrap="wrap" gap={2}>
                {project.skills.map((tech) => (
                  <Text
                    key={tech}
                    fontFamily="kanit"
                    fontWeight="400"
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="0.1em"
                    color="portfolio.text"
                    border="1px solid"
                    style={{ borderColor: hairline }}
                    borderRadius="full"
                    px={3}
                    py={1.5}
                  >
                    {tech}
                  </Text>
                ))}
              </Flex>
            </Box>
          )}

          <Flex gap={3} wrap="wrap">
            {project.liveUrl && (
              <LiveProjectButton href={project.liveUrl} label="Live Project ↗" />
            )}
            {project.github && (
              <LiveProjectButton href={project.github} label="Source ↗" />
            )}
          </Flex>
        </Box>
      </MotionBox>
    </MotionBox>
  );
}

// One stacking card: the wrapper is sticky against the whole stack, so each
// card pins near the top while the next one scrolls up and overlaps it.
// Pinned cards scale down slightly as the cards after them arrive.
function ProjectCard({ project, index, total, progress, onOpen }) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  // Three crops of the project's real imagery: mobile mock on top-left,
  // a lower crop bottom-left, and the full shot on the right.
  const col1Top = project.mobileImage || project.image;
  const col1Bottom = project.image;
  const col2 = project.image;

  return (
    <Box
      position="sticky"
      top={0}
      // Taller than the viewport: the pinned card gets ~15vh of scroll to
      // itself before the next card starts sliding in over it.
      h="115vh"
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      pt={{ base: "5rem", md: "6.5rem" }}
    >
      <MotionBox
        onClick={onOpen}
        cursor="pointer"
        position="relative"
        w="100%"
        style={{
          scale,
          top: `${index * 28}px`,
          backgroundColor: palette.showcaseBg,
          borderColor: palette.showcaseBorder,
        }}
        transformOrigin="top center"
        borderRadius={CARD_RADIUS}
        border="2px solid"
        p={{ base: 4, sm: 6, md: 8 }}
        overflow="hidden"
        transition="border-color 0.3s ease"
        _hover={{ borderColor: palette.purple }}
      >
        {/* Top row: number, category + title, live link */}
        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "flex-end" }}
          wrap="wrap"
          gap={{ base: 4, md: 6 }}
          mb={{ base: 5, md: 8 }}
        >
          <Flex align={{ base: "center", md: "flex-end" }} gap={{ base: 4, md: 8 }} minW={0}>
            <Text
              fontFamily="kanit"
              fontWeight="900"
              lineHeight="0.85"
              fontSize="clamp(3.5rem, 9vw, 8rem)"
              css={headingGradientCss}
              flexShrink={0}
            >
              {String(index + 1).padStart(2, "0")}
            </Text>
            <Box minW={0}>
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                color="portfolio.muted"
                textTransform="uppercase"
                letterSpacing="0.25em"
                mb={2}
              >
                {project.category}
              </Text>
              <Text
                fontFamily="kanit"
                fontWeight="700"
                textTransform="uppercase"
                lineHeight="1.05"
                letterSpacing="-0.01em"
                color="portfolio.text"
                fontSize="clamp(1.35rem, 3.2vw, 2.6rem)"
              >
                {project.title}
              </Text>
            </Box>
          </Flex>
          <LiveProjectButton
            label="View Details"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          />
        </Flex>

        {/* Bottom row: 40% column with two stacked images, 60% tall image */}
        <Flex gap={{ base: 3, md: 5 }} align="stretch">
          <Flex direction="column" gap={{ base: 3, md: 5 }} w="40%">
            <Box
              h="min(clamp(130px, 16vw, 230px), 18vh)"
              borderRadius={IMAGE_RADIUS}
              backgroundImage={`url(${col1Top})`}
              backgroundSize="cover"
              backgroundPosition="center top"
              border="1px solid"
              borderColor="portfolio.stroke"
            />
            <Box
              h="min(clamp(160px, 22vw, 340px), 26vh)"
              borderRadius={IMAGE_RADIUS}
              backgroundImage={`url(${col1Bottom})`}
              backgroundSize="cover"
              backgroundPosition="center bottom"
              border="1px solid"
              borderColor="portfolio.stroke"
            />
          </Flex>
          <Box
            w="60%"
            borderRadius={IMAGE_RADIUS}
            backgroundImage={`url(${col2})`}
            backgroundSize="cover"
            backgroundPosition="center top"
            border="1px solid"
            borderColor="portfolio.stroke"
          />
        </Flex>
      </MotionBox>
    </Box>
  );
}

// Projects showcase: dark sheet with rounded top pulled over the hero,
// giant gradient heading, and sticky-stacking cards mapped from the projects data.
export default function SelectedWorks({ projects, viewAllUrl, lenisRef }) {
  const stackRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <Box
      as="section"
      id="work"
      position="relative"
      zIndex={10}
      mt={{ base: -10, sm: -12, md: -14 }}
      borderTopRadius={CARD_RADIUS}
      style={{ backgroundColor: palette.showcaseBg }}
      pt={{ base: 12, md: 16 }}
      pb={{ base: 12, md: 20 }}
    >
      <Box maxW="1200px" mx="auto" px={{ base: 4, sm: 6, md: 10 }}>
        <FadeIn>
          <Text
            as="h2"
            fontFamily="kanit"
            fontWeight="900"
            textTransform="uppercase"
            lineHeight="none"
            letterSpacing="tight"
            fontSize="clamp(4rem, 14vw, 11rem)"
            css={headingGradientCss}
          >
            Project
          </Text>
        </FadeIn>

        <Box ref={stackRef} mt={{ base: 6, md: 10 }}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              progress={scrollYProgress}
              onOpen={() => setSelected(project)}
            />
          ))}
        </Box>

        {viewAllUrl && (
          <Flex justify="center" mt={{ base: 4, md: 8 }}>
            <LiveProjectButton href={viewAllUrl} label="View all work" />
          </Flex>
        )}
      </Box>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            lenisRef={lenisRef}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </Box>
  );
}
