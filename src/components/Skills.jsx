import { Badge, Container, Heading, Text, Wrap, WrapItem } from "@chakra-ui/react";

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

// More purple shades, all in the same tone family
const purpleShades = [
  "#916de8", // base
  "#835be3",
  "#7649df",
  "#6537d9",
  "#5a2fcf",
  "#4e28c5",
  "#431fb8",
  "#3917ad"
];

const Skills = ({skills}) => {
  if (skills) {
    return (
       <Wrap gap={{ base: 1, md: 2 }} justify="left" maxW={{base:"none", md: '50vw'}}>
        {skills.map((skill, index) => (
          <WrapItem key={index}>
            <Badge
              p={2}
              borderRadius={"xl"}
              bg={"brand.dark.background"} // cycle through purple tones
              fontSize={{ base: "sm", xs: "2xs", md: "md" }}
            >
              <Text color={"white"}>{skill}</Text>
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
    >
      <Heading
              as="h1"
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              mb={12}
              color={"brand.dark.text"}
              textAlign="center"
            >
              Skills  
            </Heading>

      <Wrap spacing={2} justify="center" maxW={{base:"none", md: '50vw'}}>
        {skillsData.map((skill, index) => (
          <WrapItem key={index}>
            <Badge
              p={2}
              borderRadius={"xl"}
              bg={purpleShades[index % purpleShades.length]} // cycle through purple tones
              fontSize={{ base: "sm", xs: "xs", md: "lg" }}
            >
              <Text color={"white"}>{skill}</Text>
            </Badge>
          </WrapItem>
        ))}
      </Wrap>
    </Container>
  );
};

export default Skills;
