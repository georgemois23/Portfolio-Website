import { useEffect, useRef, useState } from "react";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LiveProjectButton, headingGradientCss } from "./SelectedWorks";
import { palette } from "../../theme/theme";

gsap.registerPlugin(ScrollTrigger);

const MotionBox = motion.create(Box);

// D7E2EA at low alpha for card borders, matching the section dividers.
const hairline = `${palette.showcaseBorder}33`;

// Scroll-driven parallax gallery. Center content is pinned while two image
// columns drift at different speeds. Images come from the projects data.
export default function Explorations({ items, viewAllUrl }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      gsap.fromTo(
        col1Ref.current,
        { y: 120 },
        {
          y: -420,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        col2Ref.current,
        { y: 420 },
        {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const columns = [
    items.filter((_, i) => i % 2 === 0),
    items.filter((_, i) => i % 2 === 1),
  ];

  return (
    <>
      <Box
        ref={sectionRef}
        as="section"
        position="relative"
        minH={{ base: "160vh", md: "180vh" }}
        style={{ backgroundColor: palette.showcaseBg }}
        overflow="hidden"
      >
        {/* Pinned center content */}
        <Flex
          ref={contentRef}
          h="100vh"
          position="relative"
          zIndex={10}
          direction="column"
          align="center"
          justify="center"
          textAlign="center"
          px={6}
        >
          <Flex align="center" gap={4} mb={3}>
            <Box w="2rem" h="1px" style={{ backgroundColor: hairline }} />
            <Text
              fontSize={{ base: "xs", md: "sm" }}
              color="portfolio.muted"
              textTransform="uppercase"
              letterSpacing="0.25em"
            >
              Explorations
            </Text>
            <Box w="2rem" h="1px" style={{ backgroundColor: hairline }} />
          </Flex>
          <Text
            as="h2"
            fontFamily="kanit"
            fontWeight="900"
            textTransform="uppercase"
            lineHeight="none"
            letterSpacing="tight"
            fontSize="clamp(2.6rem, 8vw, 6.5rem)"
            css={headingGradientCss}
          >
            Playground
          </Text>
          <Text mt={4} mb={8} fontSize={{ base: "sm", md: "md" }} color="portfolio.muted" maxW="sm">
            Snapshots from things I've designed and shipped.
          </Text>
          {viewAllUrl && <LiveProjectButton href={viewAllUrl} label="See More ↗" />}
        </Flex>

        {/* Parallax columns */}
        <Box position="absolute" inset={0} zIndex={20} pointerEvents="none">
          <Grid
            templateColumns="repeat(2, 1fr)"
            gap={{ base: 12, md: 40 }}
            maxW="1400px"
            mx="auto"
            h="100%"
            px={{ base: 4, md: 10 }}
          >
            {[col1Ref, col2Ref].map((ref, colIndex) => (
              <Flex
                key={colIndex}
                ref={ref}
                direction="column"
                gap={{ base: 24, md: 40 }}
                align={colIndex === 0 ? "flex-start" : "flex-end"}
                justify="center"
              >
                {columns[colIndex].map((item, i) => (
                  <Box
                    key={item.id || i}
                    as="button"
                    onClick={() => setLightbox(item)}
                    pointerEvents="auto"
                    cursor="pointer"
                    border="1px solid"
                    borderRadius={{ base: "24px", md: "32px" }}
                    overflow="hidden"
                    style={{ borderColor: hairline, backgroundColor: palette.showcaseBg }}
                    w="100%"
                    maxW="320px"
                    aspectRatio="1"
                    p={0}
                    transform={`rotate(${colIndex === 0 ? -3 + i * 2 : 3 - i * 2}deg)`}
                    transition="transform 0.4s ease"
                    _hover={{ transform: "rotate(0deg) scale(1.04)" }}
                  >
                    <Box
                      w="100%"
                      h="100%"
                      backgroundImage={`url(${item.image})`}
                      backgroundSize="cover"
                      backgroundPosition="center top"
                    />
                  </Box>
                ))}
              </Flex>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            position="fixed"
            inset={0}
            zIndex={9998}
            bg="blackAlpha.800"
            backdropFilter="blur(8px)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={6}
            cursor="zoom-out"
            onClick={() => setLightbox(null)}
          >
            <MotionBox
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              maxW="4xl"
              w="100%"
            >
              <Box
                as="img"
                src={lightbox.image}
                alt={lightbox.title}
                w="100%"
                borderRadius={{ base: "24px", md: "32px" }}
                border="1px solid"
                style={{ borderColor: hairline }}
              />
              <Text
                mt={4}
                textAlign="center"
                fontFamily="kanit"
                fontWeight="500"
                textTransform="uppercase"
                letterSpacing="0.1em"
                fontSize="sm"
                color="portfolio.muted"
              >
                {lightbox.title}
              </Text>
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  );
}
