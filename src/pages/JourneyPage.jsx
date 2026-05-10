import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { LuArrowLeft, LuArrowUpRight } from "react-icons/lu";

import opensourceImg from "../assets/images/projects-mock/opensource_MockUp.png";
import polyvoxImg from "../assets/images/projects-mock/polyvox_MockUp.png";
import oldportfolio from "../assets/images/projects-mock/moysiadis.dev_.png";

const steps = [
  {
    id: "discover",
    title: "Discover",
    period: "2024",
    description:
      "Started by shipping core portfolio ideas and validating design direction with practical builds.",
    image: oldportfolio,
    url: "https://oldportfolio.moysiadis.dev/",
  },
  {
    id: "rebuild",
    title: "Rebuild",
    period: "2025",
    description:
      "Redesigned Open Source UoM website with stronger UX, component architecture, and CMS content flow.",
    image: opensourceImg,
    url: "https://open-source-redesign.vercel.app",
  },
  {
    id: "scale",
    title: "Scale",
    period: "2025",
    description:
      "Built full-stack products with React and NestJS, focusing on performance and maintainable systems.",
    image: polyvoxImg,
    url: "https://polyvox.moysiadis.dev",
  },
];

export default function JourneyPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    document.title = "Journey | Moysiadis George";
    window.scrollTo({ top: 0 });

    /* ---------- SCROLL HANDLER ---------- */
    const handleWheel = (event) => {
      if (isTransitioningRef.current) return;

      const direction = event.deltaY > 0 ? 1 : -1;

      isTransitioningRef.current = true;

      setCurrentIndex((prev) => {
        const next = prev + direction;
        return Math.max(0, Math.min(next, steps.length - 1));
      });

      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 650);
    };

    /* ---------- KEYBOARD ---------- */
    const handleKeyDown = (event) => {
      if (isTransitioningRef.current) return;

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        isTransitioningRef.current = true;
        setCurrentIndex((prev) =>
          Math.min(prev + 1, steps.length - 1)
        );
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        isTransitioningRef.current = true;
        setCurrentIndex((prev) =>
          Math.max(prev - 1, 0)
        );
      }

      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 650);
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const translateX = currentIndex * 100;

  return (
    <Box
      position="fixed"
      inset={0}
      h="100vh"
      w="100vw"
      overflow="hidden"
      bg="linear-gradient(120deg, rgb(6,8,18) 0%, rgb(10,12,26) 48%, rgb(6,10,22) 100%)"
    >
      {/* Background glows */}
      <Box
        position="absolute"
        top="-140px"
        left="-160px"
        w={{ base: "300px", md: "460px" }}
        h={{ base: "300px", md: "460px" }}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(145,109,232,0.2) 0%, rgba(145,109,232,0) 72%)"
      />
      <Box
        position="absolute"
        right="-140px"
        bottom="-160px"
        w={{ base: "320px", md: "500px" }}
        h={{ base: "320px", md: "500px" }}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(95,170,255,0.16) 0%, rgba(95,170,255,0) 72%)"
      />

      {/* Navigation */}
      <Flex
        justify="space-between"
        align="center"
        position="absolute"
        top={6}
        left={6}
        right={6}
        zIndex={3}
        bg="rgba(6,8,18,0.55)"
        border="1px solid"
        borderColor="whiteAlpha.200"
        borderRadius="14px"
        px={4}
        py={2}
        backdropFilter="blur(8px)"
      >
        <Button
          as={RouterLink}
          to="/"
          leftIcon={<LuArrowLeft />}
          variant="ghost"
          color="brand.dark.text"
        >
          Back
        </Button>

        <Text
          fontSize="xs"
          textTransform="uppercase"
          letterSpacing="0.14em"
          color="whiteAlpha.700"
        >
          Scroll down to explore
        </Text>
      </Flex>

      {/* Sliding Track */}
      <Flex
        w={`${steps.length * 100}vw`}
        h="100vh"
        transform={`translate3d(-${translateX}vw,0,0)`}
        transition="transform 0.65s cubic-bezier(0.22,1,0.36,1)"
      >
        {steps.map((step, index) => (
          <Flex
            key={step.id}
            w="100vw"
            h="100vh"
            flexShrink={0}
            align="center"
            justify="center"
            px={{ base: 4, md: 8 }}
            pt={20}
          >
            <Flex
              direction={{ base: "column", xl: "row" }}
              gap={8}
              h="calc(100vh - 150px)"
              w="100%"
            >
              <Image
                src={step.image}
                alt={step.title}
                w={{ base: "100%", xl: "58%" }}
                h={{ base: "45%", xl: "100%" }}
                objectFit="cover"
                borderRadius="2xl"
                border="1px solid"
                borderColor="whiteAlpha.200"
              />

              <Flex
                direction="column"
                justify="space-between"
                w={{ base: "100%", xl: "42%" }}
              >
                <Flex justify="space-between">
                  <Text color="whiteAlpha.600">
                    [{String(index + 1).padStart(2, "0")}]
                  </Text>

                  <Text color="purple.300" fontWeight="700">
                    {step.period}
                  </Text>
                </Flex>

                <Heading fontSize={{ base: "2xl", md: "5xl" }}>
                  {step.title}
                </Heading>

                <Text maxW="38ch" lineHeight="1.8">
                  {step.description}
                </Text>

                <Button
                  as="a"
                  href={step.url}
                  target="_blank"
                  variant="outline"
                  rightIcon={<LuArrowUpRight />}
                  w="fit-content"
                >
                  View more
                </Button>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>

      {/* Pagination */}
      <Flex position="absolute" bottom={7} left={0} right={0} justify="center" gap={2}>
        {steps.map((_, index) => (
          <Box
            key={index}
            w={index === currentIndex ? "26px" : "8px"}
            h="8px"
            borderRadius="9999px"
            bg={
              index === currentIndex
                ? "rgba(145,109,232,0.95)"
                : "whiteAlpha.400"
            }
            transition="all .2s"
          />
        ))}
      </Flex>
    </Box>
  );
}