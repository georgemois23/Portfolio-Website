import { useLayoutEffect, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const ScrollReveal = ({
  children,
  scrollContainerRef,
  as: Tag = 'h1',
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 0,
  blurStrength = 4,
  className = '',
  rotationEnd = 'bottom center', 
  wordAnimationEnd = 'bottom center',
  fontWeight = 600,
  fontSize,
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="scroll-reveal-word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    let ctx = gsap.context(() => {
      // FIX HERE: Use gsap.utils.selector to scope ONLY to this container
      // This prevents it from grabbing words from other parts of the page
      const q = gsap.utils.selector(el); 
      const wordElements = q('.scroll-reveal-word');

      // 1. Container Rotation
      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller: scroller,
            start: 'top bottom', 
            end: rotationEnd,
            scrub: true,
          }
        }
      );

      // 2. Opacity Animation
      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: 'opacity, transform' },
        {
          ease: 'none',
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller: scroller,
            start: 'top bottom-=20%', 
            end: wordAnimationEnd,
            scrub: true,
          }
        }
      );

      // 3. Blur Animation
      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller: scroller,
              start: 'top bottom-=20%',
              end: wordAnimationEnd,
              scrub: true
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <Tag
      ref={containerRef}
      className={`scroll-reveal-container ${className}`}
      // style={{
      //   fontWeight: fontWeight,
      //   ...(fontSize && { fontSize }), 
      // }}
      fontWeight={fontWeight}
      fontSize={'3rem'} 
    >
      {splitText}
    </Tag>
  );
};

export default ScrollReveal;