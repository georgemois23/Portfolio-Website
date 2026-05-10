import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Layout() {
  const location = useLocation();
  const isJourneyPage = location.pathname === "/journey";
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isInTimelineExperience, setIsInTimelineExperience] = useState(false);
  const [isInHomeHero, setIsInHomeHero] = useState(() => {
    if (typeof window === "undefined") return false;
    const isHomePage = window.location.pathname === "/";
    const heroThreshold = window.innerHeight * 0.72;
    return isHomePage && window.scrollY < heroThreshold;
  });
  const footerRef = useRef(null);
  const getScrollContainer = () =>
    document.getElementById("app-scroll-container") || window;

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
    const scroller = getScrollContainer();

    const updateHeroVisibility = () => {
      if (!isHomePage) {
        setIsInHomeHero(false);
        return;
      }

      const viewportHeight =
        scroller === window ? window.innerHeight : scroller.clientHeight;
      const scrollTop = scroller === window ? window.scrollY : scroller.scrollTop;
      const heroThreshold = viewportHeight * 0.72;
      setIsInHomeHero(scrollTop < heroThreshold);
    };

    updateHeroVisibility();
    scroller.addEventListener("scroll", updateHeroVisibility, { passive: true });
    window.addEventListener("resize", updateHeroVisibility);

    return () => {
      scroller.removeEventListener("scroll", updateHeroVisibility);
      window.removeEventListener("resize", updateHeroVisibility);
    };
  }, [location.pathname]);

  useEffect(() => {
    const scroller = getScrollContainer();
    const updateTimelineVisibility = () => {
      const timelineEl = document.getElementById("new-timeline-experience");
      if (!timelineEl) {
        setIsInTimelineExperience(false);
        return;
      }

      const rect = timelineEl.getBoundingClientRect();
      const viewportHeight =
        scroller === window ? window.innerHeight : scroller.clientHeight;
      const isVisible = rect.top < viewportHeight * 0.8 && rect.bottom > viewportHeight * 0.2;
      setIsInTimelineExperience(isVisible);
    };

    updateTimelineVisibility();
    scroller.addEventListener("scroll", updateTimelineVisibility, { passive: true });
    window.addEventListener("resize", updateTimelineVisibility);

    return () => {
      scroller.removeEventListener("scroll", updateTimelineVisibility);
      window.removeEventListener("resize", updateTimelineVisibility);
    };
  }, [location.pathname]);

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {isJourneyPage ? (
        <Box flex="1">
          <Outlet />
        </Box>
      ) : (
        <>
      {/* HEADER BOX */}
      <Box 
        // REMOVED: display={isFooterVisible ? "none" : "block"} 
        position="fixed" 
        top="0" 
        width="100%" 
        zIndex="999"
        // Transition props
        opacity={
          location.pathname === "/" && (isInHomeHero || isInTimelineExperience)
            ? 0
            : 1
        }
        pointerEvents={
          location.pathname === "/" && (isInHomeHero || isInTimelineExperience)
            ? "none"
            : "auto"
        }
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
        </>
      )}
    </Box>
  );
}