import { Box, Flex, Text, Button, Icon, Center, VStack, Link, HStack } from "@chakra-ui/react";
import '../App.css';
import { useLocation, useNavigate } from "react-router-dom";
// 1. Remove deprecated @chakra-ui/icons
// import { ArrowForwardIcon, ArrowDownIcon ,InfoOutlineIcon} from "@chakra-ui/icons";
// 2. Add React Icons replacements
import { FaArrowDown, FaAngleDoubleDown, FaArrowRight } from "react-icons/fa"; 

import { useRef, useState, useEffect } from "react";
// Wrap/WrapItem are removed in v3, using Flex wrap="wrap" is the replacement if needed. 
// Since they were unused in your render, I removed the import entirely.

import { ToolTipUnderConstruction } from "../components/ToolTipUnderConstruction";
import Readme from "../pages/ReadMe";
import Logo from '../assets/logo/Logo';
import Timelines from "../components/Timeline";

import { FiUsers } from "react-icons/fi";
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

import { motion, AnimatePresence } from "framer-motion";
import logo from '../Moysiadis.png' 

import Contact from './Contact';
import Skills from "../components/Skills";
import Portrait from '../components/Portrait'
import Arrow from '../components/Arrow';
import ScrollReveal from "../components/react-bits/scrollText/ScrollText";
import Lanyard from "../components/react-bits/card/Lanyard";
import Magnet from "../components/react-bits/scroll-velocity/Magnet";
import GlitchText from "../components/react-bits/glitch-text/GlitchText";

export default function HomePage() {
  document.title = "Moysiadis George | Full-Stack Developer Portfolio";
  const navigate = useNavigate();
  const aboutSectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isScrollExploreHovered, setIsScrollExploreHovered] = useState(false);
  const location = useLocation();
  const topRef = useRef(null);
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  

  const refs = {
    top: topRef,
    readme: homeRef,
    projects: projectsRef,
    contact: contactRef,
  };

  const offsets = {
  top: 0,
  readme: -125,
  projects: -150,
  contact: -100,
};

useEffect(() => {
  if (location.state?.scrollTo) {
    const section = location.state.scrollTo;
    const ref = refs[section];
    if (ref?.current) {
      const yOffset = offsets[section] ?? 0;
      const y =
        ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
}, [location.state]);

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], observerInstance) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerInstance.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (homeRef.current) {
      observer.observe(homeRef.current);
    }

    return () => {
      if (homeRef.current) {
        observer.unobserve(homeRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, 500);
  
      return () => clearTimeout(timeoutId);
    }
  }, [isVisible]);

  const MotionSpan = motion.span;
  const MotionBox = motion(Box);

  const intro = {
    label: "Moysiadis George",
    titleTop: "FULL-STACK",
    titleBottom: "DEVELOPER",
  };

  const socialLinks = [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/george-moysiadis', icon: FaLinkedin },
      { name: 'Github', url: 'https://github.com/georgemois23', icon: FaGithub },
    ];

  useEffect(() => {
    const animationPlayed = sessionStorage.getItem('textAnimationPlayed');
    if (!animationPlayed) {
      setShouldAnimate(true);
      sessionStorage.setItem('textAnimationPlayed', 'true');
    }
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 992; 
  const size = isMobile 
    ? Math.min(windowWidth * 0.7, 350) 
    : Math.min(windowWidth * 0.3, 500);
  const width = size;
  const height = size;

  function scrollToRef() {
    const yOffset = window.innerWidth < 768 ? -100 : -50;
    const y = aboutSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  function scrollTo(ref, offset = 0) {
  if (!ref?.current) return;
  const y = ref.current.getBoundingClientRect().top + window.pageYOffset + offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

  
    return(
    <Flex justify="start"  direction={"column"} 
    pt={{ base: 0, lg: '10vh' }} 
    height="fit-content" align={'center'}  >


<Box
  textAlign="center"
  // fontFamily="Arial"
  // mt={{ base: "4vh", md: "6vh", lg: "8vh" }}
  px={{ base: 4, md: 6 }}
  width="100%"
>
  <Flex
    ref={topRef}
    direction="column"
    align="center"
    justify="center"
    minH={{ base: "100svh", md: "74vh", lg: "82vh" }}
    borderTop="1px solid"
    borderBottom="1px solid"
    borderColor="whiteAlpha.200"
    py={{ base: 8, md: 12, lg: 14 }}
  >
    <Text
      fontSize={{ base: "xs", md: "sm" }}
      textTransform="uppercase"
      letterSpacing="0.25em"
      border="1px solid"
      borderColor="whiteAlpha.400"
      px={3}
      py={1}
      mb={{ base: 4, md: 7, lg: 8 }}
      color="brand.dark.text"
      opacity={0.9}
    >
      {intro.label}
    </Text>

    <Flex direction="column" gap={{ base: 1.5, sm: 0 }} align="center">
      <Text
        fontSize={{ base: "4xl", sm: "6xl", md: "7xl", lg: "9xl" }}
        fontWeight="900"
        lineHeight="0.88"
        textTransform="uppercase"
        letterSpacing={{ base: "0.01em", md: "0.02em" }}
        color="brand.dark.text"
        userSelect="none"
      >
        <GlitchText speed={1} enableShadows enableOnHover={false}>
          {intro.titleTop}
        </GlitchText>
      </Text>
      <Text
        fontSize={{ base: "4xl", sm: "6xl", md: "7xl", lg: "9xl" }}
        fontWeight="900"
        lineHeight="0.88"
        textTransform="uppercase"
        letterSpacing={{ base: "0.01em", md: "0.02em" }}
        color="brand.dark.text"
        userSelect="none"
      >
        <GlitchText speed={1} enableShadows enableOnHover={false}>
          {intro.titleBottom}
        </GlitchText>
      </Text>
    </Flex>

    <Text
      fontSize={{ base: "xs", md: "sm" }}
      fontWeight="600"
      textTransform="uppercase"
      letterSpacing="0.12em"
      maxW="900px"
      pt={{ base: 5, md: 7, lg: 8 }}
      color="brand.dark.text"
      opacity={0.85}
    >
      Creating fast and reliable digital experiences with thoughtful design and modern engineering.
    </Text>

    <Box
      pt={{ base: 7, md: 10, lg: 12 }}
      cursor="pointer"
      onClick={() => scrollTo(homeRef, -80)}
      onMouseEnter={() => setIsScrollExploreHovered(true)}
      onMouseLeave={() => setIsScrollExploreHovered(false)}
    >
      <Text
        fontSize={{ base: "2xs", md: "xs" }}
        textTransform="uppercase"
        letterSpacing="0.12em"
        color="brand.dark.text"
        opacity={0.55}
        userSelect="none"
      >
        Scroll to explore
      </Text>
      <MotionBox
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
      >
        <Flex direction="column" align="center" gap={0.5} mt={2}>
          <Icon
            as={FaAngleDoubleDown}
            color={isScrollExploreHovered ? "rgba(186, 132, 255, 0.95)" : "brand.dark.text"}
            opacity={0.72}
            boxSize={{ base: 3, md: 3.5 }}
            transition="color 0.2s ease"
          />
        </Flex>
      </MotionBox>
    </Box>

    <Flex gap={{ base: 4, md: 5 }} justify="center" align="center" pt={{ base: 6, md: 9, lg: 10 }}>
      {socialLinks.map((link) => (
        <Link
          key={link.name}
          href={link.url}
          isExternal
          _hover={{ opacity: 0.8 }}
          transition="opacity 0.2s ease"
        >
          <Icon as={link.icon} boxSize={{ base: 6, md: 7 }} _hover={{ color: "rgba(186, 132, 255, 0.95)", scale: 1.2, transition: "all 0.2s ease" }} color={"brand.dark.text"} />
        </Link>
      ))}
    </Flex>
  </Flex>
</Box>


 {/* <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} /> */}

  <Flex
  // ref={aboutSectionRef}
  ref={homeRef}
  direction="column"
  // mb={10}
  marginInline="auto"
  gap={2}
  width="100vw"
  // pt={{ base: '22vh', lg: '25vh' }}
  py={8}
  px={{ sm: 8, lg: 8 }}
  bgSize="cover"
  bgPosition="center"
  bgRepeat="space"
  // mt={{ base: '25vw', lg: '12vh' }}
  transform="translateY(-2px)"
>

      <Box mt={10} >
        <Readme />
      </Box>
        <Skills/>
     
      </Flex>
      {/* </Flex> */}
      <Flex ref={projectsRef} direction="column" mb={10}>
  <Timelines />
</Flex>
    

    {/* <Logo height={height} width={width}/> */}
  
   
    <Flex ref={contactRef} direction="column" mb={10}>
  <Contact />
</Flex>

    </Flex>

    );
  }