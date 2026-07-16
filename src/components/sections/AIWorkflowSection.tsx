import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const workflowSteps = [
  { label: 'IDEA', description: 'The spark of possibility', x: '50%', y: '8%', delay: 0 },
  { label: 'EXPLORATION', description: 'Research & discovery', x: '75%', y: '25%', delay: 0.08 },
  { label: 'AI COLLABORATION', description: 'Accelerating creativity', x: '80%', y: '48%', delay: 0.16 },
  { label: 'PROTOTYPE', description: 'Rapid materialisation', x: '65%', y: '70%', delay: 0.24 },
  { label: 'ITERATION', description: 'Human judgment refines', x: '40%', y: '82%', delay: 0.32 },
  { label: 'DIGITAL PRODUCT', description: 'The final experience', x: '20%', y: '68%', delay: 0.4 },
];

const aiTools = [
  { name: 'ChatGPT', color: 'rgba(16,163,127,0.15)', border: 'rgba(16,163,127,0.25)', x: '8%', y: '20%' },
  { name: 'Claude', color: 'rgba(200,100,50,0.12)', border: 'rgba(200,100,50,0.22)', x: '85%', y: '15%' },
  { name: 'Figma AI', color: 'rgba(162,89,255,0.12)', border: 'rgba(162,89,255,0.22)', x: '6%', y: '60%' },
  { name: 'Cursor', color: 'rgba(100,180,255,0.1)', border: 'rgba(100,180,255,0.2)', x: '82%', y: '72%' },
  { name: 'Copilot', color: 'rgba(30,120,255,0.1)', border: 'rgba(30,120,255,0.2)', x: '50%', y: '92%' },
];

export default function AIWorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headRef, { once: true, margin: '-10%' });
  const canvasInView = useInView(canvasRef, { once: true, margin: '-5%' });

  return (
    <section
      id="ai-workflow"
      ref={sectionRef}
      className="relative py-40 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Dark gradient atmosphere */}
      <div
        className="absolute pointer-events-none inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(30,60,120,0.04) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={headRef} className="mb-24 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-8 tracking-widest uppercase"
            style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.3em' }}
          >
            Design Process
          </motion.p>

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
            THE FUTURE
            <br />
            OF <span style={{ color: 'rgba(100,180,255,0.7)' }}>CREATION</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 mx-auto max-w-lg"
            style={{
              fontSize: 'clamp(14px, 1.8vw, 20px)',
              fontWeight: 200,
              color: 'rgba(240,237,232,0.35)',
              lineHeight: 1.5,
            }}
          >
            WHERE HUMAN INTUITION
            <br />
            MEETS ARTIFICIAL INTELLIGENCE.
          </motion.p>
        </div>

        {/* Workflow canvas */}
        <div
          ref={canvasRef}
          className="relative mx-auto"
          style={{ height: '520px', maxWidth: '800px' }}
        >
          {/* Connection lines (SVG) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {workflowSteps.slice(0, -1).map((step, i) => {
              const next = workflowSteps[i + 1];
              const x1 = parseFloat(step.x);
              const y1 = parseFloat(step.y);
              const x2 = parseFloat(next.x);
              const y2 = parseFloat(next.y);
              return (
                <motion.line
                  key={i}
                  x1={`${x1}%`}
                  y1={`${y1 + 3}%`}
                  x2={`${x2}%`}
                  y2={`${y2 + 3}%`}
                  stroke="rgba(240,237,232,0.06)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={canvasInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.12 + 0.3 }}
                />
              );
            })}
          </svg>

          {/* Workflow nodes */}
          {workflowSteps.map((step, i) => (
            <motion.div
              key={step.label}
              className="absolute flex flex-col items-center"
              style={{
                left: step.x,
                top: step.y,
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={canvasInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: step.delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Node */}
              <div
                className="relative flex items-center justify-center rounded-full"
                style={{
                  width: i === 0 || i === workflowSteps.length - 1 ? '64px' : '48px',
                  height: i === 0 || i === workflowSteps.length - 1 ? '64px' : '48px',
                  background:
                    i === 0
                      ? 'rgba(212,168,83,0.1)'
                      : i === workflowSteps.length - 1
                      ? 'rgba(100,180,255,0.1)'
                      : 'rgba(240,237,232,0.04)',
                  border: `1px solid ${
                    i === 0
                      ? 'rgba(212,168,83,0.3)'
                      : i === workflowSteps.length - 1
                      ? 'rgba(100,180,255,0.3)'
                      : 'rgba(240,237,232,0.1)'
                  }`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Inner glow */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${
                      i === 0
                        ? 'rgba(212,168,83,0.15)'
                        : i === workflowSteps.length - 1
                        ? 'rgba(100,180,255,0.12)'
                        : 'rgba(240,237,232,0.04)'
                    } 0%, transparent 70%)`,
                  }}
                />
                <span
                  style={{
                    fontSize: '9px',
                    color: 'rgba(240,237,232,0.4)',
                    letterSpacing: '0.05em',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Label */}
              <div className="mt-2 text-center" style={{ maxWidth: '80px' }}>
                <p
                  style={{
                    fontSize: '9px',
                    color: 'rgba(240,237,232,0.6)',
                    letterSpacing: '0.12em',
                    fontWeight: 400,
                    lineHeight: 1.2,
                  }}
                >
                  {step.label}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Floating AI tool badges */}
          {aiTools.map((tool, i) => (
            <motion.div
              key={tool.name}
              className="absolute flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{
                left: tool.x,
                top: tool.y,
                transform: 'translate(-50%, -50%)',
                background: tool.color,
                border: `1px solid ${tool.border}`,
                backdropFilter: 'blur(8px)',
                zIndex: 5,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={
                canvasInView
                  ? { opacity: 1, y: [0, -4, 0] }
                  : { opacity: 0, y: 10 }
              }
              transition={
                canvasInView
                  ? {
                      opacity: { duration: 0.5, delay: 0.6 + i * 0.1 },
                      y: {
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.4,
                      },
                    }
                  : { duration: 0.5 }
              }
            >
              <span
                style={{ fontSize: '10px', color: 'rgba(240,237,232,0.55)', letterSpacing: '0.08em', fontWeight: 300 }}
              >
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Two-column insight */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="mb-4"
              style={{ width: '24px', height: '1px', background: 'rgba(212,168,83,0.4)' }}
            />
            <h3
              style={{ fontSize: '14px', color: 'rgba(212,168,83,0.8)', letterSpacing: '0.15em', fontWeight: 400, marginBottom: '12px' }}
            >
              AI ACCELERATES CREATIVITY
            </h3>
            <p style={{ fontSize: '13px', color: 'rgba(240,237,232,0.35)', lineHeight: 1.8, fontWeight: 300 }}>
              Exploration cycles that once took days now happen in hours. AI tools compress the
              distance between idea and prototype.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="mb-4"
              style={{ width: '24px', height: '1px', background: 'rgba(100,180,255,0.4)' }}
            />
            <h3
              style={{ fontSize: '14px', color: 'rgba(100,180,255,0.8)', letterSpacing: '0.15em', fontWeight: 400, marginBottom: '12px' }}
            >
              HUMAN JUDGMENT DIRECTS
            </h3>
            <p style={{ fontSize: '13px', color: 'rgba(240,237,232,0.35)', lineHeight: 1.8, fontWeight: 300 }}>
              Every output passes through human intuition. The designer remains the curator of
              meaning, emotion and context.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
