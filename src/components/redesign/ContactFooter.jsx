import { useEffect, useRef } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import gsap from "gsap";
import RingButton from "./RingButton";
import Form from "../Form";
import { palette, hexToRgba } from "../../theme/theme";

const MARQUEE_PHRASE = "BUILDING THE FUTURE • ";

// Contact + footer: dot grid + drifting glows (same ambience as the hero),
// GSAP marquee, email CTA, contact form, socials.
// Email, socials, and availability all come from the profile object.
export default function ContactFooter({ profile }) {
  const rootRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
      gsap.to(".footer-orb-1", {
        x: 60,
        y: 50,
        duration: 13,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".footer-orb-2", {
        x: -70,
        y: -40,
        duration: 16,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={rootRef}
      as="footer"
      id="contact"
      position="relative"
      style={{ backgroundColor: palette.showcaseBg }}
      pt={{ base: 16, md: 20 }}
      pb={{ base: 8, md: 12 }}
      overflow="hidden"
    >
      {/* Background: dot grid + drifting glows, matching the hero */}
      <Box position="absolute" inset={0} zIndex={0} pointerEvents="none">
        <Box
          position="absolute"
          inset={0}
          style={{
            backgroundImage: `radial-gradient(circle, ${palette.showcaseBorder}14 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 45%, black 30%, transparent 100%)",
          }}
        />
        <Box
          className="footer-orb-1"
          position="absolute"
          top="-15%"
          right="-10%"
          w={{ base: "70vw", md: "45vw" }}
          h={{ base: "70vw", md: "45vw" }}
          maxW="720px"
          maxH="720px"
          borderRadius="full"
          style={{
            background: `radial-gradient(circle, ${hexToRgba(palette.accentTo, 0.16)} 0%, transparent 65%)`,
          }}
        />
        <Box
          className="footer-orb-2"
          position="absolute"
          bottom="-20%"
          left="-12%"
          w={{ base: "75vw", md: "50vw" }}
          h={{ base: "75vw", md: "50vw" }}
          maxW="820px"
          maxH="820px"
          borderRadius="full"
          style={{
            background: `radial-gradient(circle, ${hexToRgba(palette.purple, 0.12)} 0%, transparent 65%)`,
          }}
        />
      </Box>

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

          {/* Contact form (existing EmailJS form, restyled to the redesign theme) */}
          <Flex align="center" gap={4} mt={{ base: 12, md: 16 }} mb={8} w="100%" maxW="640px">
            <Box flex="1" h="1px" bg="portfolio.stroke" />
            <Text
              fontSize="xs"
              color="portfolio.muted"
              textTransform="uppercase"
              letterSpacing="0.25em"
              whiteSpace="nowrap"
            >
              or send a message
            </Text>
            <Box flex="1" h="1px" bg="portfolio.stroke" />
          </Flex>
          <Box
            id="contact-form"
            w="100%"
            maxW="640px"
            bg="portfolio.surface/60"
            backdropFilter="blur(16px)"
            border="1px solid"
            borderColor="portfolio.stroke"
            borderRadius="3xl"
            p={{ base: 6, md: 10 }}
            textAlign="left"
            display="flex"
            justifyContent="center"
            css={{
              "& label": {
                color: `${palette.text} !important`,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              },
              "& input, & textarea": {
                background: "transparent !important",
                borderColor: `${palette.stroke} !important`,
                color: `${palette.text} !important`,
                borderRadius: "12px",
              },
              "& input:focus-visible, & textarea:focus-visible": {
                borderColor: `${palette.accentFrom} !important`,
                boxShadow: `0 0 8px ${palette.accentGlow} !important`,
              },
              "& button[type='submit']": {
                background: `${palette.text} !important`,
                color: `${palette.background} !important`,
                border: "none !important",
                borderRadius: "9999px",
                transition: "transform 0.3s ease, opacity 0.3s ease",
              },
              "& button[type='submit']:hover:not(:disabled)": {
                transform: "scale(1.02)",
              },
            }}
          >
            <Form />
          </Box>
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

          <Flex align="center"   gap={2.5}>
            <Box position="relative" w={1} h={1} flexShrink={0}>
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
