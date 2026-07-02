import { useEffect, useRef, useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import gsap from "gsap";
import SplitType from "split-type";
import HlsVideo from "./HlsVideo";
import RingButton from "./RingButton";
import { palette } from "../../theme/theme";

// Full-viewport hero: HLS video background, GSAP entrance, cycling role line.
// All copy comes from the profile object.
export default function Hero({ profile, streamUrl, ready, onSeeWorks, onReachOut }) {
  const rootRef = useRef(null);
  const nameRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % profile.roles.length);
    }, 2000);
    return () => clearInterval(id);
  }, [profile.roles.length]);

  useEffect(() => {
    if (!ready) return;

    let split;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      split = new SplitType(nameRef.current, { types: "chars" });
      gsap.set(nameRef.current, { opacity: 1 });
      tl.from(
        split.chars,
        { opacity: 0, y: 50, duration: 1.2, stagger: 0.035 },
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
        0.3
      );
    }, rootRef);

    return () => {
      ctx.revert();
      if (split) split.revert();
    };
  }, [ready]);

  const [beforeRole, afterRole = ""] = profile.roleLineTemplate.split("{role}");

  return (
    <Box
      ref={rootRef}
      id="home"
      position="relative"
      h="100vh"
      minH="600px"
      overflow="hidden"
      bg="portfolio.bg"
    >
      {/* Background video */}
      <Box position="absolute" inset={0}>
        <HlsVideo
          src={streamUrl}
          style={{ transform: "translate(-50%, -50%)",  }}
        />
        <Box position="absolute" inset={0} bg="blackAlpha.300" />
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          h="12rem"
          bgGradient="to-t"
          gradientFrom="portfolio.bg"
          gradientTo="transparent"
        />
      </Box>

      {/* Content */}
      <Flex
        position="relative"
        zIndex={10}
        h="100%"
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        px={6}
      >
        <Text
          className="blur-in"
          opacity={0}
          transform="translateY(20px)"
          filter="blur(10px)"
          fontSize="xs"
          color="portfolio.muted"
          textTransform="uppercase"
          letterSpacing="0.3em"
          mb={8}
        >
          {profile.eyebrow}
        </Text>

        <Heading
          ref={nameRef}
          as="h1"
          opacity={0}
          fontSize={{ base: "5xl", sm: "6xl", md: "8xl", lg: "9xl" }}
          fontFamily="display"
          fontStyle="italic"
          fontWeight="400"
          lineHeight="0.9"
          letterSpacing="-0.02em"
          color="portfolio.text"
          mb={6}
        >
          {profile.name}
        </Heading>

        <Text
          className="blur-in"
          opacity={0}
          transform="translateY(20px)"
          filter="blur(10px)"
          fontSize={{ base: "lg", md: "xl" }}
          color="portfolio.muted"
          mb={4}
        >
          {beforeRole.replace("{location}", profile.location)}
          <Text
            as="span"
            key={roleIndex}
            className="animate-role-fade-in"
            display="inline-block"
            fontFamily="display"
            fontStyle="italic"
            color="portfolio.text"
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
          mb={12}
        >
          {profile.description}
        </Text>

        <Box className="blur-in" opacity={0} transform="translateY(20px)" filter="blur(10px)">
          <Flex display="inline-flex" gap={4} wrap="wrap" justify="center">
            <RingButton variant="solid" onClick={onSeeWorks}>
              See Works
            </RingButton>
            <RingButton variant="outline" onClick={onReachOut}>
              Reach out…
            </RingButton>
          </Flex>
        </Box>
      </Flex>

      {/* Scroll indicator */}
      <Flex
        position="absolute"
        bottom={8}
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
