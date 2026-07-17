import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
// Gap (px) between stacked cards
const CARD_GAP = 4;
// Scroll fraction before highlights/cards begin
const SCROLL_DELAY = 0.12;

const pillars = [
  {
    number: '01',
    title: 'PSYCHOLOGY',
    body: 'Understanding people, behavior and learning. Every interface is a conversation between human cognition and digital structure.',
    accent: 'rgba(200,184,154,0.15)',
    glow: 'rgba(200,184,154,0.06)',
    activeColor: 'rgba(240,237,232,0.92)',
  },
  {
    number: '02',
    title: 'ART',
    body: 'Creating emotional, meaningful and beautiful experiences. Design that moves people — aesthetics in service of clarity.',
    accent: 'rgba(212,168,83,0.12)',
    glow: 'rgba(212,168,83,0.05)',
    activeColor: 'rgba(200,184,154,0.85)',
  },
  {
    number: '03',
    title: 'TECHNOLOGY',
    body: 'Turning ideas into functional digital systems. Bridging the gap between concept and implementation.',
    accent: 'rgba(130,160,200,0.1)',
    glow: 'rgba(130,160,200,0.04)',
    activeColor: 'rgba(130,160,200,0.9)',
  },
];

function PillarCard({ pillar }: { pillar: (typeof pillars)[0] }) {
  return (
    <div
      className="relative flex flex-col"
      style={{
        padding: '2px',
        borderRadius: '20px',
        height: '100%',
        background: `linear-gradient(145deg, rgba(240,237,232,0.06) 0%, transparent 60%)`,
      }}
    >
      <div
        className="relative rounded-[19px] flex flex-col h-full overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${pillar.glow} 0%, rgba(12,12,12,0.95) 60%)`,
          padding: '40px 36px',
          border: '1px solid rgba(240,237,232,0.05)',
        }}
      >
        {/* Background glow */}
        <div
          className="absolute"
          style={{
            top: '-40px',
            right: '-40px',
            width: '160px',
            height: '160px',
            background: `radial-gradient(circle, ${pillar.accent} 0%, transparent 70%)`,
            filter: 'blur(30px)',
          }}
        />

        <div className="relative z-10 flex flex-col flex-1">
          <span
            className="mb-6 tracking-widest"
            style={{ fontSize: '11px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.2em' }}
          >
            {pillar.number}
          </span>

          <h3
            className="mb-6"
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 200,
              letterSpacing: '-0.01em',
              color: 'rgba(240,237,232,0.9)',
              lineHeight: 1.0,
            }}
          >
            {pillar.title}
          </h3>

          <div
            className="mb-6"
            style={{ width: '28px', height: '1px', background: 'rgba(240,237,232,0.12)' }}
          />

          <p
            style={{
              fontSize: '14px',
              color: 'rgba(240,237,232,0.4)',
              lineHeight: 1.8,
              fontWeight: 300,
              flex: 1,
            }}
          >
            {pillar.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // -1 = before scroll starts, 0–2 = active card index
  const [activeIndex, setActiveIndex] = useState(-1);
  // Measured height of the card container in px
  const [containerHeight, setContainerHeight] = useState(600);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const measure = () => {
      if (cardContainerRef.current) {
        setContainerHeight(cardContainerRef.current.getBoundingClientRect().height);
      }
    };
    const id = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', measure);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < SCROLL_DELAY) {
      setActiveIndex(-1);
    } else {
      const adjusted = (latest - SCROLL_DELAY) / (1 - SCROLL_DELAY);
      const index = Math.min(Math.floor(adjusted * pillars.length), pillars.length - 1);
      setActiveIndex(index);
    }
  });

  // Heading drifts upward as user scrolls — same responsive feel as FloralogSection
  const headingY = useTransform(scrollYProgress, [0, 1], [-10, -60]);

  /**
   * Each visible card (past + active) gets an equal vertical slice of the container.
   * Past cards dock to the top in order; the active card fills the remaining space.
   */
  const getCardAnim = (i: number) => {
    const h = containerHeight;
    // Number of currently visible slots (all past cards + active card)
    const n = Math.max(activeIndex + 1, 1);
    const slotH = h / n;

    if (activeIndex === -1 || i > activeIndex) {
      // Future: hidden below container, waiting to enter
      return { top: h + 20, height: slotH, opacity: 0, zIndex: 0 };
    }

    if (i < activeIndex) {
      // Past: equal slice stacked at top, leaving a small gap before the next card
      return { top: i * slotH, height: slotH - CARD_GAP, opacity: 0.6, zIndex: i + 1 };
    }

    // Active: fills all remaining space below past cards
    return { top: activeIndex * slotH, height: h - activeIndex * slotH, opacity: 1, zIndex: 10 };
  };

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        height: `${pillars.length * 100}vh`,
        background: 'var(--bg-primary)',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(200,184,154,0.025) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Sticky viewport */}
      <div className="sticky top-0 flex items-center" style={{ height: '100vh' }}>
        <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: heading — all keywords visible, active one underlined */}
          <motion.div style={{ y: headingY }}>
            <p
              className="mb-8 tracking-widest uppercase"
              style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.3em' }}
            >
              Design Philosophy
            </p>

            <h2
              style={{
                fontSize: 'clamp(32px, 6vw, 80px)',
                fontWeight: 200,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: 'rgba(240,237,232,0.9)',
              }}
            >
              DESIGN AT THE
              <br />
              <span style={{ color: 'rgba(240,237,232,0.45)' }}>INTERSECTION OF</span>
              <br />
              <span style={{ position: 'relative', display: 'inline-block' }}>
                PSYCHOLOGY,
                <motion.span
                  style={{
                    position: 'absolute', bottom: -3, left: 0, right: 0,
                    height: '1.5px', background: 'rgba(240,237,232,0.75)',
                    transformOrigin: 'left',
                  }}
                  animate={{ scaleX: activeIndex === 0 ? 1 : 0, opacity: activeIndex === 0 ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </span>
              <br />
              <span style={{ position: 'relative', display: 'inline-block', color: 'rgba(200,184,154,0.7)' }}>
                ART
                <motion.span
                  style={{
                    position: 'absolute', bottom: -3, left: 0, right: 0,
                    height: '1.5px', background: 'rgba(200,184,154,0.8)',
                    transformOrigin: 'left',
                  }}
                  animate={{ scaleX: activeIndex === 1 ? 1 : 0, opacity: activeIndex === 1 ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </span>
              <br />
              {/* AND TECHNOLOGY */}
              <span style={{ color: 'rgba(240,237,232,0.45)' }}>AND</span>{' '}
              <span style={{ position: 'relative', display: 'inline-block', color: 'rgba(130,160,200,0.8)' }}>
                TECHNOLOGY.
                <motion.span
                  style={{
                    position: 'absolute', bottom: -3, left: 0, right: 0,
                    height: '1.5px', background: 'rgba(130,160,200,0.85)',
                    transformOrigin: 'left',
                  }}
                  animate={{ scaleX: activeIndex === 2 ? 1 : 0, opacity: activeIndex === 2 ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </span>
            </h2>

          </motion.div>

          {/* Right: height-based card stack */}
          <div ref={cardContainerRef} style={{ position: 'relative', height: '70vh' }}>
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                style={{ position: 'absolute', width: '100%', overflow: 'hidden', borderRadius: '18px' }}
                animate={getCardAnim(i)}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <PillarCard pillar={pillar} />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
