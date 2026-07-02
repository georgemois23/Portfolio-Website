import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  Center,
  VStack,
  Link,
  HStack,
} from "@chakra-ui/react";
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
import NewTimeline from "../components/NewTimeline";

import { FiUsers } from "react-icons/fi";
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import logo from '../Moysiadis.png' 

import Contact from './Contact';
import Skills from "../components/Skills";
import QAAccordion from "../components/QAAccordion";
import Portrait from '../components/Portrait'
import Arrow from '../components/Arrow';
import ScrollReveal from "../components/react-bits/scrollText/ScrollText";
import Lanyard from "../components/react-bits/card/Lanyard";
import Magnet from "../components/react-bits/scroll-velocity/Magnet";
import GlitchText from "../components/react-bits/glitch-text/GlitchText";
import Timelines from "../components/Timeline";
import HeroBackground from "../components/HeroBackground";

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
  const heroScrollRef = useRef(null);
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
  const MotionFlex = motion(Flex);

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroScrollRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 1.18]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.55, 1], [1, 1, 0]);
  const heroBlur = useTransform(heroScrollProgress, [0.5, 1], [0, 6]);
  const heroFilter = useTransform(heroBlur, (v) => `blur(${v}px)`);

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

  function scrollPastHero() {
    if (!heroScrollRef.current) {
      scrollTo(homeRef, -80);
      return;
    }
    const el = heroScrollRef.current;
    const y = el.offsetTop + el.offsetHeight - window.innerHeight + 2;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  
    return(
    <Flex justify="start"  direction={"column"} 
    pt={{ base: 0, lg: '10vh' }} 
    height="fit-content" align={'center'}  >


<Box
  ref={heroScrollRef}
  id="home-hero-scroll"
  textAlign="center"
  px={{ base: 4, md: 6 }}
  width="100%"
  h={{ base: "calc(100svh + 14vh)", md: "calc(100vh + 18vh)", lg: "calc(100vh + 20vh)" }}
  position="relative"
>
  <Box
    id="home-hero-sticky"
    position="sticky"
    top={0}
    h={{ base: "100svh", md: "100vh" }}
    overflow="hidden"
    zIndex={1}
  >
  <HeroBackground />
  <MotionFlex
    ref={topRef}
    direction="column"
    align="center"
    justify="center"
    h="100%"
    position="relative"
    zIndex={1}
    // borderTop="1px solid"
    borderBottom="1px solid"
    borderColor="whiteAlpha.200"
    py={{ base: 8, md: 12, lg: 14 }}
    style={{
      scale: heroScale,
      opacity: heroOpacity,
      filter: heroFilter,
    }}
  >
    <MotionBox
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
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
    </MotionBox>

    <Flex direction="column" gap={{ base: 1.5, sm: 0 }} align="center">
      <MotionBox
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      >
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
      </MotionBox>
      <MotionBox
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
      >
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
      </MotionBox>
    </Flex>

    <MotionBox
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
    >
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
    </MotionBox>

    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      pt={{ base: 7, md: 10, lg: 12 }}
      cursor="pointer"
      onClick={scrollPastHero}
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
    </MotionBox>

    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
    >
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
    </MotionBox>
  </MotionFlex>
  </Box>
</Box>


 {/* <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} /> */}

  <Flex
  ref={homeRef}
  direction="column"
  position="relative"
  zIndex={2}
  marginInline="auto"
  gap={2}
  width="100vw"
  mt={{ base: "-14vh", md: "-18vh", lg: "-20vh" }}
  py={8}
  px={{ sm: 8, lg: 8 }}
  bgSize="cover"
  bgPosition="center"
  bgRepeat="space"
  // mt={{ base: '25vw', lg: '12vh' }}
  transform="translateY(-2px)"
>

      <Box mt={10}>
        <Readme />
      </Box>
      <Skills />
     
      </Flex>
      {/* </Flex> */}
      <Flex ref={projectsRef} direction="column" mb={10}>
  <Timelines />
</Flex>

      <QAAccordion />
    

    {/* <Logo height={height} width={width}/> */}
  
   
    <Flex ref={contactRef} direction="column" mb={10}>
  <Contact />
</Flex>

    </Flex>

    );
  }