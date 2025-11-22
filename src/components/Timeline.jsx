import { Badge, Button, Dialog, For, Span, Stack, Text, Timeline, useBreakpointValue } from "@chakra-ui/react"
import { LuCheck, LuBriefcase, LuBriefcaseBusiness, LuGraduationCap, LuInfo, LuExternalLink, LuPersonStanding, LuUsers, LuCodeXml,  } from "react-icons/lu"
import PortfolioMoreDialog from "./PortfolioMoreDialog";
import { useState } from "react";
import opensourceImg from '../assets/images/projects-mock/opensource_MockUp.png';
import opensourceImgSmall from '../assets/images/projects-mock/opensource_MockUp_small.png';
import polyvoxImg from '../assets/images/projects-mock/polyvox_MockUp.png';
import polyvoxImgSmall from '../assets/images/projects-mock/polyvox_MockUp_small.png';

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
};

const timelineDates = [
  {
    from: "Sept 2025",
    to: "Dec 2025 (Expected)",
    title: "Full-Stack Developer Intern at Metatopia",
    short_description: "Developing full-stack web applications using React, Next.js, and NestJS.",
    description:
      "Developed backend with TypeScript (NestJS), PostgreSQL/PostGIS, and Prisma ORM. Built responsive UIs with React, Next.js, and MUI. Collaborated on API design and consumption using GraphQL and Dockerized workflows. Implemented background job processing with Bull and Redis, and automated testing with Jest. Used Git for version control in a collaborative environment.",
    type: TimelineType.work,
  },
  {
    from: "Apr 2025",
    to: "July 2025",
    title: "Website Rebuild Lead at Open Source UoM",
    short_description: "Redesigned and rebuilt the university team’s website using React and Sanity CMS.",
    description:
      "Independently redesigned and rebuilt the Open Source UoM website. Developed a responsive, user-friendly interface integrated with Sanity CMS for dynamic content management. Led the project from concept to deployment.",
    type: TimelineType.project,
    image: projectImages.opensource,
    mobile_image: projectImages.opensourceSmall,
    url: "https://open-source-redesign.vercel.app",
    github: "https://github.com/georgemois23/OpenSourceRedesign"
  },
  {
    from: "Feb 2025",
    to: "Present",
    title: "Development Team Member at Open Source UoM",
    short_description: "Contributing to open-source projects at University of Macedonia’s Open Source team.",
    description:
      "Active member contributing to various open-source projects. Collaborate with team members on development, deployment, and project maintenance tasks.",
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
  },
  {
    from: "Mar 2024",
    to: "June 2024",
    title: "Web Development Portfolio Project",
    short_description: "Developed personal portfolio with HTML, CSS, and JavaScript.",
    description:
      "Built a personal web development portfolio (moysiadis.dev) showcasing projects and skills using HTML, CSS, and JavaScript.",
    type: TimelineType.project,
    url: "https://moysiadis.dev",
    github: "https://github.com/georgemois23/georgemois23.github.io",
  },
  {
    from: "Oct 2022",
    to: "Present",
    title: "B.Sc. in Applied Informatics at University of Macedonia",
    short_description: "Bachelor’s degree in Applied Informatics focusing on Computer Science.",
    description:
      "Pursuing B.Sc. in Applied Informatics at University of Macedonia, specializing in Computer Science, software development, data structures, and algorithms.",
    type: TimelineType.education,
  },
];


const Timelines = () => {
  // Handle responsive sizes
  const sizes = useBreakpointValue({ base: "lg", md: "md", lg: "xl" }) || "sm"
  const textSizes = useBreakpointValue({ base: "md", md: "md", lg: "xl" }) || "sm"
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

  return (
    <Stack gap="8" maxW="2xl" mx="auto" p={5}>
      <Timeline.Root size={sizes}>
        
        <For each={timelineDates}>
          {(item, index) => (
            <Timeline.Item key={item.title} >
              <Timeline.Connector>
                <Timeline.Separator />
                <Timeline.Indicator rounded="full" color={"brand.dark.text"} bg={"brand.dark.secondary"} > 
                  {item.type === TimelineType.work &&<LuBriefcaseBusiness />} 
                  {item.type === TimelineType.education && <LuGraduationCap />}
                  {item.type === TimelineType.member && <LuUsers />}
                  {item.type === TimelineType.project && <LuCodeXml />}
                </Timeline.Indicator>
              </Timeline.Connector>
              
              <Timeline.Content width="full" mb="8" bg={'rgba(145, 109, 232, 0.2)'} p={5} borderRadius="lg">
                {/* Date Range */}
                <Text textStyle="xs" color="brand.dark.secondary" fontWeight="semibold" mb="1">
                  {item.from} — {item.to}
                </Text>

                {/* Job Title */}
                <Timeline.Title textStyle={textSizes} fontWeight="bold">
                  {item.title}
                </Timeline.Title>

                {/* Description */}
                <Timeline.Description textStyle="sm" color="fg.subtle" mt="1">
                  <Stack spacing={2}>
                  {item.short_description ? item.short_description : item.description}
                   {item.short_description && 
                    <Button w={'fit-content'} bgColor={'brand.dark.background'} color={'brand.dark.text'} borderRadius={8} onClick={()=>{handleOpenDialog(item)}}>
                      Show more
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
    </Stack>
  )
}

export default Timelines