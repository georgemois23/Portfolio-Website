import { useEffect, useRef } from "react";

export const ScrollStackItem = ({ children }) => {
  return <div className="scroll-stack-card">{children}</div>;
};

const ScrollStack = ({ children }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll(".scroll-stack-card"));
    cardsRef.current = cards;

    const update = () => {
      const scrollTop = el.scrollTop;
      const height = el.clientHeight;

      cards.forEach((card, i) => {
        const start = i * height * 0.6;
        const progress = Math.min(
          1,
          Math.max(0, (scrollTop - start) / (height * 0.6))
        );

        const scale = 1 - progress * 0.06;
        const y = progress * 25;

        card.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
        card.style.opacity = `${1 - progress * 0.15}`;
      });
    };

    el.addEventListener("scroll", update, { passive: true });
    update();

    return () => el.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <style>{`
        /* =========================
           FULL SCREEN STACK
        ==========================*/
        .scroll-stack-container {
          height: 100vh;
          width: 100%;
          overflow-y: scroll;
          overflow-x: hidden;

          scroll-behavior: smooth;

          /* 🔥 HIDE SCROLLBAR (all browsers) */
          -ms-overflow-style: none; /* IE/Edge */
          scrollbar-width: none; /* Firefox */
        }

        .scroll-stack-container::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }

        /* =========================
           INNER SPACING
        ==========================*/
        .scroll-stack-inner {
          padding: 18vh 6vw 30vh;
          display: flex;
          flex-direction: column;
          gap: 80px;
        }

        /* =========================
           CARD STYLE
        ==========================*/
        .scroll-stack-card {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;

          padding: 40px;
          border-radius: 32px;

          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);

          transform-origin: center;
          will-change: transform, opacity;

          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        /* =========================
           MOBILE
        ==========================*/
        @media (max-width: 768px) {
          .scroll-stack-inner {
            padding: 14vh 4vw 20vh;
            gap: 40px;
          }

          .scroll-stack-card {
            padding: 22px;
            border-radius: 22px;
          }
        }
      `}</style>

      <div ref={containerRef} className="scroll-stack-container">
        <div className="scroll-stack-inner">{children}</div>
      </div>
    </>
  );
};

export default ScrollStack;