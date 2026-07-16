import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import DeviceMockup from '../placeholders/DeviceMockup';
import ProcessDiagram from '../placeholders/ProcessDiagram';

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
  { label: 'Home', hasTopBar: true, hasBottomBar: true },
  { label: 'Explore', hasTopBar: true, hasBottomBar: true },
  { label: 'Plant Detail', hasTopBar: true, hasBottomBar: false },
];

export default function FloralogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [activeScreen, setActiveScreen] = useState(0);
  const headInView = useInView(sectionRef, { once: true, margin: '-5%' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const phoneY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const phoneRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 3]);

  return (
    <section
      id="floralog"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Section intro */}
      <div className="relative py-32 px-6">
        {/* Ambient */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '10%',
            right: '-5%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(80,140,80,0.025) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="max-w-6xl mx-auto">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-8 tracking-widest uppercase"
            style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.3em' }}
          >
            Case Study 01
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                style={{
                  fontSize: 'clamp(48px, 9vw, 120px)',
                  fontWeight: 200,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.92,
                  color: 'rgba(240,237,232,0.9)',
                }}
              >
                FLORA
                <br />
                <span style={{ color: 'rgba(200,184,154,0.6)' }}>LOG</span>
              </h2>

              <div className="mt-10">
                <p
                  style={{
                    fontSize: 'clamp(18px, 2.5vw, 28px)',
                    fontWeight: 200,
                    color: 'rgba(240,237,232,0.5)',
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                  }}
                >
                  TURNING BOTANY
                  <br />
                  INTO CURIOSITY.
                </p>
              </div>
            </motion.div>

            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:pt-16"
            >
              <p
                className="mb-6 tracking-widest uppercase"
                style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.2em' }}
              >
                The Challenge
              </p>
              <p
                style={{
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  fontWeight: 200,
                  color: 'rgba(240,237,232,0.6)',
                  lineHeight: 1.6,
                }}
              >
                "How do we transform information into curiosity?"
              </p>
              <p
                className="mt-6"
                style={{ fontSize: '14px', color: 'rgba(240,237,232,0.3)', lineHeight: 1.8, fontWeight: 300 }}
              >
                Botany contains enormous complexity: thousands of species, scientific relationships
                and vast amounts of information. The UX challenge was to make knowledge become
                exploration — to make information create curiosity.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Phone showcase */}
      <div
        className="relative py-24 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, var(--bg-primary) 0%, #0c0f0a 50%, var(--bg-primary) 100%)',
        }}
      >
        <div
          className="absolute pointer-events-none inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(80,140,80,0.04) 0%, transparent 60%)`,
          }}
        />

        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Phone */}
            <div className="flex-1 flex justify-center">
              <motion.div ref={phoneRef} style={{ y: phoneY, rotate: phoneRotate }}>
                <DeviceMockup screens={screens} activeScreen={activeScreen} />
              </motion.div>
            </div>

            {/* Screen selector + info */}
            <div className="flex-1">
              <p
                className="mb-8 tracking-widest uppercase"
                style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.3em' }}
              >
                App Screens
              </p>

              <div className="flex flex-col gap-3">
                {screens.map((screen, i) => (
                  <motion.button
                    key={screen.label}
                    onClick={() => setActiveScreen(i)}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 text-left p-4 rounded-xl cursor-pointer transition-all duration-300"
                    style={{
                      background:
                        activeScreen === i
                          ? 'rgba(240,237,232,0.04)'
                          : 'transparent',
                      border: `1px solid ${activeScreen === i ? 'rgba(240,237,232,0.08)' : 'transparent'}`,
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
