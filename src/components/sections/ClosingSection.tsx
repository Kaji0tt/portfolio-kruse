import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ClosingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10%' });

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center overflow-hidden py-40 px-6"
      style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}
    >
      {/* Large ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(200,184,154,0.03) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Horizontal line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute"
        style={{
          top: '15%',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(240,237,232,0.06), transparent)',
          transformOrigin: 'center',
        }}
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Main statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            style={{
              fontSize: 'clamp(28px, 6vw, 84px)',
              fontWeight: 200,
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              color: 'rgba(240,237,232,0.9)',
            }}
          >
            DESIGN IS THE SPACE
            <br />
            <span style={{ color: 'rgba(240,237,232,0.35)' }}>WHERE HUMAN IDEAS</span>
            <br />
            BECOME DIGITAL
            <br />
            <span style={{ color: 'rgba(200,184,154,0.7)' }}>EXPERIENCES.</span>
          </h2>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto my-20"
          style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(200,184,154,0.3), transparent)',
          }}
        />

        {/* Name & title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3"
        >
          <h3
            style={{
              fontSize: 'clamp(28px, 5vw, 64px)',
              fontWeight: 200,
              letterSpacing: '-0.02em',
              color: 'rgba(240,237,232,0.9)',
            }}
          >
            JASCHA KRUSE
          </h3>
          <p
            className="tracking-widest uppercase"
            style={{ fontSize: '11px', color: 'rgba(240,237,232,0.3)', letterSpacing: '0.3em' }}
          >
            UX Designer
          </p>
          <p
            className="tracking-widest uppercase"
            style={{ fontSize: '11px', color: 'rgba(240,237,232,0.18)', letterSpacing: '0.3em' }}
          >
            Creative Technologist
          </p>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 1.2 }}
          className="mt-20"
        >
          <motion.a
            href="mailto:hello@jascha-kruse.de"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full cursor-pointer"
            style={{
              background: 'rgba(240,237,232,0.04)',
              border: '1px solid rgba(240,237,232,0.1)',
              color: 'rgba(240,237,232,0.6)',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'rgba(240,237,232,0.08)';
              el.style.borderColor = 'rgba(240,237,232,0.18)';
              el.style.color = 'rgba(240,237,232,0.9)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'rgba(240,237,232,0.04)';
              el.style.borderColor = 'rgba(240,237,232,0.1)';
              el.style.color = 'rgba(240,237,232,0.6)';
            }}
          >
            <span className="tracking-widest uppercase" style={{ fontSize: '10px' }}>
              GET IN TOUCH
            </span>
            <span style={{ opacity: 0.4 }}>→</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom horizontal line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute"
        style={{
          bottom: '15%',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(240,237,232,0.06), transparent)',
          transformOrigin: 'center',
        }}
      />

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.0, delay: 1.6 }}
        className="absolute bottom-10 tracking-widest"
        style={{ fontSize: '9px', color: 'rgba(240,237,232,0.12)', letterSpacing: '0.3em' }}
      >
        JASCHA KRUSE — PORTFOLIO 2025
      </motion.p>
    </section>
  );
}
