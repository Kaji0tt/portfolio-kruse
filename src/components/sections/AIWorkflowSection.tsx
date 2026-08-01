import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const workflowSteps = [
  {
    label: 'IDEA',
    tooltipTitle: 'PROBLEM SENSITIVITY',
    description: 'Perceiving what is missing or suboptimal before it becomes a brief — this is the entry point of every meaningful creative act. In an era where answers arrive instantly, the capacity to ask the right question first is the rarest and most valuable skill.',
    x: '8%', y: '-5%', delay: 0,
  },
  {
    label: 'AI COLLABORATION',
    tooltipTitle: 'IDEA FLUENCY',
    description: 'Generating a high volume of concepts at speed, and iterating them rapidly with AI as a creative partner. The human provides intent and direction; AI compresses the distance between first thought and tangible prototype.',
    x: '16%', y: '39%', delay: 0.1,
  },
  {
    label: 'PROTOTYPE',
    tooltipTitle: 'COGNITIVE FLEXIBILITY',
    description: 'Breaking familiar patterns to reach unconventional solutions. Leaving established structure behind requires the kind of flexible thinking no prompt can instruct — it is the designer\'s most distinctly human contribution to the process.',
    x: '46%', y: '18%', delay: 0.2,
  },
  {
    label: 'ITERATION',
    tooltipTitle: 'ELABORATION & REDEFINITION',
    description: 'Restructuring what is known into something new. Guiding interdisciplinary transfer through qualitative judgment and precision prompting — refining outputs until they reflect genuine insight rather than plausible generation.',
    x: '66%', y: '60%', delay: 0.3,
  },
  {
    label: 'DIGITAL PRODUCT',
    tooltipTitle: 'APPLIED CREATIVITY',
    description: 'The measure of creativity is not the process itself, but the applicability and impact of the solution it produces — and the reach of that impact begins, always, with what was first imagined.',
    x: '80%', y: '-10%', delay: 0.4,
  },
];

const aiTools = [
  { name: 'ChatGPT', color: 'rgba(16,163,127,0.15)', border: 'rgba(16,163,127,0.25)', x: '15%', y: '-23%' },
  { name: 'Claude', color: 'rgba(200,100,50,0.12)', border: 'rgba(200,100,50,0.22)', x: '85%', y: '35%' },
  { name: 'GitLab', color: 'rgba(205, 89, 255, 0.12)', border: 'rgba(162,89,255,0.22)', x: '29%', y: '20%' },      
  { name: 'Copilot', color: 'rgba(30,120,255,0.1)', border: 'rgba(30,120,255,0.2)', x: '50%', y: '62%' },
];

export default function AIWorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const inView = useInView(headRef, { once: true, margin: '-10%' });
  const canvasInView = useInView(canvasRef, { once: true, margin: '-5%' });

  const [activeStep, setActiveStep] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ['start start', 'end end'],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const adjusted = (latest - 0.1) / 0.8;
    if (adjusted < 0) { setActiveStep(-1); return; }
    setActiveStep(Math.min(Math.floor(adjusted * workflowSteps.length), workflowSteps.length - 1));
  });

  return (
    <section
      id="ai-workflow"
      ref={sectionRef}
      className="relative"
      style={{ background: 'transparent' }}
    >
      {/* Dark gradient atmosphere */}
      <div
        className="absolute pointer-events-none inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(30,60,120,0.04) 0%, transparent 65%)',
          zIndex: 0,
        }}
      />

      {/* Tall sticky scroll region — drives step highlighting */}
      <div
        ref={stickyRef}
        className="relative"
        style={{ height: `${workflowSteps.length * 100}vh` }}
      >
        {/* Sticky viewport */}
        <div
          className="sticky top-0 overflow-hidden"
          style={{ height: '100vh', paddingTop: 'clamp(72px, 9vh, 96px)' }}
        >
          <div
            className="max-w-[1920px] mx-auto px-12 w-full"
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            {/* Header — anchored at top, drifts subtly upward */}
            <motion.div
              ref={headRef}
              style={{ y: headingY, textAlign: 'right' }}
              className="mb-8 flex-shrink-0"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <div style={{ width: '24px', height: '1px', background: 'rgba(240,237,232,0.2)' }} />
                <p
                  className="tracking-widest uppercase"
                  style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.3em' }}
                >
                  Design Process
                </p>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 'clamp(28px, 5.5vw, 72px)',
                  fontWeight: 200,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.0,
                  color: 'rgba(240,237,232,0.9)',
                }}
              >
                THE FUTURE OF{' '}
                <span style={{ display: 'inline-block', position: 'relative' }}>
                  {/* Invisible placeholder always sized to the longest word */}
                  <span style={{ visibility: 'hidden', color: 'rgba(100,180,255,0.7)' }}>IMAGINATION</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeStep >= 4 ? 'imagination' : 'creation'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ color: 'rgba(100,180,255,0.7)', position: 'absolute', right: 0, top: 0 }}
                    >
                      {activeStep >= 4 ? 'IMAGINATION' : 'CREATION'}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.h2>

              <div style={{ overflow: 'hidden', marginTop: '24px' }}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeStep >= 4 ? 'last' : 'intro'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontSize: 'clamp(14px, 1.8vw, 20px)',
                      fontWeight: 200,
                      color: 'rgba(240,237,232,0.35)',
                      lineHeight: 1.5,
                      textAlign: 'right',
                    }}
                  >
                    {activeStep >= 4 ? (
                      <>THE SOLE LIMIT OF CREATION<br />IS ONE&apos;S OWN IMAGINATION.</>
                    ) : (
                      <>WHERE HUMAN INTUITION<br />MEETS ARTIFICIAL INTELLIGENCE.</>
                    )}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Two-column: canvas left, step content right */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px, 4vw, 64px)', minHeight: 0 }}>

              {/* Left: Workflow canvas */}
              <div
                ref={canvasRef}
                className="relative"
                style={{ minHeight: 0 }}
              >
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                  {workflowSteps.slice(0, -1).map((step, i) => {
                    const next = workflowSteps[i + 1];
                    return (
                      <motion.g
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={canvasInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: i * 0.12 + 0.3 }}
                      >
                        <line
                          x1={step.x} y1={step.y}
                          x2={next.x}  y2={next.y}
                          stroke="rgba(240,237,232,0.06)"
                          strokeWidth="1"
                          strokeDasharray="4 6"
                        />
                      </motion.g>
                    );
                  })}
                </svg>

                {/* Workflow nodes */}
                {workflowSteps.map((step, i) => {
                  const isActive = i === activeStep;
                  const isFirst = i === 0;
                  const isLast = i === workflowSteps.length - 1;
                  return (
                    <div
                      key={step.label}
                      style={{ position: 'absolute', left: step.x, top: step.y, transform: 'translate(-50%, -50%)', zIndex: isActive ? 20 : 10 }}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={canvasInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: step.delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
                      >
                      <motion.div
                        className="relative flex items-center justify-center rounded-full"
                        animate={{
                          scale: isActive ? 1.2 : 1,
                          borderColor: isActive
                            ? (isFirst ? 'rgba(212,168,83,0.7)' : isLast ? 'rgba(100,180,255,0.7)' : 'rgba(240,237,232,0.45)')
                            : (isFirst ? 'rgba(212,168,83,0.3)' : isLast ? 'rgba(100,180,255,0.3)' : 'rgba(240,237,232,0.1)'),
                        }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          width: isFirst || isLast ? '64px' : '48px',
                          height: isFirst || isLast ? '64px' : '48px',
                          background: isFirst ? 'rgba(212,168,83,0.1)' : isLast ? 'rgba(100,180,255,0.1)' : 'rgba(240,237,232,0.04)',
                          border: '1px solid',
                          borderColor: isFirst ? 'rgba(212,168,83,0.3)' : isLast ? 'rgba(100,180,255,0.3)' : 'rgba(240,237,232,0.1)',
                          backdropFilter: 'blur(10px)',
                          cursor: 'default',
                          position: 'relative',
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{ opacity: isActive ? 1 : 0.4 }}
                          transition={{ duration: 0.4 }}
                          style={{
                            background: `radial-gradient(circle, ${
                              isFirst ? 'rgba(212,168,83,0.25)' : isLast ? 'rgba(100,180,255,0.2)' : 'rgba(240,237,232,0.1)'
                            } 0%, transparent 70%)`,
                          }}
                        />
                        <span style={{ fontSize: '9px', color: 'rgba(240,237,232,0.4)', letterSpacing: '0.05em', position: 'relative', zIndex: 1 }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </motion.div>
                      </motion.div>

                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0.35 }}
                        transition={{ duration: 0.4 }}
                        style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '10px', textAlign: 'center', width: '72px' }}
                      >
                        <p style={{ fontSize: '8px', color: 'rgba(240,237,232,0.6)', letterSpacing: '0.12em', fontWeight: 400, lineHeight: 1.2 }}>
                          {step.label}
                        </p>
                      </motion.div>
                    </div>
                  );
                })}

                {/* Floating AI tool badges */}
                {aiTools.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    className="absolute flex items-center gap-1.5 rounded-full px-3 py-1.5"
                    style={{
                      left: tool.x, top: tool.y,
                      transform: 'translate(-50%, -50%)',
                      background: tool.color,
                      border: `1px solid ${tool.border}`,
                      backdropFilter: 'blur(8px)',
                      zIndex: 5,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={canvasInView ? { opacity: 1, y: [0, -4, 0] } : { opacity: 0, y: 10 }}
                    transition={canvasInView ? {
                      opacity: { duration: 0.5, delay: 0.6 + i * 0.1 },
                      y: { duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
                    } : { duration: 0.5 }}
                  >
                    <span style={{ fontSize: '10px', color: 'rgba(240,237,232,0.55)', letterSpacing: '0.08em', fontWeight: 300 }}>
                      {tool.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Right: Dynamic step content — absolutely anchored to avoid layout shifts */}
              <div style={{ position: 'relative' }}>

                {/* Past titles — grow upward from the anchor point */}
                <div style={{
                  position: 'absolute',
                  bottom: '70%',
                  left: 0,
                  right: 0,
                  paddingBottom: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}>
                  {workflowSteps.slice(0, Math.max(activeStep, 0)).map((step) => (
                    <motion.p
                      key={step.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        fontSize: '9px',
                        color: 'rgba(240,237,232,0.15)',
                        letterSpacing: '0.18em',
                        lineHeight: 2.2,
                        textTransform: 'uppercase',
                        fontWeight: 300,
                      }}
                    >
                      {step.tooltipTitle}
                    </motion.p>
                  ))}
                </div>

                {/* Current content — anchored at midpoint, never moves */}
                <div style={{ position: 'absolute', top: '30%', left: 0, right: 0 }}>
                  <AnimatePresence mode="wait">
                    {activeStep >= 0 ? (
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p style={{ fontSize: '10px', color: 'rgba(240,237,232,0.18)', letterSpacing: '0.3em', marginBottom: '20px' }}>
                          {String(activeStep + 1).padStart(2, '0')} / {String(workflowSteps.length).padStart(2, '0')}
                        </p>
                        <div style={{ width: '28px', height: '1px', background: activeStep === 0 ? 'rgba(212,168,83,0.5)' : activeStep === workflowSteps.length - 1 ? 'rgba(100,180,255,0.5)' : 'rgba(240,237,232,0.15)', marginBottom: '20px' }} />
                        <h3 style={{
                          fontSize: 'clamp(16px, 2.2vw, 26px)',
                          fontWeight: 200,
                          letterSpacing: '-0.01em',
                          lineHeight: 1.1,
                          color: activeStep === 0 ? 'rgba(212,168,83,0.9)' : activeStep === workflowSteps.length - 1 ? 'rgba(100,180,255,0.9)' : 'rgba(240,237,232,0.85)',
                          marginBottom: '16px',
                        }}>
                          {workflowSteps[activeStep].tooltipTitle}
                        </h3>
                        <p style={{ fontSize: 'clamp(12px, 1.3vw, 15px)', color: 'rgba(240,237,232,0.35)', lineHeight: 1.8, fontWeight: 300 }}>
                          {workflowSteps[activeStep].description}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <p style={{ fontSize: '11px', color: 'rgba(240,237,232,0.15)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                          Scroll to explore
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
