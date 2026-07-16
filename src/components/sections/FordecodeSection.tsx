import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import BrowserMockup from '../placeholders/BrowserMockup';

const highlights = [
  { label: 'RESPONSIVE DESIGN', body: 'Seamless experience across all device sizes.' },
  { label: 'COMPONENT SYSTEM', body: 'Modular, reusable UI components for scale.' },
  { label: 'COMMUNITY FIRST', body: 'Designed around belonging and shared purpose.' },
  { label: 'BRAND IDENTITY', body: 'Distinctive visual language for the region.' },
];

export default function FordecodeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headRef, { once: true, margin: '-10%' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="forde-code"
      ref={sectionRef}
      className="relative py-40 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Digital atmosphere */}
      <div
        className="absolute pointer-events-none inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(240,237,232,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(240,237,232,0.012) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(130,160,200,0.025) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={headRef} className="mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-8 tracking-widest uppercase"
            style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.3em' }}
          >
            Case Study 02
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              style={{
                fontSize: 'clamp(40px, 8vw, 110px)',
                fontWeight: 200,
                letterSpacing: '-0.03em',
                lineHeight: 0.92,
                color: 'rgba(240,237,232,0.9)',
              }}
            >
              FÖRDE-
              <br />
              <span style={{ color: 'rgba(130,160,200,0.7)' }}>CODE</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-lg"
            style={{
              fontSize: 'clamp(16px, 2vw, 22px)',
              fontWeight: 200,
              color: 'rgba(240,237,232,0.4)',
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
            }}
          >
            CONNECTING PEOPLE
            <br />
            THROUGH DIGITAL SPACES.
          </motion.p>
        </div>

        {/* Browser mockups */}
        <motion.div style={{ y: parallaxY }} className="mb-20">
          <div className="relative">
            {/* Desktop mockup */}
            <BrowserMockup
              url="foerde-code.de"
              title="Förde-Code"
              variant="desktop"
              className="w-full"
            />

            {/* Floating mobile */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-16 -right-6 hidden lg:block"
              style={{ zIndex: 10 }}
            >
              <BrowserMockup
                url="foerde-code.de"
                title="Förde-Code"
                variant="mobile"
                className=""
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Highlights */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="mb-3"
                style={{ width: '20px', height: '1px', background: 'rgba(130,160,200,0.3)' }}
              />
              <h4
                style={{
                  fontSize: '11px',
                  color: 'rgba(240,237,232,0.6)',
                  letterSpacing: '0.15em',
                  fontWeight: 400,
                  marginBottom: '8px',
                }}
              >
                {item.label}
              </h4>
              <p
                style={{ fontSize: '12px', color: 'rgba(240,237,232,0.25)', lineHeight: 1.6, fontWeight: 300 }}
              >
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
