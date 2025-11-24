import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Layout() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.8 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {/* HEADER BOX */}
      <Box 
        // REMOVED: display={isFooterVisible ? "none" : "block"} 
        position="fixed" 
        top="0" 
        width="100%" 
        zIndex="999"
        // Transition props
        opacity={isFooterVisible ? 0 : 1}
        pointerEvents={isFooterVisible ? "none" : "auto"} 
        transition="opacity 0.4s ease-in-out"
      >
        <Header />
      </Box>

      <Box mt="80px" flex="1">
        <Outlet />
      </Box>

      <div ref={footerRef}>
        <Footer />
      </div>
    </Box>
  );
}