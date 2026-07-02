import { useEffect, useRef } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import gsap from "gsap";
import HlsVideo from "./HlsVideo";
import RingButton from "./RingButton";
import { palette } from "../../theme/theme";

const MARQUEE_PHRASE = "BUILDING THE FUTURE • ";

// Contact + footer: flipped HLS video, GSAP marquee, email CTA, socials.
// Email, socials, and availability all come from the profile object.
export default function ContactFooter({ profile, streamUrl }) {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <Box
      as="footer"
      id="contact"
      position="relative"
      bg="portfolio.bg"
      pt={{ base: 16, md: 20 }}
      pb={{ base: 8, md: 12 }}
      overflow="hidden"
    >
      {/* Flipped background video */}
      <Box position="absolute" inset={0} transform="scaleY(-1)">
        <HlsVideo src={streamUrl} style={{ transform: "translate(-50%, -50%)" }} />
      </Box>
      <Box position="absolute" inset={0} bg="blackAlpha.600" />
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="10rem"
        bgGradient="to-b"
        gradientFrom="portfolio.bg"
        gradientTo="transparent"
      />

      <Box position="relative" zIndex={10}>
        {/* Marquee */}
        <Box overflow="hidden" whiteSpace="nowrap" mb={{ base: 12, md: 16 }}>
          <Text
            ref={marqueeRef}
            display="inline-block"
            fontFamily="display"
            fontStyle="italic"
            fontSize={{ base: "3xl", md: "5xl" }}
            color="portfolio.text"
            opacity={0.25}
            userSelect="none"
            aria-hidden="true"
          >
            {MARQUEE_PHRASE.repeat(10)}
          </Text>
        </Box>

        {/* CTA */}
        <Flex direction="column" align="center" textAlign="center" px={6} mb={{ base: 16, md: 24 }}>
          <Text
            fontSize="xs"
            color="portfolio.muted"
            textTransform="uppercase"
            letterSpacing="0.3em"
            mb={6}
          >
            Get in touch
          </Text>
          <Heading
            as="h2"
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="400"
            color="portfolio.text"
            letterSpacing="-0.02em"
            mb={10}
          >
            Let's build{" "}
            <Text as="span" fontFamily="display" fontStyle="italic">
              something
            </Text>
          </Heading>
          <RingButton variant="solid" href={`mailto:${profile.email}`}>
            {profile.email} <Box as="span" aria-hidden="true">↗</Box>
          </RingButton>
        </Flex>

        {/* Footer bar */}
        <Flex
          maxW="1200px"
          mx="auto"
          px={{ base: 6, md: 10, lg: 16 }}
          pt={8}
          borderTop="1px solid"
          borderColor="portfolio.stroke"
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={6}
        >
          <Flex gap={6}>
            {profile.socials.map((social) => (
              <Box
                as="a"
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="sm"
                color="portfolio.muted"
                transition="color 0.2s ease"
                _hover={{ color: "portfolio.text" }}
              >
                {social.label}
              </Box>
            ))}
          </Flex>

          <Flex align="center" gap={2.5}>
            <Box position="relative" w={2} h={2} flexShrink={0}>
              <Box
                position="absolute"
                inset={0}
                borderRadius="full"
                style={{ background: palette.success }}
              />
              <Box
                position="absolute"
                inset={0}
                borderRadius="full"
                animation="ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite"
                style={{ background: palette.success }}
              />
            </Box>
            <Text fontSize="xs" color="portfolio.muted" textTransform="uppercase" letterSpacing="0.15em">
              {profile.availability}
            </Text>
          </Flex>

          <Text fontSize="xs" color="portfolio.muted">
            © {new Date().getFullYear()} {profile.name}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
