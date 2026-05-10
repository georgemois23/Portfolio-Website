import { Accordion, Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { LuArrowUpRight } from "react-icons/lu";

const qaItems = [
  {
    value: "services",
    question: "What services do you provide?",
    answer:
      "I build full-stack web applications, modernize existing products, and optimize performance and UX with React, Node.js, and reliable backend integrations.",
  },
  {
    value: "workflow",
    question: "How do you usually work on a project?",
    answer:
      "I start with requirements and scope, create a clear implementation plan, then deliver in small milestones with frequent updates and testing.",
  },
  {
    value: "existing-codebases",
    question: "Can you work on existing codebases?",
    answer:
      "Yes. I can join ongoing projects, refactor legacy code safely, fix bugs, and add features while keeping the architecture maintainable.",
  },
  {
    value: "start",
    question: "How can we start working together?",
    answer:
      "Use the contact section below with your project details, timeline, and goals. I will get back with a practical next-step proposal.",
  },
];

export default function QAAccordion() {
  const formatIndex = (index) => `[${String(index + 1).padStart(2, "0")}]`;

  return (
    <Box
      position="relative"
      mb={14}
      width="100%"
      minH={{ base: "90vh", lg: "100vh" }}
      display="flex"
      alignItems="center"
      px={{ base: 4, md: 8, xl: 12 }}
      py={{ base: 10, md: 14 }}
      overflow="hidden"
      bg="linear-gradient(120deg, rgb(7, 8, 16) 0%, rgb(13, 11, 24) 48%, rgb(6, 10, 20) 100%)"
      borderRadius={{ base: "28px", md: "36px" }}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h={{ base: "70px", md: "100px" }}
        bg="linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0))"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h={{ base: "70px", md: "100px" }}
        bg="linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="-120px"
        left="-140px"
        w={{ base: "260px", md: "420px" }}
        h={{ base: "260px", md: "420px" }}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(145,109,232,0.28) 0%, rgba(145,109,232,0) 70%)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        right="-120px"
        bottom="-150px"
        w={{ base: "280px", md: "460px" }}
        h={{ base: "280px", md: "460px" }}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(95,170,255,0.24) 0%, rgba(95,170,255,0) 72%)"
        pointerEvents="none"
      />
      <Flex
        position="relative"
        zIndex={1}
        maxW="1200px"
        mx="auto"
        w="100%"
        gap={{ base: 8, lg: 12 }}
        direction={{ base: "column", lg: "row" }}
        align={{ base: "flex-start", lg: "stretch" }}
      >
        <Box flex={{ base: "none", lg: "0 0 42%" }} pt={{ lg: 2 }}>
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            textTransform="uppercase"
            letterSpacing="0.2em"
            color="rgba(145, 109, 232, 0.9)"
            mb={4}
          >
            [Q&A] Development Flow
          </Text>
          <Heading
            as="h2"
            fontSize={{ base: "4xl", md: "5xl", xl: "6xl" }}
            lineHeight="0.95"
            letterSpacing="-0.02em"
            color="white"
            fontWeight="500"
          >
            Questions
            <br />
            & Answers
          </Heading>
        </Box>

        <Box flex="1" width="100%">
          <Accordion.Root collapsible>
            {qaItems.map((item, index) => (
              <Accordion.Item
                key={item.value}
                value={item.value}
                borderTop={index === 0 ? "1px solid" : "0"}
                borderBottom="1px solid"
                borderColor="whiteAlpha.300"
              >
                <Accordion.ItemTrigger
                  px={{ base: 0, md: 1 }}
                  py={{ base: 5, md: 6 }}
                  _hover={{
                    // color: "rgba(145, 109, 232, 0.95)",
                    // bg: "rgba(255,255,255,0.02)",
                  }}
                  transition="all 0.2s ease"
                >
                  <VStack align="start" gap={1} flex="1" textAlign="start">
                    <Text
                      color="inherit"
                      fontWeight="600"
                      textTransform="uppercase"
                      letterSpacing="0.06em"
                      fontSize={{ base: "lg", md: "2xl" }}
                      lineHeight="1.2"
                    >
                      {item.question}
                    </Text>
                  </VStack>
                  <Accordion.ItemIndicator
                    color="inherit"
                    fontSize={{ base: "lg", md: "xl" }}
                    rotate={{ base: "0deg", _open: "90deg" }}
                    transition="transform 0.25s ease"
                  >
                    <LuArrowUpRight />
                  </Accordion.ItemIndicator>
                </Accordion.ItemTrigger>

                <Accordion.ItemContent>
                  <Accordion.ItemBody px={{ base: 0, md: 1 }} pb={{ base: 6, md: 8 }}>
                    <Flex
                      align={{ base: "flex-start", md: "stretch" }}
                      direction={{ base: "column", md: "row" }}
                      gap={{ base: 3, md: 8 }}
                    >
                      <Text
                        color="whiteAlpha.500"
                        fontWeight="700"
                        fontSize={{ base: "3xl", md: "5xl" }}
                        letterSpacing="0.08em"
                        lineHeight="1"
                        minW={{ md: "120px" }}
                        mt={{ md: "-4px" }}
                      >
                        {formatIndex(index)}
                      </Text>
                      <Text
                        color="whiteAlpha.900"
                        lineHeight="1.9"
                        fontSize={{ base: "sm", md: "md" }}
                        maxW="800px"
                      >
                        {item.answer}
                      </Text>
                    </Flex>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Box>
      </Flex>
    </Box>
  );
}
