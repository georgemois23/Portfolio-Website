import { Badge, Box, Button, Dialog, For, Span, Stack, Text, Timeline, useBreakpointValue } from "@chakra-ui/react"
import { LuCheck, LuBriefcase, LuBriefcaseBusiness, LuGraduationCap, LuInfo, LuExternalLink, LuPersonStanding, LuUsers, LuCodeXml, LuArrowRight, LuDownload,  } from "react-icons/lu"
import PortfolioMoreDialog from "./PortfolioMoreDialog";
import { useState } from "react";
import opensourceImg from '../assets/images/projects-mock/opensource_MockUp.png';
import opensourceImgSmall from '../assets/images/projects-mock/opensource_MockUp_small.png';
import polyvoxImg from '../assets/images/projects-mock/polyvox_MockUp.png';
import polyvoxImgSmall from '../assets/images/projects-mock/polyvox_MockUp_small.png';
import oldportfolio from '../assets/images/projects-mock/moysiadis.dev_.png';

import { DownloadButton } from "./DownloadButton";
import Magnet from "./react-bits/scroll-velocity/Magnet";

const TimelineType = {
  work: "work",
  education: "education",
  member: "member",
  project: "project",

}

const projectImages = {
  opensource: opensourceImg,
  opensourceSmall: opensourceImgSmall,
  polyvox: polyvoxImg,
  polyvoxSmall: polyvoxImgSmall,
  oldportfolio: oldportfolio,
};

const timelineDates = [
  {
    from: "Sept 2025",
    to: "Dec 2025",
    title: "Full-Stack Developer Intern at Metatopia",
    short_description: "Developing full-stack web applications using React, Next.js, and NestJS.",
    description:
      "Developed backend with TypeScript (NestJS), PostgreSQL/PostGIS, and Prisma ORM. Built responsive UIs with React, Next.js, and MUI. Collaborated on API design and consumption using GraphQL and Dockerized workflows. Implemented background job processing with Bull and Redis, and automated testing with Jest. Used Git for version control in a collaborative environment.",
    type: TimelineType.work,
    skills: ["React.js", "Next.js", "NestJS", "TypeScript", "PostgreSQL", "GraphQL", "Docker", "Jest"]
  },
  {
    from: "Apr 2025",
    to: "July 2025",
    title: "Website Rebuild at Open Source UoM",
    short_description: "Redesigned and rebuilt the university team’s website using React and Sanity CMS.",
    description:
      "Independently redesigned and rebuilt the Open Source UoM website. Developed a responsive, user-friendly interface integrated with Sanity CMS for dynamic content management. Led the project from concept to deployment.",
    type: TimelineType.project,
    image: projectImages.opensource,
    mobile_image: projectImages.opensourceSmall,
    url: "https://open-source-redesign.vercel.app",
    github: "https://github.com/georgemois23/OpenSourceRedesign",
    skills: ["React.js", "Chakra UI", "Sanity CMS", "JavaScript"]
  },
  {
    from: "Feb 2025",
    to: "Present",
    title: "Development Team Member at Open Source UoM",
    description: "Contributing to open-source projects at University of Macedonia’s Open Source team, collaborate with team members on development, deployment, and project maintenance tasks.",
    type: TimelineType.member,
  },
  {
    from: "Nov 2024",
    to: "July 2025",
    title: "Full-Stack Project: Polyvox",
    short_description: "Building a message board app using React and NestJS.",
    description:
      "Developing a full-stack message board application (polyvox.moysiadis.dev) with React on the frontend and NestJS on the backend.",
    type: TimelineType.project,
    image: projectImages.polyvox,
    mobile_image: projectImages.polyvoxSmall,
    url: "https://polyvox.moysiadis.dev",
    github: "https://github.com/georgemois23/pamac",
    skills: ["React.js", "NestJS", "MUI"]
  },
  {
    from: "Mar 2024",
    to: "June 2024",
    title: "Web Development Portfolio Project",
    short_description: "Developed personal portfolio with HTML, CSS, and JavaScript.",
    description:
      "Built a personal web development portfolio (moysiadis.dev) showcasing projects and skills using HTML, CSS, and JavaScript.",
    type: TimelineType.project,
    image: projectImages.oldportfolio,
    url: "https://oldportfolio.moysiadis.dev/",
    github: "https://github.com/georgemois23/georgemois23.github.io",
    skills: ["HTML", "CSS", "JavaScript"]
  },
  {
    from: "Oct 2022",
    to: "Present",
    title: "B.Sc. in Applied Informatics at University of Macedonia",
    description: "Bachelor’s degree in Applied Informatics focusing on Computer Science.",
    type: TimelineType.education,
  },
];


const Timelines = () => {
  const sizes = useBreakpointValue({ base: "lg", md: "md", lg: "xl" }) || "sm"
  const textSizes = useBreakpointValue({ base: "md", md: "md", lg: "xl" }) || "sm"
  const timelineMaxW = useBreakpointValue({ base: "100%", md: "3xl", lg: "5xl" }) || "100%"
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setRefreshKey(prevKey => prevKey + 1); 
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  function handleGitHub() {
      window.open('https://github.com/georgemois23', '_blank');
    }
   

  return (
    <Stack
      gap={{ base: 6, md: 8 }}
      maxW={timelineMaxW}
      mx="auto"
      px={{ base: 3, sm: 4, md: 5 }}
      py={{ base: 4, md: 5 }}
      // border="1px solid"
      // borderColor="whiteAlpha.300"
      borderRadius="xl"
    >
      <Box>
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          color="brand.dark.text"
          fontWeight="700"
          mb={1}
          userSelect="none"
        >
          Timeline
        </Text>
        <Text
          fontSize={{ base: "sm", md: "md" }}
          color="brand.dark.text"
          opacity={0.85}
          userSelect="none"
        >
          Experience, projects, and milestones.
        </Text>
      </Box>

      <Timeline.Root size={sizes} variant="outline">
        
        <For each={timelineDates}>
          {(item, index) => (
            <Timeline.Item key={item.title}  >
              <Timeline.Connector>
                <Timeline.Separator />
                <Timeline.Indicator rounded="full" color={"brand.dark.text"} 
                bg={"rgba(42, 28, 74, 1)"} > 
                  {item.type === TimelineType.work &&<LuBriefcaseBusiness />} 
                  {item.type === TimelineType.education && <LuGraduationCap />}
                  {item.type === TimelineType.member && <LuUsers />}
                  {item.type === TimelineType.project && <LuCodeXml />}
                </Timeline.Indicator>
              </Timeline.Connector>
              
              <Timeline.Content
                width="full"
                mb={{ base: 5, md: 8 }}
                // bg="rgba(145, 109, 232, 0.18)"
                bg="rgba(42, 28, 74, 0.72)"

                border="1px solid"
                borderColor="rgba(145, 109, 232, 0.35)"
                p={{ base: 3.5, md: 5 }}
                borderRadius="lg"
                transition="transform 0.2s ease, border-color 0.2s ease"
                _hover={{
                  transform: "translateY(-2px)",
                  borderColor: "rgba(145, 109, 232, 0.6)",
                }}
              >
                {/* Date Range */}
                <Text
                  display={{ base: "block", md: "inline-block" }}
                  textStyle="xs"
                  // color="brand.dark.secondary"
                  color="rgba(235, 225, 255, 0.98)"
                  fontWeight="semibold"
                  mb="2"
                  px={2}
                  py={1}
                  borderRadius="md"
                  // bg="rgba(145, 109, 232, 0.15)"
                  bg="rgba(145, 109, 232, 0.34)"
                  // w={{ base: "full", md: "auto" }}
                  w={ "fit-content" }
                  // maxW={{ base: "none", md: "fit-content" }}
                  maxW={ "fit-content" }
                  whiteSpace="nowrap"
                  textAlign={{ base: "left", md: "left" }}
                  border="1px solid"
                  borderColor="rgba(186, 154, 255, 0.8)"
                >
                  {item.from} — {item.to}
                </Text>

                {/* Job Title */}
                <Timeline.Title textStyle={textSizes} fontWeight="bold" color="brand.dark.text" lineHeight="1.35">
                  {item.title}
                </Timeline.Title>

                {/* Description */}
                <Timeline.Description textStyle={{ base: "xs", md: "sm" }} color="brand.dark.text" opacity={0.88} mt="2">
                  <Stack spacing={2}>
                  {item.short_description ? item.short_description : item.description}
                   {item.short_description && 
                    <Button 
                    size="xs" 
                    variant="ghost" 
                    color="brand.dark.secondary" 
                    _hover={{ bg: "transparent", color: "brand.dark.text"}}
                    rightIcon={<LuArrowRight />}
                    w={'fit-content'}
                    fontWeight="bold"
                    px={0} // Optional: aligns strictly left if you want it flush
                    justifyContent="flex-start" // Ensures text aligns left
                    onClick={() => handleOpenDialog(item)}
                  >
                    Read more
                  </Button>
                    }
                  </Stack>
                </Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
          )}
        </For>

      </Timeline.Root>
      <PortfolioMoreDialog 
        key={refreshKey} 
        open={isOpen} 
        onOpenChange={handleCloseDialog} 
        data={selectedItem} 
      />
      <Box marginInline={'auto'} mb={2}>
    <Magnet padding={50} disabled={false} magnetStrength={8}>
      <p
        style={{ userSelect: "none", textAlign: "center", fontSize: "0.95rem" }}
        onClick={handleGitHub}
      >
        View all projects on <span style={{cursor:'pointer'}}>GitHub!</span>
      </p>
    </Magnet>
  </Box>
    <DownloadButton />

    </Stack>
  )
}

export default Timelines