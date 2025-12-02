import { Box, Flex, Text, Button, Icon, Center, VStack, Link, HStack } from "@chakra-ui/react";
import '../App.css';
import { useLocation, useNavigate } from "react-router-dom";
// 1. Remove deprecated @chakra-ui/icons
// import { ArrowForwardIcon, ArrowDownIcon ,InfoOutlineIcon} from "@chakra-ui/icons";
// 2. Add React Icons replacements
import { FaArrowDown, FaArrowRight } from "react-icons/fa"; 

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

export default function HomePage() {
  document.title = "Moysiadis George | Full-Stack Developer Portfolio";
  const navigate = useNavigate();
  const aboutSectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);
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

  const texts = [
    { content: "FULL-STACK", color: undefined },
    { content: "DEVELOPER", color: undefined },
  ];

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
    <Flex justify="start"  direction={"column"} pt={{ base: '15vh', lg: '10vh' }} height="fit-content" align={'center'}  >


<Box textAlign="center" fontWeight="800" lineHeight="0.9" fontFamily="Arial" 
mt="10vh"  
display="flex" justifyContent="center" flexDirection="column" >

<Flex ref={topRef} direction="column" mb={10} pt={12}>
  {texts.map((text, index) => (
      <Text
        fontSize={{ base: "4xl", xxs: "4xl", sm: "6xl", md: "7xl", lg: "7xl" }}
        color={text.color}
        display="inline-block"
        userSelect="none"
      >
        {text.content}
      </Text>
  ))}
  
  
    <Flex gap={6} justify="center" align="center" pt={12}>
      {socialLinks.map((link) => (
    <Link
      key={link.name}
      href={link.url}
      isExternal
      _hover={{ opacity: 0.8 }}
    >
      <Icon as={link.icon} boxSize={12} color={'brand.dark.text'} /> {/* Big icon */}
    </Link>
  ))}
</Flex>
                

  <Box mt={'25vh'}>
   <ScrollReveal
  baseOpacity={0}
  enableBlur={true}
  baseRotation={0}
  blurStrength={8}
  fontWeight={800}
  fontSize={{ base: "2xl", xxs: "2xl", sm: "2xl", md: "4xl", lg: "7xl" }}
>
    Hi! I'm Moysiadis George, a Full-Stack Developer with hands-on experience in modern web technologies. I build scalable applications using React, Next.js, and TypeScript.
</ScrollReveal>

  </Box>
</Flex>
     
   
</Box>


 <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />

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

      
        <Readme />
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