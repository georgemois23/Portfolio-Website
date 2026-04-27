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

const panelBg = "rgba(42, 28, 74, 0.72)";
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
      >
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
      </VStack>
    </Container>
  );
};

export default Skills;
