import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Layout() {
  const location = useLocation();
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isInHomeHero, setIsInHomeHero] = useState(() => {
    if (typeof window === "undefined") return false;
    const isHomePage = window.location.pathname === "/";
    const heroThreshold = window.innerHeight * 0.72;
    return isHomePage && window.scrollY < heroThreshold;
  });
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

  useEffect(() => {
    const isHomePage = location.pathname === "/";

    const updateHeroVisibility = () => {
      if (!isHomePage) {
        setIsInHomeHero(false);
        return;
      }

      const heroThreshold = window.innerHeight * 0.72;
      setIsInHomeHero(window.scrollY < heroThreshold);
    };

    updateHeroVisibility();
    window.addEventListener("scroll", updateHeroVisibility, { passive: true });
    window.addEventListener("resize", updateHeroVisibility);

    return () => {
      window.removeEventListener("scroll", updateHeroVisibility);
      window.removeEventListener("resize", updateHeroVisibility);
    };
  }, [location.pathname]);

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
        opacity={isFooterVisible || isInHomeHero ? 0 : 1}
        pointerEvents={isFooterVisible || isInHomeHero ? "none" : "auto"} 
        transition="opacity 0.4s ease-in-out"
      >
        <Header />
      </Box>

      <Box 
      // mt="80px" 
      flex="1">
        <Outlet />
      </Box>

      <div ref={footerRef}>
        <Footer />
      </div>
    </Box>
  );
}