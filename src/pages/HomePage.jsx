import { Box, Flex, Text, Button, Icon, Center, VStack } from "@chakra-ui/react";
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

import { motion, AnimatePresence } from "framer-motion";
import logo from '../Moysiadis.png' 

import Contact from './Contact';
import Skills from "../components/Skills";
import Portrait from '../components/Portrait'
import Arrow from '../components/Arrow';

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
  readme: -70,
  projects: -200,
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


<Box textAlign="center" fontWeight="800" lineHeight="0.9" fontFamily="Arial" mt="10vh"  display="flex" justifyContent="center" flexDirection="column" >

      <Flex ref={topRef} direction="column" mb={10} pt={4}>
    <AnimatePresence>
      {texts.map((text, index) => (
        <Text
          key={index}
          fontSize={{base: "5xl",xxs:'3xl',sm: "6xl", md: "7xl", lg: "9xl" }}
          color={text.color}
          display="inline-block"
          userSelect={'none'}
        >
          {text.content.split(" ").map((word, wordIndex) => {
            const Component = shouldAnimate ? MotionSpan : "span";
            const props = shouldAnimate
              ? {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: {
                    duration: 0.5,
                    delay: index * 0.3 + wordIndex * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }
              : {};

            return (
              <Component
                key={wordIndex}
                {...props}
                style={{
                  display: "inline-block",
                  marginRight: "0.25em",
                  whiteSpace: "wrap",
                  userSelect: 'none'
                }}
              >
                {word}
              </Component>
            );
          })}
        </Text>
      ))}
    </AnimatePresence>
    </Flex>
   
</Box>

 <Flex
  direction={{ base: "column", lg: "row" }}
  justify="center"
  align="center"
  gap={{ base: 0, md: 4, lg: 6 }}
  mt={10}
>
  {/* Text + Arrow wrapper */}
  <Flex
    direction={{ base: "column", lg: "row" }}
    align="center"
    gap={{ base: 1, lg: 2 }} // closer on small screens
    mb={{ base: 1, lg: 0 }}
  >
    <Text
      color="brand.dark.secondary"
      fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
      fontWeight="thin"
      textTransform="uppercase"
      userSelect="none"
    >
      Moysiadis George
    </Text>

    <Box
      transform={{ base: "rotate(270deg)", lg: "rotate(180deg)" }}
      transition="transform 0.3s"
    >
      <Arrow color="#916de8" />
    </Box>
  </Flex>

  {/* Portrait */}
  <Portrait
    height={{ base: 140, md: height }}
    width={{ base: 140, md: width }}
  />
</Flex>





    <Flex direction='column'  justify="center" align="center" gap={{ base: 1, lg: 0.5 }} mt={{ base: '7vw', lg: '6vh' }} mb={10}>
  
  
  
 <Text
  cursor="pointer"
  fontSize={{ base: 'md', lg: 'xl' }}
  textAlign="center"
  css={{ transition: "all 0.3s ease-in-out" }}
  opacity={isVisible ? 0 : 1} 
  pointerEvents={isVisible ? 'none' : 'auto'} 
  onClick={() => {
    setIsVisible(true); 
    scrollTo(homeRef, window.innerWidth < 768 ? -100 : -50);
  }}
  userSelect={'none'}
  mt={{ base: '30vh', lg: '12vh' }}
  display="flex"
  alignItems="center"
  gap={2}
>
  Scroll 
  <Icon as={FaArrowDown} />
</Text>

 {/* {isVisible && (
  <MotionSpan
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    onAnimationComplete={() => setShouldRender(false)}
  >
    <Text
      cursor="auto"
      fontSize={{base: "3xl",sm: "4xl", md: "5xl", lg: "8xl" }}
      textTransform={'uppercase'}
      textAlign="center"
      userSelect={'none'}
      fontWeight={800}
      whiteSpace= "wrap"
      display={'inline-block'}
      w={'40vw'}
      lineHeight={0.7}
      >
        Moysiadis George
      </Text>
  </MotionSpan>
)
  } */}


  <Flex
  // ref={aboutSectionRef}
  ref={homeRef}
  direction="column"
  mb={10}
  marginInline="auto"
  gap={2}
  width="100vw"
  pt={{ base: '22vh', lg: '25vh' }}
  py={8}
  px={{ sm: 8, lg: 8 }}
  bgSize="cover"
  bgPosition="center"
  bgRepeat="space"
  mt={{ base: '25vw', lg: '12vh' }}
  transform="translateY(-2px)"
>

      
        <Readme />
        <Skills/>
     
      </Flex>
      </Flex>
      <Flex ref={projectsRef} direction="column" mb={10}>
  <Timelines />
</Flex>
    

    <Logo height={height} width={width}/>
   
    <Flex ref={contactRef} direction="column" mb={10}>
  <Contact />
</Flex>

    </Flex>

    );
  }