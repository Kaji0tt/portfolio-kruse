import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  const taglineRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!taglineRef.current) return;
    const words = taglineRef.current.querySelectorAll('.word');
    gsap.fromTo(
      words,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 1.4,
        ease: 'power3.out',
        delay: 1.8,
      }
    );
  }, []);

  const fadeUpProps = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, delay, ease: EASE_OUT },
  });

  return (
    <section
      id="intro"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100vh' }}
    >

      {/* Radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background:
            'radial-gradient(ellipse at center, rgba(200,184,154,0.04) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Eyebrow */}
        <motion.div {...fadeUpProps(0)} className="mb-16">
          <span
            className="tracking-widest uppercase"
            style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.35em' }}
          >
            Portfolio {new Date().getFullYear()}
          </span>
        </motion.div>

        {/* Main name */}
        <motion.h1
          {...fadeUpProps(0.18)}
          style={{
            fontSize: 'clamp(52px, 10vw, 130px)',
            fontWeight: 200,
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            color: 'var(--text-primary)',
          }}
        >
          JASCHA
        </motion.h1>
        <motion.h1
          {...fadeUpProps(0.36)}
          style={{
            fontSize: 'clamp(52px, 10vw, 130px)',
            fontWeight: 200,
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            color: 'var(--text-primary)',
          }}
        >
          KRUSE
        </motion.h1>

        {/* Divider */}
        <motion.div {...fadeUpProps(0.54)} className="my-10">
          <div
            className="mx-auto"
            style={{ width: '40px', height: '1px', background: 'rgba(240,237,232,0.15)' }}
          />
        </motion.div>

        {/* Roles */}
        <motion.div {...fadeUpProps(0.72)} className="flex flex-col items-center gap-1">
          <p
            className="tracking-widest uppercase"
            style={{
              fontSize: 'clamp(11px, 1.5vw, 14px)',
              color: 'rgba(240,237,232,0.45)',
              letterSpacing: '0.3em',
              fontWeight: 300,
            }}
          >
            UX Designer
          </p>
          <p
            className="tracking-widest uppercase"
            style={{
              fontSize: 'clamp(11px, 1.5vw, 14px)',
              color: 'rgba(240,237,232,0.25)',
              letterSpacing: '0.3em',
              fontWeight: 300,
            }}
          >
            Creative Engineer
          </p>
        </motion.div>

        {/* Tagline */}
        <div ref={taglineRef} className="mt-24 max-w-2xl" style={{ lineHeight: 1.25 }}>
          {[
            'WHERE',
            'HUMAN',
            'CURIOSITY',
            'MEETS',
            'DIGITAL',
            'POSSIBILITY,',
            'IMAGINATION',
            'LEADS.',
          ].map((word) => (
            <span
              key={word}
              className="word inline-block mr-4"
              style={{
                fontSize: 'clamp(22px, 4vw, 44px)',
                fontWeight: 200,
                letterSpacing: '-0.01em',
                color:
                  word === 'IMAGINATION' || word === 'LEADS.'
                    ? 'rgba(240,237,232,0.9)'
                    : word === 'CURIOSITY' || word === 'POSSIBILITY,'
                    ? 'rgba(200,184,154,0.7)'
                    : 'rgba(240,237,232,0.35)',
                opacity: 0,
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll invitation / Mobile gate */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1.5 }}
        className="absolute bottom-12 left-1/2 flex flex-col items-center gap-3"
        style={{ transform: 'translateX(-50%)', width: 'max-content', maxWidth: '80vw', textAlign: 'center' }}
      >
        {isMobile ? (
          <div className="flex flex-col items-center gap-4">
            <div
              className="mx-auto"
              style={{ width: '24px', height: '1px', background: 'rgba(240,237,232,0.12)' }}
            />
            <p
              style={{
                fontSize: '11px',
                color: 'rgba(240,237,232,0.3)',
                letterSpacing: '0.08em',
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Thank you for your interest.
              <br />
              This experience is crafted for desktop.
              <br />
              Please come back on a larger screen.
            </p>
          </div>
        ) : (
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <div
              className="rounded-full"
              style={{
                width: '1px',
                height: '40px',
                background: 'linear-gradient(to bottom, transparent, rgba(240,237,232,0.2))',
              }}
            />
            <span
              className="tracking-widest uppercase"
              style={{ fontSize: '9px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.3em' }}
            >
              Scroll
            </span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
