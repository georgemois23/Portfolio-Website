import {Box,Flex,Text,Button,Icon,Tooltip,Image, Center, VStack}  from "@chakra-ui/react";
import '../App.css';
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon, ArrowDownIcon ,InfoOutlineIcon} from "@chakra-ui/icons";
import { useRef,useState,useEffect } from "react";
import { Wrap, WrapItem } from '@chakra-ui/react';
import { ToolTipUnderConstruction } from "../components/ToolTipUnderConstruction";

import { FiUsers } from "react-icons/fi";

import { motion, AnimatePresence } from "framer-motion";
import logo from '../Moysiadis.png'

import Contact from './Contact';

export default function HomePage() {
  document.title = "Moysiadis George | Full-Stack Developer Portfolio";
  const navigate = useNavigate();
  const aboutSectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const aboutRef = useRef(null);  
  
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

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current);
    }

    return () => {
      if (aboutSectionRef.current) {
        observer.unobserve(aboutSectionRef.current);
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
    { content: "MOYSIADIS", color: undefined },
    { content: "GEORGE", color: undefined },
    // { content: "DEVELOPER", color: "gray.500" }
  ];

  useEffect(() => {
    const animationPlayed = sessionStorage.getItem('textAnimationPlayed');
    if (!animationPlayed) {
      setShouldAnimate(true);
      sessionStorage.setItem('textAnimationPlayed', 'true');
    }
  }, []);



  
  function scrollToRef() {
    const yOffset = -150; 
    const y = aboutSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
 
    return(
    <Flex justify="start"  direction={"column"} pt={{ base: '3vh', lg: 15 }} height="fit-content" align={'center'}  >


<Box textAlign="center" fontWeight="800" lineHeight="0.9" fontFamily="Arial" mt="10vh"  display="flex" justifyContent="center" flexDirection="column" >
  {/* <Text fontSize={{ sm:'5xl',md: '6xl', lg: '9xl' }}>
    OPEN SOURCE
  </Text>
  <Text fontSize={{ sm:'5xl',md: '6xl', lg: '9xl' }} color="gray.600">
    UOM COMMUNITY
  </Text> */}
 
    <AnimatePresence>
      {texts.map((text, index) => (
        <Text
          key={index}
          fontSize={{ sm: "5xl", md: "6xl", lg: "9xl" }}
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
</Box>


    <Flex direction='column'  justify="center" align="center" gap={{ base: 1, lg: 0.5 }} mt={{ base: '7vw', lg: '6vh' }} mb={10}>
  
  
  
  <Text
  cursor="pointer"
  // onClick={scrollToRef}
  fontSize={{ base: 'md', lg: 'xl' }}
  textAlign="center"
  sx={{ transition: "all 0.3s ease-in-out" }}
  opacity={isVisible ? 0 : 1} 
  pointerEvents={isVisible ? 'none' : 'auto'} 
  onClick={()=> { setIsVisible(true); scrollToRef(); }}
  userSelect={'none'}
  mt={{ base: '30vh', lg: '5vh' }}
>
  Scroll <ArrowDownIcon />
</Text>

{/* 
    <Flex ref={aboutSectionRef}   
    direction='column'  
     mb={10} 
     marginInline={'auto'} 
     gap={2}   
    //  width={{base: '90vw', lg:'70vw'}}  
    width="100vw" 
    py={{ base: '12vh', lg: '15vh' }}
    // py={8}
    //  padding={4}
    px={{sm:4,lg: 8}}
    //  borderRadius={8}  
    boxShadow="0 2px 6px rgba(0, 0, 0, 0.4), 0 12px 32px rgba(0, 0, 0, 0.2)"

    bg="rgba(0, 12, 45, 0.98)" 
    // bgImage={backgroundImage}
    bgSize="cover"
    bgPosition="center"
    bgRepeat={"space"}

    // backdropFilter="blur(14px)"
    // borderBlock="1px solid rgba(0, 46, 102, 0.9)" 
    // border="1px solid rgba(0, 46, 102, 0.9)" 
  mt={{ base: '25vw', lg: '12vh' }}
  transform="translateY(-2px)" 
  > */}
  <Flex
  ref={aboutSectionRef}
  direction="column"
  mb={10}
  marginInline="auto"
  gap={2}
  width="100vw"
  pt={{ base: '22vh', lg: '25vh' }}
  py={8}
  px={{ sm: 4, lg: 8 }}
  // boxShadow="0 2px 6px rgba(0, 0, 0, 0.4), 0 12px 32px rgba(0, 0, 0, 0.2)"
  // bg="rgba(0, 12, 45, 0.98)" // same as current
  bgSize="cover"
  bgPosition="center"
  bgRepeat="space"
  mt={{ base: '25vw', lg: '12vh' }}
  transform="translateY(-2px)"
  // borderTopLeftRadius={{ base: "40% 00%", lg: "0% 50%" }}
  // borderTopRightRadius={{ base: "40% 10%", lg: "120% 50%" }}
>


      <Text fontSize={{ base: 'lg', lg: '4xl' }} fontWeight={800}  textAlign="center" mb={{sm:2,md:4}}>Hello</Text>
    <Box  as='p' textAlign="start" lineHeight="1.1" fontSize={{ base: 'sm', lg: '2xl' }}  fontFamily="Arial" px={{sm:0,md:8}} width={{base: '95%', lg:'70vw'}}  marginInline={'auto'} > 
  My name is George Moysiadis, I am from Greece and I am a  student of Computer Science.
I have completed a comprehensive course in web development, where I honed my skills in HTML, CSS, and JavaScript. This foundational knowledge has empowered me to bring creative ideas to life on the web. Currently, I'm expanding my expertise by diving into various frameworks, staying updated with the latest trends and technologies in the industry.
One of my ongoing projects is constantly improving this personal website. As I work on enhancing it, I’m continuously learning new technologies and discovering more about web development. This process fuels my passion for the field even more.
  </Box>
    

    

    <Button  marginInline={'auto'} onClick={() => navigate('/readme')} display="flex" size={{ base: 'sm', md: 'md' }}
        alignItems="center" width={{ base: 'fit-content', lg: 'fit-content' }} wordBreak={'break-word'}
        gap={2} fontSize={{ base: 'sm', lg: 'md' }} mt={4}>
          Learn more
          <ArrowForwardIcon style={{ fontSize: '28px', marginLeft: '2px' }} /> 
          </Button>
 </Flex>
    </Flex>

     


    <Image draggable="false" src={logo} alt="Moysiadis logo" width={{ base: '550px', lg: '550px' }} height='auto' />

    <Contact /> 

    </Flex>

    );
  }
   