import { Badge, Box, Container, Heading, Text, Wrap, WrapItem, VStack } from "@chakra-ui/react";

const skillsData = [
  "React.js",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "Git",
  "GraphQL",
  "NestJS",
  "Linux",
  "SQL",
  "PHP",
  "MUI",
  "Team collaboration",
  "Problem solving",
  "Communication",
  "Leadership"
];

const panelBg = "linear-gradient(120deg, rgb(7, 8, 16) 0%, rgb(13, 11, 24) 48%, rgb(6, 10, 20) 100%)";
const badgeBg = "rgba(145, 109, 232, 0.2)";
const badgeBorder = "rgba(145, 109, 232, 0.45)";

const Skills = ({skills}) => {
  if (skills) {
    return (
       <Wrap gap={{ base: 2, md: 2.5 }} justify="left" maxW={{base:"none", md: '50vw'}}>
        {skills.map((skill, index) => (
          <WrapItem key={index}>
            <Badge
              px={3}
              py={1.5}
              borderRadius="lg"
              bg={badgeBg}
              border="1px solid"
              borderColor={badgeBorder}
              fontSize={{ base: "xs", md: "sm" }}
              textTransform="none"
            >
              <Text color="brand.dark.text" lineHeight="1.2">{skill}</Text>
            </Badge>
          </WrapItem>
        ))}
      </Wrap>
    );
  }
      
  return (
    <Container
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      my={10}
      px={{ base: 3, md: 4 }}
    >
      <VStack
        w="100%"
        maxW="5xl"
        align="stretch"
        bg={panelBg}
        border="1px solid"
        borderColor="whiteAlpha.300"
        borderRadius="xl"
        px={{ base: 4, md: 6 }}
        py={{ base: 5, md: 7 }}
        gap={5}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="-120px"
          left="-140px"
          w={{ base: "220px", md: "340px" }}
          h={{ base: "220px", md: "340px" }}
          borderRadius="full"
          bg="radial-gradient(circle, rgba(145,109,232,0.24) 0%, rgba(145,109,232,0) 72%)"
          pointerEvents="none"
        />
        <Box
          position="absolute"
          right="-120px"
          bottom="-140px"
          w={{ base: "230px", md: "360px" }}
          h={{ base: "230px", md: "360px" }}
          borderRadius="full"
          bg="radial-gradient(circle, rgba(95,170,255,0.2) 0%, rgba(95,170,255,0) 72%)"
          pointerEvents="none"
        />
        <Box position="relative" zIndex={1}>
        <Box>
          <Heading
            as="h2"
            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
            color="brand.dark.text"
            textAlign="left"
            mb={2}
          >
            Skills
          </Heading>
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="brand.dark.text"
            opacity={0.85}
          >
            Technologies and collaboration skills I use to build reliable products.
          </Text>
        </Box>

        <Wrap spacing={{ base: 2, md: 3 }} justify="flex-start">
          {skillsData.map((skill, index) => (
            <WrapItem key={index}>
              <Badge
                px={{ base: 3, md: 3.5 }}
                py={{ base: 1.5, md: 2 }}
                borderRadius="lg"
                bg={badgeBg}
                border="1px solid"
                borderColor={badgeBorder}
                fontSize={{ base: "xs", sm: "sm", md: "md" }}
                textTransform="none"
              >
                <Text color="brand.dark.text" lineHeight="1.2">{skill}</Text>
              </Badge>
            </WrapItem>
          ))}
        </Wrap>
        </Box>
      </VStack>
    </Container>
  );
};

export default Skills;
