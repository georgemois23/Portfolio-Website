import { useEffect, useRef, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import gsap from "gsap";
import { LiveProjectButton, headingGradientCss } from "./SelectedWorks";
import { palette, hexToRgba } from "../../theme/theme";

// Editorial hero: dark surface with a dot grid and drifting accent glows,
// giant Kanit gradient headline, GSAP entrance, cycling role line.
// All copy comes from the profile object.
export default function Hero({ profile, ready, onSeeWorks, onReachOut }) {
  const rootRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // The big headline lines come from the existing intro data (profile.eyebrow).
  const titleLines = profile.eyebrow.split(" ");

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % profile.roles.length);
    }, 2000);
    return () => clearInterval(id);
  }, [profile.roles.length]);

  // Slow ambient drift for the background glows.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-orb-1", {
        x: 70,
        y: -50,
        duration: 12,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-orb-2", {
        x: -60,
        y: 60,
        duration: 15,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Per-line mask reveal — gradient-clipped text stays intact
      // (character splitting breaks background-clip: text).
      tl.to(
        ".hero-line",
        { y: 0, duration: 1.1, stagger: 0.14 },
        0.1
      );

      tl.to(
        ".blur-in",
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          stagger: 0.1,
        },
        0.45
      );
    }, rootRef);

    return () => ctx.revert();
  }, [ready]);

  const [beforeRole, afterRole = ""] = profile.roleLineTemplate.split("{role}");

  return (
    <Box
      ref={rootRef}
      id="home"
      position="relative"
      minH="100vh"
      overflow="hidden"
      style={{ backgroundColor: palette.showcaseBg }}
    >
      {/* Background: dot grid, drifting glows, center lift behind the headline */}
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
          className="hero-orb-1"
          position="absolute"
          top="-15%"
          left="-10%"
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
          className="hero-orb-2"
          position="absolute"
          bottom="-20%"
          right="-12%"
          w={{ base: "75vw", md: "50vw" }}
          h={{ base: "75vw", md: "50vw" }}
          maxW="820px"
          maxH="820px"
          borderRadius="full"
          style={{
            background: `radial-gradient(circle, ${hexToRgba(palette.purple, 0.12)} 0%, transparent 65%)`,
          }}
        />
        <Box
          position="absolute"
          top="38%"
          left="50%"
          transform="translate(-50%, -50%)"
          w={{ base: "90vw", md: "60vw" }}
          h={{ base: "50vw", md: "30vw" }}
          style={{
            background: `radial-gradient(ellipse, ${hexToRgba(palette.showcaseBorder, 0.07)} 0%, transparent 70%)`,
          }}
        />
      </Box>

      {/* Content — generous padding so it always clears the floating navbar
          (top) and the scroll indicator (bottom); section grows if needed */}
      <Flex
        position="relative"
        zIndex={10}
        minH="100vh"
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        px={{ base: 4, sm: 6, md: 10 }}
        pt={{ base: "8rem", md: "9rem" }}
        pb={{ base: "9rem", md: "10rem" }}
      >
        <Text
          className="blur-in"
          opacity={0}
          transform="translateY(20px)"
          filter="blur(10px)"
          fontSize={{ base: "xs", md: "sm" }}
          color="portfolio.muted"
          textTransform="uppercase"
          letterSpacing="0.3em"
          mb={{ base: 6, md: 8 }}
        >
          {profile.name} — {profile.location}
        </Text>

        <Box w="100%">
          {titleLines.map((line) => (
            <Box key={line} overflow="hidden" pb="0.06em" mb="-0.06em">
              <Text
                as="span"
                className="hero-line"
                display="block"
                transform="translateY(110%)"
                fontFamily="kanit"
                fontWeight="900"
                textTransform="uppercase"
                lineHeight="0.95"
                letterSpacing="tight"
                fontSize="clamp(3rem, 11.5vw, 9.5rem)"
                css={headingGradientCss}
              >
                {line}
              </Text>
            </Box>
          ))}
        </Box>

        <Text
          className="blur-in"
          opacity={0}
          transform="translateY(20px)"
          filter="blur(10px)"
          fontSize={{ base: "sm", md: "lg" }}
          color="portfolio.muted"
          mt={{ base: 6, md: 8 }}
          mb={{ base: 3, md: 4 }}
        >
          {beforeRole.replace("{location}", profile.location)}
          <Text
            as="span"
            key={roleIndex}
            className="animate-role-fade-in"
            display="inline-block"
            fontFamily="kanit"
            fontWeight="600"
            textTransform="uppercase"
            letterSpacing="0.04em"
            style={{ color: palette.showcaseBorder }}
          >
            {profile.roles[roleIndex]}
          </Text>
          {afterRole.replace("{location}", profile.location)}
        </Text>

        <Text
          className="blur-in"
          opacity={0}
          transform="translateY(20px)"
          filter="blur(10px)"
          fontSize={{ base: "sm", md: "md" }}
          color="portfolio.muted"
          maxW="md"
          mb={{ base: 9, md: 10 }}
        >
          {profile.description}
        </Text>

        <Box className="blur-in" opacity={0} transform="translateY(20px)" filter="blur(10px)">
          <Flex display="inline-flex" gap={{ base: 3, md: 4 }} wrap="wrap" justify="center">
            <LiveProjectButton onClick={onSeeWorks} label="See Works" />
            <LiveProjectButton onClick={onReachOut} label="Reach Out" />
          </Flex>
        </Box>
      </Flex>

      {/* Scroll indicator */}
      <Flex
        position="absolute"
        bottom={{ base: 12, md: 8 }}
        left="50%"
        transform="translateX(-50%)"
        zIndex={10}
        direction="column"
        align="center"
        gap={3}
      >
        <Text
          fontSize="xs"
          color="portfolio.muted"
          textTransform="uppercase"
          letterSpacing="0.2em"
        >
          Scroll
        </Text>
        <Box position="relative" w="1px" h={10} bg="portfolio.stroke" overflow="hidden">
          <Box
            className="animate-scroll-down"
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="50%"
            style={{ background: palette.accentGradient }}
          />
        </Box>
      </Flex>
    </Box>
  );
}
