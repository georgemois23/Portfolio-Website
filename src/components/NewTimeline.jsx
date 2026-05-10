import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { timelineDates } from "./Timeline";
import PortfolioMoreDialog from "./PortfolioMoreDialog";

const steps = timelineDates.map((item, index) => ({
  id: `${item.title}-${index}`,
  title: item.title,
  period: `${item.from} — ${item.to}`,
  previewDescription: item.short_description || item.description,
  image: item.image,
  raw: item,
}));

export default function NewTimeline() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const openDetails = (item) => {
    setSelectedItem(item.raw);
    setRefreshKey((prev) => prev + 1);
    setIsOpen(true);
  };

  return (
    <Box
      position="relative"
      width="100%"
      px={{ base: 4, md: 8, lg: 10 }}
      py={{ base: 10, md: 14, lg: 16 }}
      overflow="hidden"
      bg="#07090f"
    >
      <Box
        position="absolute"
        inset={0}
        bg="
          radial-gradient(circle at 18% 18%, rgba(145,109,232,0.14), transparent 42%),
          radial-gradient(circle at 85% 80%, rgba(95,170,255,0.1), transparent 46%)
        "
        pointerEvents="none"
      />

      <Box textAlign="center" mb={{ base: 10, md: 14 }} zIndex={1} position="relative">
        <Text
          color="rgba(145,109,232,.9)"
          letterSpacing="0.18em"
          fontSize="xs"
          textTransform="uppercase"
          fontWeight="600"
        >
          Experience Timeline
        </Text>

        <Heading
          color="white"
          fontSize={{ base: "3xl", md: "4xl", xl: "5xl" }}
          fontWeight="600"
          mt={2}
          letterSpacing="-0.03em"
        >
          Work & Projects
        </Heading>

        <Text
          color="whiteAlpha.700"
          maxW="600px"
          mx="auto"
          mt={3}
          lineHeight="1.8"
        >
          A curated overview of my development experience, projects, and technical growth.
        </Text>
      </Box>

      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 3 }}
        columnGap={{ base: 8, md: 12, xl: 16 }}
        rowGap={{ base: 10, md: 14, xl: 16 }}
        maxW="1320px"
        mx="auto"
        position="relative"
        zIndex={1}
      >
        {steps.map((step, index) => (
          <Box
            key={step.id}
            borderRadius="20px"
            overflow="hidden"
            cursor="pointer"
            data-cursor-label="SEE MORE"
            onClick={() => openDetails(step)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openDetails(step);
              }
            }}
            bg="rgba(255,255,255,0.04)"
            border="1px solid"
            borderColor="rgba(255,255,255,0.1)"
            backdropFilter="blur(8px)"
            boxShadow="0 8px 24px rgba(0,0,0,0.28)"
            transition="all 0.24s ease"
            _hover={{
              transform: "translateY(-4px)",
              borderColor: "rgba(145,109,232,0.45)",
              boxShadow: "0 14px 32px rgba(39,23,78,0.35)",
            }}
          >
            {step.image && (
              <Image
                src={step.image}
                alt={step.title}
                w="100%"
                h="180px"
                objectFit="cover"
              />
            )}

            <Flex direction="column" gap={3} p={{ base: 4, md: 5 }} minH="250px">
              <Flex justify="space-between" align="center">
                <Text fontSize="xs" color="whiteAlpha.500">
                  [{String(index + 1).padStart(2, "0")}]
                </Text>
              </Flex>

              <HStack gap={2} flexWrap="wrap">
                <Text
                  fontSize="2xs"
                  px={2}
                  py={1}
                  rounded="full"
                  bg="rgba(145,109,232,.22)"
                  color="rgba(222,205,255,.98)"
                  border="1px solid rgba(145,109,232,.45)"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.06em"
                >
                  {step.period}
                </Text>
              </HStack>

              <Heading
                fontSize={{ base: "md", md: "lg" }}
                color="white"
                fontWeight="600"
                lineHeight="1.3"
                letterSpacing="-0.01em"
              >
                {step.title}
              </Heading>

              <Text fontSize="sm" color="whiteAlpha.800" lineHeight="1.75" noOfLines={3}>
                {step.previewDescription}
              </Text>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>

      <PortfolioMoreDialog
        key={refreshKey}
        open={isOpen}
        onOpenChange={() => setIsOpen(false)}
        data={selectedItem}
      />
    </Box>
  );
}