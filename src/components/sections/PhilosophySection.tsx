import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const pillars = [
  {
    number: '01',
    title: 'PSYCHOLOGY',
    body: 'Understanding people, behavior and learning. Every interface is a conversation between human cognition and digital structure.',
    accent: 'rgba(200,184,154,0.15)',
    glow: 'rgba(200,184,154,0.06)',
  },
  {
    number: '02',
    title: 'ART',
    body: 'Creating emotional, meaningful and beautiful experiences. Design that moves people — aesthetics in service of clarity.',
    accent: 'rgba(212,168,83,0.12)',
    glow: 'rgba(212,168,83,0.05)',
  },
  {
    number: '03',
    title: 'TECHNOLOGY',
    body: 'Turning ideas into functional digital systems. Bridging the gap between concept and implementation.',
    accent: 'rgba(130,160,200,0.1)',
    glow: 'rgba(130,160,200,0.04)',
  },
];

function PillarCard({ pillar, index }: { pillar: (typeof pillars)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col"
      style={{
        padding: '2px',
        borderRadius: '20px',
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
    </motion.div>
  );
}

export default function PhilosophySection() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headRef, { once: true, margin: '-10%' });

  return (
    <section
      className="relative py-40 px-6 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
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

      <div className="max-w-6xl mx-auto">
        {/* Headline */}
        <div ref={headRef} className="mb-24 max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-8 tracking-widest uppercase"
            style={{ fontSize: '10px', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.3em' }}
          >
            Design Philosophy
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(32px, 6vw, 80px)',
              fontWeight: 200,
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
              color: 'rgba(240,237,232,0.9)',
            }}
          >
            DESIGN AT THE
            <br />
            <span style={{ color: 'rgba(240,237,232,0.45)' }}>INTERSECTION OF</span>
            <br />
            PSYCHOLOGY,
            <br />
            <span style={{ color: 'rgba(200,184,154,0.7)' }}>ART</span>
            <br />
            <span style={{ color: 'rgba(240,237,232,0.45)' }}>AND</span>{' '}
            <span style={{ color: 'rgba(130,160,200,0.8)' }}>TECHNOLOGY.</span>
          </motion.h2>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-28">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>

        {/* Manifesto statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.2 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p
            style={{
              fontSize: 'clamp(16px, 2.5vw, 24px)',
              fontWeight: 200,
              color: 'rgba(240,237,232,0.3)',
              lineHeight: 1.7,
              letterSpacing: '0.02em',
            }}
          >
            "Good design is not the result of a single discipline. It emerges from the{' '}
            <span style={{ color: 'rgba(240,237,232,0.7)' }}>tension between logic and intuition</span>,
            between structure and poetry."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
