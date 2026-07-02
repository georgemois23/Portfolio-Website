import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function getScrollContainer() {
  return document.getElementById("app-scroll-container") || window;
}

function getVisibleRatio(el, scroller) {
  const elRect = el.getBoundingClientRect();
  const viewportHeight =
    scroller === window ? window.innerHeight : scroller.clientHeight;
  const scrollerRect =
    scroller === window
      ? { top: 0, bottom: viewportHeight }
      : scroller.getBoundingClientRect();

  const visibleTop = Math.max(elRect.top, scrollerRect.top);
  const visibleBottom = Math.min(elRect.bottom, scrollerRect.bottom);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);

  return visibleHeight / viewportHeight;
}

export default function Layout() {
  const location = useLocation();
  const isJourneyPage = location.pathname === "/journey";
  const isHomePage = location.pathname === "/";
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isInHomeHero, setIsInHomeHero] = useState(isHomePage);
  const footerRef = useRef(null);

  useEffect(() => {
    const scroller = getScrollContainer();

    const updateHeaderZones = () => {
      if (isHomePage) {
        const stickyHero = document.getElementById("home-hero-sticky");
        if (stickyHero) {
          setIsInHomeHero(getVisibleRatio(stickyHero, scroller) > 0.35);
        } else {
          const heroEl = document.getElementById("home-hero-scroll");
          if (heroEl) {
            setIsInHomeHero(getVisibleRatio(heroEl, scroller) > 0.35);
          } else {
            const scrollTop =
              scroller === window ? window.scrollY : scroller.scrollTop;
            const viewportHeight =
              scroller === window ? window.innerHeight : scroller.clientHeight;
            setIsInHomeHero(scrollTop < viewportHeight * 0.9);
          }
        }
      } else {
        setIsInHomeHero(false);
      }

      const footerEl = footerRef.current;
      if (footerEl) {
        setIsFooterVisible(getVisibleRatio(footerEl, scroller) > 0.12);
      } else {
        setIsFooterVisible(false);
      }
    };

    updateHeaderZones();
    const timers = [0, 100, 300].map((ms) => setTimeout(updateHeaderZones, ms));

    scroller.addEventListener("scroll", updateHeaderZones, { passive: true });
    window.addEventListener("resize", updateHeaderZones);

    return () => {
      timers.forEach(clearTimeout);
      scroller.removeEventListener("scroll", updateHeaderZones);
      window.removeEventListener("resize", updateHeaderZones);
    };
  }, [location.pathname, isHomePage]);

  // Hide fixed header while hero or footer is in view
  const hideHeader = (isHomePage && isInHomeHero) || isFooterVisible;

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {isJourneyPage || isHomePage ? (
        <Box flex="1">
          <Outlet />
        </Box>
      ) : (
        <>
          <Box
            position="fixed"
            top="0"
            width="100%"
            zIndex="999"
            opacity={hideHeader ? 0 : 1}
            visibility={hideHeader ? "hidden" : "visible"}
            pointerEvents={hideHeader ? "none" : "auto"}
            transition="opacity 0.4s ease-in-out, visibility 0.4s ease-in-out"
          >
            <Header />
          </Box>

          <Box flex="1">
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
