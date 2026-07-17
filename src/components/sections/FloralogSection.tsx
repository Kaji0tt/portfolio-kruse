import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import DeviceMockup from '../placeholders/DeviceMockup';
import ProcessDiagram from '../placeholders/ProcessDiagram';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const designDecisions = [
  {
    title: 'PLAYFUL EXPLORATION',
    body: 'Reducing barriers for beginners. Entry points that invite curiosity without demanding expertise.',
    icon: '◎',
  },
  {
    title: 'CLEAR HIERARCHY',
    body: 'Making complex knowledge approachable. Information architecture that reveals itself progressively.',
    icon: '◫',
  },
  {
    title: 'EMOTIONAL CONNECTION',
    body: 'Turning learning into discovery. Each interaction designed to spark wonder, not just deliver data.',
    icon: '◈',
  },
];

const iaSteps = [
  { label: 'Plant Knowledge', description: 'Thousands of species, relationships, context' },
  { label: 'Discovery Layer', description: 'Playful entry points and visual navigation' },
  { label: 'Interaction Design', description: 'Touch gestures, micro-animations, feedback' },
  { label: 'Learning Experience', description: 'Progressive disclosure and knowledge retention' },
];

const screens = [
  {
    label: 'Home',
    eyebrow: 'THE CHALLENGE',
    headline: '"How do we transform\ninformation into\ncuriosity?"',
    body: 'Botany contains enormous complexity: thousands of species, scientific relationships and vast amounts of information. The UX challenge was to make knowledge become exploration — to make information create curiosity.',
    hasTopBar: true,
    hasBottomBar: true,
  },
  {
    label: 'Explore',
    eyebrow: 'DISCOVERY',
    headline: 'Organised by\ncuriosity,\nnot taxonomy.',
    body: 'Instead of rigid botanical categories, Floralog groups plants by mood and habitat — making browsing feel like wandering through a garden, not a textbook.',
    hasTopBar: true,
    hasBottomBar: true,
  },
  {
    label: 'Plant Detail',
    eyebrow: 'DEPTH ON DEMAND',
    headline: 'From first glance\nto deep\nknowledge.',
    body: 'The detail view reveals information progressively. Casual users see beauty; curious ones unlock full botanical data — hierarchy in service of all experience levels.',
    hasTopBar: true,
    hasBottomBar: false,
  },
];

export default function FloralogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeScreen, setActiveScreen] = useState(0);

  // Track scroll within the sticky phone showcase
  const { scrollYProgress: stickyProgress } = useScroll({
    target: stickyRef,
    offset: ['start start', 'end end'],
  });

  const phoneY = useTransform(stickyProgress, [0, 1], [60, -10]);
  const phoneRotate = useTransform(stickyProgress, [0, 0.5, 1], [-2, 0, 2]);
  // Title starts above phone, moves further up as phone rises over it
  const titleY = useTransform(stickyProgress, [0, 1], [-20, -70]);
  const titleOpacity = useTransform(stickyProgress, [0, 0.4, 1], [1, 0.65, 0.2]);

  useMotionValueEvent(stickyProgress, 'change', (latest) => {
    const index = Math.min(Math.floor(latest * screens.length), screens.length - 1);
    setActiveScreen(index);
  });

  return (
    <section
      id="floralog"
      ref={sectionRef}
      className="relative"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Sticky App Screens showcase — title + phone + content all inside */}
      <div
        ref={stickyRef}
        className="relative"
        style={{ height: `${screens.length * 100}vh` }}
      >
        {/* Background */}
        <div
          className="absolute pointer-events-none inset-0"
          style={{
            background: 'linear-gradient(180deg, var(--bg-primary) 0%, #0c0f0a 20%, #0c0f0a 80%, var(--bg-primary) 100%)',
          }}
        />
        <div
          className="absolute pointer-events-none inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(80,140,80,0.04) 0%, transparent 60%)`,
          }}
        />

        {/* Sticky viewport — items-start so content begins near top */}
        <div className="sticky top-0 flex items-start" style={{ height: '100vh', paddingTop: '80px' }}>
          <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: title in flow at top (like PhilosophySection), phone absolute over it */}
            <div className="relative" style={{ minHeight: '520px' }}>
              {/* Title — in normal flow, sits at top */}
              <motion.div style={{ y: titleY, opacity: titleOpacity }}>
                <p
                  style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.3em', marginBottom: '8px', textTransform: 'uppercase' }}
                >
                  Case Study 01
                </p>
                <h2
                  style={{
                    fontSize: 'clamp(48px, 9vw, 120px)',
                    fontWeight: 200,
                    letterSpacing: '-0.03em',
                    lineHeight: 0.92,
                    color: 'rgba(240,237,232,0.9)',
                  }}
                >
                  FLORA<span style={{ color: 'rgba(200,184,154,0.6)' }}>LOG</span>
                </h2>
                <p
                  style={{
                    fontSize: 'clamp(16px, 2vw, 22px)',
                    fontWeight: 200,
                    color: 'rgba(240,237,232,0.4)',
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                    marginTop: '4px',
                  }}
                >
                  TURNING BOTANY INTO CURIOSITY.
                </p>
              </motion.div>

              {/* Phone — absolute, centered horizontally, overlaps title from below */}
              <div style={{ position: 'absolute', top: '60px', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 2 }}>
                <motion.div style={{ y: phoneY, rotate: phoneRotate, scale: 0.82 }}>
                  <DeviceMockup screens={screens} activeScreen={activeScreen} />
                </motion.div>
              </div>
            </div>

            {/* Right: animated content + screen selector below */}
            <div>
              {/* Animated content — Challenge-style typography */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.65, ease: EASE }}
                >
                  <p
                    className="mb-6 tracking-widest uppercase"
                    style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.2em' }}
                  >
                    {screens[activeScreen].eyebrow}
                  </p>
                  <p
                    style={{
                      fontSize: 'clamp(18px, 2vw, 24px)',
                      fontWeight: 200,
                      color: 'rgba(240,237,232,0.6)',
                      lineHeight: 1.6,
                    }}
                  >
                    {screens[activeScreen].headline}
                  </p>
                  <p
                    className="mt-6"
                    style={{ fontSize: '14px', color: 'rgba(240,237,232,0.3)', lineHeight: 1.8, fontWeight: 300 }}
                  >
                    {screens[activeScreen].body}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Numbered screen buttons below content */}
              <div className="flex flex-col gap-3" style={{ marginTop: '64px' }}>
                <p
                  className="mb-4 tracking-widest uppercase"
                  style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.3em' }}
                >
                  App Screens
                </p>
                {screens.map((screen, i) => (
                  <motion.button
                    key={screen.label}
                    onClick={() => setActiveScreen(i)}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 text-left p-4 rounded-xl cursor-pointer"
                    style={{
                      background: activeScreen === i ? 'rgba(240,237,232,0.04)' : 'transparent',
                      border: `1px solid ${activeScreen === i ? 'rgba(240,237,232,0.08)' : 'transparent'}`,
                      transition: 'background 0.3s ease, border-color 0.3s ease',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '10px',
                        color: 'rgba(240,237,232,0.2)',
                        letterSpacing: '0.2em',
                        minWidth: '20px',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      style={{
                        fontSize: '13px',
                        color: activeScreen === i ? 'rgba(240,237,232,0.8)' : 'rgba(240,237,232,0.3)',
                        letterSpacing: '0.15em',
                        fontWeight: 300,
                      }}
                    >
                      {screen.label.toUpperCase()}
                    </span>
                    {activeScreen === i && (
                      <motion.div
                        layoutId="screenIndicator"
                        className="ml-auto"
                        style={{ width: '20px', height: '1px', background: 'rgba(212,168,83,0.5)' }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Information Architecture */}
      <div className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="mb-8 tracking-widest uppercase"
                style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.3em' }}
              >
                Information Architecture
              </p>
              <h3
                style={{
                  fontSize: 'clamp(24px, 3.5vw, 42px)',
                  fontWeight: 200,
                  letterSpacing: '-0.02em',
                  color: 'rgba(240,237,232,0.8)',
                  lineHeight: 1.1,
                }}
              >
                Complexity distilled
                <br />
                <span style={{ color: 'rgba(240,237,232,0.3)' }}>into clarity.</span>
              </h3>
            </motion.div>

            <ProcessDiagram steps={iaSteps} />
          </div>
        </div>
      </div>

      {/* Design Decisions */}
      <div
        className="py-24 px-6"
        style={{ borderTop: '1px solid rgba(240,237,232,0.04)' }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 tracking-widest uppercase"
            style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.3em' }}
          >
            Design Decisions
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {designDecisions.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-8 flex flex-col gap-4"
                style={{
                  background: 'rgba(240,237,232,0.02)',
                  border: '1px solid rgba(240,237,232,0.06)',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <span style={{ fontSize: '20px', opacity: 0.4 }}>{card.icon}</span>
                <h4
                  style={{
                    fontSize: '12px',
                    color: 'rgba(240,237,232,0.7)',
                    letterSpacing: '0.15em',
                    fontWeight: 400,
                  }}
                >
                  {card.title}
                </h4>
                <p
                  style={{ fontSize: '13px', color: 'rgba(240,237,232,0.35)', lineHeight: 1.7, fontWeight: 300 }}
                >
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
