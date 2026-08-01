import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Compass, TrendingUp } from 'lucide-react';
import DeviceMockup from '../placeholders/DeviceMockup';

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

const flowNodes = [
  { id: 'home',       label: 'HOME',       x: 47, y: 50, size: 52, isOrigin: true,  count: null },
  { id: 'scannen',    label: 'SCANNEN',    x: 47, y: 12, size: 40, isOrigin: false, count: 89 },
  { id: 'entdecken',  label: 'ENTDECKEN',  x: 82, y: 30, size: 36, isOrigin: false, count: 62 },
  { id: 'kollektion', label: 'KOLLEKTION', x: 78, y: 72, size: 34, isOrigin: false, count: 41 },
  { id: 'profil',     label: 'PROFIL',     x: 20, y: 74, size: 30, isOrigin: false, count: 16 },
  { id: 'suche',      label: 'SUCHE',      x: 12, y: 34, size: 32, isOrigin: false, count: 10 },
];

const flowEdges = [
  { from: 'home', to: 'scannen',    weight: 89 },
  { from: 'home', to: 'entdecken',  weight: 62 },
  { from: 'home', to: 'kollektion', weight: 41 },
  { from: 'home', to: 'profil',     weight: 16 },
  { from: 'home', to: 'suche',      weight: 10 },
];

const MAX_FLOW = 89;

const screens = [
  {
    label: 'Home',
    eyebrow: 'THE CHALLENGE',
    headline: '"How to transform\ninformation into\ncuriosity?"',
    body: 'Botany contains enormous complexity: thousands of species, scientific relationships and vast amounts of information. The UX challenge was to make knowledge become exploration — to make information create curiosity.',
    hasTopBar: false,
    hasBottomBar: false,
    image: '/Screen1.png',
  },
  {
    label: 'Explore',
    eyebrow: 'DISCOVERY',
    headline: 'Organised by\ncuriosity,\nnot taxonomy.',
    body: 'At the heart of the experience is a digital companion. A mascot that builds personality, forms attachment, and shares the player\'s curiosity. It doesn\'t instruct. It discovers alongside you. \n But curiosity is not just designed for — it is measured. Where users choose to navigate next becomes signal, and that signal feeds directly into product decisions and every iteration of the design process.',
    hasTopBar: false,
    hasBottomBar: false,
    image: '/Screen2.png',
  },
  {
    label: 'Plant Detail',
    eyebrow: 'DEPTH ON DEMAND',
    headline: 'From first glance\nto deep\nknowledge.',
    body: 'Knowledge doesn\'t arrive all at once — it unfolds through play. The more you interact, the more the plant reveals. Depth is a reward, not a prerequisite.',
    hasTopBar: false,
    hasBottomBar: false,
    image: '/Screen3.png',
  },
];

function PingRing({ trigger }: { trigger: number }) {
  if (trigger === 0) return null;
  return (
    <motion.div
      key={trigger}
      style={{
        position: 'absolute',
        inset: -4,
        borderRadius: '50%',
        border: '1px solid rgba(240,237,232,0.5)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      initial={{ scale: 1, opacity: 0.7 }}
      animate={{ scale: 2.6, opacity: 0 }}
      transition={{ duration: 1.1, ease: [0.2, 0, 0.4, 1] }}
    />
  );
}

export default function FloralogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeScreen, setActiveScreen] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [pingTriggers, setPingTriggers] = useState([0, 0, 0, 0, 0]);
  const prevActiveScreen = useRef(-1);
  const [flowVisible, setFlowVisible] = useState(false);
  const prevFlowVisible = useRef(false);
  const [phoneScale, setPhoneScale] = useState(0.82);

  useEffect(() => {
    const computeScale = () => {
      const vh = window.innerHeight;
      const padding = Math.min(96, Math.max(72, vh * 0.09));
      const containerH = vh - padding;
      // Target: phone fills ~65% of column height; native phone height = 530px
      const raw = (containerH * 0.65) / 530;
      setPhoneScale(Math.min(1.2, Math.max(0.55, raw)));
    };
    computeScale();
    window.addEventListener('resize', computeScale);
    return () => window.removeEventListener('resize', computeScale);
  }, []);

  // Scroll to the position within the sticky section that corresponds to screen i.
  // Do NOT set activeScreen directly — it updates via useMotionValueEvent as scroll progresses.
  const handleScreenClick = (i: number) => {
    if (stickyRef.current) {
      const sectionTop = stickyRef.current.getBoundingClientRect().top + window.scrollY;
      const targetY = sectionTop + i * window.innerHeight;
      const lenis = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (target: number, opts: object) => void } | undefined;
      if (lenis) {
        lenis.scrollTo(targetY, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

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
    if (index !== prevActiveScreen.current) {
      prevActiveScreen.current = index;
      if (index === 0) {
        setPingTriggers(t => { const n = [...t]; n[0]++; return n; });
        setTimeout(() => setPingTriggers(t => { const n = [...t]; n[1]++; return n; }), 320);
      } else if (index === 1) {
        setPingTriggers(t => { const n = [...t]; n[2]++; return n; });
      } else if (index === 2) {
        setPingTriggers(t => { const n = [...t]; n[3]++; return n; });
      }
    }
    // Flow dots appear halfway between Explore (1/3) and Plant Detail (2/3) at progress 0.5
    if (latest >= 0.5 && !prevFlowVisible.current) {
      setPingTriggers(t => { const n = [...t]; n[4]++; return n; });
      setFlowVisible(true);
      prevFlowVisible.current = true;
    } else if (latest < 1 / 3 && prevFlowVisible.current) {
      setFlowVisible(false);
      prevFlowVisible.current = false;
    }
    setActiveScreen(index);
  });

  return (
    <section
      id="floralog"
      ref={sectionRef}
      className="relative"
      style={{ background: 'transparent' }}
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
            background: 'linear-gradient(180deg, transparent 0%, #0c0f0a 20%, #0c0f0a 80%, #000000 100%)',
          }}
        />
        <div
          className="absolute pointer-events-none inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(80,140,80,0.04) 0%, transparent 60%)`,
          }}
        />

        {/* Sticky viewport — items-start so content begins near top */}
        <div className="sticky top-0 flex items-start" style={{ height: '100vh', paddingTop: 'clamp(72px, 9vh, 96px)' }}>
          <div
            className="max-w-[1920px] mx-auto px-12 w-full grid sm:grid-cols-2"
            style={{ gap: 'clamp(12px, 3vw, 64px)', alignItems: 'start' }}
          >

            {/* Left: title in flow at top (like PhilosophySection), phone absolute over it */}
            <div className="relative" style={{ height: 'calc(100vh - clamp(72px, 9vh, 96px))' }}>
              {/* Title — in normal flow, sits at top */}
              <motion.div style={{ y: titleY, opacity: titleOpacity }}>
                <p
                  style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.3em', marginBottom: '8px', textTransform: 'uppercase' }}
                >
                  Case Study
                </p>
                <h2
                  style={{
                    fontSize: 'clamp(28px, 7vw, 120px)',
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
                    fontSize: 'clamp(11px, 1.6vw, 22px)',
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
              <div style={{ position: 'absolute', top: 'calc(30px + 8vh)', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 2 }}>
                <motion.div style={{ y: phoneY, rotate: phoneRotate, scale: phoneScale }}>
                  <DeviceMockup screens={screens} activeScreen={activeScreen} />
                </motion.div>
              </div>

              {/* IA Step 1 — Home, bottom-right | Tooltip: above, left-aligned to right edge */}
              <div style={{ position: 'absolute', bottom: '110px', right: 0, zIndex: 4, pointerEvents: activeScreen === 0 ? 'auto' : 'none' }}>
                <motion.div
                  animate={{ opacity: activeScreen === 0 ? 1 : 0, y: activeScreen === 0 ? 0 : 8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setHoveredStep(0)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1px solid rgba(240,237,232,0.28)', background: 'rgba(12,12,12,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default', position: 'relative' }}>
                    <PingRing trigger={pingTriggers[0]} />
                    <motion.span animate={{ opacity: hoveredStep === 0 ? 0 : 1 }} transition={{ duration: 0.2 }} style={{ fontSize: '12px', color: 'rgba(240,237,232,0.5)', fontWeight: 300, letterSpacing: '0.05em', position: 'relative', zIndex: 1 }}>01</motion.span>
                    <motion.span animate={{ opacity: hoveredStep === 0 ? 1 : 0 }} transition={{ duration: 0.2 }} style={{ position: 'absolute', fontSize: '20px', color: 'rgba(240,237,232,0.6)', zIndex: 1 }}>◫</motion.span>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 70%)' }} />
                  </div>
                  <motion.div
                    animate={{ opacity: hoveredStep === 0 ? 1 : 0, y: hoveredStep === 0 ? 0 : 4 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: 'absolute', bottom: 'calc(100% + 8px)', right: 0, background: 'rgba(15,15,15,1)', border: '1px solid rgba(240,237,232,0.18)', borderRadius: '10px', padding: '12px 16px', width: '190px', pointerEvents: 'none' }}
                  >
                    <p style={{ fontSize: '12px', color: 'rgba(240,237,232,0.55)', fontWeight: 300, marginBottom: '3px' }}>{designDecisions[1].title}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(240,237,232,0.25)', fontWeight: 300, lineHeight: 1.5 }}>{designDecisions[1].body}</p>
                  </motion.div>
                </motion.div>
              </div>

              {/* Info circle 05 — Explore, same position as 01, appears with flowVisible */}
              <div style={{ position: 'absolute', bottom: '110px', right: 0, zIndex: 4, pointerEvents: (flowVisible && activeScreen === 1) ? 'auto' : 'none' }}>
                <motion.div
                  animate={{ opacity: (flowVisible && activeScreen === 1) ? 1 : 0, y: (flowVisible && activeScreen === 1) ? 0 : 8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setHoveredStep(4)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1px solid rgba(240,237,232,0.28)', background: 'rgba(12,12,12,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default', position: 'relative' }}>
                    <PingRing trigger={pingTriggers[4]} />
                    <motion.span animate={{ opacity: hoveredStep === 4 ? 0 : 1 }} transition={{ duration: 0.2 }} style={{ fontSize: '12px', color: 'rgba(240,237,232,0.5)', fontWeight: 300, letterSpacing: '0.05em', position: 'relative', zIndex: 1 }}>04</motion.span>
                    <motion.span animate={{ opacity: hoveredStep === 4 ? 1 : 0 }} transition={{ duration: 0.2 }} style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}><TrendingUp size={20} color="rgba(240,237,232,0.6)" strokeWidth={1.5} /></motion.span>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 70%)' }} />
                  </div>
                  <motion.div
                    animate={{ opacity: hoveredStep === 4 ? 1 : 0, y: hoveredStep === 4 ? 0 : 4 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: 'absolute', bottom: 'calc(100% + 8px)', right: 0, background: 'rgba(15,15,15,1)', border: '1px solid rgba(240,237,232,0.18)', borderRadius: '10px', padding: '12px 16px', width: '210px', pointerEvents: 'none' }}
                  >
                    <p style={{ fontSize: '12px', color: 'rgba(240,237,232,0.55)', fontWeight: 300, marginBottom: '3px' }}>USER FLOW INSIGHTS</p>
                    <p style={{ fontSize: '11px', color: 'rgba(240,237,232,0.25)', fontWeight: 300, lineHeight: 1.5 }}>Navigation patterns made measurable, feeding directly into the iterative design process.</p>
                  </motion.div>
                </motion.div>
              </div>

              {/* IA Step 2 — Home, just left of phone | Tooltip: below, extends right */}
              <div style={{ position: 'absolute', top: '42%', left: 'calc(50% - 185px)', transform: 'translateY(-50%)', zIndex: 4, pointerEvents: activeScreen === 0 ? 'auto' : 'none' }}>
                <motion.div
                  animate={{ opacity: activeScreen === 0 ? 1 : 0, x: activeScreen === 0 ? 0 : -8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setHoveredStep(1)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1px solid rgba(240,237,232,0.28)', background: 'rgba(12,12,12,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default', position: 'relative' }}>
                    <PingRing trigger={pingTriggers[1]} />
                    <motion.span animate={{ opacity: hoveredStep === 1 ? 0 : 1 }} transition={{ duration: 0.2 }} style={{ fontSize: '12px', color: 'rgba(240,237,232,0.5)', fontWeight: 300, letterSpacing: '0.05em', position: 'relative', zIndex: 1 }}>02</motion.span>
                    <motion.span animate={{ opacity: hoveredStep === 1 ? 1 : 0 }} transition={{ duration: 0.2 }} style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}><Compass size={20} color="rgba(240,237,232,0.6)" strokeWidth={1.5} /></motion.span>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 70%)' }} />
                  </div>
                  <motion.div
                    animate={{ opacity: hoveredStep === 1 ? 1 : 0, y: hoveredStep === 1 ? 0 : 4 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: 'rgba(15,15,15,1)', border: '1px solid rgba(240,237,232,0.18)', borderRadius: '10px', padding: '12px 16px', width: '190px', pointerEvents: 'none' }}
                  >
                    <p style={{ fontSize: '12px', color: 'rgba(240,237,232,0.55)', fontWeight: 300, marginBottom: '3px' }}>{iaSteps[1].label}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(240,237,232,0.25)', fontWeight: 300, lineHeight: 1.5 }}>{iaSteps[1].description}</p>
                  </motion.div>
                </motion.div>
              </div>

              {/* IA Step 3 — Explore, just right of phone | Tooltip: below, right-aligned */}
              <div style={{ position: 'absolute', top: '55%', left: 'calc(50% + 110px)', transform: 'translateY(-50%)', zIndex: 4, pointerEvents: activeScreen === 1 ? 'auto' : 'none' }}>
                <motion.div
                  animate={{ opacity: activeScreen === 1 ? 1 : 0, x: activeScreen === 1 ? 0 : 8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setHoveredStep(2)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1px solid rgba(240,237,232,0.28)', background: 'rgba(12,12,12,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default', position: 'relative' }}>
                    <PingRing trigger={pingTriggers[2]} />
                    <motion.span animate={{ opacity: hoveredStep === 2 ? 0 : 1 }} transition={{ duration: 0.2 }} style={{ fontSize: '12px', color: 'rgba(240,237,232,0.5)', fontWeight: 300, letterSpacing: '0.05em', position: 'relative', zIndex: 1 }}>03</motion.span>
                    <motion.span animate={{ opacity: hoveredStep === 2 ? 1 : 0 }} transition={{ duration: 0.2 }} style={{ position: 'absolute', fontSize: '20px', color: 'rgba(240,237,232,0.6)', zIndex: 1 }}>◈</motion.span>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 70%)' }} />
                  </div>
                  <motion.div
                    animate={{ opacity: hoveredStep === 2 ? 1 : 0, y: hoveredStep === 2 ? 0 : 4 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: 'rgba(15,15,15,1)', border: '1px solid rgba(240,237,232,0.18)', borderRadius: '10px', padding: '12px 16px', width: '190px', pointerEvents: 'none' }}
                  >
                    <p style={{ fontSize: '12px', color: 'rgba(240,237,232,0.55)', fontWeight: 300, marginBottom: '3px' }}>{designDecisions[2].title}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(240,237,232,0.25)', fontWeight: 300, lineHeight: 1.5 }}>{designDecisions[2].body}</p>
                  </motion.div>
                </motion.div>
              </div>

              {/* IA Step 4 — Plant Detail, just left of phone | Tooltip: below, extends right */}
              <div style={{ position: 'absolute', top: '42%', left: 'calc(50% - 185px)', transform: 'translateY(-50%)', zIndex: 4, pointerEvents: activeScreen === 2 ? 'auto' : 'none' }}>
                <motion.div
                  animate={{ opacity: activeScreen === 2 ? 1 : 0, x: activeScreen === 2 ? 0 : -8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setHoveredStep(3)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1px solid rgba(240,237,232,0.28)', background: 'rgba(12,12,12,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default', position: 'relative' }}>
                    <PingRing trigger={pingTriggers[3]} />
                    <motion.span animate={{ opacity: hoveredStep === 3 ? 0 : 1 }} transition={{ duration: 0.2 }} style={{ fontSize: '12px', color: 'rgba(240,237,232,0.5)', fontWeight: 300, letterSpacing: '0.05em', position: 'relative', zIndex: 1 }}>05</motion.span>
                    <motion.span animate={{ opacity: hoveredStep === 3 ? 1 : 0 }} transition={{ duration: 0.2 }} style={{ position: 'absolute', fontSize: '20px', color: 'rgba(240,237,232,0.6)', zIndex: 1 }}>◎</motion.span>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 70%)' }} />
                  </div>
                  <motion.div
                    animate={{ opacity: hoveredStep === 3 ? 1 : 0, y: hoveredStep === 3 ? 0 : 4 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: 'rgba(15,15,15,1)', border: '1px solid rgba(240,237,232,0.18)', borderRadius: '10px', padding: '12px 16px', width: '190px', pointerEvents: 'none' }}
                  >
                    <p style={{ fontSize: '12px', color: 'rgba(240,237,232,0.55)', fontWeight: 300, marginBottom: '3px' }}>{designDecisions[0].title}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(240,237,232,0.25)', fontWeight: 300, lineHeight: 1.5 }}>{designDecisions[0].body}</p>
                  </motion.div>
                </motion.div>
              </div>

              <div style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 4, pointerEvents: 'none' }}>
                <p
                  style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}
                >
                  Information Architecture
                </p>
                <p
                  style={{
                    fontSize: 'clamp(24px, 3.5vw, 42px)',
                    fontWeight: 200,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                    color: 'rgba(240,237,232,0.8)',
                  }}
                >
                  Complexity distilled{' '}
                  <span style={{ color: 'rgba(240,237,232,0.3)' }}>into clarity.</span>
                </p>
              </div>
            </div>

            {/* Right: animated content + screen selector below */}
            <div>
              {/* Content — grid stacking: all 3 items rendered, container = max height automatically */}
              <div style={{ display: 'grid' }}>
                {screens.map((screen, i) => (
                  <motion.div
                    key={i}
                    style={{ gridArea: '1/1', pointerEvents: i === activeScreen ? 'auto' : 'none' }}
                    animate={{
                      opacity: i === activeScreen ? 1 : 0,
                      y: i === activeScreen ? 0 : (i < activeScreen ? -8 : 12),
                    }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <p
                      className="mb-6 tracking-widest uppercase"
                      style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.2em' }}
                    >
                      {screen.eyebrow}
                    </p>
                    <p
                      style={{
                        fontSize: 'clamp(18px, 2vw, 24px)',
                        fontWeight: 200,
                        color: 'rgba(240,237,232,0.6)',
                        lineHeight: 1.6,
                      }}
                    >
                      {screen.headline}
                    </p>
                    <p
                      className="mt-6"
                      style={{ fontSize: '14px', color: 'rgba(240,237,232,0.3)', lineHeight: 1.8, fontWeight: 300 }}
                    >
                      {screen.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Numbered screen buttons — immediately below content */}
              <div className="flex flex-col gap-3" style={{ marginTop: '28px' }}>
                <p
                  className="mb-4 tracking-widest uppercase"
                  style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.3em' }}
                >
                  App Screens
                </p>
                {screens.map((screen, i) => (
                  <motion.button
                    key={screen.label}
                    onClick={() => handleScreenClick(i)}
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-4 text-left p-4 rounded-xl cursor-pointer"
                    style={{
                      alignSelf: 'flex-start',
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
                        style={{ width: '20px', height: '1px', background: 'rgba(212,168,83,0.5)', flexShrink: 0 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

            </div>

          </div>

          {/* CSV Data panel — Screen 0 (Home): taxonomy data */}
          <motion.div
            animate={{ opacity: activeScreen === 0 ? 1 : 0, y: activeScreen === 0 ? 0 : 10 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: '50%',
              zIndex: 3,
              pointerEvents: 'none',
              maskImage: 'linear-gradient(to top, black 0%, black 20%, rgba(0,0,0,0.7) 50%, transparent 80%)',
              WebkitMaskImage: 'linear-gradient(to top, black 0%, black 20%, rgba(0,0,0,0.7) 50%, transparent 80%)',
            }}
          >
            <div style={{
              fontFamily: '"SF Mono", "Fira Code", "Fira Mono", monospace',
              fontSize: '10px',
              lineHeight: 1.75,
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2.8rem 1fr 1fr 1fr 1fr', gap: '0 16px', marginBottom: '4px', borderBottom: '1px solid rgba(240,237,232,0.06)', paddingBottom: '4px' }}>
                {['#', 'genus', 'scientific', 'family', 'category'].map((h) => (
                  <span key={h} style={{ color: 'rgba(200,184,154,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '9px' }}>{h}</span>
                ))}
              </div>
              {[
                [385, 'Ruhmeskrone',    'Gloriosa',      'Colchicaceae',    'Blumen'],
                [384, 'Ballonblume',    'Platycodon',    'Campanulaceae',   'Blumen'],
                [383, 'Alant',          'Inula',         'Asteraceae',      'Blumen'],
                [382, 'Gilia',          'Gilia',         'Polemoniaceae',   'Blumen'],
                [381, 'Aloe',           'Aloe',          'Asphodelaceae',   'Blumen'],
                [380, 'Montbretie',     'Crocosmia',     'Iridaceae',       'Blumen'],
                [379, 'Aronstab',       'Arum',          'Araceae',         'Blumen'],
                [378, 'Ammi',           'Ammi',          'Apiaceae',        'Blumen'],
                [377, 'Bruchkraut',     'Herniaria',     'Caryophyllaceae', 'Blumen'],
                [376, 'Indianernessel', 'Monarda',       'Lamiaceae',       'Blumen'],
                [375, 'Gelenkblume',    'Physostegia',   'Lamiaceae',       'Blumen'],
                [374, 'Sonnenhut',      'Rudbeckia',     'Asteraceae',      'Blumen'],
                [373, 'Visnaga',        'Visnaga',       'Apiaceae',        'Blumen'],
                [372, 'Rittersporn',    'Delphinium',    'Ranunculaceae',   'Blumen'],
                [371, 'Tragant',        'Astragalus',    'Fabaceae',        'Blumen'],
                [370, 'Wirbeldost',     'Clinopodium',   'Lamiaceae',       'Blumen'],
                [369, 'Odermennig',     'Agrimonia',     'Rosaceae',        'Blumen'],
                [368, 'Zinnie',         'Zinnia',        'Asteraceae',      'Blumen'],
                [367, 'Stechapfel',     'Datura',        'Solanaceae',      'Blumen'],
                [366, 'Kornrade',       'Agrostemma',    'Caryophyllaceae', 'Blumen'],
              ].map(([nr, genus, scientific, family, category], i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2.8rem 1fr 1fr 1fr 1fr', gap: '0 16px' }}>
                  <span style={{ color: 'rgba(240,237,232,0.15)' }}>{nr}</span>
                  <span style={{ color: 'rgba(160,200,140,0.6)' }}>{genus}</span>
                  <span style={{ color: 'rgba(240,237,232,0.35)', fontStyle: 'italic' }}>{scientific}</span>
                  <span style={{ color: 'rgba(240,237,232,0.25)' }}>{family}</span>
                  <span style={{ color: 'rgba(200,184,154,0.3)' }}>{category}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* KPI image panel — Screen 1 (Explore): user flow data */}
          <motion.div
            animate={{ opacity: activeScreen === 1 ? 1 : 0, y: activeScreen === 1 ? 0 : 10 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: '50%',
              zIndex: 3,
              pointerEvents: 'none',
              maskImage: 'linear-gradient(to top, black 0%, black 86%, rgba(0,0,0,0.4) 96%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, black 0%, black 86%, rgba(0,0,0,0.4) 96%, transparent 100%)',
            }}
          >
            {/* Diagram inner div — no key remount; flowVisible drives node animation */}
            <div style={{ position: 'relative', height: '340px', width: '100%', isolation: 'isolate' }}>
              <span style={{ position: 'absolute', top: '6px', left: '6px', fontSize: '7px', color: 'rgba(240,237,232,0.12)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                USER FLOW · HOME →
              </span>
              {/* Connection lines — motion.g handles opacity; CSS @keyframes animates flowing dashes without touching % coords */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
                <defs>
                  <style>{`
                    @keyframes floralogDashFlow {
                      from { stroke-dashoffset: 16; }
                      to   { stroke-dashoffset: 0; }
                    }
                  `}</style>
                </defs>
                {flowEdges.map((edge, i) => {
                  const from = flowNodes.find(n => n.id === edge.from)!;
                  const to   = flowNodes.find(n => n.id === edge.to)!;
                  const isFlowing = edge.to === 'scannen' || edge.to === 'entdecken';
                  const lineOpacity = 0.06 + (edge.weight / MAX_FLOW) * 0.28;
                  return (
                    <motion.g
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: flowVisible ? 1 : 0 }}
                      transition={{ duration: 0.6, delay: flowVisible ? 0.3 + i * 0.1 : 0 }}
                    >
                      <line
                        x1={`${from.x}%`} y1={`${from.y}%`}
                        x2={`${to.x}%`}   y2={`${to.y}%`}
                        stroke="rgba(160,200,140,1)"
                        strokeOpacity={lineOpacity}
                        strokeWidth={0.5 + (edge.weight / MAX_FLOW) * 1.2}
                        strokeDasharray="3 6"
                        style={isFlowing && flowVisible ? { animation: 'floralogDashFlow 1.2s linear infinite' } : undefined}
                      />
                    </motion.g>
                  );
                })}
              </svg>
              {/* Nodes — plain div anchors the translate; motion.div inside animates scale without overriding it */}
              {flowNodes.map((node, i) => (
                <div
                  key={node.id}
                  style={{ position: 'absolute', left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: flowVisible ? 1 : 0, scale: flowVisible ? 1 : 0.6 }}
                    transition={{ duration: flowVisible ? 0.5 : 0.2, delay: flowVisible ? 0.05 * i : 0, ease: [0.16, 1, 0.3, 1] }}
                  >
                  <div style={{
                    width: `${node.size}px`,
                    height: `${node.size}px`,
                    borderRadius: '50%',
                    background: node.isOrigin ? 'rgba(18,14,8,0.92)' : 'rgba(8,14,10,0.92)',
                    border: `1px solid ${node.isOrigin ? 'rgba(212,168,83,0.45)' : 'rgba(160,200,140,0.18)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute', inset: 0, borderRadius: '50%',
                      background: `radial-gradient(circle, ${node.isOrigin ? 'rgba(212,168,83,0.12)' : 'rgba(160,200,140,0.07)'} 0%, transparent 70%)`,
                    }} />
                    {node.isOrigin
                      ? <span style={{ fontSize: '14px', color: 'rgba(212,168,83,0.6)', position: 'relative', zIndex: 1 }}>◎</span>
                      : <span style={{ fontSize: '11px', color: 'rgba(160,200,140,0.55)', fontWeight: 300, position: 'relative', zIndex: 1, fontFamily: '"SF Mono", monospace' }}>{node.count}</span>
                    }
                  </div>
                  </motion.div>
                  {/* Label outside motion.div so it doesn't affect the animation wrapper's size */}
                  <span style={{ position: 'absolute', ...(node.id === 'scannen' ? { bottom: '100%', marginBottom: '5px' } : { top: '100%', marginTop: '5px' }), left: '50%', transform: 'translateX(-50%)', fontSize: '7px', color: node.isOrigin ? 'rgba(212,168,83,0.45)' : 'rgba(240,237,232,0.22)', letterSpacing: '0.18em', whiteSpace: 'nowrap' }}>
                    {node.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info circle 05 removed from here — now inside left column */}

        </div>
      </div>

    </section>
  );
}
