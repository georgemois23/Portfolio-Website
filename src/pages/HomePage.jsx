import { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { timelineDates } from "../components/Timeline";
import LoadingScreen from "../components/redesign/LoadingScreen";
import Navbar from "../components/redesign/Navbar";
import Hero from "../components/redesign/Hero";
import SelectedWorks from "../components/redesign/SelectedWorks";
import QASection from "../components/redesign/QASection";
import ExperienceSection from "../components/redesign/ExperienceSection";
import Explorations from "../components/redesign/Explorations";
import StatsSection from "../components/redesign/StatsSection";
import ContactFooter from "../components/redesign/ContactFooter";

gsap.registerPlugin(ScrollTrigger);

const HLS_STREAM_URL =
  // "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
  "https://stream.mux.com/01yW6GoUz01OTXk5w1Rt1MHkJWlCGIwj46SUONJZ4DJUE.m3u8";
const RESUME_URL = "/Moysiadis_George.pdf";

// ---- Existing data objects (source of truth) ----

const intro = {
  label: "Moysiadis George",
  titleTop: "FULL-STACK",
  titleBottom: "DEVELOPER",
};

const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/george-moysiadis", icon: FaLinkedin },
  { name: "Github", url: "https://github.com/georgemois23", icon: FaGithub },
];

// ---- Derivations from the existing data (presentation only) ----

const yearOf = (label) => {
  const match = String(label || "").match(/\d{4}/);
  return match ? Number(match[0]) : null;
};

const SPAN_PATTERN = [7, 5, 5, 7];

const projects = timelineDates
  .filter((item) => item.type === "project")
  .map((item, index) => ({
    id: item.url || item.github || item.title,
    title: item.title.includes(":")
      ? item.title.split(":").pop().trim()
      : item.title,
    category: (item.skills || []).slice(0, 2).join(" · ") || "Project",
    year: yearOf(item.to) || yearOf(item.from) || "",
    image: item.image,
    mobileImage: item.mobile_image,
    url: item.url || item.github,
    featured: true,
    span: SPAN_PATTERN[index % SPAN_PATTERN.length],
  }));

const toSentences = (text) =>
  String(text)
    .split(/\.\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.endsWith(".") ? s : `${s}.`));

const experience = timelineDates
  .filter((item) => item.type !== "project")
  .map((item) => {
    const [role, company] = item.title.split(" at ");
    return {
      id: item.title,
      role,
      company: company || "",
      start: item.from,
      end: item.to,
      summary: item.short_description || item.description,
      highlights:
        item.short_description && item.description
          ? toSentences(item.description)
          : [],
      stack: item.skills || [],
    };
  });

const startYear = Math.min(
  ...timelineDates.map((item) => yearOf(item.from)).filter(Boolean)
);
const yearsBuilding = Math.max(1, new Date().getFullYear() - startYear);
const techCount = new Set(timelineDates.flatMap((item) => item.skills || [])).size;

export const profile = {
  name: intro.label,
  location: "Thessaloniki, Greece",
  eyebrow: `${intro.titleTop} ${intro.titleBottom}`,
  roles: ["Full-Stack Developer", "Problem Solver", "CS Student", "Creative Builder"],
  roleLineTemplate: "A {role} living in {location}.",
  description:
    "Creating fast and reliable digital experiences with thoughtful design and modern engineering.",
  email: "contact@moysiadis.dev",
  socials: socialLinks.map(({ name, url }) => ({ label: name, url })),
  availability: "Available for internships & collaborations",
  stats: [
    { value: `${projects.length}`, label: "Projects shipped" },
    { value: `${yearsBuilding}+`, label: "Years of building" },
    { value: `${techCount}+`, label: "Technologies used" },
  ],
};

const githubUrl = socialLinks.find((link) => link.name === "Github")?.url;

// Old header links navigate with location.state.scrollTo using these keys.
const LEGACY_SCROLL_MAP = {
  top: "home",
  readme: "home",
  projects: "work",
  contact: "contact-form",
};

export default function HomePage() {
  document.title = "Moysiadis George | Full-Stack Developer Portfolio";
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef(null);
  const location = useLocation();

  // Smooth scrolling (Lenis) driven by the GSAP ticker, synced to ScrollTrigger.
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lock scrolling behind the loading screen.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (isLoading) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
      ScrollTrigger.refresh();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const scrollToSection = useCallback((id) => {
    const target = document.getElementById(id);
    if (!target) return;
    // Leave headroom for the floating navbar on inner targets like the form.
    const offset = id === "contact-form" ? -90 : 0;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset, duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Support navigation from other routes (old header links pass state.scrollTo).
  useEffect(() => {
    if (isLoading) return;
    const legacyTarget = LEGACY_SCROLL_MAP[location.state?.scrollTo];
    if (legacyTarget) scrollToSection(legacyTarget);
  }, [location.state, isLoading, scrollToSection]);

  return (
    <Box bg="portfolio.bg" minH="100vh">
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <Navbar profile={profile} onNavigate={scrollToSection} />

      <Hero
        profile={profile}
        ready={!isLoading}
        onSeeWorks={() => scrollToSection("work")}
        onReachOut={() => scrollToSection("contact-form")}
      />

      <SelectedWorks
        projects={projects.filter((project) => project.featured)}
        viewAllUrl={githubUrl}
      />

      <QASection />

      <ExperienceSection experience={experience} resumeUrl={RESUME_URL} />

      <Explorations
        items={projects.map(({ id, image, title }) => ({ id, image, title }))}
        viewAllUrl={githubUrl}
      />

      <StatsSection stats={profile.stats} />

      <ContactFooter profile={profile} />
    </Box>
  );
}
